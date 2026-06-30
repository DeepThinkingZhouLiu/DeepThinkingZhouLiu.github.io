export type NewsUpdate = {
  date: string
  title: string
  detail?: string
  href?: string
  kind?: 'paper' | 'release' | 'talk' | 'award' | 'note'
}

// Keep newest items first. Leave this empty until there is something public to announce.
export const newsUpdates: NewsUpdate[] = [
  {
    date: '2026.07',
    title: 'CVPR Vision-Language Agent Security Challenge award',
    detail: 'Added a new award from the CVPR visual-language agent safety challenge.',
    kind: 'award',
  },
]
