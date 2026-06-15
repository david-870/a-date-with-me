export interface DateTypeOption {
  id: string
  label: string
  icon: string
}

export const DATE_TYPES: DateTypeOption[] = [
  { id: 'dinner', label: 'Romantic Dinner', icon: '🍽️' },
  { id: 'movie', label: 'Movie Night', icon: '🎬' },
  { id: 'coffee', label: 'Coffee Date', icon: '☕' },
  { id: 'sunset', label: 'Sunset Walk', icon: '🌅' },
  { id: 'activity', label: 'Fun Activity', icon: '🎳' },
  { id: 'casual', label: 'Casual Food Date', icon: '🍕' },
  { id: 'adventure', label: 'Adventure Date', icon: '🏖️' },
  { id: 'surprise', label: 'Surprise Me', icon: '💖' },
]

export const NO_MESSAGES = [
  'Are you sure? 🥺',
  'Think again, beautiful ❤️',
  'I planned this with love 😘',
  'One more chance? 💕',
] as const

export const MAX_NO_ATTEMPTS = 4
