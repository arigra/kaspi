const PALETTES = {
  kaspi: { '--sk': '#e3a73f', '--sk-deep': '#b97d24', '--sk-belly': '#fff6df', '--sk-eye': '#4a3313' },
  johnny: { '--sk': '#5f9a73', '--sk-deep': '#3e6d50', '--sk-belly': '#eef5ea', '--sk-eye': '#1f3227' }
}

// mood: '' | 'happy' | 'think'. math adds reading glasses and a calculator.
export default function Shark({ guide = 'kaspi', mood = '', math = false, bubbles = false }) {
  return (
    <>
      <svg className={`shark ${mood} ${math ? 'math' : ''}`} style={PALETTES[guide]} viewBox="0 0 220 170" aria-hidden="true">
        <ellipse cx="108" cy="162" rx="60" ry="6" fill="rgba(0,0,0,.10)" />
        <g className="sh-float">
          <path className="sh-tail" d="M168 84 C182 68 196 54 212 46 C204 72 204 100 212 126 C196 118 182 104 168 96 Z" fill="var(--sk-deep)" />
          <path className="sh-pec" d="M80 122 C70 138 72 152 94 154 C95 142 99 131 106 124 Z" fill="var(--sk-deep)" />
          <path d="M90 46 C98 25 111 12 125 7 C122 24 126 37 138 48 Z" fill="var(--sk-deep)" />
          <path d="M22 92 C22 58 62 40 110 40 C150 40 176 62 176 90 C176 122 148 142 104 142 C58 142 22 124 22 92 Z" fill="var(--sk)" />
          <path d="M44 56 C66 44 96 42 122 46" stroke="rgba(255,255,255,.35)" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M30 102 C52 116 98 122 166 108 C156 128 132 140 102 140 C66 140 38 126 30 102 Z" fill="var(--sk-belly)" />
          <path d="M144 72 q4 10 0 20 M153 70 q4 11 0 22 M162 71 q3 10 0 19" stroke="rgba(0,0,0,.17)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M48 56 q13 -9 27 -3" stroke="rgba(0,0,0,.35)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M86 52 q13 -6 26 3" stroke="rgba(0,0,0,.35)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <g className="sh-eye"><circle cx="62" cy="76" r="14" fill="#fffdf6" /><circle cx="64" cy="78" r="7.5" fill="var(--sk-eye)" /><circle cx="61.5" cy="75" r="2.7" fill="#fff" /></g>
          <g className="sh-eye"><circle cx="98" cy="74" r="14" fill="#fffdf6" /><circle cx="100" cy="76" r="7.5" fill="var(--sk-eye)" /><circle cx="97.5" cy="73" r="2.7" fill="#fff" /></g>
          <ellipse cx="46" cy="98" rx="9" ry="5" fill="rgba(226,110,96,.32)" /><ellipse cx="114" cy="96" rx="9" ry="5" fill="rgba(226,110,96,.32)" />
          <path d="M58 102 Q80 118 102 102" stroke="rgba(24,40,48,.62)" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M63 106 L69 106.6 L66 113 Z M87 107.8 L93 107.6 L90 114 Z" fill="#fffdf6" />
          <g className="sh-glasses">
            <circle cx="62" cy="76" r="17" fill="rgba(255,255,255,.2)" stroke="#2c414d" strokeWidth="4" />
            <circle cx="98" cy="74" r="17" fill="rgba(255,255,255,.2)" stroke="#2c414d" strokeWidth="4" />
            <path d="M79 75.5 L81 75" stroke="#2c414d" strokeWidth="4" strokeLinecap="round" />
            <path d="M45 74 L30 70" stroke="#2c414d" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        </g>
        <g className="sh-calc">
          <rect x="4" y="104" width="40" height="52" rx="8" fill="#f7f2e6" stroke="#2c414d" strokeWidth="3" />
          <rect x="10" y="110" width="28" height="11" rx="3" fill="#a8c9b0" />
          <g fill="#2c414d">
            {[130, 140, 150].flatMap((y) => [14, 24, 34].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" />))}
          </g>
        </g>
      </svg>
      {bubbles && (
        <span className="bubbles" aria-hidden="true">
          <i style={{ width: 8, height: 8, left: 6, top: 34 }} />
          <i style={{ width: 5, height: 5, left: 14, top: 40, animationDelay: '1.2s' }} />
        </span>
      )}
    </>
  )
}
