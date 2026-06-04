export type NewsUpdate = {
  date: string
  title: string
  detail?: string
  href?: string
  kind?: 'paper' | 'release' | 'talk' | 'note'
}

// Keep newest items first. Leave this empty until there is something public to announce.
export const newsUpdates: NewsUpdate[] = []
