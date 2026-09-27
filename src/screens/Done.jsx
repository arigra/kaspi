import { useEffect, useState } from 'react'
import Scene from '../components/Scene.jsx'
import Hero from '../components/Hero.jsx'
import { heroLook, lessonUpgrade, chapterUpgrade } from '../content/upgrades.js'

export function LessonDone({ lessons, title, chaptersDone, chapterLeft, offerChallenge, next, onNext, onChallenge, onHome }) {
  const [after, setAfter] = useState(false)
  useEffect(() => { const t = setTimeout(() => setAfter(true), 1100); return () => clearTimeout(t) }, [])
  const gained = lessonUpgrade(lessons)
  const coming = lessonUpgrade(lessons + 1)
  const big = chapterUpgrade(chaptersDone + 1)
  return (
    <>
      <div className="celebrate fade-in">
        <small className="ld-title">שיעור הושלם · {title}</small>
        <div className={`bust morph ${after ? 'after' : ''}`}>
          <div className="glow" />
          <div className="poof" />
          <Hero look={heroLook(after ? lessons : lessons - 1)} view="bust" mood={after ? 'happy' : ''} />
        </div>
        {gained && <div className={`newtag ${after ? 'show' : ''}`}>{after ? <>הכריש קיבל: <b>{gained}</b></> : 'רגע...'}</div>}
        <div className="upnext">
          {coming && <div><span>בשיעור הבא</span><b>{coming}</b></div>}
          {big && <div><span>{offerChallenge ? 'באתגר הפרק' : `בסוף הפרק (עוד ${chapterLeft})`}</span><b>{big.name}</b></div>}
        </div>
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
            <button className="cta" onClick={onNext}>להמשיך: {next.lesson.title}</button>
            <div style={{ height: 10 }} />
            <button className="cta ghost" onClick={onHome}>למסלול</button>
          </>
        ) : <button className="cta" onClick={onHome}>למסלול</button>}
      </div>
    </>
  )
}

export function UpgradeReveal({ chapter, lessons, chapters, onHome }) {
  const up = chapterUpgrade(chapters)
  return (
    <>
      <div className="top"><div className="logo">כספי<b>.</b></div></div>
      <div className="ldscene"><Scene lessons={lessons} chapters={chapters} mood="party" /></div>
      <div className="upg fade-in">
        <small>הפרק "{chapter.title}" הושלם!</small>
        <h1>{up ? up.name : 'עוד פרק בכיס'}</h1>
        <p>{up ? up.text : 'כבר יש לו הכול. הוא פשוט שמח.'}</p>
      </div>
      <div className="spacer" />
      <div className="foot"><button className="cta" onClick={onHome}>חזרה למסלול</button></div>
    </>
  )
}
