import type { IconName } from '@/components/primitives/Icon';

export type AppId = 'files' | 'terminal' | 'browser' | 'music' | 'calendar' | 'settings';

export interface AppDefinition {
  id: AppId;
  label: string;
  icon: IconName;
}

// Single source of truth for the six workspace apps — Sidebar, Dock, and
// (from Phase 8 onward) Search all read from this instead of each keeping
// their own copy (blueprint §2).
export const APP_REGISTRY: AppDefinition[] = [
  { id: 'files', label: 'File Explorer', icon: 'files' },
  { id: 'terminal', label: 'Terminal', icon: 'terminal' },
  { id: 'browser', label: 'Browser', icon: 'browser' },
  { id: 'music', label: 'Music', icon: 'music' },
  { id: 'calendar', label: 'Calendar', icon: 'cal' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];