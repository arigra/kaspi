import Shark from '../components/Shark.jsx'
import ReefItem from '../components/ReefItem.jsx'

export function LessonDone({ title, minutes, cards, offerChallenge, onChallenge, onHome }) {
  return (
    <>
      <div className="celebrate fade-in">
        <div className="bigshark">
          <Shark mood="happy" />
          <span className="spark" style={{ top: 4, right: 20 }}>✦</span>
          <span className="spark" style={{ top: 30, left: 6, animationDelay: '.35s' }}>✦</span>
          <span className="spark" style={{ bottom: 30, right: 0, fontSize: 15, animationDelay: '.6s' }}>✦</span>
        </div>
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
            <button className="cta" onClick={onChallenge}>לאתגר הפרק 🏆</button>
            <div style={{ height: 10 }} />
            <button className="cta ghost" onClick={onHome}>אחר כך</button>
          </>
        ) : <button className="cta" onClick={onHome}>המשך</button>}
      </div>
    </>
  )
}

export function ReefReveal({ chapter, onHome }) {
  return (
    <>
      <div className="top"><div className="logo">כספי<b>.</b></div></div>
      <div className="reveal-reef">
        <div className="sand" /><div className="cave" />
        <div className="rshark"><Shark mood="happy" bubbles /></div>
        <div className="newitem"><ReefItem k={chapter.item.key} /></div>
      </div>
      <div className="reefcap fade-in">
        <small>הפרק "{chapter.title}" הושלם · פריט חדש לשונית</small>
        <h1>{chapter.item.name}</h1>
        <p>{chapter.item.text}</p>
      </div>
      <div className="spacer" />
      <div className="foot"><button className="cta" onClick={onHome}>חזרה למסלול</button></div>
    </>
  )
}
