'use client';

import type { ReactNode } from 'react';
import { GlassPanel } from '@/components/primitives/GlassPanel';
import { TrafficDots } from '@/components/primitives/TrafficDots';
import { useWindowManager } from '@/stores/windowManager';

function PromptLine({ command }: { command: string }) {
  return (
    <div>
      <span className="text-nova-blue">nova@core</span>
      <span className="text-white/40">:</span>
      <span className="text-nova-violet">~</span>
      {'$ '}
      {command}
    </div>
  );
}

// Pixel/content match for project/Nova OS.dc.html lines 210-229 — a
// scripted transcript, not a live shell. Wiring real command execution is
// deferred to Phase 6 behind a sandboxed, fixed verb set (see the
// blueprint's Terminal decision box) rather than arbitrary code execution.
export function TerminalApp() {
  const openHome = useWindowManager((s) => s.openHome);

  return (
    <GlassPanel className="h-full animate-nova-pop bg-[rgba(6,10,18,0.72)] [backdrop-filter:blur(30px)]">
      <div className="flex h-11 flex-none items-center gap-3 border-b border-white/[0.06] px-4">
        <TrafficDots onClose={openHome} />
        <div className="ml-1.5 font-mono text-[13px] text-white/50">nova@core — zsh</div>
      </div>
      <div className="flex-1 overflow-auto p-5 font-mono text-[13.5px] leading-[1.9] text-[rgba(200,220,255,0.85)]">
        <PromptLine command="nova status" />
        <Line color="#6effc0">✓ Nova kernel 4.2.1 — online · uptime 12d 4h</Line>
        <Line>
          {'  neural core .......... '}
          <span className="text-nova-mint">active</span>
          {'  ·  latency 8ms'}
        </Line>
        <Line>
          {'  security mesh ........ '}
          <span className="text-nova-mint">encrypted</span>
        </Line>
        <div className="mt-1.5">
          <PromptLine command="nova deploy --env prod" />
        </div>
        <Line>
          {'  → building assistant graph ... '}
          <span className="text-nova-mint">done</span>
        </Line>
        <Line>
          {'  → pushing 4 modules ......... '}
          <span className="text-nova-mint">ok</span>
        </Line>
        <Line color="#8fc0ff">{'  deployment live at nova://prod'}</Line>
        <div className="mt-1.5">
          <span className="text-nova-blue">nova@core</span>
          <span className="text-white/40">:</span>
          <span className="text-nova-violet">~</span>
          {'$ '}
          <span className="inline-block h-[17px] w-[9px] animate-nova-blink bg-nova-blue align-middle shadow-[0_0_8px_rgba(87,169,255,0.8)]" />
        </div>
      </div>
    </GlassPanel>
  );
}

function Line({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <div className={color ? undefined : 'text-white/60'} style={color ? { color } : undefined}>
      {children}
    </div>
  );
}