import type { ReactNode } from 'react';

interface AmbientBackgroundProps {
  children: ReactNode;
}

// The ambient-glow background from project/Nova OS.dc.html (lines 33-38).
// The source design renders these three blobs once, behind whichever
// screen is active (lock, login, or desktop) — not per-screen — so this
// wraps every route group's layout rather than living inside a screen.
export function AmbientBackground({ children }: AmbientBackgroundProps) {
  return (
    <div className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[radial-gradient(140%_120%_at_20%_0%,#0a1428_0%,#060a15_45%,#04060c_100%)] font-body text-white/[0.92]">
      <div
        className="pointer-events-none absolute -top-[12%] left-[8%] h-[60%] w-[46%] animate-nova-float rounded-full bg-[radial-gradient(circle,rgba(58,132,255,0.22),transparent_65%)] blur-[30px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-[18%] right-[2%] h-[64%] w-[50%] animate-nova-float2 rounded-full bg-[radial-gradient(circle,rgba(120,86,255,0.16),transparent_65%)] blur-[30px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[26%] top-[30%] h-[40%] w-[30%] animate-[novaFloat_26s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(45,220,255,0.10),transparent_60%)] blur-[40px]"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}