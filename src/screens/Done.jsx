import Scene from '../components/Scene.jsx'
import { UPGRADES } from '../content/upgrades.js'

export function LessonDone({ level, coins, title, minutes, cards, offerChallenge, onChallenge, onHome }) {
  return (
    <>
      <div className="celebrate fade-in">
        <div className="ldscene"><Scene compact level={level} coins={coins} mood="happy" newCoin /></div>
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

export function UpgradeReveal({ chapter, level, coins, onHome }) {
  const up = UPGRADES[level]
  return (
    <>
      <div className="top"><div className="logo">כספי<b>.</b></div></div>
      <div className="ldscene"><Scene level={level} coins={coins} mood="party" /></div>
      <div className="upg fade-in">
        <small>הפרק "{chapter.title}" הושלם · שדרוג חדש!</small>
        <h1>{up ? up.name : 'עוד מטבע לצנצנת'}</h1>
        <p>{up ? up.text : 'כבר השגתם את כל השדרוגים. הכריש פשוט שמח.'}</p>
      </div>
      <div className="spacer" />
      <div className="foot"><button className="cta" onClick={onHome}>חזרה למסלול</button></div>
    </>
  )
}
