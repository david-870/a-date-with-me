import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: 'heart' | 'sparkle' | 'dot'
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 12 + 4,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    type: (['heart', 'sparkle', 'dot'] as const)[Math.floor(Math.random() * 3)],
  }))
}

export default function AnimatedBackground() {
  const [particles] = useState(() => createParticles(30))

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 20%, rgba(248,180,196,0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(232,213,242,0.35) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(253,246,240,0.5) 0%, transparent 70%)',
        }}
      />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.type === 'dot' ? p.size * 0.5 : p.size,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0.2, 0.7, 0.4, 0.8, 0.2],
            rotate: p.type === 'heart' ? [0, 10, -10, 0] : [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {p.type === 'heart' && (
            <span className="text-blush-dark/40">♥</span>
          )}
          {p.type === 'sparkle' && (
            <span className="text-rose-gold-light/50">✦</span>
          )}
          {p.type === 'dot' && (
            <span
              className="inline-block rounded-full bg-blush/30"
              style={{ width: p.size * 0.4, height: p.size * 0.4 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

interface FallingHeart {
  id: number
  left: number
  delay: number
  size: number
  duration: number
}

export function FallingHearts({ active }: { active: boolean }) {
  const [hearts, setHearts] = useState<FallingHeart[]>([])

  useEffect(() => {
    if (!active) {
      setHearts([])
      return
    }

    const interval = setInterval(() => {
      setHearts((prev) => {
        const next = [
          ...prev,
          {
            id: Date.now() + Math.random(),
            left: Math.random() * 100,
            delay: 0,
            size: Math.random() * 16 + 14,
            duration: Math.random() * 3 + 4,
          },
        ]
        return next.slice(-40)
      })
    }, 300)

    return () => clearInterval(interval)
  }, [active])

  if (!active) return null

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute text-blush-dark/70"
          style={{
            left: `${h.left}%`,
            bottom: '-5%',
            fontSize: h.size,
            animation: `float-up ${h.duration}s ease-in forwards`,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  )
}

export function FloatingHearts({ count = 8 }: { count?: number }) {
  const hearts = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      delay: Math.random() * 4,
      duration: Math.random() * 4 + 6,
      size: Math.random() * 10 + 12,
    }))
  ).current

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute text-blush/50"
          style={{ left: `${h.left}%`, bottom: '10%', fontSize: h.size }}
          animate={{ y: [0, -120], opacity: [0, 0.6, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  )
}
