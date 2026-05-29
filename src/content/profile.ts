export const profile = {
  navigationTitle: 'Zhou Liu / 刘洲',
  kicker: 'PhD student · Research agents · Multimodal systems',
  name: 'Zhou Liu',
  nameNative: '刘洲',
  headline:
    'Building research agents, multimodal systems, and post-training pipelines with a bias toward measurable results.',
  summary:
    'PhD student in Data Science and Engineering at Peking University. My recent work focuses on LLM post-training, reinforcement learning for agents, multimodal benchmark construction, and automated evaluation systems that are useful both in papers and in production.',
  affiliation: 'Peking University · ByteDance Volcano Engine',
  location: 'Beijing, China',
}

export const currentHighlights = [
  {
    value: '05',
    label: 'first or co-first CCF-A papers already accepted in the current cycle',
  },
  {
    value: 'Top 5%',
    label: 'ACL Main oral result on data analytics agents and structured-unstructured reasoning',
  },
  {
    value: '5k+',
    label: 'combined stars around the OpenDCAI projects I actively contribute to',
  },
]

export const focusAreas = [
  'LLM post-training and alignment',
  'Agent planning, tool use, and trajectory verification',
  'Multimodal scientific intelligence',
  'Benchmark construction and automated evaluation',
  'Data analytics and governance agents',
]

export const selectedPapers = [
  {
    badge: 'ACL 2026 Main',
    year: '2026',
    title: 'UniDataBench',
    summary:
      'A benchmark for evaluating data analytics agents across both structured and unstructured data settings.',
    venue: 'ACL 2026 Main Conference · Oral Top 5% · CCF-A',
  },
  {
    badge: 'CVPR 2026',
    year: '2026',
    title: 'Paper2SysArch',
    summary:
      'Structure-constrained system architecture generation from scientific papers with editable outputs.',
    venue: 'CVPR 2026 · CCF-A',
  },
  {
    badge: 'ACL 2026 Findings',
    year: '2026',
    title: 'InsightBenchMaker',
    summary:
      'Generating evolving, high-fidelity benchmarks for data-analysis agents rather than static one-shot test sets.',
    venue: 'ACL 2026 Findings · CCF-A',
  },
  {
    badge: 'ACL 2026 Main',
    year: '2026',
    title: 'SciFlow',
    summary:
      'Evaluating structure-aware scientific diagram generation through inverse parsing and analysis-oriented metrics.',
    venue: 'ACL 2026 Main Conference · CCF-A',
  },
]

export const experience = [
  {
    org: 'ByteDance Volcano Engine · Data Model Team',
    role: 'Algorithm Intern',
    period: '2025.07 — Present',
    location: 'Beijing',
    bullets: [
      'Working on agentic RL and LLM-agent post-training pipelines across task decomposition, tool use, trajectory sampling, verification, and reward modeling.',
      'Participating in MASRL-style multi-agent reinforcement learning experiments around role allocation, collaboration, credit assignment, and policy optimization.',
      'Building trajectory processing, training-evaluation, and result-analysis pipelines that support fast research iteration.',
    ],
  },
  {
    org: 'ByteDance Douyin Intelligent Creation Team',
    role: 'Graphics and Vision Algorithm Intern',
    period: '2024.05 — 2024.12',
    location: 'Beijing',
    bullets: [
      'Integrated AIGC models into consumer apps such as Douyin and Qingyan, improving delivery efficiency and asset reuse.',
      'Unified heterogeneous model assets under a shared protocol and accelerated workflow package execution.',
      'Built dozens of visual effects with Shader and Lua while collaborating on rendering-engine subsystems.',
    ],
  },
]

export const projects = [
  {
    name: 'OpenDCAI / Paper2Any',
    stack: 'Python · TypeScript',
    stars: '2.1k stars',
    href: 'https://github.com/OpenDCAI/Paper2Any',
    summary:
      'Turns paper PDFs, screenshots, and text into editable architecture diagrams, technical roadmaps, plots, posters, and slide decks.',
  },
  {
    name: 'OpenDCAI / Flow Agent',
    stack: 'Python',
    stars: '59 stars',
    href: 'https://github.com/OpenDCAI/DataFlow-Agent',
    summary:
      'A dynamic pipeline recommendation system and general-purpose agent framework for complex data analytics workflows.',
  },
  {
    name: 'OpenDCAI / DataFlow',
    stack: 'Python',
    stars: '3.2k stars',
    href: 'https://github.com/OpenDCAI/DataFlow',
    summary:
      'Data preparation, retrieval augmentation, and evaluation-oriented pipelines for domain-specific data workflows.',
  },
]

export const education = [
  {
    degree: 'PhD in Data Science and Engineering',
    school: 'Peking University · Academy for Advanced Interdisciplinary Studies',
    city: 'Beijing',
    period: '2025.09 — Present',
  },
  {
    degree: 'MSc in Computer Science and Technology',
    school: 'South-Central Minzu University · School of Computer Science',
    city: 'Wuhan',
    period: '2022.09 — 2025.06',
  },
  {
    degree: 'BSc in Software Engineering',
    school: 'South-Central Minzu University · School of Computer Science',
    city: 'Wuhan',
    period: '2018.09 — 2022.06',
  },
]

export const contactLinks = [
  {
    label: 'Download CV',
    href: '/main.pdf',
    primary: true,
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:zhouliu.919@qq.com',
    external: false,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/DeepThinkingZhouLiu',
    external: true,
  },
]
