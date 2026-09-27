import { useState } from 'react'
import { Foot, Cta } from './parts.jsx'
import { sfx } from '../../lib/sound.js'

const LETTERS = ['א', 'ב', 'ג', 'ד']

export default function Predict({ screen, react, next }) {
  const [picked, setPicked] = useState(null)
  const [committed, setCommitted] = useState(false)

  const commit = () => { setCommitted(true); react(picked === screen.answer) }

  return (
    <>
      <div className="body">
        <div className="fade-in">
          {screen.label && <span className="chip-label">{screen.label}</span>}
          <h2 className="q">{screen.prompt}</h2>
          <div className="opts">
            {screen.options.map((o, i) => {
              let cls = 'opt'
              if (committed) { if (i === screen.answer) cls += ' right'; else if (i === picked) cls += ' yours' }
              else if (i === picked) cls += ' sel'
              return (
                <button key={i} className={cls} disabled={committed} onClick={() => { setPicked(i); sfx.tap() }}>
                  <span className="l">{LETTERS[i]}</span><span>{o}</span>
                  {committed && i === screen.answer && <small>התשובה</small>}
                  {committed && i === picked && i !== screen.answer && <small>הניחוש שלכם</small>}
                </button>
              )
            })}
          </div>
          {committed && <div className="reveal fade-in">{screen.reveal}</div>}
        </div>
      </div>
      <Foot>
        {committed
          ? <Cta onClick={next.go}>{next.label}</Cta>
          : <Cta onClick={commit} disabled={picked === null}>זה הניחוש שלי</Cta>}
      </Foot>
    </>
  )
}
