import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const paragraphs = [
  { text: 'My Love ❤️', isTitle: true },
  {
    text: 'Every moment with you is my favorite moment.',
    isTitle: false,
  },
  {
    text: 'Your smile brightens my days, your laughter fills my heart, and every memory we create together becomes a treasure I never want to lose.',
    isTitle: false,
  },
  {
    text: 'Life feels better when I\'m with you, and there are still so many beautiful memories waiting for us.',
    isTitle: false,
  },
  {
    text: 'So I have one question for you…',
    isTitle: false,
    emphasis: true,
  },
]

interface LandingPageProps {
  onContinue: () => void
}

export default function LandingPage({ onContinue }: LandingPageProps) {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 4500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-card glow-ring relative max-w-2xl rounded-3xl px-8 py-10 sm:px-12 sm:py-14">
        <div className="space-y-5 text-center">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className={`font-display leading-relaxed ${
                p.isTitle
                  ? 'text-3xl font-semibold text-rose-gold sm:text-4xl md:text-5xl'
                  : p.emphasis
                    ? 'text-xl font-medium italic text-rose-gold sm:text-2xl'
                    : 'text-lg text-rose-gold/90 sm:text-xl'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {p.text}
            </motion.p>
          ))}
        </div>

        {showButton && (
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
          >
            <motion.button
              type="button"
              onClick={onContinue}
              className="glow-button font-display rounded-full px-10 py-4 text-lg font-semibold text-white sm:px-14 sm:py-5 sm:text-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(248,180,196,0.6), 0 0 40px rgba(183,110,121,0.3)',
                  '0 0 35px rgba(248,180,196,0.9), 0 0 70px rgba(183,110,121,0.5)',
                  '0 0 20px rgba(248,180,196,0.6), 0 0 40px rgba(183,110,121,0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Open My Question ❤️
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
