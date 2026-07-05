// Path data ported exactly from project/Nova OS.dc.html's icon() function.
// Grown incrementally as each phase needs more of the source registry —
// Phase 1 added lock/wifi/battery/arrow; Phase 2 adds the desktop shell
// and workspace-app icons. AI/notification/search-only icons (mic, vol,
// moon, bt, msg) stay out until Phase 7/8 actually use them.

export type IconName =
  | 'lock'
  | 'wifi'
  | 'battery'
  | 'arrow'
  | 'home'
  | 'files'
  | 'terminal'
  | 'browser'
  | 'music'
  | 'cal'
  | 'settings'
  | 'sparkle'
  | 'search'
  | 'bell'
  | 'grid'
  | 'power'
  | 'sun'
  | 'cloud'
  | 'cpu'
  | 'folder'
  | 'cloudicon'
  | 'shield'
  | 'user'
  | 'doc'
  | 'img'
  | 'code';

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
    case 'home':
      return (
        <>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5.5 9.5V20h13V9.5" />
        </>
      );
    case 'files':
    case 'folder':
      return <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2.2h8.5A1.5 1.5 0 0 1 21 9.7V18a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18z" />;
    case 'doc':
      return (
        <>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v4h4" />
        </>
      );
    case 'img':
      return (
        <>
          <rect x={4} y={5} width={16} height={14} rx={2} />
          <circle cx={9} cy={10} r={1.6} />
          <path d="M5 17l4-4 3 3 3-4 4 5" />
        </>
      );
    case 'code':
      return (
        <>
          <path d="M8 8l-4 4 4 4" />
          <path d="M16 8l4 4-4 4" />
        </>
      );
    case 'terminal':
      return (
        <>
          <rect x={3} y={4} width={18} height={16} rx={2.5} />
          <path d="M7 9l3 3-3 3" />
          <path d="M13 15h4" />
        </>
      );
    case 'browser':
      return (
        <>
          <circle cx={12} cy={12} r={9} />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 2.6 2.5 15.4 0 18" />
          <path d="M12 3c-2.5 2.6-2.5 15.4 0 18" />
        </>
      );
    case 'music':
      return (
        <>
          <path d="M9 17V6l10-2v11" />
          <circle cx={6} cy={17} r={2.5} />
          <circle cx={16} cy={15} r={2.5} />
        </>
      );
    case 'cal':
      return (
        <>
          <rect x={3} y={5} width={18} height={16} rx={2.5} />
          <path d="M3 9h18" />
          <path d="M8 3v4" />
          <path d="M16 3v4" />
        </>
      );
    case 'settings':
      return (
        <>
          <circle cx={12} cy={12} r={3.2} />
          <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
        </>
      );
    case 'sparkle':
      return <path d="M12 3.5l1.8 5.4 5.4 1.8-5.4 1.8L12 17.9l-1.8-5.4L4.8 10.7l5.4-1.8z" />;
    case 'search':
      return (
        <>
          <circle cx={11} cy={11} r={6.5} />
          <path d="M16 16l4.5 4.5" />
        </>
      );
    case 'bell':
      return (
        <>
          <path d="M6.5 16V11a5.5 5.5 0 0 1 11 0v5l1.5 2.5h-14z" />
          <path d="M10 19.5a2 2 0 0 0 4 0" />
        </>
      );
    case 'grid':
      return (
        <>
          <rect x={4} y={4} width={7} height={7} rx={1.6} />
          <rect x={13} y={4} width={7} height={7} rx={1.6} />
          <rect x={4} y={13} width={7} height={7} rx={1.6} />
          <rect x={13} y={13} width={7} height={7} rx={1.6} />
        </>
      );
    case 'power':
      return (
        <>
          <path d="M12 3v8" />
          <path d="M6.5 6.5a8 8 0 1 0 11 0" />
        </>
      );
    case 'sun':
      return (
        <>
          <circle cx={12} cy={12} r={4} />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19" />
        </>
      );
    case 'cloud':
      return <path d="M7 17a4 4 0 0 1 .5-8 5.5 5.5 0 0 1 10.5 1.5A3.5 3.5 0 0 1 17 17z" />;
    case 'cpu':
      return (
        <>
          <rect x={7} y={7} width={10} height={10} rx={2} />
          <path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3" />
        </>
      );
    case 'cloudicon':
      return <path d="M7 18a4 4 0 0 1 .5-8 5.5 5.5 0 0 1 10.5 1.5A3.5 3.5 0 0 1 17 18z" />;
    case 'shield':
      return <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />;
    case 'user':
      return (
        <>
          <circle cx={12} cy={8} r={4} />
          <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
        </>
      );
    default:
      return null;
  }
}