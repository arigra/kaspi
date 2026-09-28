import { useState } from 'react'
import { Foot, Cta } from './parts.jsx'
import { nis } from '../../lib/format.js'

// What "getting rich" means, in one picture: money in vs money out over a year.
// The shaded gap is what stays. If it widens every month, you're getting richer.
const W = 320, H = 190, PAD = 26, MONTHS = 12, INCOME = 9000, LO = 7000, HI = 9400
const x = (m) => PAD + (m * (W - PAD * 2)) / (MONTHS - 1)
const y = (v) => H - PAD - ((v - LO) * (H - PAD * 2)) / (HI - LO)

export default function RichChart({ screen, next }) {
  const [v, setV] = useState(0)
  const [touched, setTouched] = useState(false)
  const exp = Array.from({ length: MONTHS }, (_, m) => INCOME - v * (m + 1))
  const saved = exp.reduce((a, e) => a + (INCOME - e), 0)
  const inLine = exp.map((_, m) => `${x(m)},${y(INCOME)}`).join(' ')
  const outLine = exp.map((e, m) => `${x(m)},${y(e)}`).join(' ')
  const gap = `${inLine} ${exp.map((e, m) => `${x(MONTHS - 1 - m)},${y(exp[MONTHS - 1 - m])}`).join(' ')}`
  return (
    <>
      <div className="body">
        <div className="fade-in">
          <h2 className="q">{screen.prompt}</h2>
          <div className="richbox">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" aria-label="גרף הכנסות והוצאות">
              <polygon points={gap} fill="#f2c14e" opacity=".45" />
              <polyline points={inLine} fill="none" stroke="#2f6e4b" strokeWidth="4" strokeLinecap="round" />
              <polyline points={outLine} fill="none" stroke="#c9533f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <text x={W - PAD} y={y(INCOME) - 8} textAnchor="end" fontSize="12" fontWeight="800" fill="#2f6e4b">נכנס</text>
              <text x={W - PAD} y={Math.min(H - 6, y(exp[MONTHS - 1]) + 16)} textAnchor="end" fontSize="12" fontWeight="800" fill="#c9533f">יוצא</text>
              {v > 0 && <text x={x(MONTHS - 1) - 6} y={(y(INCOME) + y(exp[MONTHS - 1])) / 2 + 4} textAnchor="end" fontSize="12" fontWeight="900" fill="#8a5a12">נשאר</text>}
              <text x={PAD} y={H - 6} fontSize="11" fill="#7a857d">ינואר</text>
              <text x={W - PAD} y={H - 6} textAnchor="end" fontSize="11" fill="#7a857d">דצמבר</text>
            </svg>
            <div className="lv-label">כמה פחות כספי מוציא, עוד קצת בכל חודש: <b className="ltr">{nis(v)}</b></div>
            <input type="range" min="0" max="150" step="10" value={v} aria-label="כמה פחות בכל חודש"
              onChange={(e) => { setV(+e.target.value); setTouched(true) }} />
            <div className={`rich-cap ${v > 0 ? 'good' : ''}`}>
              {v === 0
                ? 'כל מה שנכנס - יוצא. הפער לא גדל, וכספי לא מתעשר. לא משנה כמה הוא מרוויח.'
                : <>הפער גדל כל חודש. אחרי שנה נשארו לכספי <b className="ltr">{nis(saved)}</b>. ככה נראה להתעשר.</>}
            </div>
          </div>
        </div>
      </div>
      <Foot><Cta onClick={next.go} disabled={!touched}>{touched ? next.label : 'הזיזו את המחוון'}</Cta></Foot>
    </>
  )
}
