// Turns lessons from the old Leo format (intro + explanation + one quiz) into
// the screen format: explain → predict → insight card. Tool lessons whose
// interactive tool isn't built yet keep the explanation, minus the
// "enter your numbers" sentence, until the tool arrives.
import { saving } from './saving.js'
import { investing } from './investing.js'
import { debt } from './debt.js'
import { insurance } from './insurance.js'
import { pension } from './pension.js'
import { realestate } from './realestate.js'

const PATHS = { s: saving, i: investing, d: debt, n: insurance, p: pension, r: realestate }

const stripToolPrompt = (text) =>
  text.split(/(?<=[.!?])\s+/).filter((s) => !/הזינו|שימו לב מה קורה כשמזיזים/.test(s)).join(' ')

function adapt(old) {
  const screens = []
  if (old.kind === 'tool') {
    screens.push({ type: 'explain', title: old.intro, text: stripToolPrompt(old.explanation), source: old.source })
  } else {
    screens.push({ type: 'explain', title: old.intro, text: old.explanation, source: old.source })
    screens.push({ type: 'predict', prompt: old.question, options: old.options, answer: old.answer, reveal: old.takeaway })
  }
  return { title: old.title, minutes: old.minutes, screens, card: { front: old.title, back: old.takeaway } }
}

// Build a chapter from references like 's3' (saving lesson 3).
export function legacyChapter({ id, title, refs, item, guide = 'kaspi' }) {
  const lessons = refs.map((r) => adapt(PATHS[r[0]].lessons[Number(r.slice(1))]))
  const challenge = lessons
    .map((l, i) => (l.screens.length > 1 ? { ref: [i, 1] } : null))
    .filter(Boolean)
    .slice(-3)
  return { id, title, guide, lessons, challenge: challenge.length ? challenge : [{ ref: [0, 0] }], item }
}
