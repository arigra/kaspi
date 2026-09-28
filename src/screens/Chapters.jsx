import Header from './Header.jsx'
import RegionArt from '../components/RegionArt.jsx'
import Hero from '../components/Hero.jsx'
import Icon from '../components/Icon.jsx'
import { STAGES } from '../content/index.js'
import { REGIONS } from '../content/regions.js'
import { heroLook, coinsOf } from '../content/upgrades.js'

// The world map: five regions joined by a road. Regions ahead are misty but
// still open - you can jump anywhere.
export default function Chapters({ state, currentStage, chapterStatus, actions }) {
  return (
    <>
      <Header cards={state.cards.length} onCards={actions.goCards} onSettings={actions.openSettings} />
      <div className="worldmap fade-in">
        <h1>המפה</h1>
        {STAGES.map((stage, si) => {
          const r = REGIONS[si]
          const main = stage.chapters.filter((c) => !c.writing && !c.extra)
          const doneN = main.filter((c) => state.chapterDone[c.id]).length
          const ahead = si > currentStage
          return (
            <div key={si}>
              {si > 0 && <div className={`wm-road ${si <= currentStage ? 'walked' : ''}`} />}
              <div className={`wm-region ${ahead ? 'ahead' : ''} ${si === currentStage ? 'here' : ''}`}>
                <button className="wm-art" onClick={() => actions.goStage(si)} aria-label={`שלב ${si + 1}: ${r.name}`}>
                  <RegionArt kind={r.key} />
                  {ahead && <div className="wm-fog" />}
                  {si === currentStage && <div className="wm-kaspi"><Hero look={heroLook(coinsOf(state))} view="bust" /></div>}
                </button>
                <div className="wm-body">
                  <small>שלב {si + 1} · {doneN}/{main.length} פרקים</small>
                  <h2>{r.name}</h2>
                  <p>{r.tagline}</p>
                  <div className="wm-chips">
                    {stage.chapters.map((c) => {
                      const st = chapterStatus(c)
                      return (
                        <button key={c.id} className={`wm-chip ${st} ${c.extra ? 'extra' : ''}`} disabled={c.writing} onClick={() => actions.openChapter(c.id)}>
                          {st === 'done' && <Icon name="check" size={13} stroke={3} />} {c.title}{c.extra ? ' · העמקה' : ''}{c.writing ? ' · בקרוב' : ''}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="foot"><button className="cta ghost" onClick={actions.goHome}>חזרה למסלול</button></div>
    </>
  )
}
