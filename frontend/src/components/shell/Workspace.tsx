'use client';

import type { ComponentType } from 'react';
import { useActiveAppId } from '@/stores/windowManager';
import { HomeView } from '@/components/apps/home/HomeView';
import { FileExplorerApp } from '@/components/apps/files/FileExplorerApp';
import { TerminalApp } from '@/components/apps/terminal/TerminalApp';
import { BrowserApp } from '@/components/apps/browser/BrowserApp';
import { MusicApp } from '@/components/apps/music/MusicApp';
import { CalendarApp } from '@/components/apps/calendar/CalendarApp';
import { SettingsApp } from '@/components/apps/settings/SettingsApp';
import type { AppId } from '@/lib/appRegistry';

const APP_COMPONENTS: Record<AppId, ComponentType> = {
  files: FileExplorerApp,
  terminal: TerminalApp,
  browser: BrowserApp,
  music: MusicApp,
  calendar: CalendarApp,
  settings: SettingsApp,
};

// Pixel match for the workspace container in project/Nova OS.dc.html
// (line 107: padding 22px). Single-focus mode only (blueprint §7) — one
// app fills the workspace at a time, exactly like the source prototype.
export function Workspace() {
  const activeAppId = useActiveAppId();
  const ActiveApp = activeAppId ? APP_COMPONENTS[activeAppId] : null;

  return (
    <div className="relative flex-1 overflow-hidden p-[22px]">
      {ActiveApp ? <ActiveApp /> : <HomeView />}
    </div>
  );
}