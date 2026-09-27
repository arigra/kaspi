import { useEffect, useState } from 'react'
import { usePersistentState, initialState } from './state/store.js'
import { CHAPTERS, chapterById, challengeScreens } from './content/index.js'
import { sfx, setMuted } from './lib/sound.js'
import Onboarding from './screens/Onboarding.jsx'
import Home from './screens/Home.jsx'
import Lesson from './screens/Lesson.jsx'
import { LessonDone, UpgradeReveal } from './screens/Done.jsx'
import Chapters from './screens/Chapters.jsx'
import Cards from './screens/Cards.jsx'
import { ItemSheet, SettingsSheet } from './screens/Sheets.jsx'
import { heroLevel, coinsOf } from './content/upgrades.js'

export default function App() {
  const [state, setState] = usePersistentState()
  const [view, setView] = useState(state.onboarded ? 'home' : 'onboarding')
  const [play, setPlay] = useState(null)   // { chapterId, lesson } — lesson -1 is the challenge
  const [sheet, setSheet] = useState(null) // { type: 'item' | 'settings', key? }
  const [toast, setToast] = useState(null)

  useEffect(() => { setMuted(state.muted) }, [state.muted])

  const update = (patch) => setState((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }))
  const go = (v) => { setView(v); setSheet(null); window.scrollTo(0, 0) }
  const flash = (text) => { setToast(text); setTimeout(() => setToast((t) => (t === text ? null : t)), 2200) }

  const chapterStatus = (c) => {
    if (c.writing) return 'writing'
    if (state.chapterDone[c.id]) return 'done'
    if (state.skipped[c.id]) return 'skipped'
    return 'open'
  }
  const current = CHAPTERS.find((c) => !c.writing && !state.chapterDone[c.id] && !state.skipped[c.id])
  const stageIndex = current ? current.stage : 0

  const actions = {
    goHome: () => go('home'),
    goCards: () => go('cards'),
    goChapters: () => go('chapters'),
    openSettings: () => setSheet({ type: 'settings' }),
    openItem: (key) => { setSheet({ type: 'item', key }); sfx.tap() },
    skipChapter: (id) => { update((s) => ({ skipped: { ...s.skipped, [id]: true } })); sfx.tap(); flash('דילגתם — אפשר לחזור בכל רגע') },
    openChapter: (id) => {
      if (chapterById(id).writing) { flash('הפרק הזה עוד נכתב'); return }
      update((s) => ({ skipped: { ...s.skipped, [id]: false } })); go('home')
    },
    startLesson: (chapterId, lesson) => {
      update((s) => ({ skipped: { ...s.skipped, [chapterId]: false } }))
      setPlay({ chapterId, lesson }); sfx.tap(); go('lesson')
    },
    startChallenge: (chapterId) => { setPlay({ chapterId, lesson: -1 }); sfx.tap(); go('lesson') }
  }

  const finishLesson = () => {
    const c = chapterById(play.chapterId), L = c.lessons[play.lesson]
    update((s) => {
      const done = s.done[c.id] || []
      if (done.includes(play.lesson)) return {}
      return {
        done: { ...s.done, [c.id]: [...done, play.lesson] },
        cards: [...s.cards, { front: L.card.front, back: L.card.back, chapter: c.title }]
      }
    })
    sfx.done(); go('lessonDone')
  }
  const finishChallenge = () => {
    const c = chapterById(play.chapterId)
    update((s) => ({
      chapterDone: { ...s.chapterDone, [c.id]: true },
      reef: s.reef.includes(c.item.key) ? s.reef : [...s.reef, c.item.key]
    }))
    sfx.card(); go('reef')
  }

  let screen
  if (view === 'onboarding') {
    screen = <Onboarding onDone={() => { update({ onboarded: true }); go('home') }} />
  } else if (view === 'lesson') {
    const c = chapterById(play.chapterId)
    const isChallenge = play.lesson === -1
    screen = (
      <Lesson key={`${c.id}-${play.lesson}`} guide={c.guide} challenge={isChallenge}
        screens={isChallenge ? challengeScreens(c) : c.lessons[play.lesson].screens}
        card={isChallenge ? null : c.lessons[play.lesson].card}
        profile={state.profile} setProfile={(profile) => update({ profile })}
        onClose={() => go('home')} onFinish={isChallenge ? finishChallenge : finishLesson} />
    )
  } else if (view === 'lessonDone') {
    const c = chapterById(play.chapterId), L = c.lessons[play.lesson]
    const allDone = (state.done[c.id] || []).length === c.lessons.length
    screen = (
      <LessonDone level={heroLevel(state)} coins={coinsOf(state)} title={L.title} minutes={L.minutes} cards={state.cards.length}
        offerChallenge={allDone && !state.chapterDone[c.id]}
        onChallenge={() => actions.startChallenge(c.id)} onHome={() => go('home')} />
    )
  } else if (view === 'reef') {
    screen = <UpgradeReveal chapter={chapterById(play.chapterId)} level={heroLevel(state)} coins={coinsOf(state)} onHome={() => go('home')} />
  } else if (view === 'chapters') {
    screen = <Chapters state={state} chapterStatus={chapterStatus} actions={actions} />
  } else if (view === 'cards') {
    screen = <Cards state={state} actions={actions} />
  } else {
    screen = <Home state={state} stageIndex={stageIndex} currentChapterId={current?.id} chapterStatus={chapterStatus} actions={actions} />
  }

  return (
    <>
      {screen}
      {sheet?.type === 'item' && (
        <ItemSheet itemKey={sheet.key} onClose={() => setSheet(null)} onRevisit={(id) => actions.openChapter(id)} />
      )}
      {sheet?.type === 'settings' && (
        <SettingsSheet muted={state.muted} onToggleMute={() => update((s) => ({ muted: !s.muted }))} onClose={() => setSheet(null)}
          onReset={() => { if (window.confirm('למחוק את כל ההתקדמות ולהתחיל מחדש?')) { setState(initialState()); setSheet(null); setView('onboarding') } }} />
      )}
      {toast && <div className="toast">{toast}</div>}
    </>
  )
}
