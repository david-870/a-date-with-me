export interface DateTypeOption {
  id: string
  label: string
  icon: string
}

export const DATE_TYPES: DateTypeOption[] = [
  { id: 'dinner', label: 'Romantic Dinner', icon: '🍽️' },
  { id: 'movie', label: 'Cinema Date', icon: '🎬' },
  { id: 'coffee', label: 'Boat Cruise', icon: '🛥️' },
  { id: 'sunset', label: 'Book Picking Date', icon: '📚' },
  { id: 'activity', label: 'Arcade Date', icon: '🕹️' },
  { id: 'casual', label: 'Casual Food Date', icon: '🍕' },
  { id: 'adventure', label: 'Car Date', icon: '🚗' },
  { id: 'surprise', label: 'Surprise Me', icon: '💖' },
]

export const MAX_NO_ATTEMPTS = 4