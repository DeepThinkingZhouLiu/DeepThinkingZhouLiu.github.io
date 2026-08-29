export type NewsUpdate = {
  date: string
  title: string
  detail?: string
  href?: string
  count?: string
  kind: 'Publication' | 'Award' | 'Release' | 'Talk'
}

// 最新动态放在最前面，保持首页时间线易于浏览。
export const newsUpdates: NewsUpdate[] = [
  {
    date: 'Aug. 2026',
    title: 'Four papers accepted to EMNLP 2026',
    detail:
      'One paper was accepted to the Main Conference and three to Findings, covering semantic reinforcement learning, cross-modal data analysis, paper reproduction, and semantic alignment evaluation.',
    count: '4 papers',
    kind: 'Publication',
    href: '#papers',
  },
  {
    date: 'Jun. 2026',
    title: 'Sixth place at the CVPR Vision-Language Agent Safety Challenge',
    detail:
      'Team Diamond_AI placed sixth in the Safety of Vision-Language Agents challenge at the CVPR 2026 Workshop on Adversarial Machine Learning in Computer Vision.',
    kind: 'Award',
  },
  {
    date: 'May 2026',
    title: 'Four papers accepted to ACL 2026',
    detail:
      'Two papers were accepted to the Main Conference and two to Findings. UniDataBench was selected for an oral presentation (Top 5%).',
    count: '4 papers',
    kind: 'Publication',
    href: '#papers',
  },
  {
    date: 'Mar. 2026',
    title: 'Paper2SysArch accepted to CVPR 2026',
    detail:
      'Our work on structure-constrained system architecture generation from scientific papers was accepted to CVPR 2026.',
    count: '1 paper',
    kind: 'Publication',
    href: '#papers',
  },
]
