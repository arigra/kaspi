import { useState } from 'react'
import { Foot, Cta } from './parts.jsx'
import { sfx } from '../../lib/sound.js'

// Sort a few of your own expenses, then pick one to look at this week.
// Stays on the device; nothing leaves it.
export default function MyOwn({ screen, next, profile, setProfile }) {
  const [rows, setRows] = useState(() => (profile.mine?.length ? profile.mine : [{ t: '', b: null }, { t: '', b: null }, { t: '', b: null }]))
  const [pick, setPick] = useState(null)
  const filled = rows.filter((r) => r.t.trim() && r.b !== null)
  const set = (i, patch) => setRows((rs) => rs.map((r, k) => (k === i ? { ...r, ...patch } : r)))
  const save = () => {
    const todos = profile.todos || []
    const t = pick !== null ? `לבדוק השבוע: ${rows[pick].t.trim()}` : null
    setProfile({ ...profile, mine: rows, todos: t && !todos.includes(t) ? [...todos, t] : todos })
    sfx.good(); next.go()
  }
  return (
    <>
      <div className="body">
        <div className="fade-in">
          <h2 className="q">{screen.prompt}</h2>
          <div className="mine">
            {rows.map((r, i) => (
              <div className="mine-row" key={i}>
                <input value={r.t} placeholder={screen.placeholders?.[i] || 'הוצאה שלכם'} aria-label={`הוצאה ${i + 1}`}
                  onChange={(e) => set(i, { t: e.target.value })} />
                <div className="mine-b">
                  {screen.buckets.map((b, k) => (
                    <button key={b} className={r.b === k ? 'on' : ''} onClick={() => { set(i, { b: k }); sfx.tap() }}>{b}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {filled.some((r) => r.b === screen.pickBucket) && (
            <div className="mine-pick fade-in">
              <b>{screen.pickPrompt}</b>
              <div className="mine-b">
                {rows.map((r, i) => (r.t.trim() && r.b === screen.pickBucket
                  ? <button key={i} className={pick === i ? 'on' : ''} onClick={() => { setPick(i); sfx.tap() }}>{r.t}</button> : null))}
              </div>
            </div>
          )}
          <p className="mission-note">נשמר רק במכשיר שלכם.</p>
        </div>
      </div>
      <Foot>
        <div className="row2">
          <Cta ghost onClick={next.go}>לא עכשיו</Cta>
          <Cta onClick={save} disabled={!filled.length}>שמירה</Cta>
        </div>
      </Foot>
    </>
  )
}
