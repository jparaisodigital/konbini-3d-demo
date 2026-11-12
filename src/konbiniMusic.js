const BPM = 112
const STEP = 60 / BPM / 2

// Original 4-bar KONBINI melody
const melody = [
  76, null, 79, 81, 79, null, 76, 74,
  76, null, 72, 76, 79, null, 76, null,
  72, null, 76, 79, 76, 74, 72, null,
  74, null, 76, 79, 76, 74, 72, null,
]

const chords = [
  [60, 64, 67, 71],
  [57, 60, 64, 67],
  [53, 57, 60, 64],
  [55, 59, 62, 65],
]

const bass = [48, 45, 41, 43]

export function createKonbiniMusic() {
  let context = null
  let master = null
  let timer = null
  let nextTime = 0
  let stepIndex = 0
  let muted = false

  const frequency = (midi) =>
    440 * Math.pow(2, (midi - 69) / 12)

  function tone(midi, time, duration, type, volume) {
    const oscillator = context.createOscillator()
    const envelope = context.createGain()

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency(midi), time)

    envelope.gain.setValueAtTime(0.0001, time)
    envelope.gain.exponentialRampToValueAtTime(
      volume,
      time + 0.012
    )
    envelope.gain.exponentialRampToValueAtTime(
      0.0001,
      time + duration
    )

    oscillator.connect(envelope)
    envelope.connect(master)

    oscillator.start(time)
    oscillator.stop(time + duration + 0.03)
  }

  function schedule() {
    if (nextTime < context.currentTime - 0.5) {
      nextTime = context.currentTime + 0.04
    }

    while (nextTime < context.currentTime + 0.2) {
      const beat = stepIndex % melody.length
      const bar = Math.floor(beat / 8)
      const note = melody[beat]

      // Soft retro keyboard melody
      if (note !== null) {
        tone(note, nextTime, STEP * 0.85, 'triangle', 0.16)
        tone(note + 12, nextTime, STEP * 0.55, 'sine', 0.035)
      }

      // Light chord accompaniment
      if (beat % 2 === 0) {
        const chord = chords[bar]
        const chordNote = chord[(beat / 2) % chord.length]

        tone(chordNote + 12, nextTime, STEP * 1.5, 'sine', 0.055)
      }

      // Warm bass pulse
      if (beat % 4 === 0) {
        tone(bass[bar], nextTime, STEP * 2.7, 'sine', 0.13)
      }

      // Subtle rhythmic tick
      if (beat % 2 === 1) {
        tone(96, nextTime, 0.035, 'triangle', 0.016)
      }

      stepIndex = (stepIndex + 1) % melody.length
      nextTime += STEP
    }
  }

  async function start() {
    if (timer !== null) return

    if (!context) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext

      if (!AudioContextClass) return

      context = new AudioContextClass()
      master = context.createGain()
      master.gain.value = muted ? 0 : 0.65
      master.connect(context.destination)
    }

    await context.resume()

    stepIndex = 0
    nextTime = context.currentTime + 0.05

    schedule()
    timer = window.setInterval(schedule, 100)
  }

  function setMuted(value) {
    muted = value

    if (master && context) {
      master.gain.setTargetAtTime(
        muted ? 0 : 0.65,
        context.currentTime,
        0.03
      )
    }
  }

  function dispose() {
    if (timer !== null) {
      window.clearInterval(timer)
      timer = null
    }

    if (context) {
      context.close()
      context = null
      master = null
    }
  }

  return { start, setMuted, dispose }
}

