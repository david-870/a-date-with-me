export type Screen =
  | 'landing'
  | 'question'
  | 'celebration'
  | 'planning'
  | 'confirmation'

export interface DateDetails {
  date: string
  time: string
  type: string
  typeLabel: string
  typeIcon: string
  location: string
}

export const STORAGE_KEY = 'a-date-with-me-details'
