interface RustCrabProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export function RustCrab({ className = "", size = 48, style }: RustCrabProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <ellipse cx="64" cy="72" rx="38" ry="28" fill="#CE422B" />
      <ellipse cx="64" cy="68" rx="30" ry="22" fill="#E85D3A" />
      <circle cx="48" cy="58" r="6" fill="#1a1a1a" />
      <circle cx="80" cy="58" r="6" fill="#1a1a1a" />
      <circle cx="50" cy="56" r="2" fill="#fff" />
      <circle cx="82" cy="56" r="2" fill="#fff" />
      <path d="M58 78 Q64 84 70 78" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M26 60 L8 44 L12 68 Z" fill="#CE422B" />
      <path d="M102 60 L120 44 L116 68 Z" fill="#CE422B" />
      <path d="M30 82 L14 96 L22 104 Z" fill="#CE422B" />
      <path d="M98 82 L114 96 L106 104 Z" fill="#CE422B" />
      <path d="M38 96 L28 118 L44 110 Z" fill="#CE422B" />
      <path d="M90 96 L100 118 L84 110 Z" fill="#CE422B" />
      <path d="M52 96 L48 112 L58 108 Z" fill="#CE422B" />
      <path d="M76 96 L80 112 L70 108 Z" fill="#CE422B" />
    </svg>
  );
}
