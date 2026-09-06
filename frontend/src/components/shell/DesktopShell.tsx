'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MenuBar } from './MenuBar';
import { Sidebar } from './Sidebar';
import { Dock } from './Dock';
import { Workspace } from './Workspace';
import { getMe } from '@/lib/api';
import { useSessionStore } from '@/stores/session';

// Pixel match for project/Nova OS.dc.html lines 74-436 (menu bar, sidebar,
// workspace, dock). The AI Assistant panel, Notification Center, and
// Search Palette overlays declared alongside this in the source design are
// Phase 7 and Phase 8 respectively (blueprint §14) and are not part of
// this shell yet.
export function DesktopShell() {
  const setUser = useSessionStore((s) => s.setUser);

  // The Zustand session slice is empty on a fresh page load/refresh even
  // though the httpOnly cookie (the real source of truth) is still valid
  // — middleware.ts already confirmed that before this ever rendered.
  // This just hydrates the display data (name, initials) to match.
  useEffect(() => {
    getMe().then((user) => {
      if (user) setUser(user);
    });
  }, [setUser]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="absolute inset-0 z-10 flex flex-col"
    >
      <MenuBar />
      <div className="relative flex min-h-0 flex-1">
        <Sidebar />
        <Workspace />
      </div>
      <Dock />
    </motion.div>
  );
}