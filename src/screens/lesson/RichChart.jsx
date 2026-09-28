import { useState } from 'react'
import { Foot, Cta } from './parts.jsx'
import { nis } from '../../lib/format.js'
import { IL } from '../../content/constants.js'

// What "getting rich" means, in one picture: each month the same amount is
// left over, so the pile in the side grows month by month.
const W = 320, H = 190, PAD = 24, MONTHS = 12, INCOME = 11300, TOP = 2500 * MONTHS
const bw = (W - PAD * 2) / MONTHS
const MONTH_NAMES = ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ']

// Same monthly amount over 20 years: kept aside vs invested (illustrative return).
const YEARS = 20
function Invested({ v }) {
  const r = IL.illustrationReturn / 12
  const kept = (y) => v * 12 * y
  const inv = (y) => v * (((1 + r) ** (12 * y) - 1) / r)
  const top = inv(YEARS) || 1
  const X = (y) => W - PAD - (y * (W - PAD * 2)) / YEARS
  const Y = (val) => H - PAD - (val / top) * (H - PAD * 2)
  const yrs = Array.from({ length: YEARS + 1 }, (_, i) => i)
  const line = (f) => yrs.map((y) => `${X(y)},${Y(f(y))}`).join(' ')
  const round = (x) => Math.round(x / 1000) * 1000
  return (
    <div className="richbox inv fade-in">
      <b className="inv-title">ומה אם את מה שנשאר משקיעים?</b>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" aria-label="חיסכון בצד מול השקעה לאורך 20 שנה">
        <line x1={PAD} x2={W - PAD} y1={H - PAD} y2={H - PAD} stroke="#c9c2ad" strokeWidth="2" />
        <polygon points={`${line(inv)} ${[...yrs].reverse().map((y) => `${X(y)},${Y(kept(y))}`).join(' ')}`} fill="#2f6e4b" opacity=".15" />
        <polyline points={line(kept)} fill="none" stroke="#c9962a" strokeWidth="4" strokeLinecap="round" />
        <polyline points={line(inv)} fill="none" stroke="#2f6e4b" strokeWidth="4" strokeLinecap="round" />
        <text x={PAD + 2} y={Math.max(14, Y(inv(YEARS)) - 6)} direction="ltr" fontSize="12" fontWeight="900" fill="#2f6e4b">{nis(round(inv(YEARS)))}</text>
        <text x={PAD + 2} y={Y(kept(YEARS)) + 16} direction="ltr" fontSize="12" fontWeight="900" fill="#8a5a12">{nis(round(kept(YEARS)))}</text>
        <text x={W - PAD} y={H - 8} textAnchor="end" fontSize="10" fill="#7a857d">היום</text>
        <text x={PAD} y={H - 8} textAnchor="end" fontSize="10" fill="#7a857d">עוד 20 שנה</text>
      </svg>
      <div className="inv-legend"><span><i style={{ background: '#c9962a' }} />בצד</span><span><i style={{ background: '#2f6e4b' }} />מושקע</span></div>
      <small className="inv-note">אותם {nis(v)} בחודש. תשואה של {Math.round(IL.illustrationReturn * 100)}% בשנה להמחשה בלבד, לא תחזית. השקעה יכולה גם לרדת.</small>
    </div>
  )
}

export default function RichChart({ screen, next }) {
  const [v, setV] = useState(1000)
  const [touched, setTouched] = useState(false)
  const saved = v * MONTHS
  const h = (m) => ((v * (m + 1)) / TOP) * (H - PAD * 2)
  return (
    <>
      <div className="body">
        <div className="fade-in">
          <h2 className="q">{screen.prompt}</h2>
          <div className="richbox">
            <div className="rich-flow"><span>נכנס <b className="ltr">{nis(INCOME)}</b></span><span>יוצא <b className="ltr">{nis(INCOME - v)}</b></span><span>נשאר <b className="ltr">{nis(v)}</b></span></div>
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" aria-label="כמה יש לכספי בצד, חודש אחרי חודש">
              <line x1={PAD} x2={W - PAD} y1={H - PAD} y2={H - PAD} stroke="#c9c2ad" strokeWidth="2" />
              {MONTH_NAMES.map((n, m) => {
                const bh = h(m), xx = W - PAD - (m + 1) * bw + 3
                return (
                  <g key={m}>
                    <rect x={xx} y={H - PAD - bh} width={bw - 6} height={bh} rx="4" fill="#f2c14e" stroke="#c9962a" strokeWidth={bh ? 1.5 : 0} style={{ transition: 'all .25s' }} />
                    <text x={xx + (bw - 6) / 2} y={H - 8} textAnchor="middle" fontSize="9" fill="#7a857d">{n}</text>
                  </g>
                )
              })}
              {v > 0 && <text x={PAD + 2} y={Math.max(12, H - PAD - h(MONTHS - 1) - 6)} direction="ltr" textAnchor="start" fontSize="12" fontWeight="900" fill="#8a5a12">{nis(saved)}</text>}
              {v === 0 && <text x={W / 2} y={H / 2} textAnchor="middle" fontSize="13" fill="#7a857d">אין כלום בצד. גם בדצמבר.</text>}
            </svg>
            <div className="lv-label">כמה כספי מוציא פחות בכל חודש: <b className="ltr">{nis(v)}</b></div>
            <input type="range" min="0" max="2500" step="100" value={v} aria-label="כמה פחות בכל חודש"
              onChange={(e) => { setV(+e.target.value); setTouched(true) }} />
            <div className={`rich-cap ${v > 0 ? 'good' : ''}`}>
              {v === 0
                ? 'כל מה שנכנס - יוצא. בצד לא מצטבר כלום, וכספי לא מתעשר. לא משנה כמה הוא מרוויח.'
                : <>אותו סכום קטן, כל חודש. מה שבצד גדל מחודש לחודש, ואחרי שנה יש לכספי <b className="ltr">{nis(saved)}</b>. ככה נראה להתעשר.</>}
            </div>
          </div>
          {v > 0 && <Invested v={v} />}
        </div>
      </div>
      <Foot><Cta onClick={next.go} disabled={!touched}>{touched ? next.label : 'הזיזו את המחוון'}</Cta></Foot>
    </>
  )
}
