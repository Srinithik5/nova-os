import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface GlassPanelProps {
  className?: string;
  children: ReactNode;
}

// Shared frame for every app window (project/Nova OS.dc.html's repeated
// `border-radius:22px; backdrop-filter:blur(30px) saturate(140%); border:
// 1px solid rgba(255,255,255,0.09)` pattern). Background, animation, and
// flex direction vary per call site (Music runs flex-row, everything else
// flex-col), so twMerge — not clsx — is used to combine them: it resolves
// same-property class conflicts (e.g. a caller's `flex-row` correctly
// replacing the default `flex-col`) instead of leaving both in the DOM to
// race in the cascade.
export function GlassPanel({ className, children }: GlassPanelProps) {
  return (
    <div
      className={twMerge(
        'flex flex-col overflow-hidden rounded-22 border border-white/[0.09] [backdrop-filter:blur(30px)_saturate(140%)]',
        className
      )}
    >
      {children}
    </div>
  );
}