import { useEffect, useState } from 'react'

const KEY = 'kaspi-state-v1'

export const initialState = () => ({
  onboarded: false,
  done: {},        // chapterId -> [lessonIndex]
  chapterDone: {}, // chapterId -> true
  skipped: {},     // chapterId -> true
  cards: [],       // { front, back, chapter }
  reef: [],        // item keys, in the order earned
  profile: {},     // figures the user entered in tools
  muted: false
})

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
    return saved ? { ...initialState(), ...saved } : initialState()
  } catch {
    return initialState()
  }
}

// App state that survives a reload. Everything stays on this device.
export function usePersistentState() {
  const [state, setState] = useState(load)
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* storage blocked */ }
  }, [state])
  return [state, setState]
}
