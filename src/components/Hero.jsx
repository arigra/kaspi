// The hero shark. `look` comes from heroLook(lessonsDone) in content/upgrades.js.
// `view`: 'full' (whole body) or 'bust' (close-up of head and hands).

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
const GOLD_ORDER = ['t4', 't6', 't2', 't9']

function Teeth({ look }) {
  const tooth = (d, key) => {
    if (look.missing.includes(key)) return null
    const x1 = d.x - d.tx * d.w / 2, y1 = d.y - d.ty * d.w / 2, x2 = d.x + d.tx * d.w / 2, y2 = d.y + d.ty * d.w / 2
    const ax = d.x + d.nx * d.h, ay = d.y + d.ny * d.h
    const gold = look.grill || GOLD_ORDER.slice(0, look.gold).includes(key)
    const fill = gold ? '#f2c14e' : look.white ? '#ffffff' : DIRTY[d.shade]
    return <path key={key} d={`M${x1} ${y1} L${ax} ${ay} L${x2} ${y2}z`} fill={fill}
      stroke={gold ? '#b8862b' : look.white ? '#dfe6ea' : '#b9a66a'} strokeWidth=".8" strokeLinejoin="round"
      transform={`rotate(${d.ang * look.crook} ${d.x} ${d.y})`} />
  }
  return (
    <>
      <defs><clipPath id="hero-mouth"><path d="M104 146 Q150 170 196 146 Q150 214 104 146z" /></clipPath></defs>
      <path d="M104 146 Q150 170 196 146 Q150 214 104 146z" fill="#4a1f22" />
      <g clipPath="url(#hero-mouth)">
        {TOP.map((d, i) => tooth(d, 't' + i))}
        {BOT.map((d, i) => tooth(d, 'b' + i))}
      </g>
    </>
  )
}

export const PALETTES = {
  blue: { hi: '#9fc0d6', lo: '#5f86a3', hand: '#7fa2bc', line: '#4a6f8a' },
  gold: { hi: '#f2c46a', lo: '#c98f2e', hand: '#e0a947', line: '#8a5a12' },
  green: { hi: '#9fcfa8', lo: '#4f8a61', hand: '#79b286', line: '#2f5a3c' }
}

const SHIRT = {
  tank: '#e8e1cf', tee: '#f4f1e8', hawaii: '#f08a3c', button: '#dbe9f7', silk: '#7a3d8f', blazer: '#233454', suitWhite: '#f6f3ea'
}
const LONG_SLEEVE = { button: '#dbe9f7', silk: '#7a3d8f', blazer: '#233454', suitWhite: '#f6f3ea' }
const PANTS = { jeans: '#3b5a86', linen: '#efe7d3', suit: '#233454' }

