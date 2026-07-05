'use client';

import clsx from 'clsx';
import { Icon, type IconName } from '@/components/primitives/Icon';
import { APP_REGISTRY, type AppId } from '@/lib/appRegistry';
import { useActiveAppId, useWindowManager } from '@/stores/windowManager';

interface DockItem {
  id: AppId | null;
  label: string;
  icon: IconName;
}

// Pixel match for project/Nova OS.dc.html lines 424-434. The Nova AI
// button is visually complete but inert until Phase 7 wires up the AI
// Assistant panel (blueprint §14).
export function Dock() {
  const activeAppId = useActiveAppId();
  const openApp = useWindowManager((s) => s.openApp);
  const openHome = useWindowManager((s) => s.openHome);

  const items: DockItem[] = [{ id: null, label: 'Home', icon: 'home' }, ...APP_REGISTRY];

  return (
    <div className="absolute bottom-4 left-1/2 z-[35] flex -translate-x-1/2 items-end gap-2 rounded-22 border border-white/10 bg-[rgba(12,18,30,0.55)] px-3.5 py-2.5 shadow-panel [backdrop-filter:blur(40px)_saturate(150%)]">
      {items.map((item) => {
        const active = item.id === activeAppId;
        return (
          <button
            key={item.label}
            type="button"
            title={item.label}
            aria-label={item.label}
            onClick={() => (item.id === null ? openHome() : openApp(item.id))}
            className={clsx(
              'relative flex h-[52px] w-[52px] items-center justify-center rounded-15 border transition-transform duration-200 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-2.5 hover:scale-[1.14]',
              active
                ? 'border-[rgba(87,169,255,0.4)] bg-[rgba(87,169,255,0.2)] text-nova-blue-pale'
                : 'border-white/[0.08] bg-white/5 text-white/70'
            )}
          >
            <Icon name={item.icon} size={26} />
            {active && (
              <span className="absolute -bottom-[7px] left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-nova-blue shadow-[0_0_6px_#57a9ff]" />
            )}
          </button>
        );
      })}

      <div className="mx-1 h-10 w-px self-center bg-white/[0.12]" />

      {/* Phase 7 wires this to the AI Assistant panel */}
      <button
        type="button"
        aria-label="Nova AI"
        title="Nova AI"
        className="flex h-[52px] w-[52px] items-center justify-center rounded-15 border border-[rgba(87,169,255,0.4)] bg-[linear-gradient(140deg,rgba(87,169,255,0.35),rgba(122,86,255,0.3))] text-nova-blue-pale shadow-[0_0_20px_rgba(87,169,255,0.35)] transition-transform duration-200 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-2.5 hover:scale-[1.14]"
      >
        <Icon name="sparkle" size={26} />
      </button>
    </div>
  );
}