import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MAX_NO_ATTEMPTS } from '../data/dateTypes'
import { HER_NAME } from '../data/personalization'

const NO_MESSAGES = [
  `Are you sure, ${HER_NAME}? 🥺`,
  `Think again, ${HER_NAME} ❤️`,
  'I planned this with love 😘',
  'One more chance? 💕',
] as const

interface QuestionPageProps {
  onYes: () => void
}

interface ButtonPosition {
  top: number
  left: number
}

function randomPosition(): ButtonPosition {
  const padding = 15
  return {
    top: padding + Math.random() * (70 - padding),
    left: padding + Math.random() * (70 - padding),
  }
}

export default function QuestionPage({ onYes }: QuestionPageProps) {
  const [noClicks, setNoClicks] = useState(0)
  const [noPosition, setNoPosition] = useState<ButtonPosition | null>(null)
  const [message, setMessage] = useState('')
  const showFinalNo = noClicks >= MAX_NO_ATTEMPTS

  const yesScale = 1 + noClicks * 0.15

  const handleNo = useCallback(() => {
    const nextClicks = noClicks + 1
    setNoClicks(nextClicks)
    setNoPosition(randomPosition())
    setMessage(NO_MESSAGES[Math.min(nextClicks - 1, NO_MESSAGES.length - 1)])
  }, [noClicks])

  const handleFinalNo = useCallback(() => {
    onYes()
  }, [onYes])

  return (
    <motion.div
      className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-12"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-card relative w-full max-w-lg rounded-3xl px-8 py-12 text-center sm:px-12">
        <motion.h1
          className="font-display text-2xl font-semibold leading-snug text-rose-gold sm:text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {HER_NAME}, will you go on a special date with me? ❤️
        </motion.h1>

        <AnimatePresence mode="wait">
          {message && (
            <motion.p
              key={message}
              className="mt-6 font-display text-lg italic text-blush-dark sm:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              role="status"
              aria-live="polite"
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="relative mt-10 flex min-h-[120px] flex-col items-center justify-center gap-4 sm:min-h-[100px] sm:flex-row sm:gap-6">
          <motion.button
            type="button"
            onClick={onYes}
            className="glow-button font-display z-10 rounded-full px-10 py-3.5 text-lg font-semibold text-white"
            style={{ transformOrigin: 'center' }}
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.05 }}
            whileTap={{ scale: yesScale * 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            Yes 💕
          </motion.button>

          {!showFinalNo ? (
            <motion.button
              type="button"
              onClick={handleNo}
              className="font-display rounded-full border-2 border-lavender-dark/40 bg-white/50 px-8 py-3 text-base text-rose-gold/80 backdrop-blur-sm transition-colors hover:bg-white/70 sm:relative sm:px-10 sm:py-3.5 sm:text-lg"
              animate={
                noPosition
                  ? {
                      position: 'fixed' as const,
                      top: `${noPosition.top}%`,
                      left: `${noPosition.left}%`,
                      zIndex: 20,
                    }
                  : {}
              }
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              whileHover={{ scale: 1.02 }}
            >
              No 🙈
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={handleFinalNo}
              className="font-display max-w-xs rounded-full border-2 border-blush bg-blush-light/60 px-6 py-3 text-sm text-rose-gold sm:max-w-sm sm:px-8 sm:py-3.5 sm:text-base"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
            >
              Okay fine… but you know you want to say Yes 😍
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
