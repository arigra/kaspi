import { useState } from 'react'
import { Foot, Cta } from './parts.jsx'
import { nis } from '../../lib/format.js'

// Play with one number and watch the result move. `compute(v)` returns
// { big, caption, fill (0..1), parts?: [[label, value, color]] }.
export default function Live({ screen, next }) {
  const s = screen
  const [v, setV] = useState(s.start ?? s.min)
  const [touched, setTouched] = useState(false)
  const r = s.compute(v)
  const fmt = s.format || ((x) => nis(x))
  return (
    <>
      <div className="body">
        <div className="fade-in">
          <h2 className="q">{s.prompt}</h2>
          <div className="livebox">
            <div className="lv-label">{s.label}: <b className="ltr">{fmt(v)}</b></div>
            <input type="range" min={s.min} max={s.max} step={s.step} value={v} aria-label={s.label}
              onChange={(e) => { setV(+e.target.value); setTouched(true) }} />
            <div className="lv-big ltr">{r.big}</div>
            {r.parts ? (
              <div className="lv-stack">{r.parts.map(([label, val, color]) => (
                <div key={label} style={{ flex: Math.max(val, 0.0001), background: color }}><span>{label}</span></div>
              ))}</div>
            ) : (
              <div className="lv-bar"><i style={{ width: `${Math.min(1, Math.max(0, r.fill)) * 100}%` }} /></div>
            )}
            <div className="lv-cap">{r.caption}</div>
          </div>
          {touched && s.takeaway && <div className="reveal fade-in">{s.takeaway}</div>}
        </div>
      </div>
      <Foot><Cta onClick={next.go} disabled={!touched}>{touched ? next.label : 'הזיזו את המחוון'}</Cta></Foot>
    </>
  )
}
