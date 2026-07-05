'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@/components/primitives/Icon';
import { IconButton } from '@/components/primitives/IconButton';
import { APP_REGISTRY } from '@/lib/appRegistry';
import { useActiveAppId } from '@/stores/windowManager';
import { useClock } from '@/lib/useClock';

// Pixel match for project/Nova OS.dc.html lines 77-92. The search trigger,
// AI toggle, and notification bell are visually complete but intentionally
// inert — their overlays are Phase 8 (search, notifications) and Phase 7
// (AI) per the approved blueprint (§14).
export function MenuBar() {
  const router = useRouter();
  const activeAppId = useActiveAppId();
  const { time } = useClock();

  const activeTitle = APP_REGISTRY.find((app) => app.id === activeAppId)?.label ?? 'Desktop';

  return (
    <div className="z-30 flex h-11 flex-none items-center gap-3.5 border-b border-white/[0.06] bg-[rgba(8,12,22,0.55)] px-[18px] [backdrop-filter:blur(30px)_saturate(140%)]">
      <div className="flex items-center gap-[9px] font-display text-[15px] font-semibold">
        <span className="text-nova-blue drop-shadow-[0_0_6px_rgba(87,169,255,0.8)]">◆</span>Nova
      </div>
      <div className="h-4 w-px bg-white/10" />
      <div className="text-[13px] font-medium text-white/55">{activeTitle}</div>

      <div className="flex-1" />

      {/* Phase 8 wires this to the Search Palette overlay */}
      <button
        type="button"
        className="flex items-center gap-2 rounded-11 border border-white/[0.08] bg-white/5 px-3 py-1.5 text-[12.5px] text-white/60 transition-colors hover:bg-white/10"
      >
        <Icon name="search" size={17} />
        <span>Search or ask Nova</span>
        <span className="rounded-[6px] bg-white/[0.08] px-1.5 py-px text-[11px]">⌘K</span>
      </button>

      {/* Phase 7 wires this to the AI Assistant panel */}
      <IconButton
        aria-label="Ask Nova"
        className="h-8 w-8 rounded-10 border border-[rgba(87,169,255,0.25)] bg-[rgba(87,169,255,0.12)] text-nova-blue-soft hover:bg-[rgba(87,169,255,0.22)]"
      >
        <Icon name="sparkle" size={18} />
      </IconButton>

      <div className="flex items-center gap-3 pl-1 text-white/55">
        <Icon name="wifi" size={18} />
        <Icon name="battery" size={18} />
        {/* Phase 8 wires this to the Notification Center overlay */}
        <button type="button" aria-label="Notifications" className="transition-colors hover:text-white">
          <Icon name="bell" size={18} />
        </button>
      </div>

      <div className="text-[13px] font-semibold tabular-nums text-white/85">{time}</div>

      <IconButton
        aria-label="Lock Nova OS"
        onClick={() => router.push('/lock')}
        className="h-[30px] w-[30px] rounded-9 text-white/50 hover:bg-white/[0.06] hover:text-[#ff8f8f]"
      >
        <Icon name="power" size={17} />
      </IconButton>
    </div>
  );
}