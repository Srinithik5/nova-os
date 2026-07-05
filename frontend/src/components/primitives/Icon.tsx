// Path data ported exactly from project/Nova OS.dc.html's icon() function —
// only the names Phase 1 actually uses. More are added here as later phases
// need them (blueprint §2's primitives layer).

export type IconName = 'lock' | 'wifi' | 'battery' | 'arrow';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {renderIconPaths(name)}
    </svg>
  );
}

function renderIconPaths(name: IconName) {
  switch (name) {
    case 'lock':
      return (
        <>
          <rect x={5} y={10} width={14} height={10} rx={2.5} />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </>
      );
    case 'wifi':
      return (
        <>
          <path d="M4 9c4.5-4 11.5-4 16 0" />
          <path d="M7 12c3-2.6 7-2.6 10 0" />
          <path d="M10 15c1.2-1 2.8-1 4 0" />
          <circle cx={12} cy={18} r={0.6} />
        </>
      );
    case 'battery':
      return (
        <>
          <rect x={3} y={8} width={16} height={9} rx={2} />
          <path d="M21 11v3" />
          <rect x={5} y={10} width={9} height={5} rx={1} fill="currentColor" stroke="none" />
        </>
      );
    case 'arrow':
      return (
        <>
          <path d="M5 12h13" />
          <path d="M13 6l6 6-6 6" />
        </>
      );
    default:
      return null;
  }
}