import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ProgressBarProps {
  percent: number;
  glow?: boolean;
  trackClassName?: string;
}

// The blue gradient meter reused across system stats, storage usage, and
// music playback (project/Nova OS.dc.html's repeated
// `linear-gradient(90deg,#57a9ff,#7cc0ff)` track). twMerge (not clsx) for
// the track height so a caller's override actually replaces the default
// instead of both classes landing in the DOM and racing in the cascade.
export function ProgressBar({ percent, glow = true, trackClassName }: ProgressBarProps) {
  return (
    <div className={twMerge('h-1.5 rounded-full bg-white/[0.08]', trackClassName)}>
      <div
        className={clsx(
          'h-full rounded-full bg-[linear-gradient(90deg,#57a9ff,#7cc0ff)]',
          glow && 'shadow-[0_0_12px_rgba(87,169,255,0.6)]'
        )}
        style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
      />
    </div>
  );
}