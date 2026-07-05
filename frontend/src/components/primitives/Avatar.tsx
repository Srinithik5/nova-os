import clsx from 'clsx';

interface AvatarProps {
  initials: string;
  size?: number;
  textClassName?: string;
  glow?: boolean;
  className?: string;
}

// Gradient-ring avatar from the Login screen (project/Nova OS.dc.html
// lines 60-62) and reused by the sidebar/settings identity chip in later
// phases — kept generic (size, glow) rather than hardcoded to one usage.
export function Avatar({ initials, size = 44, textClassName = 'text-sm', glow = false, className }: AvatarProps) {
  return (
    <div
      className={clsx(
        'rounded-full bg-[linear-gradient(140deg,#57a9ff,#7a56ff)] p-[2px]',
        glow && 'shadow-[0_0_50px_rgba(87,169,255,0.4)]',
        className
      )}
      style={{ width: size, height: size }}
    >
      <div
        className={clsx(
          'flex h-full w-full items-center justify-center rounded-full bg-[#0a1020] font-display font-semibold text-nova-blue-pale',
          textClassName
        )}
      >
        {initials}
      </div>
    </div>
  );
}