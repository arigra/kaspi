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
  const mission = MISSIONS[ref] ? [{ type: 'mission', text: MISSIONS[ref] }] : []
  const card = { front: old.title, back: old.takeaway }
  if (old.kind === 'tool') {
    const sc = TOOL_SCENES[ref]
    const screens = [{ type: 'cards', title: old.intro, cards: toCards(old.explanation), source: old.source }]
    if (sc) screens[0].scene = { text: sc[0], say: sc[1], mood: sc[2] }
    if (LIVE[ref]) screens.push({ type: 'live', math: true, ...LIVE[ref] })
    return [{ title: old.title, minutes: 2, screens: [...screens, ...mission], card, _q: old }]
  }
  const h = HERO[ref]
  const cards = toCards(old.explanation, h?.e)
  const choice = h
    ? { type: 'choice', scene: { text: h.s[0], say: h.s[1], mood: h.s[2] }, prompt: h.q, options: old.options.map((t, i) => ({ t, out: h.o[i], good: i === old.answer })) }
    : { type: 'predict', prompt: old.question, options: old.options, answer: old.answer, reveal: old.takeaway }
  if (cards.length < 4) {
    return [{ title: old.title, minutes: 2, screens: [choice, { type: 'cards', title: old.intro, cards, source: old.source }, ...mission], card, _q: old }]
  }
  // Long idea → two short lessons.
  const second = old.intro.replace(/[.。]$/, '')
  const firstCard = { front: h ? h.q : old.title, back: h ? h.o[old.answer].split(/(?<=[.!?])\s+/)[0] : old.takeaway }
  return [
    { title: old.title, minutes: 2, screens: [choice, { type: 'cards', title: old.intro, cards: cards.slice(0, 2) }], card: firstCard, _q: old },
    { title: second, minutes: 2, screens: [{ type: 'cards', cards: cards.slice(2), source: old.source }, ...mission], card, _q: {} }
  ]
}

// Build a chapter from references like 's3' (saving lesson 3).
export function legacyChapter({ id, title, refs, item, guide = 'kaspi' }) {
  const lessons = refs.flatMap(adapt)
  // The chapter challenge replays each lesson's question in the classic quiz form.
  const challenge = lessons
    .filter((l) => l._q.question)
    .slice(-3)
    .map((l) => ({ type: 'predict', prompt: l._q.question, options: l._q.options, answer: l._q.answer, reveal: l._q.takeaway }))
  lessons.forEach((l) => delete l._q)
  return { id, title, guide, lessons, challenge: challenge.length ? challenge : [{ ref: [0, 0] }], item }
}
