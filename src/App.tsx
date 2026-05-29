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

function App() {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-16 pt-6 sm:px-8 lg:px-10">
        <header className="border-b border-line pb-10">
          <nav
            aria-label="Primary"
            className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-full border border-line bg-white text-sm font-semibold text-accent shadow-sm">
                ZL
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase text-muted">
                  Personal field notes
                </span>
                <span className="font-medium text-ink">{profile.navigationTitle}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <a href="#work" className="rounded-full border border-transparent px-3 py-2 hover:border-line hover:text-ink">
                Work
              </a>
              <a href="#papers" className="rounded-full border border-transparent px-3 py-2 hover:border-line hover:text-ink">
                Papers
              </a>
              <a href="#projects" className="rounded-full border border-transparent px-3 py-2 hover:border-line hover:text-ink">
                Projects
              </a>
              <a href="#contact" className="rounded-full border border-transparent px-3 py-2 hover:border-line hover:text-ink">
                Contact
              </a>
            </div>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.45fr_0.9fr] lg:items-start">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="w-fit rounded-full border border-line bg-white px-4 py-2 text-xs font-medium uppercase text-muted shadow-sm">
                  {profile.kicker}
                </span>
                <div className="flex flex-col gap-2">
                  <p className="font-display text-5xl leading-none text-ink sm:text-6xl lg:text-7xl">
                    {profile.name}
                  </p>
                  <p className="font-display text-3xl leading-none text-accent sm:text-4xl">
                    {profile.nameNative}
                  </p>
                </div>
                <h1 className="max-w-4xl text-balance font-display text-4xl leading-[0.96] text-ink sm:text-5xl lg:text-6xl">
                  {profile.headline}
                </h1>
                <p className="max-w-3xl text-pretty text-lg leading-8 text-muted sm:text-xl">
                  {profile.summary}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {currentHighlights.map((highlight) => (
                  <article
                    key={highlight.label}
                    className="rounded-[1.75rem] border border-line bg-white/95 p-5 shadow-sm"
                  >
                    <p className="font-display text-3xl leading-none text-ink tabular-nums">
                      {highlight.value}
                    </p>
                    <p className="mt-3 text-pretty text-sm leading-6 text-muted">
                      {highlight.label}
                    </p>
                  </article>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                    className={`rounded-full px-5 py-3 text-sm font-medium ${
                      link.primary
                        ? 'bg-accent text-white shadow-sm'
                        : 'border border-line bg-white text-ink shadow-sm'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <aside className="grid gap-6 rounded-[2rem] border border-line bg-panel p-6 shadow-sm">
              <div className="grid gap-3">
                <p className="text-xs font-medium uppercase text-muted">
                  Current axis
                </p>
                <p className="text-balance font-display text-3xl leading-tight text-ink">
                  Building research agents that are publishable, shippable, and measurable.
                </p>
              </div>

              <div className="grid gap-3">
                {focusAreas.map((area) => (
                  <div
                    key={area}
                    className="rounded-[1.3rem] border border-line bg-white px-4 py-3 text-sm leading-6 text-ink shadow-sm"
                  >
                    {area}
                  </div>
                ))}
              </div>

              <div className="rounded-[1.5rem] border border-dashed border-line bg-white px-5 py-5">
                <p className="text-xs font-medium uppercase text-muted">
                  Based in
                </p>
                <p className="mt-2 text-2xl font-medium text-ink">{profile.location}</p>
                <p className="mt-3 text-pretty text-sm leading-6 text-muted">
                  {profile.affiliation}
                </p>
              </div>
            </aside>
          </div>
        </header>

        <main className="grid gap-16">
          <section
            id="work"
            className="grid gap-8 lg:grid-cols-[0.42fr_1fr]"
          >
            <div className="grid gap-4">
              <p className="text-xs font-medium uppercase text-muted">Present</p>
              <h2 className="text-balance font-display text-4xl text-ink">
                Research and industry, running in parallel.
              </h2>
              <p className="text-pretty leading-7 text-muted">
                My recent work spans LLM post-training, agentic reinforcement
                learning, multimodal benchmarks, and production-facing
                evaluation systems.
              </p>
            </div>

            <div className="grid gap-4">
              {experience.map((item) => (
                <article
                  key={`${item.org}-${item.role}`}
                  className="rounded-[2rem] border border-line bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase text-muted">
                        {item.location}
                      </p>
                      <h3 className="mt-2 text-balance font-display text-3xl leading-tight text-ink">
                        {item.org}
                      </h3>
                      <p className="mt-2 text-pretty text-base leading-7 text-muted">
                        {item.role}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-ink tabular-nums">
                      {item.period}
                    </p>
                  </div>

                  <ul className="mt-5 grid gap-3">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="rounded-[1.4rem] border border-line/80 bg-panel px-4 py-3 text-pretty text-sm leading-7 text-muted"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section
            id="papers"
            className="grid gap-8 lg:grid-cols-[0.42fr_1fr]"
          >
            <div className="grid gap-4">
              <p className="text-xs font-medium uppercase text-muted">Selected papers</p>
              <h2 className="text-balance font-display text-4xl text-ink">
                A concise signal, not a full publication dump.
              </h2>
              <p className="text-pretty leading-7 text-muted">
                These are the papers I would surface first for someone trying to
                understand my research direction quickly.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {selectedPapers.map((paper) => (
                <article
                  key={paper.title}
                  className="flex h-full flex-col rounded-[2rem] border border-line bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full border border-line bg-panel px-3 py-2 text-xs font-medium uppercase text-muted">
                      {paper.badge}
                    </span>
                    <span className="text-sm font-medium text-ink tabular-nums">
                      {paper.year}
                    </span>
                  </div>
                  <h3 className="mt-5 text-balance font-display text-3xl leading-tight text-ink">
                    {paper.title}
                  </h3>
                  <p className="mt-4 text-pretty text-base leading-7 text-muted">
                    {paper.summary}
                  </p>
                  <div className="mt-auto pt-6">
                    <p className="text-sm font-medium text-ink">{paper.venue}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            id="projects"
            className="grid gap-8 lg:grid-cols-[0.42fr_1fr]"
          >
            <div className="grid gap-4">
              <p className="text-xs font-medium uppercase text-muted">Open source</p>
              <h2 className="text-balance font-display text-4xl text-ink">
                Systems I want people to click into.
              </h2>
              <p className="text-pretty leading-7 text-muted">
                These projects show how I think about multimodal research
                tooling, editable outputs, workflow orchestration, and
                evaluation.
              </p>
            </div>

            <div className="grid gap-4">
              {projects.map((project) => (
                <a
                  key={project.name}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid gap-4 rounded-[2rem] border border-line bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase text-muted">
                        {project.stack}
                      </p>
                      <h3 className="mt-2 text-balance font-display text-3xl leading-tight text-ink">
                        {project.name}
                      </h3>
                    </div>
                    <div className="rounded-full border border-line bg-panel px-3 py-2 text-sm font-medium text-ink tabular-nums">
                      {project.stars}
                    </div>
                  </div>
                  <p className="text-pretty leading-7 text-muted">{project.summary}</p>
                </a>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.42fr_1fr]">
            <div className="grid gap-4">
              <p className="text-xs font-medium uppercase text-muted">Education</p>
              <h2 className="text-balance font-display text-4xl text-ink">
                The shortest useful version of the path so far.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {education.map((item) => (
                <article
                  key={`${item.school}-${item.degree}`}
                  className="rounded-[2rem] border border-line bg-white p-5 shadow-sm"
                >
                  <p className="text-xs font-medium uppercase text-muted">
                    {item.period}
                  </p>
                  <h3 className="mt-3 text-balance font-display text-2xl leading-tight text-ink">
                    {item.degree}
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-6 text-muted">
                    {item.school}
                  </p>
                  <p className="mt-2 text-sm font-medium text-ink">{item.city}</p>
                </article>
              ))}
            </div>
          </section>
        </main>

        <footer
          id="contact"
          className="grid gap-8 rounded-[2.5rem] border border-line bg-panel p-8 shadow-sm lg:grid-cols-[1fr_auto]"
        >
          <div className="grid gap-4">
            <p className="text-xs font-medium uppercase text-muted">Contact</p>
            <h2 className="max-w-3xl text-balance font-display text-4xl text-ink">
              Available for research collaboration, open-source building, and
              sharp technical conversations.
            </h2>
            <p className="max-w-2xl text-pretty leading-7 text-muted">
              If you want a fuller publication list or recent project context,
              use the CV first, then jump to GitHub.
            </p>
          </div>

          <div className="grid gap-3 self-start">
            {contactLinks.map((link) => (
              <a
                key={`footer-${link.label}`}
                href={link.href}
                {...(link.external
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
                className="rounded-full border border-line bg-white px-5 py-3 text-center text-sm font-medium text-ink shadow-sm"
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

export default App
