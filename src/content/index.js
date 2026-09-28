import { flow } from './chapters/flow.js'
import { surplus } from './chapters/surplus.js'
import { legacyChapter as L } from './legacy/adapt.js'

const it = (key, name, text) => ({ key, name, text })
const J = 'johnny'

// The path: five stages, each a list of chapters. A chapter without content
// yet is listed with `writing: true` and shows as "still being written".
export const STAGES = [
  { title: 'הכסף שלי', chapters: [{ id: 'payslip', title: 'התלוש', writing: true }, flow, surplus] },
  { title: 'קרקע יציבה', chapters: [
    L({ id: 'buffer', title: 'כרית ביטחון והרגלים', refs: ['s3','s4','s5','s6','s7','s9'], item: it('shell', 'צדף', 'כרית שקונה זמן, והרגל שמחזיק גם בחודש רגיל.') }),
    L({ id: 'debt', title: 'חובות ואשראי', refs: ['d0','d1','d2','d3','d4','d5','d6','d7','d8','d9'], item: it('anchor', 'עוגן', 'עכשיו אתם יודעים כמה חוב באמת עולה, ובאיזה סדר פורעים.') }),
    L({ id: 'insurance', title: 'ביטוחים', refs: ['n0','n1','n2','n3','n4','n5','n6','n7','n8','n9'], item: it('umbrella', 'מטרייה', 'אתם יודעים מה שווה לבטח, ומה כבר מבוטח פעמיים.') })] },
  { title: 'איך כסף גדל', chapters: [
    L({ id: 'save-vs-invest', title: 'חיסכון מול השקעה', guide: J, refs: ['s8','i0'], item: it('seedling', 'נבט', 'לכל כסף יש תפקיד: זמינות או צמיחה.') }),
    L({ id: 'compound', title: 'ריבית דריבית', guide: J, refs: ['i1'], item: it('snail', 'שבלול', 'הזמן הוא המשתנה החזק ביותר.') }),
    L({ id: 'pension', title: 'פנסיה והשתלמות', refs: ['p0','p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11'], item: it('turtle', 'צב ים', 'החיסכון הארוך ביותר שלכם כבר לא קופסה שחורה.') })] },
  { title: 'להשקיע נכון', chapters: [
    L({ id: 'risk', title: 'סיכון ותשואה', guide: J, refs: ['i3','i4','i5'], item: it('wave', 'גל', 'ירידה זמנית ואובדן קבוע הם שני דברים שונים.') }),
    L({ id: 'diversify', title: 'פיזור', guide: J, refs: ['i6'], item: it('fish', 'להקת דגים', 'הרבה ביחד מחזיקים יותר טוב מאחד לבד.') }),
    L({ id: 'etf', title: 'מדדים וקרנות סל', guide: J, refs: ['i7'], item: it('compass', 'מצפן', 'מדד מול ניהול אקטיבי: אתם יודעים מה המחקר אומר.') }),
    L({ id: 'fees', title: 'עמלות ומס', guide: J, refs: ['i8','i9'], item: it('coin', 'מטבע', 'אחוז קטן בשנה הוא סכום גדול לאורך זמן.') })] },
  { title: 'תכנון תיק', chapters: [
    L({ id: 'allocation', title: 'טווח והקצאה', guide: J, refs: ['i2'], item: it('hourglass', 'שעון חול', 'ההשקעה מתחילה מהשאלה מתי הכסף יידרש.') }),
    L({ id: 'mind', title: 'הראש והתזמון', guide: J, refs: ['i10','i11'], item: it('octopus', 'תמנון', 'הראש הוא חלק מהתיק.') }),
    L({ id: 'rebalance', title: 'איזון מחדש', guide: J, refs: ['i12','i13'], item: it('scale', 'מאזניים', 'תוכנית שאפשר לחזור עליה כל שנה.') }),
    L({ id: 'realestate', title: 'נדל״ן בתוך התמונה', refs: ['r0','r1','r2','r3','r4','r5','r6','r7','r8','r9','r10','r11'], item: it('house', 'בית', 'דירה היא נכס, הלוואה והחלטה - ואתם יודעים להפריד ביניהם.') })] }
]

export const CHAPTERS = STAGES.flatMap((stage, stageIndex) =>
  stage.chapters.map((chapter) => ({ ...chapter, stage: stageIndex })))

export const chapterById = (id) => CHAPTERS.find((c) => c.id === id)

// Resolve `{ ref: [lesson, screen] }` entries in a chapter challenge.
export function challengeScreens(chapter) {
  return chapter.challenge.map((s) => (s.ref ? chapter.lessons[s.ref[0]].screens[s.ref[1]] : s))
}
