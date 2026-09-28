import { useState } from 'react'
import { Foot, Cta } from './parts.jsx'
import { sfx } from '../../lib/sound.js'

// A short idea told in 2-4 tap-through cards, like stories.
import Hero from '../../components/Hero.jsx'

export default function Cards({ screen, next, look }) {
  const [i, setI] = useState(0)
  const last = i === screen.cards.length - 1
  const c = screen.cards[i]
  const text = Array.isArray(c) ? c[1] : c
  const [showSource, setShowSource] = useState(false)
  return (
    <>
      <div className="body">
        <div className="storycards">
          {screen.scene && i === 0 && (
            <div className="ch-top">
              <div className="ch-hero"><Hero look={look} view="bust" mood={screen.scene.mood || ''} /></div>
              <div className="ch-say"><p className="ch-scene">{screen.scene.text}</p>{screen.scene.say && <span className="hs-say small">{screen.scene.say}</span>}</div>
            </div>
          )}
          <div className="sc-dots">{screen.cards.map((_, k) => <i key={k} className={k <= i ? 'on' : ''} />)}</div>
          <button className="scard fade-in" key={i} onClick={() => { if (!last) { setI(i + 1); sfx.tap() } }}>
            {i === 0 && screen.title && <h3>{screen.title}</h3>}
            <p>{text}</p>
            {!last && <small>הקישו להמשך</small>}
          </button>
          {last && screen.source && (
            <>
              <button className="srcbtn" onClick={() => setShowSource((v) => !v)}>{showSource ? 'להסתיר מקורות' : 'מקורות'}</button>
              {showSource && <div className="srcbox fade-in">{screen.source}</div>}
            </>
          )}
        </div>
      </div>
      <Foot>{last ? <Cta onClick={next.go}>{next.label}</Cta> : <Cta ghost onClick={() => { setI(i + 1); sfx.tap() }}>הבא</Cta>}</Foot>
    </>
  )
}
