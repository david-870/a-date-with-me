import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const NOTES = [261.63, 329.63, 392.0, 523.25, 440.0, 349.23]

interface MusicToggleProps {
  autoPlay?: boolean
  className?: string
}

export default function MusicToggle({ autoPlay = false, className = '' }: MusicToggleProps) {
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const noteIndexRef = useRef(0)

  const stopMusic = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (ctxRef.current) {
      void ctxRef.current.close()
      ctxRef.current = null
    }
    setPlaying(false)
  }, [])

  const playNote = useCallback((frequency: number) => {
    const ctx = ctxRef.current
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.value = frequency
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 2.5)
  }, [])

  const startMusic = useCallback(async () => {
    if (playing) return

    const ctx = new AudioContext()
    ctxRef.current = ctx
    await ctx.resume()

    noteIndexRef.current = 0
    playNote(NOTES[0])

    intervalRef.current = setInterval(() => {
      noteIndexRef.current = (noteIndexRef.current + 1) % NOTES.length
      playNote(NOTES[noteIndexRef.current])
    }, 2000)

    setPlaying(true)
  }, [playing, playNote])

  const toggle = useCallback(() => {
    if (playing) {
      stopMusic()
    } else {
      void startMusic()
    }
  }, [playing, startMusic, stopMusic])

  useEffect(() => {
    if (autoPlay) {
      void startMusic()
    }
    return () => stopMusic()
  }, [autoPlay, startMusic, stopMusic])

  return (
    <motion.button
      type="button"
      onClick={toggle}
      className={`glass-card flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-rose-gold transition-colors hover:bg-white/60 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={playing ? 'Pause romantic music' : 'Play romantic music'}
      aria-pressed={playing}
    >
      <span aria-hidden="true">{playing ? '🎵' : '🎶'}</span>
      <span className="font-display">{playing ? 'Music On' : 'Play Music'}</span>
    </motion.button>
  )
}
