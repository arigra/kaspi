import { Foot, Cta } from './parts.jsx'

export default function Mission({ screen, react, next }) {
  return (
    <>
      <div className="body">
        <div className="fade-in">
          <div className="mission">
            <div className="ic" aria-hidden="true">📋</div>
            <div><h3>משימה לעולם האמיתי</h3><p>{screen.text}</p></div>
          </div>
        </div>
      </div>
      <Foot>
        <div className="row2">
          <Cta ghost onClick={next.go}>אחר כך</Cta>
          <Cta onClick={() => { react(true, 'כל הכבוד! זה בדיוק הבסיס.'); setTimeout(next.go, 900) }}>סיימתי</Cta>
        </div>
      </Foot>
    </>
  )
}
