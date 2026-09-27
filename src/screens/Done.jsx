import { useEffect, useState } from 'react'
import Scene from '../components/Scene.jsx'
import Hero from '../components/Hero.jsx'
import { heroLook, lessonUpgrade, chapterUpgrade } from '../content/upgrades.js'

export function LessonDone({ lessons, offerChallenge, next, onNext, onChallenge, onHome }) {
  const [after, setAfter] = useState(false)
  useEffect(() => { const t = setTimeout(() => setAfter(true), 900); return () => clearTimeout(t) }, [])
  const gained = lessonUpgrade(lessons)
  return (
    <>
      <div className="celebrate reward">
        <div className={`bust morph ${after ? 'after' : ''}`}>
          <div className="poof" />
          <Hero look={heroLook(after ? lessons : lessons - 1)} view="full" mood={after ? 'happy' : ''} />
        </div>
        <h1 className={`prize ${after ? 'show' : ''}`}>{after ? gained || 'שיעור הושלם!' : '\u00a0'}</h1>
      </div>
      <div className="foot">
        {offerChallenge ? (
          <>
            <button className="cta" onClick={onChallenge}>לאתגר הפרק</button>
            <div style={{ height: 10 }} />
            <button className="cta ghost" onClick={onHome}>אחר כך</button>
          </>
        ) : next ? (
          <>
            <button className="cta" onClick={onNext}>לשיעור הבא</button>
            <div style={{ height: 10 }} />
            <button className="cta ghost" onClick={onHome}>למסלול</button>
          </>
        ) : <button className="cta" onClick={onHome}>למסלול</button>}
      </div>
    </>
  )
}

export function UpgradeReveal({ lessons, chapters, onHome }) {
  const [after, setAfter] = useState(false)
  useEffect(() => { const t = setTimeout(() => setAfter(true), 1100); return () => clearTimeout(t) }, [])
  const up = chapterUpgrade(chapters)
  return (
    <>
      <div className="top"><div className="logo">כספי<b>.</b></div></div>
      <div className={`ldscene morphscene ${after ? 'after' : ''}`}>
        <Scene lessons={lessons} chapters={after ? chapters : chapters - 1} mood={after ? 'party' : ''} />
      </div>
      <h1 className={`prize big ${after ? 'show' : ''}`}>{after ? (up ? up.name : 'פרק הושלם!') : '\u00a0'}</h1>
      <div className="spacer" />
      <div className="foot"><button className="cta" onClick={onHome}>חזרה למסלול</button></div>
    </>
  )
}
