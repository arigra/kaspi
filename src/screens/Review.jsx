import { useState } from 'react'
import { STAGES, challengeScreens } from '../content/index.js'
import { LESSON_UPGRADES, CHAPTER_UPGRADES, heroLook, lessonUpgrade, TOTAL_LESSONS } from '../content/upgrades.js'
import { GUIDES } from '../content/guides.js'
import Hero from '../components/Hero.jsx'
import Scene from '../components/Scene.jsx'
import { SharkGirl } from '../components/SceneProps.jsx'

// Hidden review mode (?review): every lesson, reward and character on one
// scrolling page, with a note box next to each. Notes stay on this device and
// are exported as one block of text.

const KEY = 'kaspi-review-notes'
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} } }

function Note({ id, label, notes, setNote }) {
  const [open, setOpen] = useState(!!notes[id])
  return (
    <div className="rv-note">
      {open ? (
        <textarea dir="rtl" placeholder="מה לא טוב פה?" value={notes[id]?.text || ''}
          onChange={(e) => setNote(id, label, e.target.value)} />
      ) : <button className="rv-notebtn" onClick={() => setOpen(true)}>הערה</button>}
    </div>
  )
}

function ScreenView({ s }) {
  switch (s.type) {
    case 'choice': return (
      <>
        {s.scene && <p className="rv-scene">{s.scene.text}{s.scene.say && <> · <b>״{s.scene.say}״</b></>}</p>}
        <h4>{s.prompt}</h4>
        {s.options.map((o, i) => <div key={i} className={`rv-opt ${o.good ? 'good' : ''}`}><b>{'אבגד'[i]}. {o.t}</b><span>{o.out}</span></div>)}
      </>
    )
    case 'cards': return (
      <>
        {s.scene && <p className="rv-scene">{s.scene.text}{s.scene.say && <> · <b>״{s.scene.say}״</b></>}</p>}
        {s.title && <h4>{s.title}</h4>}
        <ol>{s.cards.map((c, i) => <li key={i}>{Array.isArray(c) ? c[1] : c}</li>)}</ol>
        {s.source && <small>מקור: {s.source}</small>}
      </>
    )
    case 'predict': return (
      <>
        <h4>{s.prompt}</h4>
        {s.options.map((o, i) => <div key={i} className={`rv-opt ${i === s.answer ? 'good' : ''}`}><b>{'אבגד'[i]}. {o}</b></div>)}
        <p>{s.reveal}</p>
      </>
    )
    case 'slider': return (<><h4>{s.prompt}</h4>{s.list && <p>{s.list.map(([k, v]) => `${k}: ${v}`).join(' · ')}</p>}<p>תשובה: {s.answer}</p><p>{s.reveal}</p></>)
    case 'sort': return (<><h4>{s.prompt}</h4>{s.buckets.map((b, k) => <p key={b}><b>{b}:</b> {s.items.filter((x) => x.bucket === k).map((x) => x.text).join(', ')}</p>)}</>)
    case 'swipe': return (<><h4>{s.prompt}</h4>{s.cards.map((c, i) => <div key={i} className={`rv-opt ${c.isTrue ? 'good' : ''}`}><b>{c.isTrue ? 'עובדה' : 'מיתוס'}: {c.text}</b><span>{c.why}</span></div>)}</>)
    case 'mine': return (<><h4>{s.prompt}</h4><p>סוגים: {s.buckets.join(', ')} · {s.pickPrompt}</p></>)
    case 'mission': return <p><b>צעד קטן:</b> {s.text}</p>
    case 'live': { const r = s.compute(s.start ?? s.min); return (<><h4>{s.prompt}</h4><p>{s.label} · {r.big} · {r.caption}</p><p>{s.takeaway}</p></>) }
    case 'tool': return <p>מחשבון העודף (הכנסה, קבועות, גמישות)</p>
    default: return <p>{s.type}</p>
  }
}

const TYPE_NAMES = { choice: 'החלטה', cards: 'כרטיסים', predict: 'שאלה', slider: 'מחוון', sort: 'מיון', swipe: 'מיתוס/עובדה', mine: 'ההוצאות שלכם', mission: 'צעד קטן', live: 'מחוון חי', tool: 'מחשבון', story: 'סיפור', scene: 'סצנה', explain: 'הסבר' }

