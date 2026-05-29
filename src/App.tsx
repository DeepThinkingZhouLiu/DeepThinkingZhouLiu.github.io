import {
  contactLinks,
  currentHighlights,
  experience,
  focusAreas,
  profile,
  preprints,
  projects,
  selectedPapers,
} from './content/profile'

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Papers', href: '#papers' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const researchSignals = ['agents', 'post-training', 'multimodal', 'evaluation']
const kineticSignals = ['ACL Main Oral', 'CVPR 2026', 'CCF-A', 'RL agents', 'arXiv preprint', 'tool use']

function App() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-paper text-ink">
      <div className="site-grid" aria-hidden="true" />
      <div className="kinetic-beam" aria-hidden="true" />
      <div className="scroll-orb scroll-orb-one" aria-hidden="true" />
      <div className="scroll-orb scroll-orb-two" aria-hidden="true" />
      <div className="scroll-ruler" aria-hidden="true" />
      <div className="ambient-orbit ambient-orbit-one" aria-hidden="true" />
      <div className="ambient-orbit ambient-orbit-two" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <header className="hero-card">
          <nav aria-label="Primary" className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <a href="#top" className="group flex w-fit items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full border border-ink/10 bg-white/80 font-display text-xl text-ink shadow-sm transition duration-200 group-hover:-translate-y-0.5">
                洲
              </span>
              <span className="grid gap-0.5">
                <span className="text-[0.68rem] font-semibold uppercase text-muted">Academic homepage</span>
                <span className="text-sm font-semibold text-ink">{profile.navigationTitle}</span>
              </span>
            </a>

            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-transparent px-3 py-1.5 transition duration-200 hover:-translate-y-0.5 hover:border-ink/10 hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="kinetic-tape" aria-hidden="true">
            <div className="kinetic-tape-track">
              {[...kineticSignals, ...kineticSignals].map((signal, index) => (
                <span key={`${signal}-${index}`}>{signal}</span>
              ))}
            </div>
          </div>

          <section id="top" className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.62fr)] lg:items-end">
            <div className="relative grid gap-4">
              <div className="hero-watermark" aria-hidden="true">
                刘洲
              </div>

              <div className="animate-rise grid gap-3">
                <p className="w-fit rounded-full border border-ink/10 bg-white/75 px-3 py-1.5 text-[0.68rem] font-bold uppercase text-muted shadow-sm">
                  {profile.kicker}
                </p>
                <h1 className="max-w-5xl text-balance font-display text-[clamp(3.1rem,8vw,7.2rem)] leading-[0.84] text-ink">
                  Zhou
                  <span className="hero-accent block italic text-accent">Liu</span>
                </h1>
                <p className="max-w-4xl text-balance font-display text-[clamp(1.25rem,2.8vw,2.9rem)] leading-[0.98] text-ink">
                  Research agents with taste, rigor, and measurable bite.
                </p>
                <p className="max-w-2xl text-pretty text-sm leading-6 text-muted sm:text-base">
                  {profile.summary}
                </p>
              </div>

              <div className="animate-rise-delay flex flex-wrap gap-2">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                      link.primary
                        ? 'bg-ink text-white shadow-lg shadow-ink/10'
                        : 'border border-ink/10 bg-white/85 text-ink shadow-sm'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <aside className="animate-rise-delay relative rounded-[1.8rem] border border-ink/10 bg-white/78 p-4 shadow-2xl shadow-ink/8">
              <div className="rounded-[1.35rem] border border-ink/10 bg-panel/70 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.68rem] font-bold uppercase text-muted">Current axis</p>
                    <h2 className="mt-2 text-balance font-display text-2xl leading-[1] text-ink">
                      Publishable systems. Shippable interfaces.
                    </h2>
                  </div>
                  <span className="pulse-dot rounded-full bg-accent px-2.5 py-1 text-[0.66rem] font-bold uppercase text-white">
                    live
                  </span>
                </div>

                <dl className="mt-5 grid gap-2">
                  <div className="fact-row">
                    <dt>Base</dt>
                    <dd>{profile.location}</dd>
                  </div>
                  <div className="fact-row">
                    <dt>Affiliation</dt>
                    <dd>{profile.affiliation}</dd>
                  </div>
                  <div className="fact-row">
                    <dt>Mode</dt>
                    <dd>research x engineering</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-3 grid grid-cols-[repeat(2,minmax(0,1fr))] gap-2 overflow-hidden">
                {researchSignals.map((signal) => (
                  <div key={signal} className="signal-chip min-w-0 rounded-[1.1rem] border border-ink/10 bg-white px-3 py-2.5 text-xs font-bold text-ink shadow-sm">
                    {signal}
                  </div>
                ))}
              </div>
            </aside>
          </section>
        </header>

        <main className="grid gap-5">
          <section aria-label="Research highlights" className="grid gap-3 md:grid-cols-3">
            {currentHighlights.map((highlight, index) => (
              <article key={highlight.label} className="metric-card">
                <p className="font-mono text-xs text-muted tabular-nums">0{index + 1}</p>
                <p className="mt-4 font-display text-4xl leading-none text-ink tabular-nums">
                  {highlight.value}
                </p>
                <p className="mt-2 text-pretty text-xs leading-5 text-muted">{highlight.label}</p>
              </article>
            ))}
          </section>

          <section id="work" className="section-shell">
            <SectionIntro
              eyebrow="Present"
              title="Research and industry, running in parallel."
              body="I work where model behavior, product constraints, and evaluation pressure meet."
            />
            <div className="grid gap-4">
              {experience.map((item) => (
                <article key={`${item.org}-${item.role}`} className="timeline-card">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-[0.68rem] font-bold uppercase text-accent">{item.location}</p>
                      <h3 className="mt-1.5 text-balance font-display text-2xl leading-tight text-ink">
                        {item.org}
                      </h3>
                      <p className="mt-1.5 text-pretty text-sm leading-6 text-muted">{item.role}</p>
                    </div>
                    <p className="font-mono text-xs text-ink tabular-nums">{item.period}</p>
                  </div>
                  <ul className="mt-4 grid gap-2">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="research-line">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="papers" className="section-shell">
            <SectionIntro
              eyebrow="Publications"
              title="Accepted work first. Preprints separate."
              body="Conference, CCF tier, authorship, project-lead status, and oral markers are split into explicit tags for fast scanning."
            />
            <div className="publication-board">
              <div>
                <div className="paper-group-heading">
                  <span>Accepted papers</span>
                  <span>{selectedPapers.length} items</span>
                </div>
                <div className="paper-list" aria-label="Scrollable accepted paper list">
                  {selectedPapers.map((paper) => (
                    <article key={paper.title} className="paper-card">
                      <div className="paper-meta">
                        <span className="paper-marker paper-marker-strong">{paper.role}</span>
                        {paper.projectLead ? <span className="paper-marker">Project Lead</span> : null}
                        <span className="paper-marker">{paper.venue}</span>
                        <span className="paper-marker">{paper.ccf}</span>
                        <span className="paper-marker paper-marker-accent">{paper.distinction}</span>
                      </div>
                      <h3 className="paper-title">{paper.title}</h3>
                    </article>
                  ))}
                </div>
              </div>

              <div>
                <div className="paper-group-heading">
                  <span>Preprints</span>
                  <span>{preprints.length} item</span>
                </div>
                <div className="preprint-list" aria-label="Preprint list">
                  {preprints.map((paper) => (
                    <a
                      key={paper.title}
                      href={paper.href}
                      target="_blank"
                      rel="noreferrer"
                      className="paper-card preprint-card"
                    >
                      <div className="paper-meta">
                        <span className="paper-marker paper-marker-strong">{paper.role}</span>
                        <span className="paper-marker">{paper.venue}</span>
                        <span className="paper-marker">{paper.ccf}</span>
                        <span className="paper-marker paper-marker-accent">{paper.distinction}</span>
                      </div>
                      <h3 className="paper-title">{paper.title}</h3>
                      <span className="paper-link-cue">Open arXiv ↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="projects" className="section-shell">
            <SectionIntro
              eyebrow="Systems"
              title="OpenDCAI projects I build and ship."
              body="Local README artwork, live repo signals, and a horizontal shelf designed for more projects later."
            />
            <div className="project-stage">
              {projects.map((project, index) => (
                <a
                  key={project.name}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-row group"
                >
                  <span className="project-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div className="project-icon-wrap" aria-hidden="true">
                    <img className="project-icon" src={project.icon} alt="" loading="lazy" />
                  </div>
                  <div className="project-copy">
                    <p className="text-[0.68rem] font-bold uppercase text-muted">{project.stack}</p>
                    <h3 className="mt-1.5 text-balance font-display text-2xl leading-tight text-ink">
                      {project.name}
                    </h3>
                    <p className="mt-2 max-w-3xl text-pretty text-sm leading-6 text-muted">{project.summary}</p>
                  </div>
                  <div className="project-action">
                    <span className="star-badge" aria-label={`${project.stars} on GitHub`}>
                      <span className="star-icon" aria-hidden="true">
                        ★
                      </span>
                      {project.stars}
                    </span>
                    <span className="project-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="kinetic-dark rounded-[2rem] border border-ink/10 bg-ink p-5 text-white shadow-2xl shadow-ink/15 sm:p-6 lg:p-7">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-[0.68rem] font-bold uppercase text-white/55">Research palette</p>
                <h2 className="mt-3 max-w-4xl text-balance font-display text-3xl leading-[0.98] sm:text-4xl">
                  {focusAreas.slice(0, 3).join(' · ')}
                </h2>
                <p className="mt-4 max-w-2xl text-pretty text-sm leading-6 text-white/68">
                  The homepage behaves like a front door: fast signal first, details second, with project links for deeper context.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
                {focusAreas.map((area) => (
                  <span key={area} className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs text-white/75">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer id="contact" className="grid gap-5 border-t border-ink/10 py-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-[0.68rem] font-bold uppercase text-muted">Contact</p>
            <h2 className="mt-1.5 text-balance font-display text-2xl text-ink">
              Research collaboration, open-source building, sharp technical conversations.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {contactLinks.map((link) => (
              <a
                key={`footer-${link.label}`}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-bold text-ink shadow-sm transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}

function SectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <div className="section-intro">
      <p className="text-[0.68rem] font-bold uppercase text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-balance font-display text-3xl leading-[1] text-ink">{title}</h2>
      <p className="mt-3 text-pretty text-xs leading-5 text-muted">{body}</p>
    </div>
  )
}

export default App
