import { useRef, useState } from 'react'
import { Foot, Cta } from './parts.jsx'
import { sfx } from '../../lib/sound.js'

export default function Swipe({ screen, react, next }) {
  const [i, setI] = useState(0)
  const [ans, setAns] = useState(null)
  const [dx, setDx] = useState(0)
  const drag = useRef(null)
  const card = screen.cards[i]
  const last = i === screen.cards.length - 1
  const right = ans !== null && (ans === 'fact') === card.isTrue

  const answer = (v) => {
    const ok = (v === 'fact') === card.isTrue
    setAns(v); setDx(0); react(ok, ok ? 'נכון!' : 'לא בדיוק — זה מה שמטעה')
  }
  const onDown = (e) => { drag.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId) }
  const onMove = (e) => { if (drag.current !== null) setDx(e.clientX - drag.current) }
  const onUp = () => {
    if (drag.current === null) return
    drag.current = null
    if (dx > 80) answer('fact'); else if (dx < -80) answer('myth'); else setDx(0)
  }

  return (
    <>
      <div className="body">
        <div className="fade-in">
          <h2 className="q">{screen.prompt}</h2>
          <div className="swwrap">
            <div className={`swcard ${drag.current !== null ? 'dragging' : ''}`}
              style={{ transform: dx ? `translateX(${dx}px) rotate(${dx / 18}deg)` : undefined }}
              {...(ans === null ? { onPointerDown: onDown, onPointerMove: onMove, onPointerUp: onUp, onPointerCancel: onUp } : {})}>
              {ans === null && <>
                <span className="swhint l" style={{ opacity: Math.max(0, Math.min(1, -dx / 80)) }}>מיתוס</span>
                <span className="swhint r" style={{ opacity: Math.max(0, Math.min(1, dx / 80)) }}>עובדה</span>
              </>}
              {card.text}
            </div>
          </div>
          <div className="swcount">{i + 1} מתוך {screen.cards.length}</div>
          {ans === null
            ? <div className="swbtns"><button onClick={() => answer('myth')}>מיתוס</button><button onClick={() => answer('fact')}>עובדה</button></div>
            : <div className={`fb ${right ? 'good' : 'soft'} fade-in`}><b>{card.isTrue ? 'זו עובדה.' : 'זה מיתוס.'}</b>{card.why}</div>}
        </div>
      </div>
      <Foot>
        {ans === null
          ? <Cta ghost disabled>בחרו צד</Cta>
          : last
            ? <Cta onClick={next.go}>{next.label}</Cta>
            : <Cta onClick={() => { setI(i + 1); setAns(null); sfx.tap() }}>הכרטיס הבא</Cta>}
      </Foot>
    </>
  )
}
