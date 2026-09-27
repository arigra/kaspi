export function Girlfriend() {
  return (
    <svg className="gf" viewBox="0 0 200 320" width="100%" height="100%" aria-hidden="true">
      <defs><radialGradient id="gf-skin" cx="45%" cy="35%" r="70%"><stop offset="0" stopColor="#f6c3d3" /><stop offset="1" stopColor="#d98aa6" /></radialGradient></defs>
      <ellipse cx="100" cy="312" rx="56" ry="7" fill="#000" opacity=".12" />
      <path d="M130 250 q36 4 44 -22 q-4 30 14 42 q-30 4 -58 -6z" fill="#d98aa6" />
      <path d="M80 244 l-8 62 h10 l10 -60z M112 244 l6 62 h10 l-4 -62z" fill="url(#gf-skin)" />
      <path d="M66 306 h22 l-4 -8z M112 306 h22 l-4 -8z" fill="#c0392b" /><path d="M86 300 v8 M130 300 v8" stroke="#c0392b" strokeWidth="3" />
      {/* dress */}
      <path d="M72 150 q28 -12 56 0 l8 30 q-6 10 -10 14 l20 60 q-46 12 -92 0 l20 -60 q-4 -4 -10 -14z" fill="#e0344b" />
      <path d="M84 150 v-10 M116 150 v-10" stroke="#e0344b" strokeWidth="4" />
      {/* arms: one on hip, one waving */}
      <path d="M72 158 q-22 20 -12 40 q8 6 16 -4 q-8 -14 4 -26z" fill="url(#gf-skin)" />
      <g className="gf-wave"><path d="M128 156 q24 -10 30 -34 q2 -10 -8 -8 q-8 20 -26 26z" fill="url(#gf-skin)" /></g>
      {/* head */}
      <path d="M100 26 q-54 0 -64 58 q-2 38 28 52 q36 12 72 0 q30 -14 28 -52 q-10 -58 -64 -58z" fill="url(#gf-skin)" />
      <path d="M96 28 q10 -26 30 -24 q-10 14 -12 30z" fill="#d98aa6" />
      <path d="M58 110 q42 30 84 0 q-4 26 -42 30 q-38 -4 -42 -30z" fill="#fbeff2" />
      <g className="gf-eyes">
        <ellipse cx="80" cy="82" rx="13" ry="15" fill="#fff" /><ellipse cx="120" cy="82" rx="13" ry="15" fill="#fff" />
        <circle cx="82" cy="85" r="6.5" fill="#3a2230" /><circle cx="118" cy="85" r="6.5" fill="#3a2230" />
        <circle cx="84" cy="82" r="2" fill="#fff" /><circle cx="120" cy="82" r="2" fill="#fff" />
      </g>
      <path d="M66 70 l-6 -6 M70 67 l-3 -8 M76 66 l0 -8 M134 70 l6 -6 M130 67 l3 -8 M124 66 l0 -8" stroke="#3a2230" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M86 116 q14 10 28 0 q-6 10 -14 10 q-8 0 -14 -10z" fill="#e0344b" />
      <circle cx="64" cy="102" r="6" fill="#f08aa5" opacity=".6" /><circle cx="136" cy="102" r="6" fill="#f08aa5" opacity=".6" />
      {/* sunglasses on head + bow */}
      <g><rect x="62" y="46" width="30" height="16" rx="7" fill="#2a1d25" /><rect x="108" y="46" width="30" height="16" rx="7" fill="#2a1d25" /><path d="M92 54 h16" stroke="#2a1d25" strokeWidth="3" /></g>
      <circle cx="54" cy="60" r="5" fill="#ffd166" /><circle cx="146" cy="60" r="5" fill="#ffd166" />
      <text className="gf-heart" x="160" y="40" fontSize="26">💋</text>
    </svg>
  )
}

