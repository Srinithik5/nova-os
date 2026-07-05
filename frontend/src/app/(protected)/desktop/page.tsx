import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nova OS — Desktop',
};

// Temporary placeholder — the real desktop shell (menu bar, sidebar, dock,
// workspace, home widgets) is built in Phase 2 (blueprint §14). This
// page's only job in Phase 1 is to be a valid landing point after login,
// so the lock → login → desktop flow is fully navigable and testable.
export default function DesktopPlaceholderPage() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[.16em] text-white/55">
        <span className="text-nova-blue">◆</span> Nova&nbsp;OS
      </div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        You&rsquo;re in — the desktop shell arrives in Phase 2
      </h1>
      <p className="max-w-md text-sm text-white/55">
        Lock, Login, and this landing route are the whole of Phase 1. The menu bar,
        sidebar, dock, and home widgets are built next.
      </p>
      <Link
        href="/lock"
        className="mt-2 rounded-12 border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10"
      >
        Back to Lock
      </Link>
    </div>
  );
}