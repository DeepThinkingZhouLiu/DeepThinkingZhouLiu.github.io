export const profile = {
  navigationTitle: 'Zhou Liu / 刘洲',
  kicker: 'PhD student · Research agents · Multimodal systems',
  name: 'Zhou Liu',
  nameNative: '刘洲',
  headline:
    'Building research agents, multimodal systems, and post-training pipelines with a bias toward measurable results.',
  summary:
    'PhD student in Data Science and Engineering at Peking University. My recent work focuses on LLM post-training, reinforcement learning for agents, multimodal benchmark construction, and automated evaluation systems that are useful both in papers and in production.',
  collaboration:
    'Open to research collaborations on LLM agents, post-training, multimodal systems, benchmark construction, and automated evaluation.',
  advisor: {
    name: 'Prof. Wentao Zhang',
    href: 'https://zwt233.github.io/',
    affiliation: 'Peking University',
  },
  affiliation: 'Peking University · ByteDance Volcano Engine',
  location: 'Beijing, China',
}

export type PublicationLink = {
  kind: 'paper' | 'code' | 'dataset'
  href: string
  label: string
}

export const currentHighlights = [
  {
    value: '07',
    label: 'first or co-first papers accepted across ACL, CVPR, and EMNLP 2026',
  },
  {
    value: 'Top 5%',
    label: 'ACL Main oral result on data analytics agents and structured-unstructured reasoning',
  },
  {
    value: 'CVPR',
    label: 'Vision-Language Agent Security Challenge award',
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
    title: 'Source-Grounded Semantic Reinforcement Learning for Low-Resource Target-Language Generation',
    role: 'Co-first author',
    venue: 'EMNLP 2026 Main Conference',
    ccf: 'CCF-B',
    distinction: 'Accepted',
    projectLead: false,
    links: [
      { kind: 'paper', href: 'https://arxiv.org/abs/2605.29502', label: 'arXiv' },
    ] satisfies PublicationLink[],
  },
  {
    title: 'DataCross: A Unified Benchmark and Agent Framework for Cross-Modal Heterogeneous Data Analysis',
    role: 'Co-first author',
    venue: 'EMNLP 2026 Findings',
    ccf: 'CCF-B',
    distinction: 'Accepted',
    projectLead: false,
    links: [
      { kind: 'paper', href: 'https://arxiv.org/abs/2601.21403', label: 'arXiv' },
    ] satisfies PublicationLink[],
  },
  {
    title: 'UniDataBench: Evaluating Data Analytics Agents Across Structured and Unstructured Data',
    role: 'Co-first author',
    venue: 'ACL 2026 Main Conference',
    ccf: 'CCF-A',
    distinction: 'Oral · Top 5%',
    projectLead: true,
    links: [
      { kind: 'paper', href: 'https://arxiv.org/abs/2511.01625', label: 'arXiv' },
    ] satisfies PublicationLink[],
  },
  {
    title: 'Paper2SysArch: Structure-Constrained System Architecture Generation from Scientific Papers',
    role: 'Co-first author',
    venue: 'CVPR 2026',
    ccf: 'CCF-A',
    distinction: 'Accepted',
    projectLead: true,
    links: [
      { kind: 'paper', href: 'https://arxiv.org/abs/2511.18036', label: 'arXiv' },
      { kind: 'code', href: 'https://github.com/OpenDCAI/Paper2Any', label: 'Code' },
    ] satisfies PublicationLink[],
  },
  {
    title: 'InsightBenchMaker: Towards Generating Evolving and High-Fidelity Benchmarks for Data-Analysis Agents',
    role: 'First author',
    venue: 'ACL 2026 Findings',
    ccf: 'CCF-A',
    distinction: 'Accepted',
    projectLead: true,
    links: [] satisfies PublicationLink[],
  },
  {
    title: 'SciFlow-Bench: Evaluating Structure-Aware Scientific Diagram Generation via Inverse Parsing',
    role: 'Co-first author',
    venue: 'ACL 2026 Main Conference',
    ccf: 'CCF-A',
    distinction: 'Accepted',
    projectLead: true,
    links: [
      { kind: 'paper', href: 'https://arxiv.org/abs/2602.09809', label: 'arXiv' },
      { kind: 'code', href: 'https://github.com/Tong-0302/SciFlow-Bench', label: 'Code' },
    ] satisfies PublicationLink[],
  },
  {
    title: 'Reinforcement Learning with Semantic Rewards Enables Low-Resource Language Expansion without Alignment Tax',
    role: 'Co-first author',
    venue: 'ACL 2026 Findings',
    ccf: 'CCF-A',
    distinction: 'Accepted',
    projectLead: false,
    links: [
      { kind: 'paper', href: 'https://arxiv.org/abs/2605.14366', label: 'arXiv' },
    ] satisfies PublicationLink[],
  },
]

