import { useEffect, useState } from 'react'
import Hero from '../components/Hero.jsx'
import { GUIDES } from '../content/guides.js'
import Story from './lesson/Story.jsx'
import Predict from './lesson/Predict.jsx'
import Slider from './lesson/Slider.jsx'
import Explain from './lesson/Explain.jsx'
import Sort from './lesson/Sort.jsx'
import Swipe from './lesson/Swipe.jsx'
import SurplusTool from './lesson/SurplusTool.jsx'
import Mission from './lesson/Mission.jsx'
import CardFlip from './lesson/CardFlip.jsx'
import HeroScene from './lesson/HeroScene.jsx'
import Choice from './lesson/Choice.jsx'
import Cards from './lesson/Cards.jsx'
import Live from './lesson/Live.jsx'
import MyOwn from './lesson/MyOwn.jsx'
import { sfx } from '../lib/sound.js'
import { GOOD, OFF, pick } from '../lib/format.js'

const TOOLS = { surplus: SurplusTool }
const SCREENS = { story: Story, predict: Predict, slider: Slider, explain: Explain, sort: Sort, swipe: Swipe, mission: Mission, scene: HeroScene, choice: Choice, cards: Cards, live: Live, mine: MyOwn }

const HINTS = {
  story: 'מכירים את מאיה? הנה היא.',
  scene: '',
  choice: 'אין פה טעויות. יש רק תוצאות.',
  cards: 'הקישו על הכרטיס.',
  live: 'שחקו עם המספר ותראו מה קורה.',
  predict: 'תנחשו - אין פה תשובה לא נכונה.',
  slider: 'גררו לניחוש שלכם. חשבון בראש מותר.',
  explain: 'רעיון אחד, וממשיכים.',
  sort: 'הקישו על פריט, ואז על הקטגוריה שלו.',
  swipe: 'תחליקו ימינה לעובדה, שמאלה למיתוס - או לחצו.',
  tool: 'עכשיו עם מספרים - שלכם, או של כספי.',
  mission: 'משימה קטנה לעולם האמיתי. אין לחץ.',
  card: 'זה נכנס לאוסף שלכם.'
}

const GUIDE_NAMES = { kaspi: 'לולו', johnny: 'ג׳וני' }

// Plays one lesson, or a chapter challenge (card === null).
export default function Lesson({ look, screens, card, guide = 'kaspi', challenge = false, profile, setProfile, onClose, onFinish }) {
  const all = card ? [...screens, { type: 'card' }] : screens
  const [si, setSi] = useState(0)
  const [reaction, setReaction] = useState(null)
  const s = all[si]
  const isLast = si === all.length - 1

  useEffect(() => { window.scrollTo(0, 0) }, [si])
  useEffect(() => {
    if (!reaction || reaction.played) return
    const t = setTimeout(() => setReaction((r) => (r ? { ...r, played: true } : r)), 1400)
    return () => clearTimeout(t)
  }, [reaction])

  const react = (ok, text) => {
    setReaction({ mood: ok ? 'happy' : 'think', text: text || pick(ok ? GOOD : OFF), played: false })
    ok ? sfx.good() : sfx.soft()
  }
  const next = {
    label: isLast ? (challenge ? 'סיום האתגר' : 'סיום השיעור') : 'המשך',
    go: () => {
      sfx.tap()
      if (isLast) onFinish()
      else { setSi(si + 1); setReaction(null) }
    }
  }

  const hint = challenge && si === 0 && !reaction ? 'אתגר קצר על כל הפרק. בלי לחץ.' : HINTS[s.type]
  const Screen = s.type === 'tool' ? TOOLS[s.tool] : SCREENS[s.type]
  const props = { key: si, screen: s, react, next, profile, setProfile, look }
  const showGuide = !['scene', 'choice'].includes(s.type)

  return (
    <>
      <div className="ltop">
        <button className="close" onClick={onClose} aria-label="סגירה">✕</button>
        <div className="segs">
          {all.map((_, i) => <i key={i} className={i < si ? 'done' : i === si ? 'cur' : ''} />)}
        </div>
        {challenge && <span className="chaltag">אתגר פרק</span>}
      </div>
      {showGuide && <div className="guide">
        <div className="gshark">
          <Hero look={GUIDES[guide].look} palette={GUIDES[guide].palette} view="bust" mood={reaction && !reaction.played && reaction.mood === 'happy' ? 'happy' : ''} />
          <span className="gname">{GUIDE_NAMES[guide]}</span>
        </div>
        <div className={`bubble ${reaction ? reaction.mood : ''}`} aria-live="polite">{reaction ? reaction.text : hint}</div>
      </div>}
      {s.type === 'card' ? <CardFlip key={si} card={card} next={next} /> : <Screen {...props} />}
    </>
  )
}
