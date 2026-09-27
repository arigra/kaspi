import { useState } from 'react'
import Shark from '../components/Shark.jsx'
import { ADVICE } from '../content/onboarding.js'
import { sfx } from '../lib/sound.js'

export default function Onboarding({ onDone }) {
  const [n, setN] = useState(0)
  const total = ADVICE.length + 1
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
  } else {
    body = (
      <div className="obtext fade-in">
        <h1>הכירו את המדריכים שלכם</h1>
        <div className="duo">
          <div className="who"><div><Shark mood="happy" /></div><b>כספי</b><span>חם, יציב, מעשי.<br />מוביל את היסודות.</span></div>
          <div className="who"><div><Shark guide="johnny" /></div><b>ג׳וני</b><span>סקרן, אנליטי, סבלני.<br />מוביל את ההשקעות.</span></div>
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
