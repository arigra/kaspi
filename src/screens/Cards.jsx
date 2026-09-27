import { useState } from 'react'
import Header from './Header.jsx'
import Icon from '../components/Icon.jsx'
import { sfx } from '../lib/sound.js'

function Review({ cards, onDone }) {
  const [deck] = useState(() => [...cards].sort(() => Math.random() - 0.5).slice(0, 5))
  const [i, setI] = useState(0)
  const [shown, setShown] = useState(false)
  const [known, setKnown] = useState(0)
  if (i >= deck.length) return (
    <div className="review fade-in">
      <h2>ידעתם {known} מתוך {deck.length}</h2>
      <p>{known === deck.length ? 'מושלם. זה כבר אצלכם.' : 'מה שלא זכרתם יחזור בחזרה הבאה.'}</p>
      <button className="cta" onClick={onDone}>סיום</button>
    </div>
  )
  const c = deck[i]
  const step = (k) => { setKnown(known + k); setI(i + 1); setShown(false); sfx.tap() }
  return (
    <div className="review fade-in" key={i}>
      <small>{i + 1} / {deck.length} · {c.chapter}</small>
      <div className="rv-card"><p>{c.front}</p>{shown && <p className="rv-back fade-in">{c.back}</p>}</div>
      {!shown
        ? <button className="cta" onClick={() => { setShown(true); sfx.tap() }}>להציג תשובה</button>
        : <div className="row2"><button className="cta ghost" onClick={() => step(0)}>עוד לא</button><button className="cta" onClick={() => step(1)}>ידעתי</button></div>}
    </div>
  )
}

export default function Cards({ state, actions }) {
  const [open, setOpen] = useState({})
  const [review, setReview] = useState(false)
  const todos = state.profile.todos || []
  const doneTodo = (t) => { actions.setProfile({ ...state.profile, todos: todos.filter((x) => x !== t) }); sfx.good() }
  return (
    <>
      <Header cards={state.cards.length} onCards={actions.goCards} onSettings={actions.openSettings} />
      <div className="page fade-in">
        {review ? <Review cards={state.cards} onDone={() => setReview(false)} /> : (
          <>
            {todos.length > 0 && (
              <div className="todos">
                <h2>המשימות שלי</h2>
                {todos.map((t) => (
                  <button key={t} className="todo" onClick={() => doneTodo(t)}><span className="box"><Icon name="check" size={14} stroke={3} /></span>{t}</button>
                ))}
              </div>
            )}
            <h1>הכרטיסים שלי</h1>
            {state.cards.length >= 2 && <button className="cta reviewbtn" onClick={() => { setReview(true); sfx.tap() }}>חזרה קצרה · 5 שאלות</button>}
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
          </>
        )}
      </div>
      <div className="foot"><button className="cta ghost" onClick={actions.goHome}>חזרה למסלול</button></div>
    </>
  )
}
