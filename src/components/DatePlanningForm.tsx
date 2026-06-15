import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { DATE_TYPES } from '../data/dateTypes'
import type { DateDetails } from '../types'

interface DatePlanningFormProps {
  onSubmit: (details: DateDetails) => void
}

export default function DatePlanningForm({ onSubmit }: DatePlanningFormProps) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [location, setLocation] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const today = new Date().toISOString().split('T')[0]

  const validate = (): boolean => {
    const next: Record<string, string> = {}
    if (!date) next.date = 'Please choose a date'
    if (!time) next.time = 'Please choose a time'
    if (!selectedType) next.type = 'Please pick a date type'
    if (!location.trim()) next.location = 'Please enter a location'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const typeOption = DATE_TYPES.find((t) => t.id === selectedType)!
    onSubmit({
      date,
      time,
      type: selectedType,
      typeLabel: typeOption.label,
      typeIcon: typeOption.icon,
      location: location.trim(),
    })
  }

  return (
    <motion.div
      className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-12"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-card w-full max-w-2xl rounded-3xl px-6 py-8 sm:px-10 sm:py-12">
        <motion.h1
          className="font-display mb-8 text-center text-2xl font-semibold text-rose-gold sm:text-3xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Plan Our Perfect Date 💕
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          <fieldset>
            <legend className="font-display mb-3 block text-lg font-medium text-rose-gold">
              Choose a Date
            </legend>
            <input
              type="date"
              id="date-picker"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-2xl border border-white/60 bg-white/50 px-4 py-3 font-body text-lg text-rose-gold backdrop-blur-sm transition-colors focus:border-blush focus:bg-white/70"
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? 'date-error' : undefined}
            />
            {errors.date && (
              <p id="date-error" className="mt-1 text-sm text-blush-dark" role="alert">
                {errors.date}
              </p>
            )}
          </fieldset>

          <fieldset>
            <legend className="font-display mb-3 block text-lg font-medium text-rose-gold">
              Choose a Time
            </legend>
            <input
              type="time"
              id="time-picker"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-2xl border border-white/60 bg-white/50 px-4 py-3 font-body text-lg text-rose-gold backdrop-blur-sm transition-colors focus:border-blush focus:bg-white/70"
              aria-invalid={!!errors.time}
              aria-describedby={errors.time ? 'time-error' : undefined}
            />
            {errors.time && (
              <p id="time-error" className="mt-1 text-sm text-blush-dark" role="alert">
                {errors.time}
              </p>
            )}
          </fieldset>

          <fieldset>
            <legend className="font-display mb-4 block text-lg font-medium text-rose-gold">
              Choose the Type of Date
            </legend>
            <div
              className="grid grid-cols-2 gap-3 sm:grid-cols-4"
              role="radiogroup"
              aria-label="Date type"
            >
              {DATE_TYPES.map((type, i) => {
                const selected = selectedType === type.id
                return (
                  <motion.button
                    key={type.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setSelectedType(type.id)}
                    className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${
                      selected
                        ? 'border-rose-gold bg-white/70 shadow-lg shadow-blush/20'
                        : 'border-white/50 bg-white/30 hover:bg-white/50'
                    }`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-2xl" aria-hidden="true">
                      {type.icon}
                    </span>
                    <span className="font-display text-center text-xs font-medium leading-tight text-rose-gold sm:text-sm">
                      {type.label}
                    </span>
                  </motion.button>
                )
              })}
            </div>
            {errors.type && (
              <p className="mt-2 text-sm text-blush-dark" role="alert">
                {errors.type}
              </p>
            )}
          </fieldset>

          <fieldset>
            <legend className="font-display mb-3 block text-lg font-medium text-rose-gold">
              Choose a Location
            </legend>
            <input
              type="text"
              id="location-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Anywhere your heart desires…"
              className="w-full rounded-2xl border border-white/60 bg-white/50 px-4 py-3 font-body text-lg text-rose-gold placeholder:text-rose-gold/40 backdrop-blur-sm transition-colors focus:border-blush focus:bg-white/70"
              aria-invalid={!!errors.location}
              aria-describedby={errors.location ? 'location-error' : undefined}
            />
            {errors.location && (
              <p id="location-error" className="mt-1 text-sm text-blush-dark" role="alert">
                {errors.location}
              </p>
            )}
          </fieldset>

          <motion.button
            type="submit"
            className="glow-button font-display w-full rounded-full py-4 text-lg font-semibold text-white sm:text-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Confirm Our Date ❤️
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}
