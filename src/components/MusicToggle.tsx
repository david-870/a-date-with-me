import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { getTrackUrl, ROMANTIC_TRACK } from '../data/music'

interface MusicToggleProps {
  autoPlay?: boolean
  className?: string
}

export default function MusicToggle({ autoPlay = false, className = '' }: MusicToggleProps) {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(getTrackUrl())
      audio.loop = true
      audio.volume = 0.55
      audio.preload = 'auto'
      audio.addEventListener('canplaythrough', () => setReady(true))
      audio.addEventListener('play', () => setPlaying(true))
      audio.addEventListener('pause', () => setPlaying(false))
      audioRef.current = audio
    }
    return audioRef.current
  }, [])

  const play = useCallback(async () => {
    const audio = getAudio()
    try {
      await audio.play()
    } catch {
      setPlaying(false)
    }
  }, [getAudio])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const toggle = useCallback(() => {
    if (playing) {
      pause()
    } else {
      void play()
    }
  }, [playing, play, pause])

  useEffect(() => {
    getAudio()
    if (autoPlay) {
      void play()
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [autoPlay, getAudio, play])

  const label = playing
    ? `${ROMANTIC_TRACK.title} ♪`
    : ready
      ? `Play ${ROMANTIC_TRACK.title}`
      : 'Loading music…'

  return (
    <motion.button
      type="button"
      onClick={toggle}
      className={`glass-card flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-rose-gold transition-colors hover:bg-white/60 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={
        playing
          ? `Pause ${ROMANTIC_TRACK.title} by ${ROMANTIC_TRACK.artist}`
          : `Play ${ROMANTIC_TRACK.title} by ${ROMANTIC_TRACK.artist}`
      }
      aria-pressed={playing}
    >
      <span aria-hidden="true">{playing ? '🎵' : '🎶'}</span>
      <span className="font-display">{label}</span>
    </motion.button>
  )
}
