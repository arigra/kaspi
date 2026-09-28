// Things in the hero's world, unlocked chapter by chapter.

export function SharkGirl({ skin = '#f3b3c8', deep = '#d9829f', bikini = '#e0344b', cocktail = false, flip = false }) {
  const id = 'sg' + skin.slice(1)
  return (
    <svg className={`gf ${flip ? 'flip' : ''}`} viewBox="0 0 200 330" width="100%" height="100%" aria-hidden="true">
      <defs><radialGradient id={id} cx="45%" cy="35%" r="70%"><stop offset="0" stopColor={skin} /><stop offset="1" stopColor={deep} /></radialGradient></defs>
      <ellipse cx="100" cy="322" rx="54" ry="7" fill="#000" opacity=".12" />
      <path d="M126 244 q36 4 46 -24 q-4 32 14 44 q-32 4 -60 -8z" fill={deep} />
      {/* legs */}
      <path d="M76 236 q-10 40 -4 80 h12 q4 -40 12 -78z M110 238 q10 38 6 78 h12 q6 -40 -4 -80z" fill={`url(#${id})`} />
      <path d="M64 318 h24 l-6 -10z M112 318 h24 l-6 -10z" fill={bikini} /><path d="M84 308 v12 M130 308 v12" stroke={bikini} strokeWidth="3" />
      {/* body: hourglass */}
      <path d="M74 146 q26 -12 52 0 q10 30 -2 50 q20 24 10 50 q-34 12 -68 0 q-10 -26 10 -50 q-12 -20 -2 -50z" fill={`url(#${id})`} />
      <path d="M86 180 q14 10 28 0 q6 30 -2 52 q-12 4 -24 0 q-8 -22 -2 -52z" fill="#fdeef2" opacity=".7" />
      {/* bikini */}
      <path d="M78 166 q10 -10 20 2 q-2 12 -20 8z M122 166 q-10 -10 -20 2 q2 12 20 8z" fill={bikini} />
      <path d="M86 158 l12 -12 M114 158 l-12 -12" stroke={bikini} strokeWidth="2" />
      <path d="M72 226 q28 10 56 0 q-10 16 -28 18 q-18 -2 -28 -18z" fill={bikini} />
      {/* arms */}
      <path d="M76 154 q-24 18 -12 44 q8 6 14 -4 q-10 -14 2 -30z" fill={`url(#${id})`} />
      <g className="gf-wave">
        <path d="M124 154 q26 -8 32 -34 q2 -10 -8 -8 q-8 22 -28 26z" fill={`url(#${id})`} />
        {cocktail && <g transform="translate(150 104)"><path d="M-12 -12 h24 l-12 16z" fill="#ff8ab0" stroke="#fff" strokeWidth="1.5" /><path d="M0 4 v12 M-6 16 h12" stroke="#fff" strokeWidth="2" /><circle cx="8" cy="-14" r="3.5" fill="#e0344b" /><path d="M-2 -12 l10 -12" stroke="#ffd166" strokeWidth="2" /></g>}
      </g>
      {/* head */}
      <path d="M100 26 q-54 0 -64 58 q-2 38 28 52 q36 12 72 0 q30 -14 28 -52 q-10 -58 -64 -58z" fill={`url(#${id})`} />
      <path d="M96 28 q10 -26 30 -24 q-10 14 -12 30z" fill={deep} />
      <path d="M58 110 q42 30 84 0 q-4 26 -42 30 q-38 -4 -42 -30z" fill="#fdeef2" />
      <g className="gf-eyes">
        <ellipse cx="80" cy="82" rx="13" ry="15" fill="#fff" /><ellipse cx="120" cy="82" rx="13" ry="15" fill="#fff" />
        <circle cx="82" cy="85" r="6.5" fill="#3a2230" /><circle cx="118" cy="85" r="6.5" fill="#3a2230" />
        <circle cx="84" cy="82" r="2" fill="#fff" /><circle cx="120" cy="82" r="2" fill="#fff" />
        <path d="M67 76 q13 -10 26 0 M107 76 q13 -10 26 0" fill={deep} />
      </g>
      <path d="M66 70 l-7 -7 M70 67 l-4 -9 M76 66 l0 -9 M134 70 l7 -7 M130 67 l4 -9 M124 66 l0 -9" stroke="#3a2230" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M84 114 q16 12 32 0 q-6 12 -16 12 q-10 0 -16 -12z" fill="#e0344b" />
      <circle cx="64" cy="102" r="6" fill="#f08aa5" opacity=".6" /><circle cx="136" cy="102" r="6" fill="#f08aa5" opacity=".6" />
      <circle cx="140" cy="140" r="0" />
      <g><rect x="62" y="44" width="30" height="16" rx="7" fill="#2a1d25" /><rect x="108" y="44" width="30" height="16" rx="7" fill="#2a1d25" /><path d="M92 52 h16" stroke="#2a1d25" strokeWidth="3" /></g>
      <path className="gf-heart" d="M166 38s-12-7-12-15a6 6 0 0 1 12-3 6 6 0 0 1 12 3c0 8-12 15-12 15z" fill="#e0344b" />
    </svg>
  )
}