export default function Review() {
  const [tab, setTab] = useState('lessons')
  const [notes, setNotes] = useState(load)
  const [copied, setCopied] = useState(false)
  const setNote = (id, label, text) => setNotes((n) => {
    const next = { ...n, [id]: { label, text } }
    if (!text) delete next[id]
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* ignore */ }
    return next
  })
  const count = Object.values(notes).filter((n) => n.text?.trim()).length
  const exportText = Object.values(notes).filter((n) => n.text?.trim()).map((n) => `• ${n.label}\n  ${n.text.trim()}`).join('\n\n')
  const copy = async () => {
    try { await navigator.clipboard.writeText(exportText); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { setTab('export') }
  }
  let lessonNo = 0

  return (
    <div className="rv">
      <div className="rv-top">
        <b>סקירה</b>
        <div className="rv-tabs">
          {[['lessons', 'שיעורים'], ['rewards', 'פרסים'], ['cast', 'דמויות'], ['export', `הערות (${count})`]].map(([k, t]) => (
            <button key={k} className={tab === k ? 'on' : ''} onClick={() => { setTab(k); window.scrollTo(0, 0) }}>{t}</button>
          ))}
        </div>
      </div>

      {tab === 'lessons' && STAGES.map((st, si) => (
        <section key={si}>
          <h2>שלב {si + 1} · {st.title}</h2>
          {st.chapters.filter((c) => !c.writing).map((c) => (
            <div key={c.id} className="rv-chapter">
              <h3>{c.title}</h3>
              {c.lessons.map((l, li) => {
                lessonNo += 1
                const base = `שיעור ${lessonNo} · ${c.title} · ${l.title}`
                return (
                  <div key={li} className="rv-lesson">
                    <div className="rv-lhead"><b>{lessonNo}. {l.title}</b><small>{l.minutes} דק׳ · {l.goal || ''}</small>
                      <span className="rv-prize">פרס: {lessonUpgrade(lessonNo) || 'אין (שיעור בלי שדרוג)'}</span></div>
                    {l.screens.map((s, k) => (
                      <div key={k} className="rv-screen">
                        <small className="rv-type">מסך {k + 1} · {TYPE_NAMES[s.type] || s.type}</small>
                        <ScreenView s={s} />
                        <Note id={`${c.id}-${li}-${k}`} label={`${base} · מסך ${k + 1} (${TYPE_NAMES[s.type] || s.type})`} notes={notes} setNote={setNote} />
                      </div>
                    ))}
                    <div className="rv-screen">
                      <small className="rv-type">כרטיס תובנה</small>
                      <p><b>{l.card.front}</b><br />{l.card.back}</p>
                      <Note id={`${c.id}-${li}-card`} label={`${base} · כרטיס תובנה`} notes={notes} setNote={setNote} />
                    </div>
                  </div>
                )
              })}
              <div className="rv-lesson rv-chal">
                <div className="rv-lhead"><b>אתגר הפרק</b><span className="rv-prize">פרס: {c.item?.name}</span></div>
                {challengeScreens(c).map((s, k) => (
                  <div key={k} className="rv-screen"><ScreenView s={s} />
                    <Note id={`${c.id}-chal-${k}`} label={`${c.title} · אתגר · שאלה ${k + 1}`} notes={notes} setNote={setNote} /></div>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}

      {tab === 'rewards' && (
        <section>
          <h2>פרס לכל שיעור</h2>
          <div className="rv-grid">
            {[['ההתחלה', 0], ...LESSON_UPGRADES.map(([n], i) => [n, i + 1])].map(([n, i]) => (
              <div key={i} className="rv-cell">
                <div className="rv-fig"><Hero look={heroLook(Math.floor(i * TOTAL_LESSONS / LESSON_UPGRADES.length))} view="full" /></div>
                <b>{i}. {n}</b>
                <Note id={`prize-${i}`} label={`פרס שיעור ${i}: ${n}`} notes={notes} setNote={setNote} />
              </div>
            ))}
          </div>
          <h2>פרס לכל פרק (העולם)</h2>
          {[{ name: 'ההתחלה' }, ...CHAPTER_UPGRADES].map((u, i) => (
            <div key={i} className="rv-world">
              <b>{i}. {u.name}</b>{u.text && <small> · {u.text}</small>}
              <Scene lessons={Math.round(i * 84 / 16)} chapters={i} />
              <Note id={`world-${i}`} label={`פרס פרק ${i}: ${u.name}`} notes={notes} setNote={setNote} />
            </div>
          ))}
        </section>
      )}

      {tab === 'cast' && (
        <section>
          <h2>הכריש</h2>
          <div className="rv-grid">
            {[['רגיל', ''], ['שמח', 'happy'], ['נבהל', 'oops']].map(([t, m]) => (
              <div key={m} className="rv-cell"><div className="rv-fig"><Hero look={heroLook(0)} view="full" mood={m} /></div><b>{t}</b>
                <Note id={`cast-hero-${m || 'idle'}`} label={`דמות: הכריש (${t})`} notes={notes} setNote={setNote} /></div>
            ))}
          </div>
          <h2>המדריכים</h2>
          <div className="rv-grid">
            {Object.entries(GUIDES).map(([k, g]) => (
              <div key={k} className="rv-cell"><div className="rv-fig"><Hero look={g.look} palette={g.palette} view="full" /></div><b>{g.name}</b>
                <Note id={`cast-${k}`} label={`דמות: ${g.name}`} notes={notes} setNote={setNote} /></div>
            ))}
          </div>
          <h2>הכרישות</h2>
          <div className="rv-grid">
            <div className="rv-cell"><div className="rv-fig"><SharkGirl /></div><b>הראשונה</b><Note id="cast-gf1" label="דמות: הכרישה הראשונה" notes={notes} setNote={setNote} /></div>
            <div className="rv-cell"><div className="rv-fig"><SharkGirl skin="#c9b3f3" deep="#9a7fd6" bikini="#f5c518" cocktail /></div><b>השנייה</b><Note id="cast-gf2" label="דמות: הכרישה השנייה" notes={notes} setNote={setNote} /></div>
          </div>
          <div className="rv-screen"><b>הערה כללית על הדמויות</b><Note id="cast-general" label="דמויות - כללי" notes={notes} setNote={setNote} /></div>
        </section>
      )}

      {tab === 'export' && (
        <section>
          <h2>כל ההערות ({count})</h2>
          <p>מעתיקים ומדביקים לקלוד בצ׳אט.</p>
          <textarea className="rv-export" readOnly value={exportText || 'עוד אין הערות.'} onFocus={(e) => e.target.select()} />
          <div className="rv-screen"><b>הערה כללית</b><Note id="general" label="כללי" notes={notes} setNote={setNote} /></div>
        </section>
      )}

      <button className="rv-copy" onClick={copy} disabled={!count}>{copied ? 'הועתק!' : `העתקת כל ההערות (${count})`}</button>
    </div>
  )
}
