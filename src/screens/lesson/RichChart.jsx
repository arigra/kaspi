import { useState } from 'react'
import { Foot, Cta } from './parts.jsx'
import { nis } from '../../lib/format.js'

// What "getting rich" means, in one picture: each month the same amount is
// left over, so the pile in the side grows month by month.
const W = 320, H = 190, PAD = 24, MONTHS = 12, INCOME = 9000, TOP = 1500 * MONTHS
const bw = (W - PAD * 2) / MONTHS
const MONTH_NAMES = ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ']

export default function RichChart({ screen, next }) {
  const [v, setV] = useState(0)
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
            <input type="range" min="0" max="1500" step="100" value={v} aria-label="כמה פחות בכל חודש"
              onChange={(e) => { setV(+e.target.value); setTouched(true) }} />
            <div className={`rich-cap ${v > 0 ? 'good' : ''}`}>
              {v === 0
                ? 'כל מה שנכנס - יוצא. בצד לא מצטבר כלום, וכספי לא מתעשר. לא משנה כמה הוא מרוויח.'
                : <>אותו סכום קטן, כל חודש. מה שבצד גדל מחודש לחודש, ואחרי שנה יש לכספי <b className="ltr">{nis(saved)}</b>. ככה נראה להתעשר.</>}
            </div>
          </div>
        </div>
      </div>
      <Foot><Cta onClick={next.go} disabled={!touched}>{touched ? next.label : 'הזיזו את המחוון'}</Cta></Foot>
    </>
  )
}
