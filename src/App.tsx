import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
import NewsUpdates from './components/NewsUpdates'
import { newsUpdates } from './content/news'

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Papers', href: '#papers' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const researchSignals = ['agents', 'post-training', 'multimodal', 'evaluation']
const kineticSignals = ['ACL Main Oral', 'CVPR 2026', 'CCF-A', 'RL agents', 'arXiv preprint', 'tool use']
const hitsDashboardUrl = 'https://hits.sh/deepthinkingzhouliu.github.io/'
const hitsBadgeUrl =
  'https://hits.sh/deepthinkingzhouliu.github.io.svg?style=flat-square&label=page%20views&color=c5522f&labelColor=14171c'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function App() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) {
        return
      }

      const select = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          finePointer: '(pointer: fine)',
          desktop: '(min-width: 900px)',
        },
        (mediaContext) => {
          const { reduceMotion, finePointer, desktop } = mediaContext.conditions ?? {}

          if (reduceMotion) {
            gsap.set(
              [
                '.hero-card',
                '.metric-card',
                '.section-shell',
                '.timeline-card',
                '.paper-card',
                '.project-row',
                '.motion-glyph',
                '.cursor-tracer',
              ],
              { clearProps: 'all' },
            )
            return
          }

          gsap.set(['.hero-card', '.section-shell', '.metric-card', '.timeline-card', '.paper-card', '.project-row'], {
            transformOrigin: '50% 50%',
            willChange: 'transform, opacity',
          })

          const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
          intro
            .from('.site-grid', { autoAlpha: 0, scale: 1.04, duration: 0.9 }, 0)
            .from('.kinetic-beam', { autoAlpha: 0, xPercent: -8, skewX: -10, duration: 1.1 }, 0)
            .from('.hero-card', { autoAlpha: 0, y: 22, scale: 0.985, duration: 0.72 }, 0.05)
            .from('.hero-card nav > *', { autoAlpha: 0, y: -14, stagger: 0.08, duration: 0.58 }, 0.18)
            .from('.kinetic-tape', { autoAlpha: 0, scaleX: 0, transformOrigin: 'left center', duration: 0.62 }, 0.28)
            .from('.hero-copy .animate-rise > *', { autoAlpha: 0, y: 34, rotateX: -10, stagger: 0.065, duration: 0.72 }, 0.34)
            .from('.hero-watermark', { autoAlpha: 0, x: 80, skewX: -16, duration: 0.9 }, 0.42)
            .from('.hero-card aside', { autoAlpha: 0, x: 42, rotateY: -8, duration: 0.78 }, 0.5)
            .from('.signal-chip', { autoAlpha: 0, y: 18, stagger: { each: 0.045, from: 'random' }, duration: 0.48 }, 0.72)
            .from('.animate-rise-delay > *', { autoAlpha: 0, y: 18, stagger: 0.05, duration: 0.5 }, 0.78)
            .from('.metric-card', { autoAlpha: 0, y: 30, skewY: 2, stagger: 0.09, duration: 0.65 }, 0.88)
            .from('.motion-glyph', { autoAlpha: 0, y: 80, rotation: -18, stagger: 0.08, duration: 1.1 }, 0.2)

          gsap.to('.kinetic-beam', {
            xPercent: 5,
            yPercent: -3,
            skewX: 7,
            duration: 7.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })

          gsap.to('.site-grid', {
            x: 68,
            y: 68,
            duration: 18,
            ease: 'none',
            repeat: -1,
          })

          gsap.to('.motion-glyph', {
            y: (index) => [-18, 22, -12][index % 3],
            rotation: (index) => [4, -7, 10][index % 3],
            duration: (index) => [4.8, 6.2, 5.4][index % 3],
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            stagger: 0.18,
          })

          ScrollTrigger.batch(select('.section-shell'), {
            start: 'top 82%',
            interval: 0.08,
            batchMax: 3,
            onEnter: (batch) => {
              gsap.fromTo(
                batch,
                { autoAlpha: 0, y: 44, skewY: 1.5 },
                { autoAlpha: 1, y: 0, skewY: 0, duration: 0.72, stagger: 0.08, ease: 'power3.out', overwrite: 'auto' },
              )
            },
            onEnterBack: (batch) => {
              gsap.to(batch, { autoAlpha: 1, y: 0, skewY: 0, duration: 0.42, stagger: 0.05, overwrite: 'auto' })
            },
          })

          ScrollTrigger.batch(select('.timeline-card, .paper-card, .project-row'), {
            start: 'top 88%',
            interval: 0.08,
            batchMax: desktop ? 6 : 3,
            onEnter: (batch) => {
              gsap.fromTo(
                batch,
                { autoAlpha: 0, x: desktop ? -28 : 0, y: desktop ? 0 : 24 },
                { autoAlpha: 1, x: 0, y: 0, duration: 0.55, stagger: 0.045, ease: 'power2.out', overwrite: 'auto' },
              )
            },
          })

          gsap.utils.toArray<HTMLElement>('.section-shell').forEach((section, index) => {
            gsap.to(section, {
              '--accent-shift': `${index % 2 ? -38 : 38}px`,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            })
          })

          gsap.utils.toArray<HTMLElement>('.paper-card-featured').forEach((paper) => {
            gsap.to(paper, {
              backgroundPosition: '120% 0%',
              duration: 3.8,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
            })
          })

          gsap.utils.toArray<HTMLElement>('.star-icon').forEach((star, index) => {
            gsap.to(star, {
              y: -4,
              rotation: index % 2 ? -12 : 12,
              scale: 1.18,
              duration: 0.7,
              ease: 'power1.inOut',
              repeat: -1,
              yoyo: true,
              delay: index * 0.12,
            })
          })

          if (finePointer) {
            const cleanupFns: Array<() => void> = []
            const tracer = select('.cursor-tracer')[0] as HTMLElement | undefined
            const beam = select('.kinetic-beam')[0] as HTMLElement | undefined
            const watermark = select('.hero-watermark')[0] as HTMLElement | undefined
            const xTo = tracer ? gsap.quickTo(tracer, 'x', { duration: 0.28, ease: 'power3.out' }) : null
            const yTo = tracer ? gsap.quickTo(tracer, 'y', { duration: 0.28, ease: 'power3.out' }) : null
            const beamXTo = beam ? gsap.quickTo(beam, 'x', { duration: 0.8, ease: 'power3.out' }) : null
            const beamYTo = beam ? gsap.quickTo(beam, 'y', { duration: 0.8, ease: 'power3.out' }) : null
            const markXTo = watermark ? gsap.quickTo(watermark, 'x', { duration: 0.7, ease: 'power3.out' }) : null
            const markYTo = watermark ? gsap.quickTo(watermark, 'y', { duration: 0.7, ease: 'power3.out' }) : null

            const handlePointerMove = (event: PointerEvent) => {
              const x = event.clientX
              const y = event.clientY
              const relX = x / window.innerWidth - 0.5
              const relY = y / window.innerHeight - 0.5

              xTo?.(x - 12)
              yTo?.(y - 12)
              beamXTo?.(relX * 42)
              beamYTo?.(relY * 36)
              markXTo?.(relX * -26)
              markYTo?.(relY * -18)
            }

            window.addEventListener('pointermove', handlePointerMove)

            gsap.utils.toArray<HTMLElement>('a, .paper-card, .metric-card, .project-row').forEach((target) => {
              const onEnter = () => {
                gsap.to(target, { x: 3, y: -3, duration: 0.22, ease: 'power2.out', overwrite: 'auto' })
                if (tracer) {
                  gsap.to(tracer, { scale: 2.3, autoAlpha: 0.42, duration: 0.18, ease: 'power2.out', overwrite: 'auto' })
                }
              }
              const onLeave = () => {
                gsap.to(target, { x: 0, y: 0, duration: 0.34, ease: 'elastic.out(1, 0.55)', overwrite: 'auto' })
                if (tracer) {
                  gsap.to(tracer, { scale: 1, autoAlpha: 0.28, duration: 0.24, ease: 'power2.out', overwrite: 'auto' })
                }
              }

              target.addEventListener('pointerenter', onEnter)
              target.addEventListener('pointerleave', onLeave)

              cleanupFns.push(() => {
                target.removeEventListener('pointerenter', onEnter)
                target.removeEventListener('pointerleave', onLeave)
              })
            })

            return () => {
              window.removeEventListener('pointermove', handlePointerMove)
              cleanupFns.forEach((cleanup) => cleanup())
            }
          }
        },
      )

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className="relative min-h-dvh overflow-hidden bg-paper text-ink">
      <div className="site-grid" aria-hidden="true" />
      <div className="kinetic-beam" aria-hidden="true" />
      <div className="cursor-tracer" aria-hidden="true" />
      <div className="motion-glyph motion-glyph-one" aria-hidden="true">
        RL
      </div>
      <div className="motion-glyph motion-glyph-two" aria-hidden="true">
        VLM
      </div>
      <div className="motion-glyph motion-glyph-three" aria-hidden="true">
        AGENT
      </div>
      <div className="scroll-orb scroll-orb-one" aria-hidden="true" />
      <div className="scroll-orb scroll-orb-two" aria-hidden="true" />
      <div className="scroll-ruler" aria-hidden="true" />
      <div className="ambient-orbit ambient-orbit-one" aria-hidden="true" />
      <div className="ambient-orbit ambient-orbit-two" aria-hidden="true" />

      <div className="site-frame relative mx-auto flex w-full max-w-[1240px] flex-col px-4 sm:px-6 lg:px-8">
        <header className="hero-card">
          <nav aria-label="Primary" className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <a href="#top" className="group flex w-fit items-center gap-3">
              <span className="grid size-11 place-items-center border border-ink/10 bg-white/80 font-display text-xl text-ink transition duration-200 group-hover:-translate-y-0.5">
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
                  className="border border-transparent px-3 py-1.5 transition duration-200 hover:-translate-y-0.5 hover:border-ink/10 hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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

          <section id="top" className="hero-grid mt-5 grid lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.62fr)] lg:items-end">
            <div className="hero-copy relative grid">
              <div className="hero-watermark" aria-hidden="true">
                刘洲
              </div>

              <div className="animate-rise grid gap-3">
                <p className="w-fit border border-ink/10 bg-white/75 px-3 py-1.5 text-[0.68rem] font-bold uppercase text-muted">
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
                <p className="profile-note max-w-2xl text-pretty text-sm leading-6 text-ink sm:text-base">
                  {profile.collaboration}
                </p>
                <p className="profile-advisor max-w-2xl text-pretty text-xs leading-5 text-muted sm:text-sm">
                  Ph.D. advisor:{' '}
                  <a href={profile.advisor.href} target="_blank" rel="noreferrer">
                    {profile.advisor.name}
                  </a>
                  , {profile.advisor.affiliation}.
                </p>
              </div>

              <div className="animate-rise-delay flex flex-wrap gap-2">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className={`px-4 py-2 text-xs font-bold transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                      link.primary
                        ? 'bg-ink text-white'
                        : 'border border-ink/10 bg-white/85 text-ink'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <aside className="animate-rise-delay relative border border-ink/10 bg-white/78 p-4">
              <div className="border border-ink/10 bg-panel/70 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[0.68rem] font-bold uppercase text-muted">Collaboration</p>
                    <h2 className="mt-2 text-balance font-display text-2xl leading-[1] text-ink">
                      Open to research collaboration.
                    </h2>
                  </div>
                  <span className="pulse-dot bg-accent px-2.5 py-1 text-[0.66rem] font-bold uppercase text-white">
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
                  <div key={signal} className="signal-chip min-w-0 border border-ink/10 bg-white px-3 py-2.5 text-xs font-bold text-ink">
                    {signal}
                  </div>
                ))}
              </div>
            </aside>
          </section>
        </header>

        <main className="main-stack grid">
          <section aria-label="Research highlights" className="metric-strip grid gap-3 md:grid-cols-4">
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

          <NewsUpdates items={newsUpdates} />

          <section id="work" className="section-shell">
            <SectionIntro
              eyebrow="Present"
              title="Research and industry, running in parallel."
              body="I work where model behavior, product constraints, and evaluation pressure meet."
            />
            <div className="timeline-stack grid">
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
                  {selectedPapers.map((paper, index) => {
                    const isFeaturedPaper = paper.role.includes('First author') || paper.role.includes('Co-first author')

                    return (
                      <article
                        key={paper.title}
                        className={`paper-card ${isFeaturedPaper ? 'paper-card-featured' : 'paper-card-standard'}`}
                      >
                        <span className="paper-index" aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="paper-content">
                          <div className="paper-meta">
                            <span className="paper-marker paper-marker-strong">{paper.role}</span>
                            {isFeaturedPaper ? <span className="paper-marker paper-marker-priority">Featured</span> : null}
                            {paper.projectLead ? <span className="paper-marker">Project Lead</span> : null}
                            <span className="paper-marker">{paper.venue}</span>
                            <span className="paper-marker">{paper.ccf}</span>
                            <span className="paper-marker paper-marker-accent">{paper.distinction}</span>
                          </div>
                          <h3 className="paper-title">{paper.title}</h3>
                        </div>
                      </article>
                    )
                  })}
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

          <section className="kinetic-dark border border-ink/10 bg-ink p-5 text-white sm:p-6 lg:p-7">
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
                  <span key={area} className="border border-white/15 bg-white/8 px-3 py-1.5 text-xs text-white/75">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer id="contact" className="grid border-t border-ink/10 py-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-[0.68rem] font-bold uppercase text-muted">Contact</p>
            <h2 className="mt-1.5 text-balance font-display text-2xl text-ink">
              Research collaboration, open-source building, sharp technical conversations.
            </h2>
          </div>
          <div className="grid gap-3 md:justify-items-end">
            <div className="flex flex-wrap gap-2 md:justify-end">
              {contactLinks.map((link) => (
                <a
                  key={`footer-${link.label}`}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="border border-ink/10 bg-white px-4 py-2 text-xs font-bold text-ink transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href={hitsDashboardUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit flex-col items-start gap-2 border border-ink/10 bg-white/82 px-3.5 py-3 transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:justify-self-end"
            >
              <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-muted">
                Traffic
              </span>
              <img
                src={hitsBadgeUrl}
                alt="Homepage page views badge"
                loading="lazy"
                decoding="async"
                className="block h-5 w-auto"
              />
              <span className="text-[0.7rem] leading-5 text-muted">Public page-hit stats ↗</span>
            </a>
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
