// Identical on both boot screens (project/Nova OS.dc.html lines 43 and 59) —
// extracted once rather than duplicated between LockScreen and LoginScreen.
export function BootBrandMark() {
  return (
    <div className="absolute inset-x-0 top-[34px] flex items-center justify-center gap-2 text-[13px] font-semibold uppercase tracking-[.16em] text-white/55">
      <span className="text-nova-blue">◆</span> Nova&nbsp;OS
    </div>
  );
}