function Shirt({ look, pal, pk }) {
  const s = look.shirt
  if (s === 'none') return (
    <>
      <path d="M118 196 q32 14 68 0 l-2 60 q-32 10 -64 0z" fill="#e9dcc4" opacity=".85" />
      <path d="M104 214 q8 4 14 0 M104 226 q8 4 14 0 M186 214 q8 4 14 0 M186 226 q8 4 14 0" stroke={pal.line} strokeWidth="2" fill="none" opacity=".6" />
      <circle cx="150" cy="246" r="3" fill="#b99f7a" />
    </>
  )
  if (s === 'tank') return (
    <>
      <path d="M104 186 q46 -10 92 0 l12 70 l-10 -6 l-8 10 l-9 -8 l-10 9 l-9 -9 l-10 8 l-9 -9 l-9 9 l-9 -8 l-10 10 l-8 -9 l-9 6z" fill={SHIRT.tank} />
      <path d="M104 186 q-4 -8 6 -10 M196 186 q4 -8 -6 -10" stroke={SHIRT.tank} strokeWidth="8" strokeLinecap="round" />
      <circle cx="170" cy="222" r="7" fill="#d9ceb4" /><circle cx="130" cy="240" r="5" fill="#d9ceb4" /><path d="M186 232 l8 6 l-6 4z" fill={pal.hi} />
    </>
  )
  const base = <path d="M96 186 q54 -22 112 0 l4 88 h-120z" fill={SHIRT[s]} />
  if (s === 'tee') return base
  if (s === 'hawaii') return (
    <>{base}
      {[[112, 206], [140, 226], [178, 204], [196, 240], [124, 256], [166, 254], [150, 200]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>{[0, 72, 144, 216, 288].map((a) => <circle key={a} cx={5 * Math.cos(a * Math.PI / 180)} cy={5 * Math.sin(a * Math.PI / 180)} r="3.4" fill="#fff4c9" />)}<circle r="2.4" fill="#e0344b" /></g>
      ))}
      <path d="M126 180 l24 18 l24 -18 l-4 -8 l-20 12 l-20 -12z" fill="#e0703a" />
    </>
  )
  if (s === 'button') return (
    <>{base}
      <path d="M150 182 v92" stroke="#b9cce0" strokeWidth="2" />
      {[204, 222, 240, 258].map((y) => <circle key={y} cx="150" cy={y} r="2.4" fill="#8fa7c2" />)}
      <path d="M124 180 l26 16 l26 -16 l-6 -8 l-20 10 l-20 -10z" fill="#fff" stroke="#b9cce0" strokeWidth="1.5" />
    </>
  )
  const silk = (
    <>{base}
      <path d="M124 180 l26 44 l26 -44z" fill={`url(#h-skin-${pk})`} />
      <path d="M124 180 l26 44 l-10 -40z M176 180 l-26 44 l10 -40z" fill="#5e2c70" />
      <path d="M110 200 q10 30 2 70 M190 200 q-10 30 -2 70" stroke="#9a5fb0" strokeWidth="2" fill="none" opacity=".6" />
    </>
  )
  if (s === 'silk') return silk
  const lapel = s === 'suitWhite' ? '#e3ddcd' : '#1a2740'
  const inner = s === 'suitWhite' ? '#1f1f24' : SHIRT.silk
  return (
    <>
      <path d="M96 186 q54 -22 112 0 l4 88 h-120z" fill={inner} />
      <path d="M126 180 l24 40 l24 -40z" fill={look.tie ? '#fff' : `url(#h-skin-${pk})`} />
      <path d="M92 188 q20 -14 44 -10 l14 42 l-6 56 h-50 q-10 -36 -2 -88z" fill={SHIRT[s]} />
      <path d="M208 188 q-20 -14 -44 -10 l-14 42 l6 56 h50 q10 -36 2 -88z" fill={SHIRT[s]} />
      <path d="M136 178 l14 42 l-20 -10z M164 178 l-14 42 l20 -10z" fill={lapel} />
      {[236, 254].map((y) => <circle key={y} cx="144" cy={y} r="2.6" fill={lapel} />)}
      {s === 'suitWhite' && <path d="M112 212 l12 -3 l2 8 l-12 3z" fill="#e0344b" />}
    </>
  )
}

function Hand({ x, y, rings, skin }) {
  return (
    <>
      <ellipse cx={x} cy={y} rx="11" ry="9" fill={skin} />
      {Array.from({ length: rings }, (_, i) => <circle key={i} cx={x - 7 + i * 3.5} cy={y - 5 + (i % 2) * 2} r="2.2" fill="none" stroke="#f2c14e" strokeWidth="1.8" />)}
    </>
  )
}

function RightItem({ look }) {
  const r = look.right
  if (r === 'ravkav') return <g transform="translate(246 244) rotate(-12)"><rect x="-20" y="-13" width="40" height="26" rx="4" fill="#1f6fb8" /><rect x="-20" y="-13" width="40" height="7" rx="3" fill="#2f8f5b" /><text x="0" y="8" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="9" fill="#fff" direction="rtl">רב־קו</text></g>
  if (r === 'flip') return <g transform="translate(250 236) rotate(-8)"><rect x="-8" y="-20" width="16" height="30" rx="3" fill="#8a8f96" /><rect x="-5" y="-16" width="10" height="10" fill="#9fd3a0" /><path d="M-5 0 h10 M-5 4 h10" stroke="#5a5f66" strokeWidth="1.5" /></g>
  if (r === 'phone') return <g transform="translate(252 234) rotate(-10)"><rect x="-10" y="-20" width="20" height="36" rx="4" fill="#1d2430" /><rect x="-8" y="-17" width="16" height="28" rx="2" fill="#6fb6e8" /></g>
  if (r === 'wallet') return <g transform="translate(250 244) rotate(-12)"><rect x="-12" y="-22" width="26" height="14" fill="#6fae6b" transform="rotate(-8)" /><rect x="-10" y="-20" width="26" height="14" fill="#83c27f" transform="rotate(6)" /><rect x="-16" y="-10" width="32" height="22" rx="4" fill="#6b4a2e" /></g>
  const big = r === 'cigarBig'
  return (
    <g>
      <g transform="translate(248 246) rotate(-28)">
        <rect x="-4" y={big ? -56 : -38} width={big ? 11 : 8} height={big ? 60 : 42} rx="4" fill="#6b3e22" />
        <rect x="-4" y={big ? -30 : -18} width={big ? 11 : 8} height="6" fill="#e0344b" />
        <rect x="-4" y={big ? -30 : -18} width={big ? 11 : 8} height="2" fill="#f2c14e" />
        {look.smoke && <circle cx={big ? 1.5 : 0} cy={big ? -58 : -40} r="4" fill="#ff7a2e" />}
      </g>
      {look.smoke && (
        <g className="h-smoke" fill="#cfd6dc" opacity=".8">
          <circle cx={big ? 282 : 272} cy={big ? 186 : 204} r="6" /><circle cx={big ? 290 : 280} cy={big ? 172 : 190} r="8" /><circle cx={big ? 284 : 274} cy={big ? 154 : 172} r="10" />
        </g>
      )}
    </g>
  )
}

