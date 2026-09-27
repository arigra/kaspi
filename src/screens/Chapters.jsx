import Header from './Header.jsx'
import { STAGES } from '../content/index.js'

const TAGS = {
  done: <span className="tag ok">הושלם</span>,
  skipped: <span className="tag skip">דולג</span>,
  writing: <span className="tag">בקרוב</span>,
  open: <span className="tag go">פתוח</span>
}

export default function Chapters({ state, chapterStatus, actions }) {
  return (
    <>
      <Header cards={state.cards.length} onCards={actions.goCards} onSettings={actions.openSettings} />
      <div className="page fade-in">
        <h1>כל הפרקים</h1>
        <p>כל הפרקים הזמינים פתוחים. אפשר להתחיל מאיפה שרוצים.</p>
        {STAGES.map((stage, si) => (
          <div className="stageblock" key={stage.title}>
            <h2>שלב {si + 1} · {stage.title}</h2>
            {stage.chapters.map((c) => (
              <button key={c.id} className={`chrow ${c.writing ? 'soonch' : ''}`} disabled={c.writing} onClick={() => actions.openChapter(c.id)}>
                {c.title}{TAGS[chapterStatus(c)]}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="foot"><button className="cta ghost" onClick={actions.goHome}>חזרה למסלול</button></div>
    </>
  )
}
