import { Foot, Cta } from './parts.jsx'

export default function Story({ screen, next }) {
  return (
    <>
      <div className="body">
        <div className="story fade-in">
          <div className="maya"><i /><i /><b /><em>{screen.character}</em></div>
          <div className="saybox">{screen.text}</div>
        </div>
      </div>
      <Foot><Cta onClick={next.go}>{next.label}</Cta></Foot>
    </>
  )
}
