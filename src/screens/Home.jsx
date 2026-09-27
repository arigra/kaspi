import Shark from '../components/Shark.jsx'
import ReefItem from '../components/ReefItem.jsx'
import Header from './Header.jsx'
import { STAGES } from '../content/index.js'

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
                    className={`node ${isDone ? 'done' : isNext ? 'active' : ''}`}
                    style={i % 2 === 0 ? { marginInlineEnd: 70 } : { marginInlineStart: 50 }}
                    onClick={() => actions.startLesson(c.id, i)}>
                    {isNext && <span className="startbub">להתחיל</span>}
                    {isDone ? '✓' : i + 1}
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

      <div className="reefbg">
        <span className="rock" style={{ left: '8%', width: 70, height: 46 }} />
        <span className="rock" style={{ right: '6%', width: 90, height: 58 }} />
        <span className="weed" style={{ left: '18%', height: 52 }} />
        <span className="weed" style={{ left: '22%', height: 38, animationDelay: '.6s' }} />
        <span className="weed" style={{ right: '24%', height: 60, animationDelay: '.3s' }} />
        <span className="weed" style={{ right: '20%', height: 40, animationDelay: '1s' }} />
        <div className="swimmer"><Shark /></div>
        <div className="sand" /><div className="cave" />
        {state.reef.map((k, i) => (
          <button key={k} className="item" aria-label="פריט בשונית"
            style={{ left: `calc(50% + ${-6 + i * 58}px)` }} onClick={() => actions.openItem(k)}>
            <ReefItem k={k} />
          </button>
        ))}
        <div className="label">{state.reef.length ? 'השונית שלכם · הקישו על פריט' : 'השונית שלכם · תתמלא עם כל פרק'}</div>
      </div>
    </>
  )
}