export const preprints = [
  {
    title: 'ExRole: From Team Trajectories to Executable Roles in Multi-Agent Language Models',
    role: 'First author',
    venue: 'arXiv 2026',
    ccf: 'Preprint',
    distinction: '2026.08',
    links: [
      { kind: 'paper', href: 'https://arxiv.org/abs/2608.11949', label: 'arXiv' },
    ] satisfies PublicationLink[],
  },
  {
    title: 'SkillLens: Visual Skill Cards for Retrieval-Augmented GUI Action Prediction and On-Policy Distillation',
    role: 'First author',
    venue: 'arXiv 2026',
    ccf: 'Preprint',
    distinction: '2026.08',
    links: [
      { kind: 'paper', href: 'https://arxiv.org/abs/2608.10775', label: 'arXiv' },
    ] satisfies PublicationLink[],
  },
]

export const publicationIndexes = [
  {
    label: 'ACL Anthology',
    href: 'https://aclanthology.org/people/zhou-liu/',
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/scholar?q=Zhou+Liu+UniDataBench',
  },
]

export const experience = [
  {
    org: 'ByteDance Volcano Engine · Data Model Team',
    icon: '/brand/bytedance-icon.svg',
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
    icon: '/brand/bytedance-icon.svg',
    role: 'Graphics and Vision Algorithm Intern',
    period: '2024.05 — 2024.12',
    location: 'Beijing',
    bullets: [
      'Built inference pipelines for AIGC image-generation and editing models in Douyin and Qingyan, covering model integration, pre/post-processing, operator adaptation, numerical alignment, and visual-quality validation.',
      'Profiled and optimized production inference across end-to-end latency, throughput, peak memory, model loading, and redundant computation using batching, cache reuse, and tiered fallback strategies.',
      'Designed a unified multi-model inference protocol and workflow orchestration framework with standardized resource loading, heterogeneous model composition, failure fallback, and reuse across applications.',
    ],
  },
]

export const projects = [
  {
    name: 'OpenDCAI / OpenPrism',
    stack: 'TypeScript · LaTeX · AI workspace',
    stars: '299 stars',
    href: 'https://github.com/OpenDCAI/OpenPrism',
    icon: '/project-icons/openprism-icon.webp',
    summary:
      'An AI-powered academic writing workspace with LaTeX editing, PDF preview, compilation flow, and research assistance for paper production.',
  },
  {
    name: 'OpenDCAI / Paper2Any',
    stack: 'Python · TypeScript',
    stars: '2.5k stars',
    href: 'https://github.com/OpenDCAI/Paper2Any',
    icon: '/project-icons/paper2any-icon.webp',
    summary:
      'Turns paper PDFs, screenshots, and text into editable architecture diagrams, technical roadmaps, plots, posters, and slide decks.',
  },
  {
    name: 'OpenDCAI / Flow Agent',
    stack: 'Python',
    stars: '59 stars',
    href: 'https://github.com/OpenDCAI/DataFlow-Agent',
    icon: '/project-icons/dataflow-agent-icon.webp',
    summary:
      'A dynamic pipeline recommendation system and general-purpose agent framework for complex data analytics workflows.',
  },
  {
    name: 'OpenDCAI / DataFlow',
    stack: 'Python',
    stars: '4.3k stars',
    href: 'https://github.com/OpenDCAI/DataFlow',
    icon: '/project-icons/dataflow-icon.webp',
    summary:
      'Data preparation, retrieval augmentation, and evaluation-oriented pipelines for domain-specific data workflows.',
  },
]

export const contactLinks = [
  {
    label: 'Email',
    href: 'mailto:zhouliu.919@qq.com',
    primary: true,
    external: false,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/DeepThinkingZhouLiu',
    primary: false,
    external: true,
  },
]
