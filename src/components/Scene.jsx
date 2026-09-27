import Hero from './Hero.jsx'
import { SharkGirl, Vehicle, Home, Pool, Yacht, Jet, CoinJar } from './SceneProps.jsx'
import { heroLook } from '../content/upgrades.js'

const pickAt = (n, table) => table.reduce((v, [at, val]) => (n >= at ? val : v), null)

// The hero's whole world. mood: '' idle · 'happy' · 'party'
export default function Scene({ lessons, chapters, mood = '' }) {
  const home = pickAt(chapters, [[0, 'bench'], [2, 'room'], [5, 'apartment'], [8, 'house'], [12, 'villa'], [15, 'mansion']])
  const ride = pickAt(chapters, [[1, 'bike'], [3, 'scooter'], [4, 'oldcar'], [7, 'convertible'], [10, 'sports'], [13, 'lambo']])
  return (
    <div className={`scene ${mood}`}>
      <div className="sc-sun" />
      {chapters >= 16 && <div className="sc-jet"><Jet /></div>}
      {chapters >= 14 && <div className="sc-sea"><div className="sc-yacht"><Yacht /></div></div>}
      <div className={`sc-home ${home}`}><Home kind={home} /></div>
      <div className="sc-ground" />
      {chapters >= 9 && <div className="sc-pool"><Pool /></div>}
      {ride && <div className={`sc-car ${ride}`}><Vehicle kind={ride} /></div>}
      <div className="sc-jar"><CoinJar coins={lessons} /></div>
      {chapters >= 11 && <div className="sc-gf2"><SharkGirl skin="#c9b3f3" deep="#9a7fd6" bikini="#f5c518" cocktail flip /></div>}
      {chapters >= 6 && <div className="sc-gf"><SharkGirl /></div>}
      <div className="sc-hero"><Hero look={heroLook(lessons)} mood={mood} /></div>
      {mood === 'party' && ['✦', '★', '✦', '✧', '★', '✦', '★'].map((s, i) => (
        <span key={i} className="sc-spark" style={{ left: `${8 + i * 13}%`, top: `${8 + (i % 3) * 16}%`, animationDelay: `${i * 0.16}s` }}>{s}</span>
      ))}
    </div>
  )
}