function LeftItem({ look }) {
  const l = look.left
  if (l === 'none') return null
  if (l === 'coffee') return <g transform="translate(52 234)"><path d="M-10 -14 h20 l-3 26 h-14z" fill="#fff" stroke="#c8b69a" strokeWidth="1.5" /><rect x="-10" y="-18" width="20" height="5" rx="2" fill="#2f6e4b" /><rect x="-9" y="-4" width="18" height="7" fill="#2f6e4b" /></g>
  return (
    <g transform="translate(50 230)">
      <path d="M-13 -16 h26 l-3 30 h-20z" fill="rgba(230,245,250,.55)" stroke="#b7ccd6" strokeWidth="1.5" />
      <path d="M-11.5 -2 h23 l-2 16 h-19z" fill="#c77a1e" opacity=".9" />
      {l === 'whiskeyIce' && <><rect x="-8" y="-8" width="8" height="8" rx="1.5" fill="#eaf6fb" opacity=".9" transform="rotate(12)" /><rect x="1" y="-6" width="7" height="7" rx="1.5" fill="#eaf6fb" opacity=".9" transform="rotate(-10)" /></>}
      <path d="M-9 -12 v20" stroke="#fff" strokeWidth="2" opacity=".6" />
    </g>
  )
}

function Hat({ look, pal }) {
  const h = look.hat
  if (h === 'beanie') return (
    <g transform="translate(150 60) scale(.92) translate(-150 -74)">
      <path d="M84 90 Q84 18 150 16 Q216 18 216 90 Q150 70 84 90z" fill="#b24a3b" />
      <g stroke="#8f3a2e" strokeWidth="2" opacity=".55" fill="none"><path d="M110 80 Q108 40 128 24" /><path d="M130 74 Q130 38 142 18" /><path d="M170 74 Q170 38 158 18" /><path d="M190 80 Q192 40 172 24" /></g>
      <path d="M80 84 Q150 62 220 84 L222 104 Q150 82 78 104z" fill="#8f3a2e" />
      <path d="M126 30 l10 -3 l2 9 l-10 3z" fill="#6b8a5c" />
      <path className="h-fin" d="M140 22 q14 -40 40 -34 q-14 18 -16 38z" fill={pal.lo} />
    </g>
  )
  if (h === 'cap') return (
    <>
      <path d="M90 76 Q92 26 150 24 Q208 26 210 76 Q150 60 90 76z" fill="#2f6e4b" />
      <path d="M84 72 q-28 4 -36 16 q20 6 46 -6z" fill="#245a3c" />
      <circle cx="150" cy="26" r="5" fill="#245a3c" />
      <path className="h-fin" d="M150 30 q12 -34 36 -30 q-14 16 -16 32z" fill={pal.lo} />
    </>
  )
  const fin = <path className="h-fin" d="M140 44 q14 -44 44 -40 q-16 18 -18 44z" fill={pal.lo} />
  if (h === 'none') return fin
  if (h === 'fedora') return (
    <>
      {fin}
      <ellipse cx="150" cy="54" rx="84" ry="14" fill="#2a2a30" />
      <path d="M100 54 q0 -44 50 -46 q50 2 50 46z" fill="#34343c" />
      <path d="M102 44 q48 10 96 0 v10 q-48 10 -96 0z" fill="#e0344b" />
      {look.feather && <path d="M190 46 q30 -40 20 -70 q-4 36 -26 64z" fill="#3aa0c9" stroke="#1f6f96" strokeWidth="1.5" />}
    </>
  )
  // crown
  return (
    <>
      {fin}
      <path d="M100 58 l6 -40 l20 24 l24 -34 l24 34 l20 -24 l6 40z" fill="#f2c14e" stroke="#b8862b" strokeWidth="2" />
      <circle cx="150" cy="44" r="6" fill="#e0344b" /><circle cx="118" cy="48" r="4.5" fill="#2f8f5b" /><circle cx="182" cy="48" r="4.5" fill="#3a6fd8" />
    </>
  )
}

