'use client';

import { Icon } from '@/components/primitives/Icon';
import { GlassPanel } from '@/components/primitives/GlassPanel';
import { TrafficDots } from '@/components/primitives/TrafficDots';
import { useWindowManager } from '@/stores/windowManager';

const BOOKMARKS = [
  { letter: 'D', label: 'Docs', bg: 'linear-gradient(140deg,#57a9ff,#7a56ff)' },
  { letter: 'G', label: 'Cloud', bg: 'linear-gradient(140deg,#6effc0,#2ddcff)' },
  { letter: 'M', label: 'Mail', bg: 'linear-gradient(140deg,#ff8f8f,#ff5fa2)' },
  { letter: 'F', label: 'Feed', bg: 'linear-gradient(140deg,#ffd28f,#ff9f5f)' },
  { letter: 'S', label: 'Store', bg: 'linear-gradient(140deg,#c8a2ff,#7a56ff)' },
  { letter: 'A', label: 'Analytics', bg: 'linear-gradient(140deg,#2ddcff,#57a9ff)' },
  { letter: 'W', label: 'Work', bg: 'linear-gradient(140deg,#8fc0ff,#57a9ff)' },
  { letter: 'N', label: 'News', bg: 'linear-gradient(140deg,#ff9f8f,#ff5f57)' },
];

// Pixel match for project/Nova OS.dc.html lines 231-255. The tab bar,
// address bar, and search field are decorative in the source design too —
// it's a real <div>, not an <input>, and bookmarks have no onClick either.
// A real embedded browser is a Phase 6 decision (see the blueprint's
// Browser decision box: most sites block iframe embedding outright).
export function BrowserApp() {
  const openHome = useWindowManager((s) => s.openHome);

  return (
    <GlassPanel className="h-full animate-nova-pop bg-white/[0.04]">
      <div className="flex h-[46px] flex-none items-center gap-2.5 border-b border-white/[0.06] px-3.5">
        <TrafficDots onClose={openHome} />
        <div className="ml-1.5 flex items-center gap-2">
          <div className="rounded-t-10 border border-b-0 border-[rgba(87,169,255,0.2)] bg-[rgba(87,169,255,0.14)] px-3.5 py-1.5 text-[12.5px] text-nova-blue-pale">
            Nova Start
          </div>
          <div className="px-3 py-1.5 text-[12.5px] text-white/45">Docs</div>
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-11 border border-white/[0.08] bg-white/5 px-3.5 py-[7px] text-[13px] text-white/65">
          <span className="text-nova-mint">🔒</span> nova://home
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center overflow-auto px-6 py-14">
        <div className="flex items-center gap-2 font-display text-[44px] font-semibold tracking-[-0.02em]">
          <span className="text-nova-blue">◆</span> Nova
        </div>
        <div className="mt-6 flex w-full max-w-[560px] items-center gap-3 rounded-18 border border-white/10 bg-white/5 px-5 py-3.5">
          <Icon name="search" size={18} />
          <span className="text-[15px] text-white/40">Search the web or ask Nova anything…</span>
        </div>
        <div className="mt-7 grid w-full max-w-[560px] grid-cols-4 gap-3.5">
          {BOOKMARKS.map((bookmark) => (
            <div
              key={bookmark.label}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-16 border border-white/[0.07] bg-white/[0.04] transition-transform hover:-translate-y-0.5 hover:border-[rgba(87,169,255,0.4)]"
            >
              <div
                className="flex h-[38px] w-[38px] items-center justify-center rounded-11 font-display font-bold text-nova-blue-pale"
                style={{ background: bookmark.bg }}
              >
                {bookmark.letter}
              </div>
              <div className="text-[11.5px] text-white/60">{bookmark.label}</div>
            </div>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}