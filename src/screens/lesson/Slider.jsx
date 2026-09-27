import { useState } from 'react'
import { Foot, Cta } from './parts.jsx'
import { nis } from '../../lib/format.js'

export default function Slider({ screen, react, next }) {
  const s = screen
  const [val, setVal] = useState(Math.round((s.min + s.max) / 2 / s.step) * s.step)
  const [committed, setCommitted] = useState(false)
  const pct = (x) => ((x - s.min) / (s.max - s.min)) * 100

  return (
    <>
      <div className="body">
        <div className="fade-in">
          <h2 className="q">{s.prompt}</h2>
          {s.list && (
            <div className="list">
              {s.list.map(([k, n]) => <div key={k}><span>{k}</span><span className="ltr">{nis(n)}</span></div>)}
            </div>
          )}
          <div className="sliderbox">
            <div className="bigval ltr">{nis(val)}</div>
            <div className="track">
              <input type="range" min={s.min} max={s.max} step={s.step} value={val} disabled={committed}
                aria-label="הניחוש שלכם" onChange={(e) => setVal(+e.target.value)} />
            </div>
            {committed && (
              <div className="marks">
                <span className="mark guess" style={{ left: `${pct(val)}%` }}>הניחוש</span>
                <span className="mark real" style={{ left: `${pct(s.answer)}%` }}>{nis(s.answer)}</span>
              </div>
            )}
          </div>
          {committed && <div className="reveal fade-in">{s.reveal}</div>}
        </div>
      </div>
      <Foot>
        {committed
          ? <Cta onClick={next.go}>{next.label}</Cta>
          : <Cta onClick={() => { setCommitted(true); react(Math.abs(val - s.answer) <= s.tolerance) }}>זה הניחוש שלי</Cta>}
      </Foot>
    </>
  )
}
