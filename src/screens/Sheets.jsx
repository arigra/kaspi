import Scene from '../components/Scene.jsx'
import ReefItem from '../components/ReefItem.jsx'
import { CHAPTERS } from '../content/index.js'

export function ItemSheet({ itemKey, onClose, onRevisit }) {
  const chapter = CHAPTERS.find((c) => c.item?.key === itemKey)
  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="sheet" role="dialog" aria-label={chapter.item.name}>
        <div className="grab" />
        <div className="ico"><ReefItem k={itemKey} /></div>
        <h3>{chapter.item.name}</h3>
        <div className="from">מהפרק "{chapter.title}" · שלב {chapter.stage + 1}</div>
        <p>{chapter.item.text}</p>
        <button className="cta" onClick={() => onRevisit(chapter.id)}>לחזור לפרק</button>
      </div>
    </>
  )
}

export function SettingsSheet({ muted, onToggleMute, onReset, onClose }) {
  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="sheet" role="dialog" aria-label="הגדרות">
        <div className="grab" />
        <h3>הגדרות</h3>
        <div className="setrow"><span>צליל</span><button className={`toggle ${muted ? '' : 'on'}`} onClick={onToggleMute} aria-label="צליל" aria-pressed={!muted} /></div>
        <div className="setrow"><span>איפוס ההתקדמות</span><button className="iconbtn" onClick={onReset}>איפוס</button></div>
        <p className="disclaimer" style={{ textAlign: 'start' }}>כספי מסביר איך דברים עובדים ולא ממליץ על מוצר, קרן, מסלול או עסקה. להחלטות כאלה כדאי לפנות לבעל רישיון.</p>
        <button className="cta ghost" onClick={onClose}>סגירה</button>
      </div>
    </>
  )
}

export function WorldSheet({ lessons, chapters, onClose }) {
  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="sheet worldsheet" role="dialog" aria-label="העולם של כספי">
        <div className="grab" />
        <Scene lessons={lessons} chapters={chapters} />
        <div className="meta">
          <div className="stat"><b className="ltr">{lessons}</b><span>שיעורים · שדרוג קטן בכל אחד</span></div>
          <div className="stat"><b className="ltr">{chapters}</b><span>פרקים · שדרוג גדול</span></div>
        </div>
        <button className="cta ghost" onClick={onClose}>סגירה</button>
      </div>
    </>
  )
}