export function SportsCar() {
  return (
    <svg className="car" viewBox="0 0 260 110" width="100%" height="100%" aria-hidden="true">
      <ellipse cx="130" cy="100" rx="118" ry="7" fill="#000" opacity=".14" />
      <path d="M10 76 q0 -18 30 -22 l40 -6 q24 -22 60 -22 q34 0 56 20 l40 6 q20 4 18 24 l-2 12 h-240z" fill="#d7263d" />
      <path d="M86 48 q20 -16 52 -16 q26 0 44 14z" fill="#9fd3e6" stroke="#b01d31" strokeWidth="3" />
      <path d="M134 32 v16" stroke="#b01d31" strokeWidth="3" />
      <path d="M20 70 h44 M190 70 h44" stroke="#ff8a8a" strokeWidth="3" strokeLinecap="round" opacity=".7" />
      <rect x="230" y="66" width="16" height="8" rx="3" fill="#ffe29a" /><rect x="12" y="66" width="12" height="8" rx="3" fill="#ff5a5a" />
      <g className="wheel"><circle cx="62" cy="88" r="18" fill="#1d1d1d" /><circle cx="62" cy="88" r="8" fill="#c9c9c9" /><path d="M62 80 v16 M54 88 h16" stroke="#888" strokeWidth="2" /></g>
      <g className="wheel"><circle cx="200" cy="88" r="18" fill="#1d1d1d" /><circle cx="200" cy="88" r="8" fill="#c9c9c9" /><path d="M200 80 v16 M192 88 h16" stroke="#888" strokeWidth="2" /></g>
    </svg>
  )
}

export function CoinJar({ coins }) {
  const fill = Math.min(coins / 68, 1)
  return (
    <svg viewBox="0 0 60 80" width="100%" height="100%" aria-hidden="true">
      <rect x="14" y="4" width="32" height="10" rx="3" fill="#b88a4a" />
      <path d="M10 18 q0 -6 8 -6 h24 q8 0 8 6 v52 q0 8 -8 8 h-24 q-8 0 -8 -8z" fill="rgba(210,235,240,.55)" stroke="#9fc4cc" strokeWidth="2" />
      <clipPath id="jar-in"><path d="M12 18 q0 -4 6 -4 h24 q6 0 6 4 v52 q0 6 -6 6 h-24 q-6 0 -6 -6z" /></clipPath>
      <g clipPath="url(#jar-in)">
        <rect x="10" y={76 - 62 * fill} width="40" height={62 * fill + 4} fill="#e2b53c" />
        {Array.from({ length: Math.min(coins, 14) }, (_, i) => <ellipse key={i} cx={16 + (i * 7) % 28} cy={74 - Math.floor(i / 4) * 5 - 62 * fill * 0.2} rx="5" ry="2.2" fill="#c9962a" />)}
      </g>
      <text x="30" y="52" textAnchor="middle" fontSize="12" fontWeight="900" fill="#6b4a12">{coins}</text>
    </svg>
  )
}

export function House({ fancy }) {
  return fancy ? (
    <svg viewBox="0 0 160 120" width="100%" height="100%" aria-hidden="true">
      <rect x="20" y="50" width="120" height="66" fill="#fbf4e6" />
      <path d="M10 54 L80 10 L150 54z" fill="#c0503a" />
      <rect x="70" y="80" width="22" height="36" fill="#7a4d2e" /><rect x="34" y="66" width="22" height="18" fill="#9fd3e6" /><rect x="104" y="66" width="22" height="18" fill="#9fd3e6" />
      <rect x="0" y="112" width="160" height="8" fill="#9ccf8e" />
      <circle cx="148" cy="96" r="14" fill="#6fae6b" /><rect x="146" y="100" width="4" height="16" fill="#7a4d2e" />
    </svg>
  ) : (
    <svg viewBox="0 0 160 120" width="100%" height="100%" aria-hidden="true">
      <path d="M30 116 L80 44 L130 116z" fill="#c8b58a" /><path d="M80 44 L96 116 H64z" fill="#8a7a5c" />
      <path d="M40 116 L80 58 M120 116 L80 58" stroke="#a8966a" strokeWidth="2" />
      <rect x="0" y="112" width="160" height="8" fill="#d8c79c" />
    </svg>
  )
}
