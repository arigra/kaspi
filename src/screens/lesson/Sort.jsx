import { useState } from 'react'
import { Foot, Cta } from './parts.jsx'
import { sfx } from '../../lib/sound.js'

export default function Sort({ screen, react, next }) {
  const n = screen.items.length
  const [placed, setPlaced] = useState(() => Array(n).fill(null))
  const [ok, setOk] = useState(() => Array(n).fill(false))
  const [selected, setSelected] = useState(null)
  const [shake, setShake] = useState([])
  const [solved, setSolved] = useState(false)
  const [hadMiss, setHadMiss] = useState(false)

  const tapChip = (i) => {
    if (ok[i]) return
    if (placed[i] !== null) { setPlaced((p) => p.map((v, j) => (j === i ? null : v))); setSelected(null) }
    else setSelected((s) => (s === i ? null : i))
    setShake([]); sfx.tap()
  }
  const tapBucket = (b) => {
    if (selected === null) return
    setPlaced((p) => p.map((v, j) => (j === selected ? b : v)))
    setSelected(null); setShake([]); sfx.tap()
  }
  const check = () => {
    const wrong = screen.items.map((_, i) => i).filter((i) => placed[i] !== screen.items[i].bucket)
    setOk(screen.items.map((_, i) => !wrong.includes(i)))
    if (!wrong.length) { setSolved(true); react(true, hadMiss ? 'עכשיו הכול במקום!' : 'מיון מושלם!'); return }
    setHadMiss(true); setShake(wrong)
    react(false, wrong.length === 1 ? 'כמעט - פריט אחד עוד מחפש מקום' : `כמעט - ${wrong.length} פריטים עוד מחפשים מקום`)
    setTimeout(() => { setPlaced((p) => p.map((v, j) => (wrong.includes(j) ? null : v))); setShake([]) }, 650)
  }

  const chip = (i) => (
    <button key={i} disabled={ok[i]} onClick={(e) => { e.stopPropagation(); tapChip(i) }}
      className={`chip ${selected === i ? 'sel' : ''} ${ok[i] ? 'ok' : ''} ${shake.includes(i) ? 'shake' : ''}`}>
      {screen.items[i].text}
    </button>
  )
  const pool = screen.items.map((_, i) => i).filter((i) => placed[i] === null)

  return (
    <>
      <div className="body">
        <div className="fade-in">
          <h2 className="q">{screen.prompt}</h2>
          <div className="sortpool">
            {pool.length ? pool.map(chip) : <span style={{ color: 'var(--muted)', fontSize: 14 }}>הכול ממוין</span>}
          </div>
          <div className="buckets">
            {screen.buckets.map((b, bi) => (
              <div key={b} role="button" tabIndex={0} className={`bucket ${selected !== null ? 'ready' : ''}`}
                onClick={() => tapBucket(bi)} onKeyDown={(e) => e.key === 'Enter' && tapBucket(bi)}>
                <h4>{b}</h4>
                <div className="in">{screen.items.map((_, i) => i).filter((i) => placed[i] === bi).map(chip)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Foot>
        {solved
          ? <Cta onClick={next.go}>{next.label}</Cta>
          : <Cta onClick={check} disabled={placed.some((p) => p === null)}>בדיקה</Cta>}
      </Foot>
    </>
  )
}
