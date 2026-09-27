import Hero from '../components/Hero.jsx'
import { heroLook, coinsOf } from '../content/upgrades.js'
import Header from './Header.jsx'
import { STAGES } from '../content/index.js'
import { iconFor } from '../content/icons.js'
import Icon from '../components/Icon.jsx'

export default function Home({ state, stageIndex, currentChapterId, chapterStatus, actions }) {
  const stage = STAGES[stageIndex]
  let activeShown = false
  const heroOnPath = stage.chapters.some((c) => c.id === currentChapterId)
  const heroBtn = (
    <button className="pathhero" aria-label="העולם של הכריש" onClick={actions.openWorld}>
      <Hero look={heroLook(coinsOf(state))} view="bust" />
      <span className="herotag"><Icon name="coin" size={13} /> {coinsOf(state)}</span>
    </button>
  )

  return (
    <>
      <Header cards={state.cards.length} onCards={actions.goCards} onSettings={actions.openSettings} />
      <div className="stagehead fade-in">
        <div><small>שלב {stageIndex + 1} מתוך {STAGES.length}</small><h1>{stage.title}</h1></div>
        <button className="linkbtn" onClick={actions.goChapters}>כל הפרקים</button>
      </div>

      {!heroOnPath && <div className="herohead">{heroBtn}</div>}
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
              {currentChapterId === c.id && heroBtn}
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
                    <span className="isle-ico"><Icon name={iconFor(l)} size={30} stroke={2.2} /></span>
                    {isDone && <span className="isle-done"><Icon name="check" size={14} stroke={3} /></span>}
                  </button>
                )
              })}
              <button aria-label="אתגר פרק" style={{ marginInlineEnd: 40 }}
                className={`node chal ${state.chapterDone[c.id] ? 'done' : allDone ? 'ready' : ''}`}
                onClick={() => actions.startChallenge(c.id)}>
                <Icon name={state.chapterDone[c.id] ? 'check' : 'trophy'} size={30} />
              </button>
            </div>
          </div>
        )
      })}

      <div style={{ height: 40 }} />
    </>
  )
}
