import { useState } from 'react'
import Hero from '../components/Hero.jsx'
import { GUIDES } from '../content/guides.js'
import { lookAfter, heroLook } from '../content/upgrades.js'
import { ADVICE } from '../content/onboarding.js'
import { sfx } from '../lib/sound.js'

// Welcome flow: a dramatic opener, two "everyone says" cards, the promise,
// meet the broke shark, meet the guides.
const STEPS = ['drama', ...ADVICE.map((_, i) => `advice${i}`), 'promise', 'shark', 'guides']

export default function Onboarding({ onDone }) {
  const [n, setN] = useState(0)
  const step = STEPS[n]
  const nextStep = () => { setN(n + 1); sfx.tap() }
  const finish = () => { sfx.done(); onDone() }

  let body, cta
  if (step === 'drama') {
    body = (
      <div className="drama" key="drama">
        <p className="d1">למדנו 12 שנים בבתי ספר.</p>
        <p className="d2">ואף אחד לא לימד אותנו איך לא להידפק על ידי הבנק, ואיך להרוויח כסף מריבית.</p>
        <p className="d3">אפילו לא כמקצוע בחירה.</p>
        <p className="d4">מעניין למה.</p>
      </div>
    )
    cta = <button className="cta drama-cta" onClick={nextStep}>בואו נשנה את זה</button>
  } else if (step.startsWith('advice')) {
    const [, advice, thought] = ADVICE[Number(step.slice(6))]
    body = (
      <div className="fade-in" key={step}>
        <div className="advice"><small>כולם אומרים</small>"{advice}"</div>
        <div className="thought"><small>ומה שעובר לכם בראש</small>{thought}</div>
      </div>
    )
    cta = <button className="cta" onClick={nextStep}>{step === `advice${ADVICE.length - 1}` ? 'מכירים את זה' : 'הבא'}</button>
  } else if (step === 'promise') {
    body = (
      <div className="obtext fade-in">
        <div className="promise-hero"><Hero look={lookAfter('שרשרת עבה!')} view="bust" mood="happy" /></div>
        <h1>5 דקות ביום. בלי ז׳רגון, בלי מכירות.</h1>
        <ul className="promise">
          <li>תבינו לאן הכסף שלכם הולך כל חודש</li>
          <li>תדעו כמה באמת אפשר לחסוך</li>
          <li>תבינו איך לגשת להשקעות, לפנסיה ולמשכנתא</li>
        </ul>
      </div>
    )
    cta = <button className="cta" onClick={nextStep}>נשמע טוב</button>
  } else if (step === 'shark') {
    body = (
      <div className="obtext fade-in">
        <div className="meet-hero"><Hero look={heroLook(0)} view="full" /></div>
        <h1>תכירו את כספי.</h1>
        <p>אין לו חולצה. הכיסים ריקים. בעשרים לחודש הוא כבר במינוס, והוא לא מבין למה.</p>
        <p><b>אתם הולכים לעזור לו להתעשר.</b> כל שיעור שתסיימו משדרג אותו, עד שהוא יגיע לאחוזה.</p>
      </div>
    )
    cta = <button className="cta" onClick={nextStep}>יאללה, נעזור לו</button>
  } else {
    body = (
      <div className="obtext fade-in">
        <h1>המדריכים שילוו אתכם</h1>
        <div className="duo">
          <div className="who"><div className="who-fig"><Hero look={GUIDES.kaspi.look} palette="gold" view="bust" mood="happy" /></div><b>לולו</b><span>חם, יציב, מעשי.<br />מוביל את היסודות.</span></div>
          <div className="who"><div className="who-fig"><Hero look={GUIDES.johnny.look} palette="green" view="bust" /></div><b>ג׳וני</b><span>סקרן, אנליטי, סבלני.<br />מוביל את ההשקעות.</span></div>
        </div>
      </div>
    )
    cta = <button className="cta" onClick={finish}>מתחילים משלב 1</button>
  }

  return (
    <>
      <div className="top">
        <div className="logo">כספי<b>.</b></div>
        <div className="spacer" />
        {n < STEPS.length - 1 && <button className="linkbtn" onClick={finish}>לדלג</button>}
      </div>
      {step !== 'drama' && <div className="obdots">{STEPS.slice(1).map((_, i) => <i key={i} className={i === n - 1 ? 'on' : ''} />)}</div>}
      <div className="ob">{body}</div>
      <div className="foot">{cta}</div>
    </>
  )
}
