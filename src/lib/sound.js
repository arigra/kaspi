let ctx = null
let muted = false
export const setMuted = (m) => { muted = m }

function tone(freqs, dur = 0.1, type = 'sine', gap = 0.08, vol = 0.06) {
  if (muted) return
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)()
    const t0 = ctx.currentTime
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain(), t = t0 + i * gap
      o.type = type; o.frequency.value = f
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(vol, t + 0.012)
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
      o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + dur + 0.03)
    })
  } catch { /* audio unavailable */ }
}

export const sfx = {
  tap: () => tone([700], 0.05, 'sine', 0, 0.035),
  good: () => { tone([660, 880], 0.13, 'sine', 0.09); navigator.vibrate?.(12) },
  soft: () => tone([420], 0.16, 'sine', 0, 0.035),
  card: () => tone([523, 659, 784], 0.15, 'triangle', 0.08, 0.05),
  done: () => tone([523, 659, 784, 1046], 0.18, 'triangle', 0.1, 0.05)
}