function Eyes({ look }) {
  const e = look.eyes
  if (e === 'none') return null
  const frame = e === 'goldShades' ? '#f2c14e' : e === 'aviator' ? '#c9a24a' : e === 'readers' ? '#2c414d' : '#e0344b'
  const lens = e === 'readers' ? 'rgba(255,255,255,.18)' : e === 'cheap' ? '#2a2a35' : e === 'aviator' ? '#3c4a5a' : '#1d2430'
  return (
    <g>
      {e === 'aviator'
        ? <><path d="M100 96 h42 q2 26 -20 26 q-22 0 -22 -26z" fill={lens} stroke={frame} strokeWidth="2.5" /><path d="M158 96 h42 q0 26 -22 26 q-22 0 -20 -26z" fill={lens} stroke={frame} strokeWidth="2.5" /></>
        : <><rect x="100" y="94" width="42" height="26" rx="10" fill={lens} stroke={frame} strokeWidth="3" /><rect x="158" y="94" width="42" height="26" rx="10" fill={lens} stroke={frame} strokeWidth="3" /></>}
      <path d="M142 102 h16" stroke={frame} strokeWidth="3.5" />
      <path d="M108 100 l10 -2 M166 100 l10 -2" stroke="#fff" strokeWidth="3" opacity=".45" strokeLinecap="round" />
    </g>
  )
}

function Brows({ brow, pal }) {
  const d = {
    sad: 'M104 100 q16 -2 36 -12 M160 88 q20 10 36 12',
    neutral: 'M104 92 q18 -4 36 -2 M160 90 q18 -2 36 2',
    confident: 'M104 88 q18 -8 36 0 M160 88 q18 -8 36 0',
    smug: 'M104 92 q18 -2 36 2 M160 82 q18 -12 36 -4'
  }[brow]
  return <path d={d} stroke={pal.line} strokeWidth="5" fill="none" strokeLinecap="round" />
}

function Chains({ look }) {
  const n = look.neck
  return (
    <>
      {n === 'silver' && <path d="M124 186 q26 20 52 0" stroke="#cfd6dc" strokeWidth="2.5" fill="none" />}
      {n === 'goldThin' && <path d="M122 186 q28 24 56 0" stroke="#f2c14e" strokeWidth="3" fill="none" />}
      {(n === 'goldThick' || n === 'medallion') && <path d="M118 186 q32 30 64 0" stroke="#f2c14e" strokeWidth="6" fill="none" strokeDasharray="6 2" />}
      {n === 'medallion' && <g><circle cx="150" cy="222" r="15" fill="#f2c14e" stroke="#b8862b" strokeWidth="2.5" /><text x="150" y="229" textAnchor="middle" fontSize="18" fontWeight="900" fill="#8a5a12">₪</text></g>}
      {look.neck2 && <path d="M112 186 q38 44 76 0" stroke="#f2c14e" strokeWidth="4" fill="none" strokeDasharray="4 3" />}
    </>
  )
}

