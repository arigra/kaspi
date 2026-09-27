import { useState } from 'react'
import Header from './Header.jsx'
import { sfx } from '../lib/sound.js'

export default function Cards({ state, actions }) {
  const [open, setOpen] = useState({})
  return (
    <>
      <Header cards={state.cards.length} onCards={actions.goCards} onSettings={actions.openSettings} />
      <div className="page fade-in">
        <h1>הכרטיסים שלי</h1>
        <p>כל תובנה שאספתם. הקישו כדי להפוך.</p>
        {state.cards.length ? (
          <div className="cardsgrid">
            {state.cards.map((c, i) => (
              <button key={i} className="mini" onClick={() => { setOpen((o) => ({ ...o, [i]: !o[i] })); sfx.tap() }}>
                <div className={`flip ${open[i] ? 'on' : ''}`}>
                  <div className="face front"><small>{c.chapter}</small><p>{c.front}</p></div>
                  <div className="face back"><p>{c.back}</p></div>
                </div>
              </button>
            ))}
          </div>
        ) : <div className="empty">עוד אין כרטיסים. כל שיעור שמסיימים מוסיף אחד.</div>}
      </div>
      <div className="foot"><button className="cta ghost" onClick={actions.goHome}>חזרה למסלול</button></div>
    </>
  )
}
