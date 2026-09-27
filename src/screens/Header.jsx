export default function Header({ cards, onCards, onSettings }) {
  return (
    <div className="top">
      <div className="logo">כספי<b>.</b></div>
      <div className="spacer" />
      <button className="iconbtn" onClick={onCards} aria-label="הכרטיסים שלי">🃏 <span className="ltr">{cards}</span></button>
      <button className="iconbtn" onClick={onSettings} aria-label="הגדרות">⚙️</button>
    </div>
  )
}
