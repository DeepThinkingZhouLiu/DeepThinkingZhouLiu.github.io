import NewsUpdates from './components/NewsUpdates'
import { newsUpdates } from './content/news'
import {
  contactLinks,
  currentHighlights,
  experience,
  focusAreas,
  preprints,
  profile,
  projects,
  publicationIndexes,
  selectedPapers,
} from './content/profile'

const navItems = [
  { label: 'News', href: '#news' },
  { label: 'Publications', href: '#papers' },
  { label: 'Experience', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const hitsDashboardUrl = 'https://hits.sh/deepthinkingzhouliu.github.io/'
const hitsBadgeUrl =
  'https://hits.sh/deepthinkingzhouliu.github.io.svg?style=flat-square&label=page%20views&color=8f1d2c&labelColor=262626'

function App() {
  return (
    <div className="academic-page">
      <header className="site-header">
        <div className="site-container header-inner">
          <a className="site-brand" href="#top" aria-label="Back to homepage">
            <span className="brand-mark" aria-hidden="true">洲</span>
            <span>
              <strong>{profile.navigationTitle}</strong>
              <small>Academic Homepage</small>
            </span>
          </a>

          <nav aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="site-container">
        <section className="profile-section" aria-labelledby="profile-name">
          <div className="profile-main">
            <p className="profile-kicker">{profile.kicker}</p>
            <h1 id="profile-name">
              {profile.name}
              <span>{profile.nameNative}</span>
            </h1>
            <p className="profile-headline">{profile.headline}</p>
            <p className="profile-summary">{profile.summary}</p>
            <p className="profile-collaboration">{profile.collaboration}</p>
            <p className="profile-advisor">
              Ph.D. advisor:{' '}
              <a href={profile.advisor.href} target="_blank" rel="noreferrer">
                {profile.advisor.name}
              </a>
              , {profile.advisor.affiliation}.
            </p>

            <div className="profile-links" aria-label="Profile links">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {link.label}
                </a>
              ))}
              {publicationIndexes.map((index) => (
                <a key={index.label} href={index.href} target="_blank" rel="noreferrer">
                  {index.label}
                </a>
              ))}
            </div>
          </div>

          <aside className="profile-facts" aria-label="Academic profile details">
            <dl>
              <div>
                <dt>Affiliation</dt>
                <dd>{profile.affiliation}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Research</dt>
                <dd>LLM agents and multimodal systems</dd>
              </div>
            </dl>
            <div className="focus-summary">
              <h2>Research interests</h2>
              <ul>
                {focusAreas.map((area) => <li key={area}>{area}</li>)}
              </ul>
            </div>
          </aside>
        </section>

        <section className="highlight-row" aria-label="Research highlights">
          {currentHighlights.map((highlight) => (
            <article key={highlight.label}>
              <strong>{highlight.value}</strong>
              <p>{highlight.label}</p>
            </article>
          ))}
        </section>

        <NewsUpdates items={newsUpdates} />

        <section id="papers" className="academic-section" aria-labelledby="papers-title">
          <SectionHeading
            kicker="Research"
            title="Selected publications"
            id="papers-title"
            body="First-author and co-first-author work is listed here. The complete publication record is available through the indexes above."
          />

          <div className="publication-content">
            <div className="publication-group">
              <div className="group-heading">
                <h3>Accepted papers</h3>
                <span>{selectedPapers.length}</span>
              </div>
              <ol className="publication-list">
                {selectedPapers.map((paper, index) => (
                  <li key={paper.title}>
                    <span className="publication-index">{String(index + 1).padStart(2, '0')}</span>
                    <article>
                      <div className="publication-meta">
                        <strong>{paper.venue}</strong>
                        <span>{paper.role}</span>
                        <span>{paper.ccf}</span>
                        {paper.projectLead ? <span>Project lead</span> : null}
                        <span>{paper.distinction}</span>
                      </div>
                      <h4>{paper.title}</h4>
                    </article>
                  </li>
                ))}
              </ol>
            </div>

            <div className="publication-group preprint-group">
              <div className="group-heading">
                <h3>Recent preprints</h3>
                <span>{preprints.length}</span>
              </div>
              <ul className="preprint-list">
                {preprints.map((paper) => (
                  <li key={paper.title}>
                    <a href={paper.href} target="_blank" rel="noreferrer">
                      <div className="publication-meta">
                        <strong>{paper.venue}</strong>
                        <span>{paper.role}</span>
                        <span>{paper.distinction}</span>
                      </div>
                      <h4>{paper.title}</h4>
                      <small>View on arXiv →</small>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="work" className="academic-section" aria-labelledby="work-title">
          <SectionHeading
            kicker="Background"
            title="Experience"
            id="work-title"
            body="Research and engineering experience across agent post-training, data systems, and AIGC inference."
          />
          <div className="experience-list">
            {experience.map((item) => (
              <article key={`${item.org}-${item.role}`} className="experience-item">
                <div className="experience-meta">
                  <time>{item.period}</time>
                  <span>{item.location}</span>
                </div>
                <div>
                  <h3>{item.org}</h3>
                  <p className="experience-role">{item.role}</p>
                  <ul>
                    {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="academic-section" aria-labelledby="projects-title">
          <SectionHeading
            kicker="Open source"
            title="Selected projects"
            id="projects-title"
            body="Research systems and open-source tools that connect papers, data, and reproducible workflows."
          />
          <div className="project-list">
            {projects.map((project) => (
              <a key={project.name} href={project.href} target="_blank" rel="noreferrer" className="project-item">
                <img src={project.icon} alt="" loading="lazy" />
                <div>
                  <div className="project-meta">
                    <span>{project.stack}</span>
                    <strong>★ {project.stars}</strong>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                </div>
                <span className="project-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="site-container footer-inner">
          <div>
            <strong>Research collaboration is welcome.</strong>
            <p>LLM agents, post-training, multimodal systems, benchmarks, and automated evaluation.</p>
          </div>
          <div className="footer-links">
            {contactLinks.map((link) => (
              <a
                key={`footer-${link.label}`}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {link.label}
              </a>
            ))}
            <a href={hitsDashboardUrl} target="_blank" rel="noreferrer" className="traffic-link">
              <img src={hitsBadgeUrl} alt="Homepage page views" loading="lazy" decoding="async" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SectionHeading({
  kicker,
  title,
  id,
  body,
}: {
  kicker: string
  title: string
  id: string
  body: string
}) {
  return (
    <div className="section-heading">
      <p className="section-kicker">{kicker}</p>
      <h2 id={id}>{title}</h2>
      <p>{body}</p>
    </div>
  )
}

export default App
