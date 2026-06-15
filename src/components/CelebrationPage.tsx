import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FallingHearts } from './AnimatedBackground'
import MusicToggle from './MusicToggle'
import { fireCelebrationConfetti } from '../utils/confetti'
import { HER_NAME } from '../data/personalization'

interface CelebrationPageProps {
  onContinue: () => void
}

export default function CelebrationPage({ onContinue }: CelebrationPageProps) {
  useEffect(() => {
    fireCelebrationConfetti()
  }, [])

  return (
    <motion.div
      className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-12"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <FallingHearts active />

      <div className="absolute right-4 top-4 z-10 sm:right-8 sm:top-8">
        <MusicToggle autoPlay />
      </div>

      <motion.div
        className="glass-card glow-ring relative z-10 max-w-2xl rounded-3xl px-8 py-12 text-center sm:px-14 sm:py-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.div
          className="mb-6 text-5xl sm:text-6xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          ❤️
        </motion.div>

        <motion.h1
          className="font-display text-2xl font-semibold leading-snug text-rose-gold sm:text-3xl md:text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          You just made me the happiest person alive, {HER_NAME} ❤️
        </motion.h1>

        <motion.p
          className="mt-6 font-body text-lg leading-relaxed text-rose-gold/85 sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          I can&apos;t wait to spend beautiful time with you and create another
          unforgettable memory together.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            type="button"
            onClick={onContinue}
            className="glow-button font-display rounded-full px-10 py-4 text-lg font-semibold text-white sm:px-14 sm:py-5 sm:text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Let&apos;s Plan Our Date 💕
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
