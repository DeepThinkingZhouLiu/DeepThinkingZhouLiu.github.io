import {
  contactLinks,
  currentHighlights,
  education,
  experience,
  focusAreas,
  profile,
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

function App() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-paper text-ink">
      <div className="site-grid" aria-hidden="true" />
      <div className="ambient-orbit ambient-orbit-one" aria-hidden="true" />
      <div className="ambient-orbit ambient-orbit-two" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-5 py-5 sm:px-8 lg:px-10">
        <header className="hero-card">
          <nav aria-label="Primary" className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <a href="#top" className="group flex w-fit items-center gap-4">
              <span className="grid size-13 place-items-center rounded-full border border-ink/10 bg-white/80 font-display text-2xl text-ink shadow-sm transition duration-200 group-hover:-translate-y-0.5">
                洲
              </span>
              <span className="grid gap-0.5">
                <span className="text-xs font-semibold uppercase text-muted">Academic homepage</span>
                <span className="text-sm font-semibold text-ink">{profile.navigationTitle}</span>
              </span>
            </a>

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-transparent px-4 py-2 transition duration-200 hover:-translate-y-0.5 hover:border-ink/10 hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <section id="top" className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.72fr)] lg:items-end">
            <div className="relative grid gap-8">
              <div className="hero-watermark" aria-hidden="true">
                刘洲
              </div>

              <div className="animate-rise grid gap-5">
                <p className="w-fit rounded-full border border-ink/10 bg-white/75 px-4 py-2 text-xs font-bold uppercase text-muted shadow-sm">
                  {profile.kicker}
                </p>
                <h1 className="max-w-5xl text-balance font-display text-[clamp(4.6rem,13vw,13rem)] leading-[0.78] text-ink">
                  Zhou
                  <span className="block italic text-accent">Liu</span>
                </h1>
                <p className="max-w-4xl text-balance font-display text-[clamp(2rem,5vw,5.6rem)] leading-[0.9] text-ink">
                  Research agents with taste, rigor, and measurable bite.
                </p>
                <p className="max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl">
                  {profile.summary}
                </p>
              </div>

              <div className="animate-rise-delay flex flex-wrap gap-3">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className={`rounded-full px-5 py-3 text-sm font-bold transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
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

            <aside className="animate-rise-delay relative rounded-[2.2rem] border border-ink/10 bg-white/78 p-5 shadow-2xl shadow-ink/8">
              <div className="rounded-[1.7rem] border border-ink/10 bg-panel/70 p-5">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase text-muted">Current axis</p>
                    <h2 className="mt-3 text-balance font-display text-4xl leading-[0.95] text-ink">
                      Publishable systems. Shippable interfaces.
                    </h2>
                  </div>
                  <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase text-white">
                    live
                  </span>
                </div>

                <dl className="mt-8 grid gap-3">
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

              <div className="mt-5 grid grid-cols-2 gap-3">
                {researchSignals.map((signal) => (
                  <div key={signal} className="rounded-[1.4rem] border border-ink/10 bg-white px-4 py-4 text-sm font-bold text-ink shadow-sm">
                    {signal}
                  </div>
                ))}
              </div>
            </aside>
          </section>
        </header>

        <main className="grid gap-10">
          <section aria-label="Research highlights" className="grid gap-3 md:grid-cols-3">
            {currentHighlights.map((highlight, index) => (
              <article key={highlight.label} className="metric-card">
                <p className="font-mono text-xs text-muted tabular-nums">0{index + 1}</p>
                <p className="mt-8 font-display text-6xl leading-none text-ink tabular-nums">
                  {highlight.value}
                </p>
                <p className="mt-4 text-pretty text-sm leading-6 text-muted">{highlight.label}</p>
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
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase text-accent">{item.location}</p>
                      <h3 className="mt-2 text-balance font-display text-4xl leading-tight text-ink">
                        {item.org}
                      </h3>
                      <p className="mt-2 text-pretty text-base leading-7 text-muted">{item.role}</p>
                    </div>
                    <p className="font-mono text-sm text-ink tabular-nums">{item.period}</p>
                  </div>
                  <ul className="mt-6 grid gap-3">
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
              eyebrow="Selected papers"
              title="A publication wall with only the signal left in."
              body="The page should make the research direction legible in seconds, not behave like a PDF dump."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {selectedPapers.map((paper) => (
                <article key={paper.title} className="paper-card">
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full border border-accent/20 bg-accent/8 px-3 py-1.5 text-xs font-bold uppercase text-accent">
                      {paper.badge}
                    </span>
                    <span className="font-mono text-sm text-muted tabular-nums">{paper.year}</span>
                  </div>
                  <h3 className="mt-8 text-balance font-display text-4xl leading-[0.98] text-ink">
                    {paper.title}
                  </h3>
                  <p className="mt-4 text-pretty leading-7 text-muted">{paper.summary}</p>
                  <p className="mt-8 border-t border-ink/10 pt-4 text-sm font-bold text-ink">{paper.venue}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="projects" className="section-shell">
            <SectionIntro
              eyebrow="Open source"
              title="Clickable systems, not decorative repo cards."
              body="The important bit is whether a project turns research taste into usable machinery."
            />
            <div className="grid gap-4">
              {projects.map((project) => (
                <a
                  key={project.name}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-row group"
                >
                  <div>
                    <p className="text-xs font-bold uppercase text-muted">{project.stack}</p>
                    <h3 className="mt-2 text-balance font-display text-4xl leading-tight text-ink">
                      {project.name}
                    </h3>
                    <p className="mt-3 max-w-3xl text-pretty leading-7 text-muted">{project.summary}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-ink/10 bg-white px-3 py-2 font-mono text-sm text-ink tabular-nums">
                      {project.stars}
                    </span>
                    <span className="grid size-12 place-items-center rounded-full bg-ink text-white transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="section-shell">
            <SectionIntro
              eyebrow="Education"
              title="Training path, compressed."
              body="Enough context for credibility; not enough to turn the page back into a document dump."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {education.map((item) => (
                <article key={`${item.school}-${item.degree}`} className="education-card">
                  <p className="font-mono text-xs text-muted tabular-nums">{item.period}</p>
                  <h3 className="mt-5 text-balance font-display text-3xl leading-tight text-ink">
                    {item.degree}
                  </h3>
                  <p className="mt-4 text-pretty text-sm leading-6 text-muted">{item.school}</p>
                  <p className="mt-4 text-sm font-bold text-ink">{item.city}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-ink/10 bg-ink p-6 text-white shadow-2xl shadow-ink/15 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase text-white/55">Research palette</p>
                <h2 className="mt-4 max-w-4xl text-balance font-display text-5xl leading-[0.92] sm:text-6xl">
                  {focusAreas.slice(0, 3).join(' · ')}
                </h2>
                <p className="mt-6 max-w-2xl text-pretty leading-7 text-white/68">
                  The homepage behaves like a front door: fast signal first, details second, with project links for deeper context.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
                {focusAreas.map((area) => (
                  <span key={area} className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/75">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer id="contact" className="grid gap-6 border-t border-ink/10 py-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase text-muted">Contact</p>
            <h2 className="mt-2 text-balance font-display text-4xl text-ink">
              Research collaboration, open-source building, sharp technical conversations.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            {contactLinks.map((link) => (
              <a
                key={`footer-${link.label}`}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-bold text-ink shadow-sm transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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
      <p className="text-xs font-bold uppercase text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-balance font-display text-5xl leading-[0.95] text-ink">{title}</h2>
      <p className="mt-5 text-pretty leading-7 text-muted">{body}</p>
    </div>
  )
}

export default App
