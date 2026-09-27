import { useState } from 'react'
import { Foot, Cta } from './parts.jsx'

export default function Explain({ screen, next }) {
  const [showSource, setShowSource] = useState(false)
  return (
    <>
      <div className="body">
        <div className="explain fade-in">
          <h3>{screen.title}</h3>
          <p>{screen.text}</p>
          {screen.source && (
            <>
              <button className="srcbtn" onClick={() => setShowSource((v) => !v)}>{showSource ? 'להסתיר מקורות' : 'מקורות'}</button>
              {showSource && <div className="srcbox fade-in">{screen.source}</div>}
            </>
          )}
        </div>
      </div>
      <Foot><Cta onClick={next.go}>{next.label}</Cta></Foot>
    </>
  )
}
