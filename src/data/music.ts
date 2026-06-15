export const ROMANTIC_TRACK = {
  title: 'Can I Be Him',
  artist: 'James Arthur',
  file: 'can-i-be-him.mp3',
} as const

export function getTrackUrl(): string {
  return `${import.meta.env.BASE_URL}${ROMANTIC_TRACK.file}`
}
