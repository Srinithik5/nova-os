'use client';

import { Icon, type IconName } from '@/components/primitives/Icon';
import { GlassPanel } from '@/components/primitives/GlassPanel';
import { ProgressBar } from '@/components/primitives/ProgressBar';
import { TrafficDots } from '@/components/primitives/TrafficDots';
import { useWindowManager } from '@/stores/windowManager';

interface FileItem {
  name: string;
  meta: string;
  icon: IconName;
  color: string;
  bg: string;
}

const FILES: FileItem[] = [
  { name: 'Nova UI', meta: '12 items', icon: 'folder', color: '#8fc0ff', bg: 'rgba(87,169,255,0.14)' },
  { name: 'Research', meta: '8 items', icon: 'folder', color: '#8fc0ff', bg: 'rgba(87,169,255,0.14)' },
  { name: 'roadmap.pdf', meta: '2.4 MB', icon: 'doc', color: '#ff9f8f', bg: 'rgba(255,120,100,0.12)' },
  { name: 'hero.png', meta: '5.1 MB', icon: 'img', color: '#6effc0', bg: 'rgba(110,255,192,0.12)' },
  { name: 'core.rs', meta: '18 KB', icon: 'code', color: '#c8a2ff', bg: 'rgba(160,120,255,0.14)' },
  { name: 'specs.doc', meta: '640 KB', icon: 'doc', color: '#ff9f8f', bg: 'rgba(255,120,100,0.12)' },
  { name: 'Assets', meta: '46 items', icon: 'folder', color: '#8fc0ff', bg: 'rgba(87,169,255,0.14)' },
  { name: 'notes.md', meta: '12 KB', icon: 'doc', color: '#ffd28f', bg: 'rgba(255,200,100,0.12)' },
];

const QUICK_ACCESS: { label: string; icon: IconName; active?: boolean }[] = [
  { label: 'Home', icon: 'home' },
  { label: 'Documents', icon: 'doc' },
  { label: 'Downloads', icon: 'files' },
  { label: 'Projects', icon: 'folder', active: true },
  { label: 'Nova Cloud', icon: 'cloudicon' },
];

// Pixel match for project/Nova OS.dc.html lines 178-208. Breadcrumb, quick
// access, and the filter bar are decorative in the source design too —
// nothing there is wired up either. Real file browsing arrives in Phase 4.
export function FileExplorerApp() {
  const openHome = useWindowManager((s) => s.openHome);

  return (
    <GlassPanel className="h-full animate-nova-pop bg-white/[0.04]">
      <div className="flex h-[52px] flex-none items-center gap-3 border-b border-white/[0.06] px-4">
        <TrafficDots onClose={openHome} />
        <div className="ml-1.5 flex items-center gap-[7px] text-[13px] font-medium text-white/50">
          Home <span className="opacity-40">/</span> <span className="text-nova-blue-soft">Projects</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 rounded-10 bg-white/5 px-3 py-1.5 text-[12.5px] text-white/50">
          <Icon name="search" size={16} /> Filter files
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <div className="flex w-[190px] flex-none flex-col gap-[3px] border-r border-white/[0.06] px-2.5 py-3.5">
          <div className="px-2.5 pb-1 pt-1.5 text-[11px] uppercase tracking-[.12em] text-white/35">Quick Access</div>
          {QUICK_ACCESS.map((item) => (
            <div
              key={item.label}
              className={
                'flex items-center gap-2.5 rounded-10 px-2.5 py-2 text-[13.5px] transition-colors hover:bg-white/[0.06] ' +
                (item.active ? 'bg-[rgba(87,169,255,0.14)] text-nova-blue-pale' : 'text-white/70')
              }
            >
              <span className="text-nova-blue-soft">
                <Icon name={item.icon} size={17} />
              </span>
              {item.label}
            </div>
          ))}
          <div className="mt-auto px-2.5 py-3">
            <div className="mb-1.5 text-xs text-white/40">Nova Cloud · 68%</div>
            <ProgressBar percent={68} glow={false} />
          </div>
        </div>

        <div className="grid flex-1 auto-rows-min grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-3.5 overflow-auto p-[18px]">
          {FILES.map((file) => (
            <div
              key={file.name}
              className="flex flex-col items-center gap-2.5 rounded-16 border border-white/[0.06] bg-white/[0.03] px-3 py-4 text-center transition-transform hover:-translate-y-[3px] hover:border-[rgba(87,169,255,0.4)]"
            >
              <div
                className="flex h-[52px] w-[52px] items-center justify-center rounded-14"
                style={{ color: file.color, background: file.bg }}
              >
                <Icon name={file.icon} size={24} />
              </div>
              <div className="w-full truncate text-[12.5px] font-medium">{file.name}</div>
              <div className="text-[11px] text-white/40">{file.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}