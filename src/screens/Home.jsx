import { useEffect } from 'react'
import Hero from '../components/Hero.jsx'
import { heroLook, coinsOf } from '../content/upgrades.js'
import Header from './Header.jsx'
import { STAGES } from '../content/index.js'
import { iconFor } from '../content/icons.js'
import Icon from '../components/Icon.jsx'

const goalOf = (l) => l.goal || l.card?.front

export default function Home({ state, stageIndex, setStage, next, focusChapter, chapterStatus, actions }) {
  const stage = STAGES[stageIndex]
  const ready = stage.chapters.filter((c) => !c.writing)
  const soon = stage.chapters.filter((c) => c.writing)
  const look = heroLook(coinsOf(state))

  useEffect(() => {
    if (!focusChapter) return
    const el = document.getElementById(`ch-${focusChapter}`)
    if (el) el.scrollIntoView({ block: 'start' })
  }, [focusChapter, stageIndex])

  return (
    <>
      <Header cards={state.cards.length} onCards={actions.goCards} onSettings={actions.openSettings} />

      {next && (
        <div className="nextup fade-in">
          <button className="nu-hero" aria-label="העולם של הכריש" onClick={actions.openWorld}>
            <Hero look={look} view="bust" />
            <span className="herotag"><Icon name="coin" size={13} /> {coinsOf(state)}</span>
          </button>
          <div className="nu-body">
            <small>השיעור הבא · {next.chapter.title}</small>
            <b>{next.lesson.title}</b>
            <span className="nu-meta"><Icon name="clock" size={14} /> {next.lesson.minutes} דק׳ · {goalOf(next.lesson)}</span>
            <button className="cta nu-cta" onClick={() => actions.startLesson(next.chapter.id, next.index)}>להמשיך</button>
          </div>
        </div>
      )}

      <div className="stagehead">
        <button className="stagenav" aria-label="השלב הקודם" disabled={stageIndex === 0} onClick={() => setStage(stageIndex - 1)}>›</button>
        <div className="sh-mid"><small>שלב {stageIndex + 1} מתוך {STAGES.length}</small><h1>{stage.title}</h1></div>
        <button className="stagenav" aria-label="השלב הבא" disabled={stageIndex === STAGES.length - 1} onClick={() => setStage(stageIndex + 1)}>‹</button>
      </div>
      <div className="allch"><button className="linkbtn" onClick={actions.goChapters}>כל הפרקים</button></div>

      {ready.map((c) => {
        const status = chapterStatus(c)
        const done = state.done[c.id] || []
        const allDone = done.length === c.lessons.length
        const tag = status === 'done' ? 'הפרק הושלם'
          : status === 'skipped' ? 'דילגתם — אפשר לחזור בכל רגע'
            : `${done.length} מתוך ${c.lessons.length} שיעורים`
        return (
          <div key={c.id} id={`ch-${c.id}`} className="chapter">
            <div className={`unit ${status === 'done' ? 'done' : ''}`}>
              <div><b>{c.title}</b><span>{tag}</span></div>
              {status === 'open' && !done.length && <button className="skip" onClick={() => actions.skipChapter(c.id)}>לדלג</button>}
            </div>
            <div className="lessons">
              {c.lessons.map((l, i) => {
                const isDone = done.includes(i)
                const isNext = next && next.chapter.id === c.id && next.index === i
                return (
                  <button key={i} className={`lrow ${isDone ? 'done' : isNext ? 'active' : ''}`} onClick={() => actions.startLesson(c.id, i)}>
                    <span className={`node isle ${isDone ? 'done' : isNext ? 'active' : ''}`}>
                      <span className="isle-ico"><Icon name={iconFor(l)} size={26} stroke={2.2} /></span>
                      {isDone && <span className="isle-done"><Icon name="check" size={13} stroke={3} /></span>}
                    </span>
                    <span className="lr-text"><b>{l.title}</b><small>{l.minutes} דק׳{isNext ? ' · הבא בתור' : ''}</small></span>
                  </button>
                )
              })}
              <button className={`lrow chalrow ${state.chapterDone[c.id] ? 'done' : allDone ? 'ready' : ''}`} onClick={() => actions.startChallenge(c.id)}>
                <span className={`node chal ${state.chapterDone[c.id] ? 'done' : allDone ? 'ready' : ''}`}><Icon name={state.chapterDone[c.id] ? 'check' : 'trophy'} size={26} /></span>
                <span className="lr-text"><b>אתגר הפרק</b><small>{state.chapterDone[c.id] ? 'הושלם · השדרוג הגדול התקבל' : 'שדרוג גדול לעולם של הכריש'}</small></span>
              </button>
            </div>
          </div>
        )
      })}

      {soon.length > 0 && (
        <div className="soon">
          <h3>בקרוב בשלב הזה</h3>
          {soon.map((c) => <div key={c.id} className="soonrow"><Icon name="clock" size={16} /> {c.title}</div>)}
        </div>
      )}

      {stageIndex < STAGES.length - 1 && (
        <button className="cta ghost stagenext" onClick={() => setStage(stageIndex + 1)}>לשלב {stageIndex + 2}: {STAGES[stageIndex + 1].title}</button>
      )}
      <div style={{ height: 40 }} />
    </>
  )
}
