// Simple line icons, drawn in the current text colour.
const P = {
  gear: <><circle cx="12" cy="12" r="3.2" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" /></>,
  cards: <><rect x="4" y="6" width="11" height="14" rx="2" /><path d="M9 4h9a2 2 0 0 1 2 2v12" /></>,
  trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0z" /><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4" /></>,
  coin: <><circle cx="12" cy="12" r="8" /><path d="M9.5 9.5h3.5a1.8 1.8 0 0 1 0 3.5h-2.5a1.8 1.8 0 0 0 0 3.5H14M12 7.5v1.5M12 16.5V18" /></>,
  receipt: <><path d="M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21z" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
  calendar: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></>,
  drop: <path d="M12 3c3.5 4.5 6 7.6 6 10.5a6 6 0 0 1-12 0C6 10.6 8.5 7.5 12 3z" />,
  clock: <><circle cx="12" cy="12" r="8" /><path d="M12 7.5V12l3 2" /></>,
  shield: <path d="M12 3l7 3v5c0 5-3.2 8.5-7 10-3.8-1.5-7-5-7-10V6z" />,
  bank: <><path d="M3 9l9-5 9 5z" /><path d="M5 10v7M9.5 10v7M14.5 10v7M19 10v7M3.5 20h17" /></>,
  repeat: <><path d="M5 10a6 6 0 0 1 10.5-4L18 8" /><path d="M18 4v4h-4M19 14a6 6 0 0 1-10.5 4L6 16" /><path d="M6 20v-4h4" /></>,
  up: <><path d="M4 18l6-6 4 4 6-8" /><path d="M15 8h5v5" /></>,
  down: <><path d="M4 6l6 6 4-4 6 8" /><path d="M15 16h5v-5" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5 5" /></>,
  scale: <><path d="M12 4v16M6 20h12M5 7h14" /><path d="M5 7l-2.5 6a2.8 2.8 0 0 0 5 0zM19 7l-2.5 6a2.8 2.8 0 0 0 5 0z" /></>,
  percent: <><path d="M6 18L18 6" /><circle cx="7.5" cy="7.5" r="2.2" /><circle cx="16.5" cy="16.5" r="2.2" /></>,
  card: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 15h4" /></>,
  umbrella: <><path d="M3 12a9 9 0 0 1 18 0z" /><path d="M12 12v6a2 2 0 0 1-4 0" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M9 7V5h6v2M3 12h18" /></>,
  doc: <><path d="M6 3h9l3 3v15H6z" /><path d="M9 10h6M9 14h6M9 18h4" /></>,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  people: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0M14.5 15a4 4 0 0 1 6 3.5" /></>,
  jar: <><path d="M8 3h8M7 6h10v13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" /><path d="M7 11h10" /></>,
  sprout: <><path d="M12 20v-8" /><path d="M12 12c0-4 3-6 7-6 0 4-3 6-7 6zM12 14c0-3-2.5-5-6-5 0 3 2.5 5 6 5z" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  compass: <><circle cx="12" cy="12" r="8" /><path d="M15 9l-2 5-4 1 2-5z" /></>,
  basket: <><path d="M4 10h16l-2 9H6z" /><path d="M8 10l3-6M16 10l-3-6M9 14v2M12 14v2M15 14v2" /></>,
  brain: <><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1" /></>,
  house: <><path d="M4 11l8-7 8 7" /><path d="M6 10v10h12V10M10 20v-5h4v5" /></>,
  key: <><circle cx="8" cy="15" r="4" /><path d="M11 12l8-8M16 7l2 2M14 9l2 2" /></>,
  tool: <path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 0-2-2z" />,
  grad: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />
}

export default function Icon({ name, size = 22, stroke = 2 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{P[name] || P.coin}</svg>
  )
}
