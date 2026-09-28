// The hero's rise. Every finished lesson changes one small thing on him;
// every finished chapter adds something big to his world.

const BASE = {
  shirt: 'none', hat: 'beanie', missing: ['t3', 't8', 'b5'], crook: 1, white: false, gold: 0, grill: false,
  pants: 'rag', pocketsOut: true, patch: true, shoes: 'flipMismatch', right: 'none', cigar: 'none', smoke: false,
  left: 'none', neck: 'none', neck2: false, watch: 'none', watch2: false, bracelet: false, earring: 'none',
  rings: 0, eyes: 'none', brow: 'sad', bandage: false, tie: false, cufflinks: false, fur: false, feather: false,
  socks: 'none', toothpick: false, tattoo: false, finRing: false, headphones: false, bracelet2: false, chestHair: false,
  pin: false, pocketSquare: false, smokeRings: false, buckle: false, diamondTooth: false, neck3: false, cape: false
}

// index i = what the (i+1)-th finished lesson brings
export const LESSON_UPGRADES = [
  ['כיסים במקום!', { pocketsOut: false }],
  ['כפכפים באותו צבע!', { shoes: 'flip' }],
  ['גופייה!', { shirt: 'tank' }],
  ['טלפון מקופל!', { left: 'flip' }],
  ['כל השיניים!', { missing: [] }],
  ['תיקון מכנסיים!', { patch: false }],
  ['ביטחון עצמי!', { brow: 'confident' }],
  ['שעון!', { watch: 'plastic' }],
  ['סניקרס!', { shoes: 'sneaker' }],
  ['חולצה שלמה!', { shirt: 'tee' }],
  ['כובע מצחייה!', { hat: 'cap' }],
  ['שיניים ישרות!', { crook: 0 }],
  ['סמארטפון!', { left: 'phone' }],
  ['ג׳ינס!', { pants: 'jeans' }],
  ['צמיד!', { bracelet: true }],
  ['שרשרת!', { neck: 'silver' }],
  ['משקפי שמש!', { eyes: 'cheap' }],
  ['בלי כובע!', { hat: 'none' }],
  ['חולצת הוואי!', { shirt: 'hawaii' }],
  ['אוזניות!', { headphones: true }],
  ['חיוך מושלם!', { white: true }],
  ['טבעת!', { rings: 1 }],
  ['ארנק מלא!', { right: 'wallet' }],
  ['שרשרת זהב!', { neck: 'goldThin' }],
  ['שעון זהב!', { watch: 'gold' }],
  ['משקפי מעצבים!', { eyes: 'designer' }],
  ['חולצה מכופתרת!', { shirt: 'button' }],
  ['עוד טבעת!', { rings: 2 }],
  ['צמיד שני!', { bracelet2: true }],
  ['קפה בחוץ!', { left: 'coffee' }],
  ['מכנסי פשתן!', { pants: 'linen' }],
  ['מוקסינים!', { shoes: 'loafer' }],
  ['שרשרת עבה!', { neck: 'goldThick' }],
  ['חולצת משי!', { shirt: 'silk' }],
  ['בלייזר!', { shirt: 'blazer' }],
  ['סיכה בדש!', { pin: true }],
  ['סיגר!', { cigar: 'small' }],
  ['מבט של מיליונר!', { brow: 'smug' }],
  ['כובע של מאפיונר!', { hat: 'fedora' }],
  ['וויסקי!', { left: 'whiskey' }],
  ['מכנסי חליפה!', { pants: 'suit' }],
  ['נעלי עור!', { shoes: 'dress' }],
  ['עניבה!', { tie: true }],
  ['מטפחת בכיס!', { pocketSquare: true }],
  ['שעון יהלומים!', { watch: 'diamond' }],
  ['מדליון ענק!', { neck: 'medallion' }],
  ['חליפה לבנה!', { shirt: 'suitWhite' }],
  ['הסיגר דולק!', { smoke: true }],
  ['טבעות עשן!', { smokeRings: true }],
  ['אבזם ענק!', { buckle: true }],
  ['משקפי זהב!', { eyes: 'goldShades' }],
  ['מעיל פרווה!', { fur: true }],
  ['סיגר ענק!', { cigar: 'big' }],
  ['גריל זהב!', { grill: true }],
  ['כתר!', { hat: 'crown' }]
]

// index i = what the (i+1)-th finished chapter brings
export const CHAPTER_UPGRADES = [
  { name: 'אופניים!', text: 'יד שנייה, בלי בלמים. אבל שלו.' },
  { name: 'חדר משלו!', text: 'להתראות ספסל, שלום חדר עם חלון.' },
  { name: 'קטנוע!', text: 'עכשיו מגיעים לעבודה בזמן.' },
  { name: 'אוטו ראשון!', text: 'דלת אחת בצבע אחר. מושלם.' },
  { name: 'דירה!', text: 'שלושה חדרים ומרפסת שמש.' },
  { name: 'חברה כוסית!', text: 'היא ראתה את טבלת ההוצאות שלו ונדלקה.' },
  { name: 'קבריולט!', text: 'גג נפתח. השיער - כלומר הסנפיר - ברוח.' },
  { name: 'בית עם גינה!', text: 'דשא, עץ, ומקום לגריל.' },
  { name: 'בריכה!', text: 'כי כריש צריך מים.' },
  { name: 'אוטו ספורט!', text: 'אדום, נמוך, ושולם במזומן. כמובן.' },
  { name: 'עוד חברה כוסית!', text: 'גם היא אוהבת תיקים מפוזרים.' },
  { name: 'וילה!', text: 'עמודים לבנים. הרבה עמודים לבנים.' },
  { name: 'למבורגיני!', text: 'צהובה. כמובן שצהובה.' },
  { name: 'יאכטה!', text: 'עוגנת ברקע. הוא אפילו לא יודע לשוט.' },
  { name: 'אחוזה!', text: 'שער, מזרקה, ומישהו שפותח את השער.' },
  { name: 'מטוס פרטי!', text: 'המסע הושלם. לאן טסים?' }
]

export const coinsOf = (state) => Object.values(state.done || {}).reduce((a, d) => a + d.length, 0)
export const chaptersOf = (state) => Object.keys(state.chapterDone || {}).filter((k) => state.chapterDone[k]).length

// Upgrades are spread evenly over all lessons, so the last lesson brings the crown.
export const TOTAL_LESSONS = 84
export const upgradesAt = (lessons) => Math.min(LESSON_UPGRADES.length, Math.ceil(lessons * LESSON_UPGRADES.length / TOTAL_LESSONS))
export function heroLook(lessons) {
  const look = { ...BASE }
  LESSON_UPGRADES.slice(0, upgradesAt(lessons)).forEach(([, patch]) => Object.assign(look, patch))
  return look
}
export const lessonUpgrade = (lessons) => (upgradesAt(lessons) > upgradesAt(lessons - 1) ? LESSON_UPGRADES[upgradesAt(lessons) - 1][0] : null)
export const chapterUpgrade = (chapters) => CHAPTER_UPGRADES[chapters - 1]
