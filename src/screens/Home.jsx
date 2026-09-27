import Shark from '../components/Shark.jsx'
import Scene from '../components/Scene.jsx'
import { heroLevel, coinsOf } from '../content/upgrades.js'
import Header from './Header.jsx'
import { STAGES } from '../content/index.js'
import { iconFor } from '../content/icons.js'

export default function Home({ state, stageIndex, currentChapterId, chapterStatus, actions }) {
  const stage = STAGES[stageIndex]
  let activeShown = false

  return (
    <>
      <Header cards={state.cards.length} onCards={actions.goCards} onSettings={actions.openSettings} />
      <div className="stagehead fade-in">
        <div><small>שלב {stageIndex + 1} מתוך {STAGES.length}</small><h1>{stage.title}</h1></div>
        <button className="linkbtn" onClick={actions.goChapters}>כל הפרקים</button>
      </div>

      {stage.chapters.map((c) => {
        const status = chapterStatus(c)
        if (status === 'writing') {
          return <div key={c.id} className="unit writing"><div><b>{c.title}</b><span>הפרק הזה עוד נכתב</span></div></div>
        }
        const done = state.done[c.id] || []
        const allDone = done.length === c.lessons.length
        const tag = status === 'done' ? 'הפרק הושלם'
          : status === 'skipped' ? 'דילגתם — אפשר לחזור בכל רגע'
            : `${done.length}/${c.lessons.length} שיעורים · ואז אתגר`
        return (
          <div key={c.id}>
            <div className={`unit ${status === 'done' ? 'done' : ''}`}>
              <div><b>{c.title}</b><span>{tag}</span></div>
              {status === 'open' && <button className="skip" onClick={() => actions.skipChapter(c.id)}>לדלג</button>}
            </div>
            <div className="nodes">
              {currentChapterId === c.id && <div className="pathshark"><Shark bubbles /></div>}
              {c.lessons.map((l, i) => {
                const isDone = done.includes(i)
                const isNext = !activeShown && currentChapterId === c.id && !isDone
                if (isNext) activeShown = true
                return (
                  <button key={i} aria-label={l.title}
                    className={`node isle ${isDone ? 'done' : isNext ? 'active' : ''}`}
                    style={i % 2 === 0 ? { marginInlineEnd: 70 } : { marginInlineStart: 50 }}
                    onClick={() => actions.startLesson(c.id, i)}>
                    {isNext && <span className="startbub">להתחיל</span>}
                    <span className="isle-ico">{iconFor(l)}</span>
                    {isDone && <span className="isle-done">✓</span>}
                  </button>
                )
              })}
              <button aria-label="אתגר פרק" style={{ marginInlineEnd: 40 }}
                className={`node chal ${state.chapterDone[c.id] ? 'done' : allDone ? 'ready' : ''}`}
                onClick={() => actions.startChallenge(c.id)}>
                {state.chapterDone[c.id] ? '✓' : '🏆'}
              </button>
            </div>
          </div>
        )
      })}

      <div className="homepad" />
      <div className="homescene"><Scene level={heroLevel(state)} coins={coinsOf(state)} /></div>
    </>
  )
}
