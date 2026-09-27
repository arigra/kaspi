// The hero: a shark who starts broke and gets a little better with every
// chapter. `level` = chapters completed. Each upgrade below is switched on by
// its level; the list in content/upgrades.js names them for the reveal screen.

// ---- teeth: laid along the lip curves so they always sit inside the mouth
function q(p0, c, p1, t) {
  return [(1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * c[0] + t * t * p1[0], (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * c[1] + t * t * p1[1]]
}
function dq(p0, c, p1, t) {
  return [2 * (1 - t) * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0]), 2 * (1 - t) * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1])]
}
let seed = 11
const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
function buildRow(p0, c, p1, n, down) {
  const out = []
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n
    const [x, y] = q(p0, c, p1, t)
    const [dx, dy] = dq(p0, c, p1, t)
    const l = Math.hypot(dx, dy), tx = dx / l, ty = dy / l
    let nx = -ty, ny = tx
    if ((down && ny < 0) || (!down && ny > 0)) { nx = -nx; ny = -ny }
    out.push({ x, y, tx, ty, nx, ny, w: (92 / n) * (0.8 + rnd() * 0.25), h: down ? 10 + rnd() * 5 : 8 + rnd() * 4, ang: -16 + rnd() * 32, shade: Math.floor(rnd() * 4) })
  }
  return out
}
const TOP = buildRow([104, 146], [150, 170], [196, 146], 11, true)
const BOT = buildRow([196, 146], [150, 214], [104, 146], 9, false)
const DIRTY = ['#fffbe8', '#f5ebc4', '#eadc9a', '#fff4d2']

function Teeth({ missing, crooked, white }) {
  const tooth = (d, i, key) => {
    if (missing.includes(key)) return null
    const x1 = d.x - d.tx * d.w / 2, y1 = d.y - d.ty * d.w / 2, x2 = d.x + d.tx * d.w / 2, y2 = d.y + d.ty * d.w / 2
    const ax = d.x + d.nx * d.h, ay = d.y + d.ny * d.h
    return <path key={key} d={`M${x1} ${y1} L${ax} ${ay} L${x2} ${y2}z`} fill={white ? '#ffffff' : DIRTY[d.shade]}
      stroke={white ? '#dfe6ea' : '#b9a66a'} strokeWidth=".8" strokeLinejoin="round" transform={`rotate(${d.ang * crooked} ${d.x} ${d.y})`} />
  }
  return (
    <>
      <defs><clipPath id="hero-mouth"><path d="M104 146 Q150 170 196 146 Q150 214 104 146z" /></clipPath></defs>
      <path d="M104 146 Q150 170 196 146 Q150 214 104 146z" fill="#4a1f22" />
      <g clipPath="url(#hero-mouth)">
        {TOP.map((d, i) => tooth(d, i, 't' + i))}
        {BOT.map((d, i) => tooth(d, i, 'b' + i))}
      </g>
    </>
  )
}

