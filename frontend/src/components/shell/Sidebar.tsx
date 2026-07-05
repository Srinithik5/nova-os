'use client';

import clsx from 'clsx';
import { Icon } from '@/components/primitives/Icon';
import { Avatar } from '@/components/primitives/Avatar';
import { APP_REGISTRY } from '@/lib/appRegistry';
import { useActiveAppId, useWindowManager } from '@/stores/windowManager';

// Pixel match for project/Nova OS.dc.html lines 96-104.
export function Sidebar() {
  const activeAppId = useActiveAppId();
  const openApp = useWindowManager((s) => s.openApp);
  const openHome = useWindowManager((s) => s.openHome);

  return (
    <div className="z-20 flex w-[76px] flex-none flex-col items-center gap-[6px] border-r border-white/5 bg-[rgba(8,12,22,0.4)] py-4 [backdrop-filter:blur(24px)]">
      <button
        type="button"
        aria-label="Home"
        title="Home"
        onClick={openHome}
        className="mb-[6px] flex h-11 w-11 items-center justify-center rounded-13 border border-white/[0.12] bg-[linear-gradient(140deg,rgba(87,169,255,0.25),rgba(122,86,255,0.2))] text-nova-blue-pale transition-transform hover:-translate-y-0.5"
      >
        <Icon name="grid" size={20} />
      </button>

      {APP_REGISTRY.map((app) => {
        const active = app.id === activeAppId;
        return (
          <button
            key={app.id}
            type="button"
            aria-label={app.label}
            title={app.label}
            onClick={() => openApp(app.id)}
            className={clsx(
              'flex h-[46px] w-[46px] items-center justify-center rounded-13 border transition-transform hover:-translate-y-0.5 hover:scale-105',
              active
                ? 'border-[rgba(87,169,255,0.35)] bg-[rgba(87,169,255,0.18)] text-nova-blue-pale'
                : 'border-white/[0.06] bg-white/[0.03] text-white/55'
            )}
          >
            <Icon name={app.icon} size={21} />
          </button>
        );
      })}

      <div className="flex-1" />

      <Avatar initials="AR" size={44} />
    </div>
  );
}