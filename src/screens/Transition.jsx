import { useEffect, useState } from 'react'
import RegionArt from '../components/RegionArt.jsx'
import Hero from '../components/Hero.jsx'
import { Vehicle } from '../components/SceneProps.jsx'
import { REGIONS } from '../content/regions.js'
import { STAGES } from '../content/index.js'
import { heroLook } from '../content/upgrades.js'
import { sfx } from '../lib/sound.js'

const rideFor = (chapters) => [[13, 'lambo'], [10, 'sports'], [7, 'convertible'], [4, 'oldcar'], [3, 'scooter'], [1, 'bike']].find(([n]) => chapters >= n)?.[1]

// Full-screen move from one region to the next: Kaspi travels the road,
// the fog lifts, the new region's name lands.
export default function Transition({ to, lessons, chapters, onEnter }) {
  const [phase, setPhase] = useState(0) // 0 travel · 1 reveal · 2 title
  useEffect(() => {
    const a = setTimeout(() => setPhase(1), 2600)
    const b = setTimeout(() => { setPhase(2); sfx.card() }, 3500)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [])
  const from = REGIONS[to - 1], next = REGIONS[to]
  const ride = rideFor(chapters)
  return (
    <div className="trans">
      <div className="tr-map">
        <div className="tr-region from"><RegionArt kind={from.key} /><span>{from.name}</span></div>
        <div className={`tr-region to ${phase ? 'clear' : ''}`}><RegionArt kind={next.key} /><span>{next.name}</span><div className="tr-fog" /></div>
        <div className="tr-road" />
        <div className={`tr-traveler ${ride ? 'riding' : 'walking'}`}>
          {ride && <div className="tr-ride"><Vehicle kind={ride} /></div>}
          <div className="tr-kaspi"><Hero look={heroLook(lessons)} view="bust" mood="happy" /></div>
        </div>
      </div>
      <div className={`tr-title ${phase === 2 ? 'show' : ''}`}>
        <small>שלב {to + 1} נפתח</small>
        <h1>{next.name}</h1>
        <p>{next.tagline}</p>
        <ul>{STAGES[to].chapters.filter((c) => !c.writing && !c.extra).map((c) => <li key={c.id}>{c.title}</li>)}</ul>
      </div>
      <div className="foot"><button className={`cta ${phase === 2 ? '' : 'hide'}`} onClick={onEnter}>להיכנס ל{next.name}</button></div>
    </div>
  )
}