export default function Hero({ look, view = 'full', mood = '', palette = 'blue' }) {
  const pk = palette, pal = PALETTES[palette]
  const sleeve = LONG_SLEEVE[look.shirt]
  const pants = PANTS[look.pants]
  const suitPants = look.pants === 'suit' && look.shirt === 'suitWhite' ? '#f6f3ea' : pants
  const vb = view === 'bust' ? '26 -44 250 330' : '0 -44 310 464'
  return (
    <svg className={`hero ${mood}`} viewBox={vb} width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id={`h-skin-${pk}`} cx="45%" cy="35%" r="70%"><stop offset="0" stopColor={pal.hi} /><stop offset="1" stopColor={pal.lo} /></radialGradient>
        <radialGradient id={`h-belly-${pk}`} cx="50%" cy="30%" r="70%"><stop offset="0" stopColor="#fbf4e6" /><stop offset="1" stopColor="#e4d6bd" /></radialGradient>
      </defs>
      <ellipse cx="150" cy="405" rx="95" ry="10" fill="#000" opacity=".12" />
      <g className="h-all">
        <path className="h-tail" d="M190 330 q55 10 70 -30 q-10 40 20 60 q-45 5 -80 -10z" fill={pal.lo} />
        {/* legs + trousers */}
        <path d="M112 325 q-6 40 -4 70 h30 q2 -30 -2 -70z" fill={suitPants || `url(#h-skin-${pk})`} />
        <path d="M162 325 q-2 40 2 70 h30 q2 -30 -6 -70z" fill={suitPants || `url(#h-skin-${pk})`} />
        {/* shoes */}
        {look.shoes === 'flipMismatch' && <><ellipse cx="118" cy="398" rx="26" ry="7" fill="#c9533f" /><ellipse cx="182" cy="398" rx="26" ry="7" fill="#3f7fc9" /><path d="M112 392 l6 -8 l6 8" stroke="#7a2e22" strokeWidth="3" fill="none" /><path d="M176 392 l6 -8 l6 8" stroke="#224f7a" strokeWidth="3" fill="none" /></>}
        {look.shoes === 'flip' && <><ellipse cx="118" cy="398" rx="26" ry="7" fill="#3f7fc9" /><ellipse cx="182" cy="398" rx="26" ry="7" fill="#3f7fc9" /><path d="M112 392 l6 -8 l6 8 M176 392 l6 -8 l6 8" stroke="#224f7a" strokeWidth="3" fill="none" /></>}
        {(look.shoes === 'sneaker' || look.shoes === 'goldSneaker') && <><path d="M96 400 q0 -16 22 -16 q18 0 24 16z M158 400 q0 -16 22 -16 q18 0 24 16z" fill={look.shoes === 'goldSneaker' ? '#f2c14e' : '#fff'} stroke={look.shoes === 'goldSneaker' ? '#b8862b' : '#cfd6dc'} strokeWidth="2" /><path d="M100 398 h42 M162 398 h42" stroke={look.shoes === 'goldSneaker' ? '#fff' : '#d05a3f'} strokeWidth="3" /></>}
        {look.shoes === 'loafer' && <><ellipse cx="120" cy="397" rx="24" ry="9" fill="#8a5a32" /><ellipse cx="180" cy="397" rx="24" ry="9" fill="#8a5a32" /><path d="M110 392 h14 M170 392 h14" stroke="#f2c14e" strokeWidth="2.5" /></>}
        {look.shoes === 'dress' && <><ellipse cx="120" cy="397" rx="24" ry="9" fill="#1d1612" /><ellipse cx="180" cy="397" rx="24" ry="9" fill="#1d1612" /><ellipse cx="114" cy="393" rx="8" ry="3" fill="#fff" opacity=".35" /><ellipse cx="174" cy="393" rx="8" ry="3" fill="#fff" opacity=".35" /></>}
        {/* shorts / trousers top */}
        {look.pants === 'rag' ? (
          <>
            <path d="M96 272 h112 l8 70 q-30 8 -50 0 l-14 -30 l-14 30 q-22 8 -50 0z" fill="#8a7a5c" />
            {look.patch && <><rect x="110" y="300" width="22" height="18" fill="#b8925a" transform="rotate(-8 121 309)" /><path d="M110 302 l22 -3 M112 316 l22 -3" stroke="#6b5636" strokeWidth="1.5" strokeDasharray="3 2" /></>}
            <path d="M94 274 h116" stroke="#c9a86a" strokeWidth="6" strokeLinecap="round" />
            <path d="M150 274 q-6 14 -12 18 M150 274 q4 14 10 16" stroke="#c9a86a" strokeWidth="4" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M96 272 h112 l6 66 q-26 6 -44 0 l-10 -26 l-10 26 q-20 6 -44 0z" fill={suitPants} />
            <path d="M94 274 h116" stroke={look.pants === 'suit' ? '#111' : '#4a3122'} strokeWidth="6" strokeLinecap="round" />
            <rect x="143" y="270" width="14" height="9" rx="2" fill="#f2c14e" />
          </>
        )}
        {look.pocketsOut && <><path d="M98 280 q-18 6 -14 24 q12 4 18 -10z" fill="#efe6d2" stroke="#b8a67f" strokeWidth="2" /><path d="M206 280 q18 6 14 24 q-12 4 -18 -10z" fill="#efe6d2" stroke="#b8a67f" strokeWidth="2" /></>}

        <g className="h-upper">
          <path d="M92 190 q-6 50 4 86 h112 q10 -36 4 -86 q-58 -26 -120 0z" fill={`url(#h-skin-${pk})`} />
          <Shirt look={look} pal={pal} pk={pk} />
          {look.tie && <path d="M150 190 l-7 8 l7 44 l7 -44z" fill="#c0392b" />}
          <Chains look={look} />
          {look.fur && <path d="M84 196 q10 -26 40 -22 q-8 12 -2 20 q-14 -2 -18 12 q-10 -6 -20 -10z M216 196 q-10 -26 -40 -22 q8 12 2 20 q14 -2 18 12 q10 -6 20 -10z" fill="#8a6a4a" stroke="#6b4e32" strokeWidth="2" />}

          <g className="h-armL">
            <path d="M96 200 q-34 10 -44 40 q-4 12 8 12 q16 -24 40 -30z" fill={sleeve || `url(#h-skin-${pk})`} />
            {look.cufflinks && <circle cx="60" cy="243" r="3" fill="#f2c14e" />}
            {look.bracelet && <path d="M52 240 q8 -6 16 0" stroke="#f2c14e" strokeWidth="3" fill="none" />}
            {look.watch2 && <rect x="52" y="236" width="14" height="8" rx="2" fill="#e8eef2" stroke="#9fb3c9" strokeWidth="1.5" transform="rotate(-35 59 240)" />}
            <LeftItem look={look} />
            <Hand x={56} y={250} rings={Math.max(0, look.rings - 3)} skin={pal.hand} />
          </g>
          <g className="h-armR">
            <path d="M208 200 q34 10 44 40 q4 12 -8 12 q-16 -24 -40 -30z" fill={sleeve || `url(#h-skin-${pk})`} />
            {look.cufflinks && <circle cx="240" cy="243" r="3" fill="#f2c14e" />}
            {look.watch !== 'none' && (
              <rect x="232" y="235" width="15" height="9" rx="2.5" transform="rotate(35 239 240)"
                fill={look.watch === 'plastic' ? '#e0344b' : look.watch === 'gold' ? '#f2c14e' : '#e8eef2'}
                stroke={look.watch === 'diamond' ? '#9fd3e6' : 'none'} strokeWidth="2" />
            )}
            <RightItem look={look} />
            <Hand x={244} y={256} rings={Math.min(look.rings, 3)} skin={pal.hand} />
          </g>

          <g className="h-head">
            <path d="M150 40 q-72 0 -86 78 q-4 50 36 70 q50 16 100 0 q40 -20 36 -70 q-14 -78 -86 -78z" fill={`url(#h-skin-${pk})`} />
            <path d="M92 150 q58 40 116 0 q-4 34 -58 42 q-54 -8 -58 -42z" fill={`url(#h-belly-${pk})`} />
            <path d="M78 120 q6 8 0 16 M84 116 q6 8 0 16 M222 120 q-6 8 0 16 M216 116 q-6 8 0 16" stroke={pal.line} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {look.earring !== 'none' && <circle cx="72" cy="140" r={look.earring === 'diamond' ? 5 : 3} fill={look.earring === 'diamond' ? '#c9f0ff' : '#f2c14e'} stroke={look.earring === 'diamond' ? '#7fc4e0' : '#b8862b'} strokeWidth="1.5" />}
            <g className="h-eyes">
              <ellipse cx="122" cy="108" rx="17" ry="19" fill="#fff" /><ellipse cx="178" cy="108" rx="17" ry="19" fill="#fff" />
              <circle cx="125" cy="112" r="8" fill="#2a2320" /><circle cx="175" cy="112" r="8" fill="#2a2320" />
              <circle cx="128" cy="109" r="2.5" fill="#fff" /><circle cx="178" cy="109" r="2.5" fill="#fff" />
            </g>
            <Brows brow={look.brow} pal={pal} />
            {look.brow === 'sad' && <path d="M108 128 q14 6 28 0 M164 128 q14 6 28 0" stroke={pal.hi} strokeWidth="2" fill="none" />}
            <Teeth look={look} />
            {look.bandage && <g transform="rotate(25 198 78)"><rect x="186" y="74" width="24" height="9" rx="3" fill="#e9c89a" /><path d="M192 74 v9 M198 76 v9" stroke="#c9a376" strokeWidth="1.5" /></g>}
            <Eyes look={look} />
            <Hat look={look} pal={pal} />
          </g>
        </g>
      </g>
    </svg>
  )
}
