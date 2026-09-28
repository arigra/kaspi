// A landscape strip for each region. viewBox 360×140, ground at y≈112.
const Tree = ({ x, y = 112, s = 1, c = '#5aa469' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><rect x="-3" y="-22" width="6" height="22" fill="#7a5230" /><circle cy="-30" r="16" fill={c} /><circle cx="-10" cy="-24" r="10" fill={c} /><circle cx="10" cy="-24" r="10" fill={c} /></g>
)
const Palm = ({ x, y = 104, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 0 q-4 -30 4 -52" stroke="#8a6a3a" strokeWidth="6" fill="none" strokeLinecap="round" />
    {[-60, -20, 20, 60, 100].map((a) => <path key={a} d="M4 -52 q20 -8 34 6" stroke="#3f9a5a" strokeWidth="7" fill="none" strokeLinecap="round" transform={`rotate(${a} 4 -52)`} />)}
  </g>
)
const House = ({ x, roof = '#c0503a', w = 50 }) => (
  <g transform={`translate(${x} 112)`}><rect x="0" y={-w * 0.7} width={w} height={w * 0.7} fill="#fbf4e6" stroke="#e3d7bd" /><path d={`M-6 ${-w * 0.66} L${w / 2} ${-w * 1.15} L${w + 6} ${-w * 0.66}z`} fill={roof} /><rect x={w * 0.4} y={-w * 0.36} width={w * 0.2} height={w * 0.36} fill="#7a4d2e" /><rect x={w * 0.1} y={-w * 0.55} width={w * 0.2} height={w * 0.16} fill="#9fd3e6" /><rect x={w * 0.7} y={-w * 0.55} width={w * 0.2} height={w * 0.16} fill="#9fd3e6" /></g>
)
const Building = ({ x, w, h, c }) => (
  <g transform={`translate(${x} 112)`}><rect x="0" y={-h} width={w} height={h} fill={c} />
    {Array.from({ length: Math.floor(h / 16) - 1 }, (_, r) => Array.from({ length: Math.floor(w / 12) }, (_, k) => (
      <rect key={`${r}-${k}`} x={4 + k * 12} y={-h + 8 + r * 16} width="6" height="8" fill="#fff6c9" opacity={(r + k) % 3 ? 0.9 : 0.35} />)))}
  </g>
)

export default function RegionArt({ kind, className = '' }) {
  const box = (bg, ground, children) => (
    <svg className={`region-art ${className}`} viewBox="0 0 360 140" preserveAspectRatio="xMidYMax slice" width="100%" height="100%" aria-hidden="true">
      <rect width="360" height="140" fill={bg} />
      {children}
      <rect y="110" width="360" height="30" fill={ground} />
    </svg>
  )
  if (kind === 'hood') return box('#f7ecd4', '#e3cf9f', <>
    <circle cx="300" cy="30" r="16" fill="#ffd98a" />
    <path d="M20 112 L20 70 L70 60 L80 112z" fill="#b8a37a" /><path d="M14 72 L74 58" stroke="#8a7a5a" strokeWidth="5" />
    <rect x="44" y="84" width="16" height="28" fill="#7a5a3a" />
    <path d="M110 70 L190 64" stroke="#8a7a5a" strokeWidth="1.5" /><rect x="124" y="68" width="12" height="16" fill="#e0344b" /><rect x="150" y="66" width="14" height="14" fill="#3f7fc9" /><rect x="172" y="65" width="10" height="18" fill="#f2c14e" />
    <rect x="220" y="92" width="60" height="6" fill="#8a6a4a" /><rect x="220" y="84" width="60" height="5" fill="#8a6a4a" /><path d="M226 98 v14 M274 98 v14" stroke="#555" strokeWidth="3" />
    <rect x="300" y="88" width="20" height="24" rx="3" fill="#6b8a5c" /><rect x="298" y="84" width="24" height="6" rx="2" fill="#56734a" />
    <g transform="translate(336 104)"><ellipse rx="9" ry="6" fill="#444" /><circle cx="-8" cy="-6" r="5" fill="#444" /><path d="M-11 -10 l1 -4 l2 3z M-6 -10 l1 -4 l2 3z" fill="#444" /><path d="M8 0 q8 -4 6 -12" stroke="#444" strokeWidth="2.5" fill="none" /></g>
  </>)
  if (kind === 'city') return box('#eaf0f5', '#b9c2c9', <>
    <Building x={8} w={48} h={80} c="#9fb0c0" /><Building x={60} w={60} h={96} c="#8499ad" /><Building x={124} w={40} h={64} c="#aebccb" />
    <Building x={250} w={50} h={88} c="#8fa3b6" /><Building x={304} w={52} h={70} c="#a7b6c5" />
    <rect x="176" y="80" width="60" height="4" fill="#3f7fc9" /><path d="M180 84 v28 M232 84 v28" stroke="#3f7fc9" strokeWidth="3" /><rect x="186" y="88" width="40" height="14" fill="#fff" stroke="#3f7fc9" /><text x="206" y="99" textAnchor="middle" fontSize="9" fill="#3f7fc9" fontWeight="900">תחנה</text>
    <path d="M0 122 H360" stroke="#fff" strokeWidth="2" strokeDasharray="14 10" />
  </>)
  if (kind === 'suburbs') return box('#eef7e9', '#9ccf8e', <>
    <circle cx="60" cy="28" r="15" fill="#ffe29a" />
    <House x={20} /><Tree x={100} /><House x={130} roof="#3f7fc9" w={56} /><Tree x={212} s={1.2} c="#4f9a5e" /><House x={240} roof="#d8784a" /><Tree x={320} s={0.9} />
    <path d="M0 108 H360" stroke="#fff" strokeWidth="2" strokeDasharray="3 6" />
  </>)
  if (kind === 'market') return box('#eef0fa', '#c3c8d8', <>
    <Building x={10} w={40} h={100} c="#6f86b6" /><Building x={54} w={54} h={120} c="#566ea3" /><Building x={112} w={38} h={86} c="#7d93c0" />
    <Building x={216} w={50} h={110} c="#5f77ab" /><Building x={270} w={42} h={92} c="#7489b8" /><Building x={316} w={40} h={104} c="#6a80b2" />
    <rect x="152" y="46" width="62" height="20" rx="4" fill="#1d2430" />
    <text x="183" y="60" textAnchor="middle" fontSize="10" fontWeight="900" fill="#6ee7a0" direction="ltr">▲ 1.2%</text>
    <path d="M160 100 l10 -12 l10 6 l12 -16 l12 8" stroke="#2f6e4b" strokeWidth="3" fill="none" />
  </>)
  // island
  return box('#e6f6f9', '#e8d9ae', <>
    <circle cx="300" cy="30" r="16" fill="#ffd98a" />
    <rect y="92" width="360" height="22" fill="#6fbfd3" />
    <path d="M0 98 q20 -4 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#fff" strokeWidth="2" fill="none" opacity=".6" />
    <g transform="translate(40 88)"><path d="M0 0 h60 l-8 10 h-44z" fill="#fff" stroke="#c9d6de" /><rect x="14" y="-10" width="30" height="10" rx="2" fill="#f4f7fa" /></g>
    <Palm x={200} /><Palm x={250} s={1.2} /><Palm x={320} s={0.9} />
  </>)
}
