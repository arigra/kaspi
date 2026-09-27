import Scene from '../components/Scene.jsx'
import Hero from '../components/Hero.jsx'
import { heroLook, lessonUpgrade, chapterUpgrade } from '../content/upgrades.js'

export function LessonDone({ lessons, title, minutes, cards, offerChallenge, onChallenge, onHome }) {
  return (
    <>
      <div className="celebrate fade-in">
        <div className="bust"><div className="glow" /><Hero look={heroLook(lessons)} view="bust" mood="happy" /></div>
        {lessonUpgrade(lessons) && <div className="newtag">חדש: {lessonUpgrade(lessons)}</div>}
        <h1>שיעור הושלם!</h1>
        <p>{title}</p>
        <div className="stats">
          <div className="stat"><b className="ltr">{cards}</b><span>כרטיסים באוסף</span></div>
          <div className="stat"><b className="ltr">~{minutes}</b><span>דקות</span></div>
        </div>
      </div>
      <div className="foot">
        {offerChallenge ? (
          <>
            <button className="cta" onClick={onChallenge}>לאתגר הפרק</button>
            <div style={{ height: 10 }} />
            <button className="cta ghost" onClick={onHome}>אחר כך</button>
          </>
        ) : <button className="cta" onClick={onHome}>המשך</button>}
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
