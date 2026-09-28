// Live, draggable versions of the old calculator lessons.
import { IL } from '../constants.js'
import { nis } from '../../lib/format.js'

const fv = (monthly, years, r) => { const i = r / 12, n = years * 12; return i ? monthly * ((1 + i) ** n - 1) / i : monthly * n }
const pmt = (P, years, r) => { const i = r / 12, n = years * 12; return i ? P * i / (1 - (1 + i) ** -n) : P / n }
const round = (x) => Math.round(x / 100) * 100
const GOLD = '#d9a32c', BLUE = '#5f86a3', RED = '#c9533f', GREEN = '#2f6e4b'

export const LIVE = {
  s3: { prompt: 'כמה זמן הכרית של כספי קונה?', label: 'כמה יש בצד', min: 0, max: 60000, step: 1500, start: 15000,
    compute: (v) => { const m = v / 7500; return { big: `${m.toFixed(1).replace('.0', '')} חודשים`, fill: m / 6,
      caption: m < 3 ? 'פחות משלושה חודשים. הפתעה אחת גדולה והכרית נגמרת.' : m <= 6 ? 'בטווח המקובל של 3-6 חודשים.' : 'יותר מחצי שנה של שקט.' } },
    takeaway: 'כרית ביטחון נמדדת בזמן, לא בשקלים. זמן הוא מה שמונע מכירה בלחץ או הלוואה יקרה.' },
  i1: { prompt: '500 ₪ בחודש עד גיל 67. מאיזה גיל מתחילים?', label: 'גיל התחלה', min: 20, max: 55, step: 1, start: 25, format: (x) => `${x}`,
    compute: (age) => { const y = 67 - age, total = fv(500, y, IL.illustrationReturn), dep = 500 * 12 * y
      return { big: nis(round(total)), parts: [['הפקדתם', dep, BLUE], ['צמח לבד', total - dep, GOLD]],
        caption: `הפקדתם ${nis(round(dep))}. כל השאר צמח לבד. (תשואה של 6% לשנה - להמחשה בלבד, לא תחזית.)` } },
    takeaway: 'עשר שנים מוקדם יותר עושות יותר מהכפלת ההפקדה. הזמן הוא המשתנה החזק ביותר.' },
  i8: { prompt: '100,000 ₪ ל־30 שנה. כמה הולך לדמי ניהול?', label: 'דמי ניהול שנתיים', min: 0, max: 2, step: 0.1, start: 1.5, format: (x) => `${x.toFixed(1)}%`,
    compute: (f) => { const r = IL.illustrationReturn, gross = 100000 * (1 + r) ** 30, net = 100000 * (1 + r - f / 100) ** 30
      return { big: `${nis(round(gross - net))} לעמלות`, parts: [['נשאר לכם', net, GREEN], ['הלך לעמלות', gross - net, RED]],
        caption: `מתוך ${nis(round(gross))} אפשריים. (תשואה של 6% להמחשה.)` } },
    takeaway: 'התשואה לא ודאית. העלויות הן אחד הדברים היחידים שאפשר לבדוק מראש.' },
  d2: { prompt: 'הלוואה של 50,000 ₪ בריבית 9%. על כמה שנים פורסים?', label: 'שנים', min: 1, max: 10, step: 1, start: 3, format: (x) => `${x}`,
    compute: (y) => { const m = pmt(50000, y, 0.09), interest = m * y * 12 - 50000
      return { big: `${nis(Math.round(m))} בחודש`, parts: [['ההלוואה', 50000, BLUE], ['ריבית', interest, RED]],
        caption: `סך הריבית: ${nis(round(interest))}. תשלום חודשי נמוך הוא לא הלוואה זולה.` } },
    takeaway: 'פריסה ארוכה מקטינה את התשלום החודשי ומגדילה את סך הריבית.' },
  n3: { prompt: 'אם כספי לא יכול לעבוד - כמה חסר לו בכל חודש?', label: 'אחוז הכיסוי מהשכר', min: 0, max: 75, step: 5, start: 50, format: (x) => `${x}%`,
    compute: (c) => { const gap = Math.max(0, 9000 - 12000 * c / 100)
      return { big: gap ? `חסרים ${nis(gap)} בחודש` : 'אין פער', fill: gap / 9000,
        caption: `וזה אחרי 90 ימי המתנה שבהם לא משולם כלום - 27,000 ₪ שצריכים להגיע מהכרית. (אי אפשר לבטח מעל 75%.)` } },
    takeaway: 'הפער בין הכיסוי להוצאות הוא המספר שקובע כמה זמן הכרית מחזיקה.' },
  p3: { prompt: '2,000 ₪ בחודש ל־35 שנה. מה עושים דמי ניהול מהצבירה?', label: 'דמי ניהול מהצבירה', min: 0.05, max: 0.5, step: 0.01, start: 0.25, format: (x) => `${x.toFixed(2)}%`,
    compute: (f) => { const r = IL.illustrationReturn, a = fv(2000, 35, r - f / 100), b = fv(2000, 35, r - IL.pensionDefaultBalanceFee)
      return { big: nis(round(a)), fill: a / fv(2000, 35, r),
        caption: `מול קרן ברירת מחדל (${(IL.pensionDefaultBalanceFee * 100).toFixed(2)}%): ${a < b ? 'פחות' : 'יותר'} ${nis(round(Math.abs(b - a)))}. (6% להמחשה.)` } },
    takeaway: 'דמי ניהול ניתנים למשא ומתן. התשואה לא בשליטתכם - הם כן, לפחות חלקית.' },
  r4: { prompt: `משכנתא של מיליון ₪ בריבית ${(IL.mortgageFixedUnlinked * 100).toFixed(1)}%. על כמה שנים?`, label: 'שנים', min: 10, max: 30, step: 1, start: 30, format: (x) => `${x}`,
    compute: (y) => { const m = pmt(1000000, y, IL.mortgageFixedUnlinked), interest = m * y * 12 - 1000000
      return { big: `${nis(Math.round(m))} בחודש`, parts: [['ההלוואה', 1000000, BLUE], ['ריבית', interest, RED]],
        caption: `סך הריבית: ${nis(round(interest))}.` } },
    takeaway: 'הארכת התקופה מקלה על החודש ומייקרת את העסקה כולה.' }
}
