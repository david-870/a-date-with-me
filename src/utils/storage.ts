import type { DateDetails } from '../types'
import { STORAGE_KEY } from '../types'

export function saveDateDetails(details: DateDetails): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(details))
  } catch {
    /* storage unavailable */
  }
}

export function loadDateDetails(): DateDetails | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as DateDetails
  } catch {
    return null
  }
}
