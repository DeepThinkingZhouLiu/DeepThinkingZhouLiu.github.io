export type NewsUpdate = {
  date: string
  title: string
  detail?: string
  href?: string
  image?: {
    src: string
    alt: string
  }
  kind?: 'paper' | 'release' | 'talk' | 'award' | 'note'
}

// Keep newest items first. Leave this empty until there is something public to announce.
export const newsUpdates: NewsUpdate[] = [
  {
    date: 'CVPR 2026',
    title: 'Sixth-Place Winner at the CVPR VLA Safety Challenge',
    detail:
      'Team Diamond_AI won Sixth Place in the Safety of Vision-Language Agents challenge at CVPR 2026.',
    image: {
      src: '/news/cvpr-vla-security-award.webp',
      alt: 'Certificate for Team Diamond_AI winning sixth place at the CVPR Vision-Language Agent Safety Challenge',
    },
    kind: 'award',
  },
]
