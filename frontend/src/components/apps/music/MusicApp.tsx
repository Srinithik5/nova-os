'use client';

import clsx from 'clsx';
import { Icon } from '@/components/primitives/Icon';
import { GlassPanel } from '@/components/primitives/GlassPanel';

const PLAYLISTS = [
  { label: 'Focus Flow', active: true },
  { label: 'Neon Nights' },
  { label: 'Deep Work' },
  { label: 'Ambient AI' },
];

const TRACKS = [
  { n: 1, title: 'Neon Horizon', duration: '4:12', playing: true },
  { n: 2, title: 'Circuit Dreams', duration: '3:48' },
  { n: 3, title: 'Parallax', duration: '5:02' },
  { n: 4, title: 'Deep Signal', duration: '4:31' },
  { n: 5, title: 'Afterglow', duration: '3:55' },
];

// Pixel match for project/Nova OS.dc.html lines 257-301. Playlists, the
// track list, and the transport controls are decorative in the source
// design — no onClick on any of them there either. Real playback and
// persisted "now playing" arrive in Phase 5.
export function MusicApp() {
  return (
    <GlassPanel className="h-full animate-nova-pop flex-row bg-white/[0.04]">
      <div className="flex w-[230px] flex-none flex-col gap-1 overflow-auto border-r border-white/[0.06] px-3 py-[18px]">
        <div className="flex items-center gap-2 px-2.5 py-1.5 font-display text-[15px] font-semibold">
          <Icon name="music" size={18} /> Library
        </div>
        <div className="px-2.5 pb-1 pt-2.5 text-[11px] uppercase tracking-[.12em] text-white/35">Playlists</div>
        {PLAYLISTS.map((playlist) => (
          <div
            key={playlist.label}
            className={clsx(
              'rounded-10 px-2.5 py-2 text-[13.5px] transition-colors hover:bg-white/[0.06]',
              playlist.active ? 'bg-[rgba(87,169,255,0.14)] text-nova-blue-pale' : 'text-white/70'
            )}
          >
            {playlist.label}
          </div>
        ))}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex-1 overflow-auto p-6">
          <div className="flex flex-wrap items-end gap-[22px]">
            <div className="relative h-[180px] w-[180px] flex-none overflow-hidden rounded-20 bg-[repeating-linear-gradient(135deg,#1a2a4a,#1a2a4a_8px,#22355c_8px,#22355c_16px)] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(87,169,255,0.25),transparent)]" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[.14em] text-nova-blue-soft">Now Playing</div>
              <div className="mt-1.5 font-display text-[38px] font-semibold tracking-[-0.02em]">Neon Horizon</div>
              <div className="mt-0.5 text-base text-white/55">Aeon Drift · Parallax</div>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-0.5">
            {TRACKS.map((track) => (
              <div
                key={track.n}
                className={clsx(
                  'flex items-center gap-3.5 rounded-12 px-3 py-2.5 transition-colors hover:bg-white/5',
                  track.playing ? 'bg-[rgba(87,169,255,0.1)] text-nova-blue-soft' : 'text-white/85'
                )}
              >
                <span className="w-5 text-[13px] text-white/40">{track.n}</span>
                <span className="flex-1 text-sm font-medium">{track.title}</span>
                <span className="text-[13px] text-white/40">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-none items-center gap-[18px] border-t border-white/[0.06] px-6 py-4">
          <div className="flex items-center gap-4 text-white/70">
            <span className="cursor-pointer">⏮</span>
            <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[linear-gradient(140deg,#7cc0ff,#57a9ff)] text-[15px] text-nova-bg shadow-glow">
              ▶
            </div>
            <span className="cursor-pointer">⏭</span>
          </div>
          <div className="flex flex-1 items-center gap-3">
            <span className="text-xs tabular-nums text-white/40">1:47</span>
            <div className="relative h-[5px] flex-1 rounded-[5px] bg-white/10">
              <div className="h-full w-[42%] rounded-[5px] bg-[linear-gradient(90deg,#57a9ff,#7cc0ff)] shadow-[0_0_10px_rgba(87,169,255,0.7)]" />
              <div className="absolute left-[42%] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(87,169,255,0.8)]" />
            </div>
            <span className="text-xs tabular-nums text-white/40">4:12</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}