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
    title: 'UniDataBench: Evaluating Data Analytics Agents Across Structured and Unstructured Data',
    markers: ['Co-first author', 'Project Lead'],
  },
  {
    title: 'Paper2SysArch: Structure-Constrained System Architecture Generation from Scientific Papers',
    markers: ['Co-first author', 'Project Lead'],
  },
  {
    title: 'InsightBenchMaker: Towards Generating Evolving and High-Fidelity Benchmarks for Data-Analysis Agents',
    markers: ['First author', 'Project Lead'],
  },
  {
    title: 'SciFlow: Evaluating Structure-Aware Scientific Diagram Generation via Inverse Parsing',
    markers: ['Co-first author', 'Project Lead'],
  },
  {
    title: 'Reinforcement Learning with Semantic Rewards Enables Low-Resource Language Expansion without Alignment Tax',
    markers: ['Co-first author'],
  },
  {
    title: 'LongInsightBench: A Comprehensive Benchmark for Evaluating Omni-Modal Models on Human-Centric Long-Video Understanding',
    markers: ['Fifth author'],
  },
  {
    title: 'TF-IECN: Tuning-free Image Efficient Customization via Refined Collaborative Denoising Strategies',
    markers: ['Fourth author'],
  },
  {
    title: 'MSDM: Multi-Space Diffusion With Dynamic Loss Weight',
    markers: ['First author'],
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
