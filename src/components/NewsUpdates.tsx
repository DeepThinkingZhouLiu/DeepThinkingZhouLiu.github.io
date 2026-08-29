import type { NewsUpdate } from '../content/news'

function NewsUpdates({ items }: { items: NewsUpdate[] }) {
  return (
    <section id="news" className="academic-section news-section" aria-labelledby="news-title">
      <div className="section-heading">
        <p className="section-kicker">Updates</p>
        <h2 id="news-title">News</h2>
        <p>Recent paper decisions, releases, and research awards.</p>
      </div>

      <ol className="news-list" aria-label="Recent academic news">
        {items.map((item, index) => {
          const content = (
            <>
              <time>{item.date}</time>
              <div className="news-copy">
                <div className="news-meta">
                  <span>{item.kind}</span>
                  {item.count ? <strong>{item.count}</strong> : null}
                </div>
                <h3>{item.title}</h3>
                {item.detail ? <p>{item.detail}</p> : null}
              </div>
              {item.href ? <span className="news-arrow" aria-hidden="true">→</span> : null}
            </>
          )

          return (
            <li key={`${item.date}-${item.title}`} className={index === 0 ? 'news-item news-item-latest' : 'news-item'}>
              {item.href ? <a href={item.href}>{content}</a> : <article>{content}</article>}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default NewsUpdates
