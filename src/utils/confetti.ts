import confetti from 'canvas-confetti'

export function fireCelebrationConfetti(): void {
  const duration = 3000
  const end = Date.now() + duration

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#f8b4c4', '#b76e79', '#e8d5f2', '#fce4ec', '#d4a0a8'],
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#f8b4c4', '#b76e79', '#e8d5f2', '#fce4ec', '#d4a0a8'],
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#f8b4c4', '#b76e79', '#e8d5f2', '#fce4ec'],
  })

  frame()
}
