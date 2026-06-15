import { motion } from 'framer-motion'
import { FloatingHearts } from './AnimatedBackground'
import type { DateDetails } from '../types'

interface ConfirmationScreenProps {
  details: DateDetails
}

function formatDate(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function formatTime(timeStr: string): string {
  try {
    const [hours, minutes] = timeStr.split(':').map(Number)
    const date = new Date()
    date.setHours(hours, minutes)
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  } catch {
    return timeStr
  }
}

export default function ConfirmationScreen({ details }: ConfirmationScreenProps) {
  const rows = [
    { label: 'Date', value: formatDate(details.date) },
    { label: 'Time', value: formatTime(details.time) },
    { label: 'Type', value: `${details.typeIcon} ${details.typeLabel}` },
    { label: 'Location', value: details.location },
  ]

  return (
    <motion.div
      className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-12"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 200 }}
    >
      <FloatingHearts count={12} />

      <motion.div
        className="glass-card glow-ring relative z-10 w-full max-w-lg rounded-3xl px-6 py-10 sm:px-10 sm:py-12"
        animate={{
          boxShadow: [
            '0 8px 32px rgba(183,110,121,0.15), 0 0 30px rgba(248,180,196,0.2)',
            '0 8px 32px rgba(183,110,121,0.2), 0 0 50px rgba(248,180,196,0.4)',
            '0 8px 32px rgba(183,110,121,0.15), 0 0 30px rgba(248,180,196,0.2)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.h1
          className="font-display mb-8 text-center text-2xl font-bold text-rose-gold sm:text-3xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          ❤️ Our Date Is Official ❤️
        </motion.h1>

        <dl className="space-y-4">
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              className="rounded-2xl bg-white/40 px-5 py-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              <dt className="font-display text-sm font-medium uppercase tracking-wide text-rose-gold/60">
                {row.label}
              </dt>
              <dd className="font-body mt-1 text-lg text-rose-gold sm:text-xl">
                {row.value}
              </dd>
            </motion.div>
          ))}
        </dl>

        <motion.p
          className="font-body mt-8 text-center text-lg leading-relaxed italic text-rose-gold/85 sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Thank you for saying yes. No matter where we go, my favorite part of
          the date will always be spending time with you. ❤️
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
