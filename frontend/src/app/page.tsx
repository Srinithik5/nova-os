'use client';

import { useEffect, useState } from 'react';
import { getHealth, type HealthResponse } from '@/lib/api';

type ConnState =
  | { phase: 'checking' }
  | { phase: 'ok'; data: HealthResponse }
  | { phase: 'error'; message: string };

// Phase 0 foundation check only — this is not a Nova OS screen. Lock,
// Login, and the desktop shell arrive in later phases (blueprint §14).
// This page's only job is to prove the token pipeline (Tailwind config →
// rendered pixels) and the frontend → backend round trip both work.
export default function FoundationStatusPage() {
  const [conn, setConn] = useState<ConnState>({ phase: 'checking' });

  useEffect(() => {
    getHealth()
      .then((data) => setConn({ phase: 'ok', data }))
      .catch((err: unknown) =>
        setConn({
          phase: 'error',
          message: err instanceof Error ? err.message : 'Unknown error',
        })
      );
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(140%_120%_at_20%_0%,#0a1428_0%,#060a15_45%,#04060c_100%)] px-6 font-body text-white/90">
      <div
        className="pointer-events-none absolute -left-[10%] -top-[12%] h-[60%] w-[46%] animate-nova-float rounded-full bg-[radial-gradient(circle,rgba(58,132,255,0.22),transparent_65%)] blur-[30px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-[18%] right-[2%] h-[64%] w-[50%] animate-nova-float2 rounded-full bg-[radial-gradient(circle,rgba(120,86,255,0.16),transparent_65%)] blur-[30px]"
        aria-hidden
      />

      <div className="relative w-full max-w-md animate-nova-pop rounded-22 border border-white/10 bg-white/[0.05] p-8 [backdrop-filter:blur(30px)_saturate(140%)]">
        <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[.16em] text-white/55">
          <span className="text-nova-blue">◆</span> Nova&nbsp;OS
        </div>
        <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight">
          Phase 0 — Foundation
        </h1>
        <p className="mt-2 text-sm text-white/55">
          frontend/ is up. Checking the connection to backend/…
        </p>

        <div className="mt-6 flex items-center gap-3 rounded-14 border border-white/10 bg-white/[0.04] px-4 py-3">
          <span
            className={
              'h-2.5 w-2.5 flex-none rounded-full ' +
              (conn.phase === 'ok'
                ? 'bg-nova-mint shadow-[0_0_8px_#6effc0]'
                : conn.phase === 'error'
                  ? 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]'
                  : 'animate-nova-pulse bg-nova-blue')
            }
          />
          {conn.phase === 'checking' && (
            <span className="text-sm text-white/70">Contacting backend…</span>
          )}
          {conn.phase === 'ok' && (
            <span className="text-sm text-white/85">
              Connected — <span className="text-nova-blue-soft">{conn.data.service}</span> ·{' '}
              {new Date(conn.data.timestamp).toLocaleTimeString()}
            </span>
          )}
          {conn.phase === 'error' && (
            <span className="text-sm text-red-300">{conn.message}</span>
          )}
        </div>

        <p className="mt-5 text-xs leading-relaxed text-white/40">
          This page proves the Tailwind token pipeline and the frontend → backend
          proxy work. Lock, Login, and the desktop shell are built starting Phase 1.
        </p>
      </div>
    </main>
  );
}