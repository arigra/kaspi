import Maya from '../../components/Maya.jsx'
import { Foot, Cta } from './parts.jsx'

export default function Story({ screen, next }) {
  return (
    <>
      <div className="body">
        <div className="story fade-in">
          <Maya name={screen.character} />
          <div className="saybox">{screen.text}</div>
        </div>
      </div>
      <Foot><Cta onClick={next.go}>{next.label}</Cta></Foot>
    </>
  )
}
