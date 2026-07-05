'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Icon, type IconName } from '@/components/primitives/Icon';
import { GlassPanel } from '@/components/primitives/GlassPanel';
import { Toggle } from '@/components/primitives/Toggle';

const SETTINGS_NAV: { label: string; icon: IconName; active?: boolean }[] = [
  { label: 'Appearance', icon: 'sun', active: true },
  { label: 'Display', icon: 'grid' },
  { label: 'Nova AI', icon: 'sparkle' },
  { label: 'Privacy', icon: 'shield' },
  { label: 'Network', icon: 'wifi' },
  { label: 'Account', icon: 'user' },
];

const TOGGLE_DEFS = [
  { key: 'glass', label: 'Glass materials', description: 'Translucent blur across windows and panels.' },
  { key: 'motion', label: 'Micro animations', description: 'Subtle motion for depth and feedback.' },
  { key: 'spatial', label: 'Spatial depth', description: 'Parallax and layered ambient lighting.' },
  { key: 'focus', label: 'Focus mode', description: 'Silence non-essential notifications.' },
  { key: 'sync', label: 'Nova Cloud sync', description: 'Keep files and settings in sync.' },
] as const;

type ToggleKey = (typeof TOGGLE_DEFS)[number]['key'];

const ACCENTS = ['#57a9ff', '#7a56ff', '#2ddcff', '#6effc0'];

// Pixel/behavior match for project/Nova OS.dc.html lines 330-361. The nav
// list is decorative in the source design too — every entry shows the
// same "Appearance & System" pane regardless of selection there. Toggles
// and the accent picker are real local state, matching the source, but
// nothing they control is wired to an actual effect yet, also matching
// the source — persistence lands in Phase 9.
export function SettingsApp() {
  const [settings, setSettings] = useState<Record<ToggleKey, boolean>>({
    glass: true,
    motion: true,
    spatial: true,
    focus: false,
    sync: true,
  });
  const [accent, setAccent] = useState(ACCENTS[0]);

  function toggle(key: ToggleKey) {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <GlassPanel className="h-full animate-nova-pop flex-row bg-white/[0.04]">
      <div className="flex w-[220px] flex-none flex-col gap-[3px] overflow-auto border-r border-white/[0.06] px-3 py-[18px]">
        <div className="pb-3 pt-1.5 px-2.5 font-display text-[17px] font-semibold">Settings</div>
        {SETTINGS_NAV.map((item) => (
          <div
            key={item.label}
            className={clsx(
              'flex items-center gap-[11px] rounded-11 px-2.5 py-[9px] text-[13.5px] transition-colors hover:bg-white/[0.06]',
              item.active ? 'bg-[rgba(87,169,255,0.14)] text-nova-blue-pale' : 'text-white/70'
            )}
          >
            <span className="text-nova-blue-soft">
              <Icon name={item.icon} size={17} />
            </span>
            {item.label}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-[26px]">
        <div className="font-display text-[24px] font-semibold">Appearance &amp; System</div>
        <div className="mt-1 text-sm text-white/50">Personalize how Nova OS looks and behaves.</div>

        <div className="mt-6 flex max-w-[640px] flex-col gap-3">
          {TOGGLE_DEFS.map((def) => (
            <div
              key={def.key}
              className="flex items-center justify-between rounded-16 border border-white/[0.07] bg-white/[0.03] px-[18px] py-4"
            >
              <div>
                <div className="text-[14.5px] font-semibold">{def.label}</div>
                <div className="mt-0.5 text-[13px] text-white/45">{def.description}</div>
              </div>
              <Toggle checked={settings[def.key]} onChange={() => toggle(def.key)} label={def.label} />
            </div>
          ))}

          <div className="rounded-16 border border-white/[0.07] bg-white/[0.03] px-[18px] py-4">
            <div className="text-[14.5px] font-semibold">Accent color</div>
            <div className="mt-0.5 text-[13px] text-white/45">Neon glow used across the system.</div>
            <div className="mt-3.5 flex gap-3">
              {ACCENTS.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={`Use accent ${color}`}
                  onClick={() => setAccent(color)}
                  className="h-[34px] w-[34px] rounded-11 border-2"
                  style={{
                    background: color,
                    boxShadow: `0 0 14px ${color}80`,
                    borderColor: accent === color ? 'rgba(255,255,255,0.85)' : 'transparent',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}