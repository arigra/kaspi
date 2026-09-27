import { useState } from 'react'
import Hero from '../components/Hero.jsx'
import { GUIDES } from '../content/guides.js'
import { heroLook } from '../content/upgrades.js'
import { ADVICE } from '../content/onboarding.js'
import { sfx } from '../lib/sound.js'

export default function Onboarding({ onDone }) {
  const [n, setN] = useState(0)
  const total = ADVICE.length + 2
  const nextStep = () => { setN(n + 1); sfx.tap() }
  const finish = () => { sfx.done(); onDone() }

  let body, cta
  if (n < ADVICE.length) {
    const [advice, thought] = ADVICE[n]
    body = (
      <div className="fade-in" key={n}>
        <div className="advice"><small>כולם אומרים</small>"{advice}"</div>
        <div className="thought"><small>ומה שעובר לכם בראש</small>{thought}</div>
      </div>
    )
    cta = <button className="cta" onClick={nextStep}>{n === ADVICE.length - 1 ? 'מכירים את זה' : 'הבא'}</button>
  } else if (n === ADVICE.length) {
    body = (
      <div className="obtext fade-in">
        <div className="promise-hero"><Hero look={heroLook(0)} view="bust" /></div>
        <h1>5 דקות ביום. בלי ז׳רגון, בלי מכירות.</h1>
        <ul className="promise">
          <li>תבינו לאן הכסף שלכם הולך כל חודש</li>
          <li>תדעו כמה באמת אפשר לחסוך</li>
          <li>תבינו איך לגשת להשקעות, לפנסיה ולמשכנתא</li>
        </ul>
        <p className="promise-note">וכל שיעור שתסיימו משדרג את הכריש הזה. כרגע אין לו אפילו חולצה.</p>
      </div>
    )
    cta = <button className="cta" onClick={nextStep}>נשמע טוב</button>
  } else {
    body = (
      <div className="obtext fade-in">
        <h1>המדריכים שילוו אתכם</h1>
        <div className="duo">
          <div className="who"><div className="who-fig"><Hero look={GUIDES.kaspi.look} palette="gold" view="bust" mood="happy" /></div><b>כספי</b><span>חם, יציב, מעשי.<br />מוביל את היסודות.</span></div>
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
        {n < total - 1 && <button className="linkbtn" onClick={finish}>לדלג</button>}
      </div>
      <div className="obdots">{Array.from({ length: total }, (_, i) => <i key={i} className={i === n ? 'on' : ''} />)}</div>
      <div className="ob">{body}</div>
      <div className="foot">{cta}</div>
    </>
  )
}
