import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import type { NewsUpdate } from '../content/news'

gsap.registerPlugin(useGSAP)

const emptySlots = [
  {
    label: 'Next',
    title: 'Paper decision / release',
    detail: 'Reserved for public research milestones.',
  },
  {
    label: 'Later',
    title: 'Talk / demo note',
    detail: 'Short notes only, so the feed stays compact.',
  },
]

function NewsUpdates({ items }: { items: NewsUpdate[] }) {
  const rootRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) {
        return
      }

      const select = gsap.utils.selector(root)
      const cards = select('.news-card')
      const certificate = select('.news-certificate')
      const liveDot = select('.news-live-dot')
      const scan = select('.news-scan')
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(root, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65, ease: 'power3.out' })

        if (cards.length) {
          gsap.fromTo(
            cards,
            { x: -16, autoAlpha: 0.42 },
            { x: 0, autoAlpha: 1, duration: 0.62, stagger: 0.07, ease: 'power2.out', delay: 0.08 },
          )
        }

        if (certificate.length) {
          gsap.fromTo(
            certificate,
            { autoAlpha: 0, rotate: -2.5, scale: 0.94, y: 10 },
            { autoAlpha: 1, rotate: 0, scale: 1, y: 0, duration: 0.74, ease: 'back.out(1.4)', delay: 0.18 },
          )
        }

        if (liveDot.length) {
          gsap.to(liveDot, {
            scale: 1.18,
            autoAlpha: 0.42,
            duration: 0.9,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
        }

        if (scan.length) {
          gsap.fromTo(
            scan,
            { yPercent: -115 },
            { yPercent: 115, duration: 3.8, ease: 'none', repeat: -1, repeatDelay: 0.35 },
          )
        }
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef} className="section-shell news-shell" aria-labelledby="news-title">
      <div className="section-intro news-intro">
        <p className="text-[0.68rem] font-bold uppercase text-accent">News / Updates</p>
        <h2 id="news-title" className="mt-2 text-balance font-display text-3xl leading-[1] text-ink">
          Award stream.
        </h2>
        <p className="mt-3 text-pretty text-xs leading-5 text-muted">
          Compact notes for paper accepts, releases, talks, and research awards.
        </p>
      </div>

      <div className="news-panel">
        <div className="news-panel-head">
          <div>
            <p className="news-panel-label">Live feed</p>
            <p className="news-panel-copy">
              {items.length ? `${items.length} update${items.length > 1 ? 's' : ''}` : 'No public updates yet'}
            </p>
          </div>
          <span className="news-live-badge">
            <span className="news-live-dot" aria-hidden="true" />
            live
          </span>
        </div>

        <div
          className="news-scroll"
          aria-label={items.length ? 'News updates list' : 'Reserved news updates lane'}
        >
          <div className="news-scan" aria-hidden="true" />

          {items.length ? (
            items.map((item) =>
              item.href ? (
                <a
                  key={`${item.date}-${item.title}`}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="news-card news-card-link"
                >
                  <p className="news-date">{item.date}</p>
                  <div>
                    <span className="news-tag">{item.kind ?? 'note'}</span>
                    <h3 className="news-item-title">{item.title}</h3>
                    {item.detail ? <p className="news-item-detail">{item.detail}</p> : null}
                    {item.image ? (
                      <img className="news-certificate" src={item.image.src} alt={item.image.alt} loading="lazy" />
                    ) : null}
                  </div>
                </a>
              ) : (
                <article key={`${item.date}-${item.title}`} className="news-card">
                  <p className="news-date">{item.date}</p>
                  <div>
                    <span className="news-tag">{item.kind ?? 'note'}</span>
                    <h3 className="news-item-title">{item.title}</h3>
                    {item.detail ? <p className="news-item-detail">{item.detail}</p> : null}
                    {item.image ? (
                      <img className="news-certificate" src={item.image.src} alt={item.image.alt} loading="lazy" />
                    ) : null}
                  </div>
                </article>
              ),
            )
          ) : (
            <>
              <article className="news-card news-card-empty">
                <p className="news-date">Empty</p>
                <div>
                  <span className="news-tag">reserved</span>
                  <h3 className="news-item-title">No public updates published yet.</h3>
                  <p className="news-item-detail">
                    This lane is ready for paper decisions, releases, talks, and sharp milestone notes.
                  </p>
                </div>
              </article>

              {emptySlots.map((slot) => (
                <article key={slot.label} className="news-card news-card-placeholder" aria-hidden="true">
                  <p className="news-date">{slot.label}</p>
                  <div>
                    <span className="news-tag">standby</span>
                    <h3 className="news-item-title">{slot.title}</h3>
                    <p className="news-item-detail">{slot.detail}</p>
                  </div>
                </article>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default NewsUpdates
