// Turns lessons from the old Leo format into the hero format:
// scene → the hero's decision → short tap-through cards → (live tool) → insight card.
import { saving } from './saving.js'
import { investing } from './investing.js'
import { debt } from './debt.js'
import { insurance } from './insurance.js'
import { pension } from './pension.js'
import { realestate } from './realestate.js'
import { HERO, TOOL_SCENES, MISSIONS } from './hero.js'
import { LIVE } from './tools.js'

const PATHS = { s: saving, i: investing, d: debt, n: insurance, p: pension, r: realestate }

const graphemes = (s) => (typeof Intl !== 'undefined' && Intl.Segmenter
  ? [...new Intl.Segmenter('he', { granularity: 'grapheme' }).segment(s)].map((x) => x.segment)
  : Array.from(s))

function toCards(text, emojis) {
  const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => !/הזינו|שימו לב מה קורה כשמזיזים/.test(s))
  const cards = []
  for (const s of sentences) {
    const last = cards[cards.length - 1]
    if (last && last.length + s.length < 120) cards[cards.length - 1] = last + ' ' + s
    else cards.push(s)
  }
  while (cards.length > 4) { const a = cards.pop(); cards[cards.length - 1] += ' ' + a }
  const e = graphemes(emojis || '💡👉🎯')
  return cards.map((c, i) => [e[i % e.length], c])
}

function adapt(ref) {
  const old = PATHS[ref[0]].lessons[Number(ref.slice(1))]
  const screens = []
  if (old.kind === 'tool') {
    const sc = TOOL_SCENES[ref]
    if (sc) screens.push({ type: 'scene', text: sc[0], say: sc[1], mood: sc[2] })
    screens.push({ type: 'cards', title: old.intro, cards: toCards(old.explanation), source: old.source })
    if (LIVE[ref]) screens.push({ type: 'live', math: true, ...LIVE[ref] })
  } else {
    const h = HERO[ref]
    if (h) {
      screens.push({ type: 'scene', text: h.s[0], say: h.s[1], mood: h.s[2] })
      screens.push({ type: 'choice', prompt: h.q, options: old.options.map((t, i) => ({ t, out: h.o[i], good: i === old.answer, emoji: ['א', 'ב', 'ג', 'ד'][i] })) })
      screens.push({ type: 'cards', title: old.intro, cards: toCards(old.explanation, h.e), source: old.source })
    } else {
      screens.push({ type: 'cards', title: old.intro, cards: toCards(old.explanation), source: old.source })
      screens.push({ type: 'predict', prompt: old.question, options: old.options, answer: old.answer, reveal: old.takeaway })
    }
  }
  if (MISSIONS[ref]) screens.push({ type: 'mission', text: MISSIONS[ref] })
  return { title: old.title, minutes: old.minutes, screens, card: { front: old.title, back: old.takeaway }, _q: old }
}

// Build a chapter from references like 's3' (saving lesson 3).
export function legacyChapter({ id, title, refs, item, guide = 'kaspi' }) {
  const lessons = refs.map(adapt)
  // The chapter challenge replays each lesson's question in the classic quiz form.
  const challenge = lessons
    .filter((l) => l._q.question)
    .slice(-3)
    .map((l) => ({ type: 'predict', prompt: l._q.question, options: l._q.options, answer: l._q.answer, reveal: l._q.takeaway }))
  lessons.forEach((l) => delete l._q)
  return { id, title, guide, lessons, challenge: challenge.length ? challenge : [{ ref: [0, 0] }], item }
}
