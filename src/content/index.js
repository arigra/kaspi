import { flow } from './chapters/flow.js'
import { surplus } from './chapters/surplus.js'

// The path: five stages, each a list of chapters. A chapter without content
// yet is listed with `writing: true` and shows as "still being written".
export const STAGES = [
  { title: 'הכסף שלי', chapters: [{ id: 'payslip', title: 'התלוש', writing: true }, flow, surplus] },
  { title: 'קרקע יציבה', chapters: [
    { id: 'buffer', title: 'כרית ביטחון', writing: true },
    { id: 'debt', title: 'חובות ואשראי', writing: true },
    { id: 'insurance', title: 'ביטוחים', writing: true }] },
  { title: 'איך כסף גדל', chapters: [
    { id: 'save-vs-invest', title: 'חיסכון מול השקעה', writing: true },
    { id: 'compound', title: 'ריבית דריבית', writing: true },
    { id: 'pension', title: 'פנסיה והשתלמות', writing: true }] },
  { title: 'להשקיע נכון', chapters: [
    { id: 'risk', title: 'סיכון ותשואה', writing: true },
    { id: 'diversify', title: 'פיזור', writing: true },
    { id: 'etf', title: 'מדדים וקרנות סל', writing: true },
    { id: 'fees', title: 'עמלות ומס', writing: true }] },
  { title: 'תכנון תיק', chapters: [
    { id: 'allocation', title: 'טווח והקצאה', writing: true },
    { id: 'mind', title: 'הראש והתזמון', writing: true },
    { id: 'rebalance', title: 'איזון מחדש', writing: true },
    { id: 'realestate', title: 'נדל״ן בתוך התמונה', writing: true }] }
]

export const CHAPTERS = STAGES.flatMap((stage, stageIndex) =>
  stage.chapters.map((chapter) => ({ ...chapter, stage: stageIndex })))

export const chapterById = (id) => CHAPTERS.find((c) => c.id === id)

// Resolve `{ ref: [lesson, screen] }` entries in a chapter challenge.
export function challengeScreens(chapter) {
  return chapter.challenge.map((s) => (s.ref ? chapter.lessons[s.ref[0]].screens[s.ref[1]] : s))
}
