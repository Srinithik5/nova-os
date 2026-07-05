import clsx from 'clsx';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

// The pill switch used by Settings (project/Nova OS.dc.html lines 346,
// 404) — track 48x28px, thumb 22px, matching the source exactly.
export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={clsx(
        'flex h-7 w-12 flex-none items-center rounded-16 p-[3px] transition-colors duration-200',
        checked ? 'justify-end bg-[linear-gradient(90deg,#57a9ff,#7cc0ff)]' : 'justify-start bg-white/[0.12]'
      )}
    >
      <span className="h-[22px] w-[22px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.3)]" />
    </button>
  );
}