const Wheel = ({ x, y, r = 16 }) => (
  <g className="wheel"><circle cx={x} cy={y} r={r} fill="#1d1d1d" /><circle cx={x} cy={y} r={r * 0.45} fill="#c9c9c9" /><path d={`M${x} ${y - r * 0.45} v${r * 0.9} M${x - r * 0.45} ${y} h${r * 0.9}`} stroke="#888" strokeWidth="2" /></g>
)

export function Vehicle({ kind }) {
  const box = (children, vb = '0 0 260 110') => <svg className="car" viewBox={vb} width="100%" height="100%" aria-hidden="true"><ellipse cx="130" cy="102" rx="110" ry="6" fill="#000" opacity=".12" />{children}</svg>
  if (kind === 'bike') return box(<><circle cx="80" cy="80" r="24" fill="none" stroke="#333" strokeWidth="4" /><circle cx="180" cy="80" r="24" fill="none" stroke="#333" strokeWidth="4" /><path d="M80 80 l40 -40 h44 l16 40 M120 40 l22 40 h38 M164 40 l-6 -14 h14" stroke="#3a8fd0" strokeWidth="5" fill="none" strokeLinejoin="round" /><path d="M110 36 h22" stroke="#333" strokeWidth="6" strokeLinecap="round" /></>)
  if (kind === 'scooter') return box(<><path d="M70 84 q-8 -34 30 -40 h40 q10 0 12 10 l6 30z" fill="#6fc2b8" /><path d="M160 84 l14 -52 h10 l-10 52z" fill="#5aa99f" /><path d="M150 28 h40" stroke="#333" strokeWidth="6" strokeLinecap="round" /><rect x="84" y="36" width="50" height="10" rx="5" fill="#5a3a22" /><circle cx="188" cy="44" r="5" fill="#ffe29a" /><path d="M60 84 h130" stroke="#5aa99f" strokeWidth="8" strokeLinecap="round" /><Wheel x={82} y={90} r={13} /><Wheel x={184} y={90} r={13} /></>)
  if (kind === 'oldcar') return box(<><path d="M18 78 q0 -16 20 -20 l24 -4 q14 -26 60 -26 q40 0 58 26 l30 4 q18 4 18 20 l-2 10 h-206z" fill="#b8b09a" /><path d="M72 54 q12 -20 50 -20 q32 0 46 20z" fill="#bfe0ea" stroke="#8f887a" strokeWidth="3" /><path d="M120 34 v20" stroke="#8f887a" strokeWidth="3" /><path d="M130 58 h40 v26 h-40z" fill="#8fb4c9" /><rect x="30" y="66" width="10" height="7" fill="#ffe29a" /><Wheel x={62} y={88} /><Wheel x={196} y={88} /></>)
  if (kind === 'convertible') return box(<><path d="M12 76 q0 -18 30 -22 l150 -2 q40 2 50 22 l-2 14 h-226z" fill="#2f7fd0" /><path d="M96 54 l18 -22 M100 54 l20 -18" stroke="#bfe0ea" strokeWidth="4" /><rect x="228" y="64" width="14" height="8" rx="3" fill="#ffe29a" /><Wheel x={60} y={88} r={17} /><Wheel x={200} y={88} r={17} /></>)
  if (kind === 'sports') return box(<><path d="M10 76 q0 -18 30 -22 l40 -6 q24 -22 60 -22 q34 0 56 20 l40 6 q20 4 18 24 l-2 12 h-240z" fill="#d7263d" /><path d="M86 48 q20 -16 52 -16 q26 0 44 14z" fill="#9fd3e6" stroke="#b01d31" strokeWidth="3" /><rect x="230" y="66" width="16" height="8" rx="3" fill="#ffe29a" /><Wheel x={62} y={88} r={18} /><Wheel x={200} y={88} r={18} /></>)
  // lambo
  return box(<><path d="M6 84 l30 -26 l70 -14 q30 -18 70 -14 l70 26 q10 4 8 20 l-2 8 h-246z" fill="#f5c518" /><path d="M96 48 l40 -16 q30 -2 48 10 l-6 12z" fill="#2a2a30" /><path d="M20 76 h60 M170 70 h60" stroke="#c99c00" strokeWidth="3" /><rect x="234" y="70" width="14" height="6" rx="2" fill="#fff" /><Wheel x={62} y={90} r={17} /><Wheel x={204} y={90} r={17} /></>)
}

