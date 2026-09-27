import { useState } from 'react'
import Hero from '../../components/Hero.jsx'
import { Foot, Cta } from './parts.jsx'
import { sfx } from '../../lib/sound.js'

// The hero has to decide. Every option plays out; none is "wrong", some just end badly.
export default function Choice({ screen, next, look }) {
  const [picked, setPicked] = useState(null)
  const o = picked === null ? null : screen.options[picked]
  const choose = (i) => {
    setPicked(i)
    screen.options[i].good ? sfx.good() : sfx.soft()
  }
  return (
    <>
      <div className="body">
        <div className="fade-in">
          <div className="ch-top">
            <div className="ch-hero"><Hero look={look} view="bust" mood={o ? (o.good ? 'happy' : 'oops') : ''} /></div>
            <h2 className="q">{screen.prompt}</h2>
          </div>
          {!o ? (
            <div className="opts">
              {screen.options.map((op, i) => (
                <button key={i} className="opt" onClick={() => choose(i)}><span className="l">{op.emoji || '👉'}</span><span>{op.t}</span></button>
              ))}
            </div>
          ) : (
            <div className={`outcome ${o.good ? 'good' : 'bad'} fade-in`}>
              <div className="oc-pick">{o.emoji || '👉'} {o.t}</div>
              <div className="oc-out">{o.out}</div>
              {!o.good && <button className="linkbtn" onClick={() => setPicked(null)}>לנסות משהו אחר</button>}
            </div>
          )}
        </div>
      </div>
      <Foot>{o && <Cta onClick={next.go}>{next.label}</Cta>}</Foot>
    </>
  )
}
