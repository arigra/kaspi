import Hero from './Hero.jsx'
import { Girlfriend, SportsCar, CoinJar, House } from './SceneProps.jsx'

// The hero's world. `mood`: '' idle, 'happy' small hop, 'party' big celebration.
export default function Scene({ level, coins, mood = '', compact = false, newCoin = false }) {
  const has = (n) => level >= n
  return (
    <div className={`scene ${compact ? 'compact' : ''} ${mood}`}>
      <div className="sc-sun" />
      <div className="sc-house"><House fancy={has(16)} /></div>
      {has(12) && <div className="sc-car"><SportsCar /></div>}
      <div className="sc-ground" />
      <div className="sc-jar">{newCoin && <span className="sc-coin">🪙</span>}<CoinJar coins={coins} /></div>
      {has(13) && <div className="sc-gf"><Girlfriend /></div>}
      <div className="sc-hero"><Hero level={level} mood={mood} /></div>
      {mood === 'party' && ['✦', '★', '✦', '✧', '★', '✦'].map((s, i) => (
        <span key={i} className="sc-spark" style={{ left: `${15 + i * 14}%`, top: `${10 + (i % 3) * 18}%`, animationDelay: `${i * 0.18}s` }}>{s}</span>
      ))}
    </div>
  )
}