export function Home({ kind }) {
  const box = (c) => <svg viewBox="0 0 200 150" width="100%" height="100%" aria-hidden="true">{c}</svg>
  if (kind === 'bench') return box(<><rect x="40" y="110" width="120" height="10" fill="#8a6a4a" /><rect x="40" y="94" width="120" height="8" fill="#8a6a4a" /><path d="M50 120 v24 M150 120 v24" stroke="#555" strokeWidth="5" /><rect x="90" y="118" width="40" height="26" fill="#c8a878" /><path d="M90 118 l20 -10 l20 10" fill="#d8b888" /></>)
  if (kind === 'room') return box(<><rect x="40" y="50" width="120" height="96" fill="#d6cbb4" /><rect x="60" y="70" width="30" height="26" fill="#9fd3e6" stroke="#8a7a5c" strokeWidth="3" /><rect x="110" y="96" width="26" height="50" fill="#8a5a32" /><path d="M34 52 h132" stroke="#8a7a5c" strokeWidth="6" /></>)
  if (kind === 'apartment') return box(<><rect x="50" y="10" width="100" height="136" fill="#e8e0cf" />{[20, 50, 80, 110].map((y) => [64, 94, 124].map((x) => <rect key={x + '-' + y} x={x} y={y} width="16" height="18" fill="#9fd3e6" />))}<rect x="92" y="120" width="18" height="26" fill="#7a4d2e" /></>)
  if (kind === 'house') return box(<><rect x="40" y="70" width="120" height="76" fill="#fbf4e6" /><path d="M28 74 L100 22 L172 74z" fill="#c0503a" /><rect x="90" y="104" width="22" height="42" fill="#7a4d2e" /><rect x="54" y="88" width="24" height="20" fill="#9fd3e6" /><rect x="124" y="88" width="24" height="20" fill="#9fd3e6" /><circle cx="180" cy="120" r="16" fill="#6fae6b" /><rect x="178" y="126" width="4" height="20" fill="#7a4d2e" /></>)
  if (kind === 'villa') return box(<><rect x="10" y="60" width="180" height="86" fill="#fbf7ee" /><path d="M0 64 L100 20 L200 64z" fill="#d8784a" />{[26, 62, 130, 166].map((x) => <rect key={x} x={x} y="66" width="8" height="80" fill="#fff" stroke="#e3dccb" />)}<rect x="88" y="100" width="24" height="46" fill="#7a4d2e" /><rect x="40" y="84" width="16" height="22" fill="#9fd3e6" /><rect x="144" y="84" width="16" height="22" fill="#9fd3e6" /></>)
  // mansion
  return box(<><rect x="0" y="50" width="200" height="96" fill="#f4efe3" /><rect x="60" y="24" width="80" height="30" fill="#f4efe3" /><path d="M54 26 L100 2 L146 26z" fill="#3b4a6b" /><path d="M-4 54 h208" stroke="#3b4a6b" strokeWidth="6" />{[10, 34, 58, 134, 158, 182].map((x) => <rect key={x} x={x} y="60" width="8" height="86" fill="#fff" stroke="#e3dccb" />)}<rect x="84" y="96" width="32" height="50" rx="16" fill="#5a3a22" /><circle cx="100" cy="36" r="8" fill="#f2c14e" /><path d="M0 146 h200" stroke="#9ccf8e" strokeWidth="6" /></>)
}

