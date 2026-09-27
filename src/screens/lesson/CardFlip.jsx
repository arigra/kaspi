import { useEffect, useState } from 'react'
import { Foot, Cta } from './parts.jsx'
import { sfx } from '../../lib/sound.js'

export default function CardFlip({ card, next }) {
  const [flipped, setFlipped] = useState(false)
  useEffect(() => {
    sfx.card()
    const t = setTimeout(() => setFlipped(true), 1100)
    return () => clearTimeout(t)
  }, [])
  return (
    <>
      <div className="body">
        <div className="fade-in">
          <div className="newcard">כרטיס חדש לאוסף</div>
          <div className="cardwrap" onClick={() => { setFlipped((f) => !f); sfx.tap() }}>
            <div className={`flip ${flipped ? 'on' : ''}`}>
              <div className="face front"><small>שאלה</small><p>{card.front}</p><small>הקישו כדי להפוך</small></div>
              <div className="face back"><small>התובנה</small><p>{card.back}</p></div>
            </div>
          </div>
        </div>
      </div>
      <Foot><Cta onClick={next.go}>{next.label}</Cta></Foot>
    </>
  )
}
