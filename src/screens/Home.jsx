import { useEffect } from 'react'
import Hero from '../components/Hero.jsx'
import { heroLook, coinsOf } from '../content/upgrades.js'
import Header from './Header.jsx'
import { STAGES } from '../content/index.js'
import { iconFor } from '../content/icons.js'
import Icon from '../components/Icon.jsx'
import RegionArt from '../components/RegionArt.jsx'
import { REGIONS } from '../content/regions.js'

const goalOf = (l) => l.goal || l.card?.front

// A little gate on the road at the start of each chapter; its flag turns green when done.
function Gate({ n, done }) {
  return (
    <svg className="gate" viewBox="0 0 120 54" width="120" height="54" aria-hidden="true">
      <rect x="10" y="10" width="8" height="44" rx="2" fill="#8a6a4a" /><rect x="102" y="10" width="8" height="44" rx="2" fill="#8a6a4a" />
      <path d="M6 14 Q60 -6 114 14" stroke="#8a6a4a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M60 4 v-4" stroke="#555" strokeWidth="2" />
      <path d="M60 0 l18 6 l-18 6z" fill={done ? '#2f6e4b' : '#e0344b'} className="gate-flag" />
      <rect x="40" y="18" width="40" height="16" rx="4" fill="#fbf4e6" stroke="#c9b27a" />
      <text x="60" y="30" textAnchor="middle" fontSize="10" fontWeight="900" fill="#6b5a2e">פרק {n}</text>
    </svg>
  )
}

// Dashed trail from the previous island to this one (rows zig-zag by 44px).
function Trail({ i }) {
  if (i === 0) return null
  const W = 130, from = W - (i % 2 === 1 ? 36 : 80), to = W - (i % 2 === 1 ? 80 : 36)
  return (
    <svg className="trail" width={W} height="34" viewBox={`0 0 ${W} 34`} aria-hidden="true">
      <path d={`M${from} 0 C${from} 17, ${to} 17, ${to} 34`} fill="none" stroke="#c9b27a" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
    </svg>
  )
}

export default function Home({ state, stageIndex, setStage, next, focusChapter, chapterStatus, actions }) {
  const stage = STAGES[stageIndex]
  const ready = stage.chapters.filter((c) => !c.writing && !c.extra)
  const deep = stage.chapters.filter((c) => !c.writing && c.extra)
  const soon = stage.chapters.filter((c) => c.writing)
  const look = heroLook(coinsOf(state))
  const region = REGIONS[stageIndex]

  useEffect(() => {
    document.documentElement.style.setProperty('--bg', region.bg)
    return () => { document.documentElement.style.removeProperty('--bg') }
  }, [region])

  useEffect(() => {
    if (!focusChapter) return
    const el = document.getElementById(`ch-${focusChapter}`)
    if (el) el.scrollIntoView({ block: 'start' })
  }, [focusChapter, stageIndex])

  const renderChapter = (c, ci) => {
    const status = chapterStatus(c)
    const done = state.done[c.id] || []
    const allDone = done.length === c.lessons.length
    const tag = status === 'done' ? 'הפרק הושלם'
      : status === 'skipped' ? 'דילגתם - אפשר לחזור בכל רגע'
        : `${done.length} מתוך ${c.lessons.length} שיעורים`
    return (
      <div key={c.id} id={`ch-${c.id}`} className="chapter">
        <div className="gatewrap"><Gate n={ci + 1} done={status === 'done'} /></div>
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
                <Trail i={i} />
                <span className={`node isle ${isDone ? 'done' : isNext ? 'active' : ''}`}>
                  <span className="isle-ico"><Icon name={iconFor(l, i)} size={26} stroke={2.2} /></span>
                  {isDone && <span className="isle-done"><Icon name="check" size={13} stroke={3} /></span>}
                </span>
                <span className="lr-text"><b>{l.title}</b><small>{l.minutes} דק׳{isNext ? ' · הבא בתור' : ''}</small></span>
              </button>
            )
          })}
          <button className={`lrow chalrow ${state.chapterDone[c.id] ? 'done' : allDone ? 'ready' : ''}`} onClick={() => actions.startChallenge(c.id)}>
            <Trail i={c.lessons.length} />
            <span className={`node chal ${state.chapterDone[c.id] ? 'done' : allDone ? 'ready' : ''}`}><Icon name={state.chapterDone[c.id] ? 'check' : 'trophy'} size={26} /></span>
            <span className="lr-text"><b>אתגר הפרק</b><small>{state.chapterDone[c.id] ? 'הושלם · השדרוג הגדול התקבל' : 'שדרוג גדול לעולם של כספי'}</small></span>
          </button>
        </div>
      </div>
    )
      }

  return (
    <>
      <Header cards={state.cards.length} onCards={actions.goCards} onSettings={actions.openSettings} />

      {next && (
        <div className="nextup fade-in">
          <button className="nu-hero" aria-label="העולם של כספי" onClick={actions.openWorld}>
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

      <div className="regionhead">
        <RegionArt kind={region.key} />
        <div className="rh-over">
          <button className="stagenav" aria-label="השלב הקודם" disabled={stageIndex === 0} onClick={() => setStage(stageIndex - 1)}>›</button>
          <div className="sh-mid"><small>שלב {stageIndex + 1} מתוך {STAGES.length}</small><h1>{region.name}</h1><span>{stage.title}</span></div>
          <button className="stagenav" aria-label="השלב הבא" disabled={stageIndex === STAGES.length - 1} onClick={() => setStage(stageIndex + 1)}>‹</button>
        </div>
      </div>
      <div className="allch"><button className="linkbtn" onClick={actions.goChapters}>המפה</button></div>

      {ready.map(renderChapter)}

      {deep.length > 0 && (
        <div className="deep">
          <h3>להעמקה</h3>
          <p>פרקים לפי הצורך. לא חובה כדי להתקדם.</p>
          {deep.map((c, i) => renderChapter(c, ready.length + i))}
        </div>
      )}

      {soon.length > 0 && (
        <div className="soon">
          <h3>בקרוב בשלב הזה</h3>
          {soon.map((c) => <div key={c.id} className="soonrow"><Icon name="clock" size={16} /> {c.title}</div>)}
        </div>
      )}

      {stageIndex < STAGES.length - 1 && (
        <button className="cta ghost stagenext" onClick={() => setStage(stageIndex + 1)}>לשלב {stageIndex + 2}: {REGIONS[stageIndex + 1].name}</button>
      )}
      <div style={{ height: 40 }} />
    </>
  )
}
