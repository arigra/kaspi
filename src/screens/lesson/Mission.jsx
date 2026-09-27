import Icon from '../../components/Icon.jsx'
import { Foot, Cta } from './parts.jsx'

// A small real-life step. Committing saves it to "המשימות שלי".
export default function Mission({ screen, react, next, profile, setProfile }) {
  const commit = () => {
    const todos = profile.todos || []
    if (!todos.includes(screen.text)) setProfile({ ...profile, todos: [...todos, screen.text] })
    react(true, 'מעולה. זה נשמר אצלכם במשימות.')
    setTimeout(next.go, 900)
  }
  return (
    <>
      <div className="body">
        <div className="fade-in">
          <div className="mission">
            <div className="ic" aria-hidden="true"><Icon name="check" size={26} /></div>
            <div><h3>צעד קטן אצלכם</h3><p>{screen.text}</p></div>
          </div>
          <p className="mission-note">בלי חיבור לבנק ובלי למסור שום נתון. רק לכם.</p>
        </div>
      </div>
      <Foot>
        <div className="row2">
          <Cta ghost onClick={next.go}>לא עכשיו</Cta>
          <Cta onClick={commit}>אני על זה השבוע</Cta>
        </div>
      </Foot>
    </>
  )
}