export default function Hero({ level = 0, mood = '' }) {
  const has = (n) => level >= n
  const sad = !has(4), confident = has(10)
  const shirt = has(9) ? 'shirt' : has(3) ? 'tee' : 'rag'
  return (
    <svg className={`hero ${mood}`} viewBox="0 -30 300 450" width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id="h-skin" cx="45%" cy="35%" r="70%"><stop offset="0" stopColor="#9fc0d6" /><stop offset="1" stopColor="#5f86a3" /></radialGradient>
        <radialGradient id="h-belly" cx="50%" cy="30%" r="70%"><stop offset="0" stopColor="#fbf4e6" /><stop offset="1" stopColor="#e4d6bd" /></radialGradient>
      </defs>
      <ellipse cx="150" cy="405" rx="95" ry="10" fill="#000" opacity=".12" className="h-shadow" />
      <g className="h-all">
        <path className="h-tail" d="M190 330 q55 10 70 -30 q-10 40 20 60 q-45 5 -80 -10z" fill="#5f86a3" />
        {/* legs */}
        <path d="M112 325 q-6 40 -4 70 h30 q2 -30 -2 -70z" fill={has(14) ? '#26324a' : has(6) ? '#3b5a86' : 'url(#h-skin)'} />
        <path d="M162 325 q-2 40 2 70 h30 q2 -30 -6 -70z" fill={has(14) ? '#26324a' : has(6) ? '#3b5a86' : 'url(#h-skin)'} />
        {/* shoes */}
        {has(14) ? (
          <><ellipse cx="120" cy="397" rx="24" ry="9" fill="#2a1d17" /><ellipse cx="180" cy="397" rx="24" ry="9" fill="#2a1d17" /><ellipse cx="114" cy="393" rx="8" ry="3" fill="#fff" opacity=".3" /><ellipse cx="174" cy="393" rx="8" ry="3" fill="#fff" opacity=".3" /></>
        ) : has(2) ? (
          <><path d="M96 400 q0 -16 22 -16 q18 0 24 16z" fill="#fff" stroke="#cfd6dc" strokeWidth="2" /><path d="M158 400 q0 -16 22 -16 q18 0 24 16z" fill="#fff" stroke="#cfd6dc" strokeWidth="2" /><path d="M100 398 h42 M162 398 h42" stroke="#d05a3f" strokeWidth="3" /></>
        ) : (
          <><ellipse cx="118" cy="398" rx="26" ry="7" fill="#c9533f" /><ellipse cx="182" cy="398" rx="26" ry="7" fill="#3f7fc9" />
            <path d="M112 392 l6 -8 l6 8" stroke="#7a2e22" strokeWidth="3" fill="none" /><path d="M176 392 l6 -8 l6 8" stroke="#224f7a" strokeWidth="3" fill="none" /></>
        )}
        {/* bottoms */}
        {has(14) ? (
          <path d="M96 272 h112 l6 66 q-26 6 -44 0 l-10 -26 l-10 26 q-20 6 -44 0z" fill="#26324a" />
        ) : has(6) ? (
          <><path d="M96 272 h112 l6 66 q-26 6 -44 0 l-10 -26 l-10 26 q-20 6 -44 0z" fill="#3b5a86" /><path d="M110 280 q10 10 22 6 M192 280 q-10 10 -22 6" stroke="#9fb6d6" strokeWidth="2" fill="none" /></>
        ) : (
          <><path d="M96 272 h112 l8 70 q-30 8 -50 0 l-14 -30 l-14 30 q-22 8 -50 0z" fill="#8a7a5c" />
            <rect x="110" y="300" width="22" height="18" fill="#b8925a" transform="rotate(-8 121 309)" />
            <path d="M110 302 l22 -3 M112 316 l22 -3" stroke="#6b5636" strokeWidth="1.5" strokeDasharray="3 2" /></>
        )}
        {!has(1) && (
          <><path d="M98 280 q-18 6 -14 24 q12 4 18 -10z" fill="#efe6d2" stroke="#b8a67f" strokeWidth="2" />
            <path d="M206 280 q18 6 14 24 q-12 4 -18 -10z" fill="#efe6d2" stroke="#b8a67f" strokeWidth="2" /></>
        )}
        {/* belt */}
        {has(6) ? <path d="M94 274 h116" stroke="#4a3122" strokeWidth="6" strokeLinecap="round" />
          : <><path d="M94 274 h116" stroke="#c9a86a" strokeWidth="6" strokeLinecap="round" /><path d="M150 274 q-6 14 -12 18 M150 274 q4 14 10 16" stroke="#c9a86a" strokeWidth="4" fill="none" strokeLinecap="round" /></>}

        <g className="h-upper">
          {/* body */}
          <path d="M92 190 q-6 50 4 86 h112 q10 -36 4 -86 q-58 -26 -120 0z" fill="url(#h-skin)" />
          {shirt === 'rag' && (
            <><path d="M96 186 q54 -22 112 0 l4 70 l-10 -6 l-8 10 l-9 -8 l-10 9 l-9 -9 l-10 8 l-9 -9 l-9 9 l-9 -8 l-10 10 l-8 -9 l-9 6z" fill="#e8e1cf" />
              <circle cx="170" cy="222" r="7" fill="#d9ceb4" /><circle cx="130" cy="240" r="5" fill="#d9ceb4" /><path d="M186 232 l8 6 l-6 4z" fill="#9fc0d6" /></>
          )}
          {shirt === 'tee' && <path d="M96 186 q54 -22 112 0 l4 88 h-120z" fill="#f4f1e8" />}
          {shirt === 'shirt' && (
            <><path d="M96 186 q54 -22 112 0 l4 88 h-120z" fill="#eaf2fb" />
              <path d="M150 180 v94" stroke="#c8d6e6" strokeWidth="2" />
              {[200, 220, 240, 260].map((y) => <circle key={y} cx="150" cy={y} r="2.4" fill="#9fb3c9" />)}
              <path d="M124 180 l26 16 l26 -16 l-6 -8 l-20 10 l-20 -10z" fill="#fff" stroke="#c8d6e6" strokeWidth="1.5" /></>
          )}
          {has(14) && (
            <><path d="M92 188 q20 -14 44 -10 l14 40 l-6 58 h-50 q-10 -36 -2 -88z" fill="#2b3a57" />
              <path d="M208 188 q-20 -14 -44 -10 l-14 40 l6 58 h50 q10 -36 2 -88z" fill="#2b3a57" />
              <path d="M136 178 l14 40 l-18 -8z M164 178 l-14 40 l18 -8z" fill="#1f2a40" />
              <path d="M150 196 l-6 8 l6 34 l6 -34z" fill="#c0392b" /></>
          )}
          {has(15) && <path d="M122 186 q28 30 56 0" stroke="#e2b53c" strokeWidth="4" fill="none" strokeDasharray="5 2" />}
          <path d="M118 188 q32 12 68 0 l-4 16 q-30 10 -60 0z" fill="url(#h-belly)" opacity={shirt === 'rag' ? 1 : 0} />

          {/* arms */}
          <g className="h-armL">
            <path d="M96 200 q-34 10 -44 40 q-4 12 8 12 q16 -24 40 -30z" fill={has(14) ? '#2b3a57' : shirt === 'shirt' ? '#eaf2fb' : 'url(#h-skin)'} />
            <ellipse cx="56" cy="250" rx="11" ry="9" fill="#7fa2bc" />
          </g>
          <g className="h-armR">
            <path d="M208 200 q34 10 44 40 q4 12 -8 12 q-16 -24 -40 -30z" fill={has(14) ? '#2b3a57' : shirt === 'shirt' ? '#eaf2fb' : 'url(#h-skin)'} />
            {has(10) && <rect x="232" y="236" width="14" height="8" rx="2" fill="#e2b53c" transform="rotate(35 239 240)" />}
            {has(5) ? (
              <g transform="translate(250 246) rotate(-12)"><rect x="-16" y="-10" width="32" height="22" rx="4" fill="#6b4a2e" /><rect x="-12" y="-16" width="22" height="10" fill="#6fae6b" /><text x="-1" y="-8" textAnchor="middle" fontSize="7" fontWeight="900" fill="#2f6e4b">₪</text></g>
            ) : (
              <g transform="translate(246 244) rotate(-12)"><rect x="-20" y="-13" width="40" height="26" rx="4" fill="#1f6fb8" /><rect x="-20" y="-13" width="40" height="7" rx="3" fill="#2f8f5b" /><text x="0" y="8" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="9" fill="#fff" direction="rtl">רב־קו</text></g>
            )}
            <ellipse cx="244" cy="256" rx="9" ry="7" fill="#7fa2bc" />
          </g>

          {/* head */}
          <g className="h-head">
            <path d="M150 40 q-72 0 -86 78 q-4 50 36 70 q50 16 100 0 q40 -20 36 -70 q-14 -78 -86 -78z" fill="url(#h-skin)" />
            {has(7) && <path className="h-fin" d="M140 44 q14 -44 44 -40 q-16 18 -18 44z" fill="#5f86a3" />}
            <path d="M92 150 q58 40 116 0 q-4 34 -58 42 q-54 -8 -58 -42z" fill="url(#h-belly)" />
            <path d="M78 120 q6 8 0 16 M84 116 q6 8 0 16 M222 120 q-6 8 0 16 M216 116 q-6 8 0 16" stroke="#4a6f8a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <g className="h-eyes">
              <ellipse cx="122" cy="108" rx="17" ry="19" fill="#fff" /><ellipse cx="178" cy="108" rx="17" ry="19" fill="#fff" />
              <circle cx="125" cy="112" r="8" fill="#2a2320" /><circle cx="175" cy="112" r="8" fill="#2a2320" />
              <circle cx="128" cy="109" r="2.5" fill="#fff" /><circle cx="178" cy="109" r="2.5" fill="#fff" />
            </g>
            {sad
              ? <path d="M104 100 q16 -2 36 -12 M160 88 q20 10 36 12" stroke="#4a6f8a" strokeWidth="5" fill="none" strokeLinecap="round" />
              : confident
                ? <path d="M104 88 q18 -8 36 0 M160 88 q18 -8 36 0" stroke="#4a6f8a" strokeWidth="5" fill="none" strokeLinecap="round" />
                : <path d="M104 92 q18 -4 36 -2 M160 90 q18 -2 36 2" stroke="#4a6f8a" strokeWidth="5" fill="none" strokeLinecap="round" />}
            {sad && <path d="M108 128 q14 6 28 0 M164 128 q14 6 28 0" stroke="#6f93ad" strokeWidth="2" fill="none" />}
            <Teeth missing={has(4) ? [] : ['t3', 't8', 'b5']} crooked={has(8) ? 0 : has(4) ? 0.55 : 1} white={has(8)} />
            {!has(3) && (
              <g transform="rotate(25 198 78)"><rect x="186" y="74" width="24" height="9" rx="3" fill="#e9c89a" /><path d="M192 74 v9 M198 76 v9" stroke="#c9a376" strokeWidth="1.5" /></g>
            )}
            {/* hat / hair */}
            {!has(7) && (
              <g transform="translate(150 60) scale(.92) translate(-150 -74)">
                <path d="M84 90 Q84 18 150 16 Q216 18 216 90 Q150 70 84 90z" fill="#b24a3b" />
                <g stroke="#8f3a2e" strokeWidth="2" opacity=".55" fill="none"><path d="M110 80 Q108 40 128 24" /><path d="M130 74 Q130 38 142 18" /><path d="M170 74 Q170 38 158 18" /><path d="M190 80 Q192 40 172 24" /></g>
                <path d="M80 84 Q150 62 220 84 L222 104 Q150 82 78 104z" fill="#8f3a2e" />
                <path d="M126 30 l10 -3 l2 9 l-10 3z" fill="#6b8a5c" />
                <path className="h-fin" d="M140 22 q14 -40 40 -34 q-14 18 -16 38z" fill="#5f86a3" />
              </g>
            )}
            {has(11) && (
              <g className="h-shades"><rect x="100" y="94" width="42" height="26" rx="10" fill="#1d2430" /><rect x="158" y="94" width="42" height="26" rx="10" fill="#1d2430" /><path d="M142 104 h16" stroke="#1d2430" strokeWidth="4" /><path d="M108 100 l10 -2" stroke="#fff" strokeWidth="3" opacity=".5" strokeLinecap="round" /></g>
            )}
          </g>
        </g>
      </g>
    </svg>
  )
}
