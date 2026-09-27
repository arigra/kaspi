import Hero from '../../components/Hero.jsx'
import { Foot, Cta } from './parts.jsx'

// A story beat: the hero, one short line of narration, maybe a line he says.
export default function HeroScene({ screen, next, look }) {
  return (
    <>
      <div className="body">
        <div className="hscene fade-in">
          <div className="hs-hero"><Hero look={look} view="bust" mood={screen.mood || ''} /></div>
          {screen.say && <div className="hs-say">{screen.say}</div>}
          <p className="hs-text">{screen.text}</p>
        </div>
      </div>
      <Foot><Cta onClick={next.go}>{next.label}</Cta></Foot>
    </>
  )
}
