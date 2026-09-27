// The hero's rise. Every finished lesson changes one small thing on him;
// every finished chapter adds something big to his world.

const BASE = {
  shirt: 'none', hat: 'beanie', missing: ['t3', 't8', 'b5'], crook: 1, white: false, gold: 0, grill: false,
  pants: 'rag', pocketsOut: true, patch: true, shoes: 'flipMismatch', right: 'ravkav', smoke: false,
  left: 'none', neck: 'none', neck2: false, watch: 'none', watch2: false, bracelet: false, earring: 'none',
  rings: 0, eyes: 'none', brow: 'sad', bandage: true, tie: false, cufflinks: false, fur: false, feather: false
}

// index i = what the (i+1)-th finished lesson brings
export const LESSON_UPGRADES = [
  ['כיסים במקום!', { pocketsOut: false }],
  ['כפכפים באותו צבע!', { shoes: 'flip' }],
  ['בלי פלסטר!', { bandage: false }],
  ['גופייה!', { shirt: 'tank' }],
  ['טלפון מקופל!', { right: 'flip' }],
  ['שן חדשה!', { missing: ['t8', 'b5'] }],
  ['מכנסיים בלי טלאי!', { patch: false }],
  ['עוד שן!', { missing: ['t8'] }],
  ['פחות לחוץ!', { brow: 'neutral' }],
  ['שעון!', { watch: 'plastic' }],
  ['סניקרס!', { shoes: 'sneaker' }],
  ['חולצה שלמה!', { shirt: 'tee' }],
  ['כובע מצחייה!', { hat: 'cap' }],
  ['שיניים פחות עקומות!', { crook: 0.6 }],
  ['סמארטפון!', { right: 'phone' }],
  ['כל השיניים!', { missing: [] }],
  ['ג׳ינס!', { pants: 'jeans' }],
  ['עגיל!', { earring: 'stud' }],
  ['צמיד!', { bracelet: true }],
  ['שיניים כמעט ישרות!', { crook: 0.3 }],
  ['שרשרת!', { neck: 'silver' }],
  ['משקפי שמש!', { eyes: 'cheap' }],
  ['ביי ביי כובע גרב!', { hat: 'none' }],
  ['חולצת הוואי!', { shirt: 'hawaii' }],
  ['חיוך מושלם!', { crook: 0, white: true }],
  ['סניקרס זהב!', { shoes: 'goldSneaker' }],
  ['טבעת!', { rings: 1 }],
  ['ביטחון עצמי!', { brow: 'confident' }],
  ['ארנק מלא!', { right: 'wallet' }],
  ['שרשרת זהב!', { neck: 'goldThin' }],
  ['שעון זהב!', { watch: 'gold' }],
  ['משקפי טייסים!', { eyes: 'aviator' }],
  ['חולצה מכופתרת!', { shirt: 'button' }],
  ['עוד טבעת!', { rings: 2 }],
  ['שן זהב!', { gold: 1 }],
  ['קפה ב־28 שקל!', { left: 'coffee' }],
  ['מכנסי פשתן!', { pants: 'linen' }],
  ['מוקסינים!', { shoes: 'loafer' }],
  ['שרשרת עבה!', { neck: 'goldThick' }],
  ['חולצת משי!', { shirt: 'silk' }],
  ['טבעת שלישית!', { rings: 3 }],
  ['עגיל יהלום!', { earring: 'diamond' }],
  ['בלייזר!', { shirt: 'blazer' }],
  ['סיגר!', { right: 'cigar' }],
  ['מבט של מיליונר!', { brow: 'smug' }],
  ['פדורה!', { hat: 'fedora' }],
  ['וויסקי!', { left: 'whiskey' }],
  ['עוד שן זהב!', { gold: 2 }],
  ['מכנסי חליפה!', { pants: 'suit' }],
  ['נעלי עור!', { shoes: 'dress' }],
  ['עניבה!', { tie: true }],
  ['שעון יהלומים!', { watch: 'diamond' }],
  ['מדליון ענק!', { neck: 'medallion' }],
  ['חליפה לבנה!', { shirt: 'suitWhite' }],
  ['הסיגר דולק!', { smoke: true }],
  ['טבעת רביעית!', { rings: 4 }],
  ['משקפי זהב!', { eyes: 'goldShades' }],
  ['חפתים!', { cufflinks: true }],
  ['קרח בוויסקי!', { left: 'whiskeyIce' }],
  ['ארבע שיני זהב!', { gold: 4 }],
  ['מעיל פרווה!', { fur: true }],
  ['סיגר ענק!', { right: 'cigarBig' }],
  ['טבעת בכל אצבע!', { rings: 5 }],
  ['גריל זהב!', { grill: true }],
  ['נוצה בפדורה!', { feather: true }],
  ['שני שעונים!', { watch2: true }],
  ['עוד שרשרת!', { neck2: true }],
  ['כתר!', { hat: 'crown' }]
]

// index i = what the (i+1)-th finished chapter brings
export const CHAPTER_UPGRADES = [
  { name: 'אופניים!', text: 'יד שנייה, בלי בלמים. אבל שלו.' },
  { name: 'חדר משלו!', text: 'שלום ספסל, שלום חדר עם חלון.' },
  { name: 'קטנוע!', text: 'עכשיו מגיעים לעבודה בזמן.' },
  { name: 'אוטו ראשון!', text: 'בן 19, דלת אחת בצבע אחר. מושלם.' },
  { name: 'דירה!', text: 'שלושה חדרים ומרפסת שמש.' },
  { name: 'חברה כוסית!', text: 'היא ראתה את טבלת ההוצאות שלו ונדלקה.' },
  { name: 'קבריולט!', text: 'גג נפתח. השיער — כלומר הסנפיר — ברוח.' },
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

export function heroLook(lessons) {
  const look = { ...BASE }
  LESSON_UPGRADES.slice(0, lessons).forEach(([, patch]) => Object.assign(look, patch))
  return look
}
export const lessonUpgrade = (lessons) => LESSON_UPGRADES[lessons - 1]?.[0]
export const chapterUpgrade = (chapters) => CHAPTER_UPGRADES[chapters - 1]
