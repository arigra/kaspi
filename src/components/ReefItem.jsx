export default function ReefItem({ k }) {
  if (k === 'ledger') return (
    <svg viewBox="0 0 66 74" width="100%" height="100%" aria-hidden="true">
      <rect x="6" y="6" width="54" height="64" rx="7" fill="#f7efd9" stroke="#8a6a2a" strokeWidth="3" />
      <rect x="6" y="6" width="12" height="64" rx="4" fill="#c6872f" />
      <path d="M26 22 H52 M26 32 H52 M26 42 H46 M26 52 H50" stroke="#b39a66" strokeWidth="3" strokeLinecap="round" />
      <circle cx="12" cy="20" r="2.4" fill="#fff" /><circle cx="12" cy="37" r="2.4" fill="#fff" /><circle cx="12" cy="54" r="2.4" fill="#fff" />
    </svg>
  )
  if (k === 'lens') return (
    <svg viewBox="0 0 66 74" width="100%" height="100%" aria-hidden="true">
      <path d="M40 44 L58 64" stroke="#7a5a2a" strokeWidth="9" strokeLinecap="round" />
      <circle cx="28" cy="30" r="20" fill="rgba(210,240,245,.75)" stroke="#c6872f" strokeWidth="6" />
      <path d="M18 24 q6 -8 14 -6" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  )
  return null
}
