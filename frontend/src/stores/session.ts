import { create } from 'zustand';
import type { PublicUser } from '@/lib/api';

interface SessionStore {
  user: PublicUser | null;
  setUser: (user: PublicUser | null) => void;
}

// The "session" slice named in the approved blueprint (§11) — ephemeral,
// client-side only. Hydrated from GET /api/v1/auth/me on desktop mount
// (DesktopShell) since the httpOnly cookie, not this store, is the real
// source of truth for whether anyone is signed in.
export const useSessionStore = create<SessionStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));