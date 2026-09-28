import { Foot, Cta } from './parts.jsx'
import { nis } from '../../lib/format.js'
import { MAYA } from '../../content/onboarding.js'
import { sfx } from '../../lib/sound.js'

const FIELDS = [
  ['income', 'הכנסה חודשית נטו', 'מה שבאמת נכנס לחשבון'],
  ['commitments', 'התחייבויות קבועות', 'שכר דירה או משכנתא, הלוואות, ביטוחים, מנויים'],
  ['flexible', 'הוצאות גמישות', 'סופר, אוכל בחוץ, תחבורה - בחודש רגיל']
]

export default function SurplusTool({ profile, setProfile, next }) {
  const ready = FIELDS.every(([k]) => typeof profile[k] === 'number')
  const surplus = ready ? profile.income - profile.commitments - profile.flexible : 0
  const msg = surplus > 0 ? 'זה הסכום שאפשר לבנות עליו תוכנית חיסכון.'
    : surplus === 0 ? 'בחודש רגיל לא נשאר עודף. כדאי לדעת את זה לפני שקובעים יעד.'
      : 'חודש רגיל נגמר במינוס. הקטנת התחייבויות קודמת לכל יעד חיסכון.'

  return (
    <>
      <div className="body">
        <div className="tool fade-in">
          <h2 className="q" style={{ marginBottom: 4 }}>כמה באמת נשאר לכם בסוף החודש?</h2>
          <button className="mayabtn" onClick={() => { setProfile({ ...profile, ...MAYA }); sfx.tap() }}>המספרים של כספי</button>
          {FIELDS.map(([k, label, hint]) => (
            <label className="field" key={k}>
              <b>{label}</b><span>{hint}</span>
              <div className="in">
                <input inputMode="numeric" placeholder="0" aria-label={label} value={profile[k] ?? ''}
                  onChange={(e) => {
                    const d = e.target.value.replace(/[^\d]/g, '')
                    setProfile({ ...profile, [k]: d === '' ? undefined : +d })
                  }} />
                <em>₪</em>
              </div>
            </label>
          ))}
          {ready && (
            <div className={`result ${surplus < 0 ? 'neg' : ''} fade-in`}>
              <small>העודף החודשי האמיתי</small>
              <strong className="ltr">{nis(surplus)}</strong>
              <p>{msg}</p>
            </div>
          )}
          <div className="privacy">הנתונים נשמרים במכשיר הזה בלבד ולא נשלחים לשום מקום.</div>
        </div>
      </div>
      <Foot><Cta onClick={next.go} disabled={!ready}>{next.label}</Cta></Foot>
    </>
  )
}
