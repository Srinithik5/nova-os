import { create } from 'zustand';
import type { AppId } from '@/lib/appRegistry';

export interface WindowState {
  id: string;
  appId: AppId;
  zIndex: number;
  focused: boolean;
  minimized: boolean;
}

interface WindowManagerStore {
  windows: WindowState[];
  focusedId: string | null;
  openApp: (appId: AppId) => void;
  openHome: () => void;
}

// Single-focus mode only, per the approved blueprint (§7): opening an app
// replaces whatever was open, matching project/Nova OS.dc.html's
// `state.app` exactly. `windows`/zIndex/minimized are unused today but
// already modeled so floating/multi-window mode (blueprint §18) is a
// rendering change in Workspace later, not a state-model rewrite.
export const useWindowManager = create<WindowManagerStore>((set) => ({
  windows: [],
  focusedId: null,
  openApp: (appId) =>
    set({
      windows: [{ id: appId, appId, zIndex: 1, focused: true, minimized: false }],
      focusedId: appId,
    }),
  openHome: () => set({ windows: [], focusedId: null }),
}));

export function useActiveAppId(): AppId | null {
  return useWindowManager((state) => state.focusedId as AppId | null);
}