export function Pool() {
  return <svg viewBox="0 0 200 40" width="100%" height="100%" aria-hidden="true"><rect x="4" y="6" width="192" height="30" rx="14" fill="#e8e0cf" /><rect x="12" y="10" width="176" height="22" rx="11" fill="#5ec4e0" /><path d="M24 20 q10 -6 20 0 t20 0 M110 24 q10 -6 20 0 t20 0" stroke="#fff" strokeWidth="2" fill="none" opacity=".7" /></svg>
}
export function Yacht() {
  return <svg viewBox="0 0 160 70" width="100%" height="100%" aria-hidden="true"><path d="M6 44 h148 l-18 20 h-112z" fill="#fff" stroke="#c9d6de" strokeWidth="2" /><rect x="40" y="26" width="70" height="18" rx="4" fill="#f4f7fa" /><rect x="60" y="12" width="36" height="14" rx="3" fill="#f4f7fa" /><path d="M46 32 h58" stroke="#3b4a6b" strokeWidth="4" /><path d="M0 66 q20 -6 40 0 t40 0 t40 0 t40 0" stroke="#5ec4e0" strokeWidth="4" fill="none" /></svg>
}
export function Jet() {
  return <svg viewBox="0 0 160 60" width="100%" height="100%" aria-hidden="true"><path d="M10 34 q20 -12 110 -10 q24 2 30 10 q-6 8 -30 8 q-90 2 -110 -8z" fill="#fff" stroke="#c9d6de" strokeWidth="2" /><path d="M70 30 l-20 -24 h14 l30 24z M76 40 l-16 18 h12 l24 -18z M18 30 l-8 -18 h10 l14 18z" fill="#dfe6ec" />{[90, 100, 110, 120].map((x) => <circle key={x} cx={x} cy="30" r="2.6" fill="#6fb6e8" />)}<path d="M150 34 h-8" stroke="#e0344b" strokeWidth="3" /></svg>
}

export function CoinJar({ coins }) {
  const fill = Math.min(coins / 68, 1)
  return (
    <svg viewBox="0 0 60 80" width="100%" height="100%" aria-hidden="true">
      <rect x="14" y="4" width="32" height="10" rx="3" fill="#b88a4a" />
      <path d="M10 18 q0 -6 8 -6 h24 q8 0 8 6 v52 q0 8 -8 8 h-24 q-8 0 -8 -8z" fill="rgba(210,235,240,.55)" stroke="#9fc4cc" strokeWidth="2" />
      <clipPath id="jar-in"><path d="M12 18 q0 -4 6 -4 h24 q6 0 6 4 v52 q0 6 -6 6 h-24 q-6 0 -6 -6z" /></clipPath>
      <g clipPath="url(#jar-in)"><rect x="10" y={76 - 62 * fill} width="40" height={62 * fill + 4} fill="#e2b53c" /></g>
      <text x="30" y="52" textAnchor="middle" fontSize="12" fontWeight="900" fill="#6b4a12">{coins}</text>
    </svg>
  )
}
