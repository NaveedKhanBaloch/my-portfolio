import Link from "next/link";
import { getPortfolioContent } from "@/lib/storage";

export default async function AcademiaPage() {
  const content = await getPortfolioContent();
  const publications = [...content.publications].sort((a, b) => b.year - a.year);

  return (
    <div className="simple-page">
      <header className="simple-header">
        <Link href="/" className="text-link">
          Back to portfolio
        </Link>
        <div>
          <p className="eyebrow">Academia</p>
          <h1>Research publications</h1>
          <p>
            Selected publication records curated from publisher pages and citation-tracking sources. Citation figures shown
            here use the linked source on each entry and should be treated as source-specific unless verified directly on
            Google Scholar.
          </p>
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href={content.social.scholar} target="_blank" rel="noreferrer">
            View Google Scholar
          </a>
        </div>
      </header>

      <section className="content-section">
        <div className="metrics-grid">
          <article className="metric-card">
            <strong>{publications.length}</strong>
            <h2>Publications listed</h2>
            <p>Research papers currently curated into the portfolio.</p>
          </article>
          <article className="metric-card">
            <strong>{publications.reduce((sum, item) => sum + (item.citationCount || 0), 0)}</strong>
            <h2>Tracked citations</h2>
            <p>Total shown here from the citation sources listed per paper.</p>
          </article>
          <article className="metric-card">
            <strong>{Math.max(...publications.map((item) => item.year))}</strong>
            <h2>Latest paper year</h2>
            <p>Recent publication represented on this page.</p>
          </article>
        </div>
      </section>

      <section className="content-section">
        <div className="publication-list">
          {publications.map((publication) => (
            <article key={publication.slug} className="publication-card">
              <div className="publication-top">
                <div>
                  <p className="eyebrow">Publication</p>
                  <h2>{publication.title}</h2>
                </div>
                <span className="publication-year">{publication.year}</span>
              </div>
              <p className="publication-authors">{publication.authors}</p>
              <div className="publication-venue-row">
                <p className="publication-venue">{publication.venue}</p>
                {publication.impactFactor ? (
                  <a
                    className="impact-pill"
                    href={publication.impactFactorSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Impact Factor {publication.impactFactor}
                  </a>
                ) : null}
              </div>
              <p>{publication.abstract}</p>
              <div className="tag-row">
                {publication.keywords.map((keyword) => (
                  <span key={keyword} className="tag">
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="publication-meta">
                <a className="citation-pill" href={publication.citationSourceUrl} target="_blank" rel="noreferrer">
                  {publication.citationCount !== null ? `${publication.citationCount} citations` : "Citation count unavailable"}
                </a>
              </div>
              <div className="hero-actions">
                <a className="button button-primary" href={publication.publicationUrl} target="_blank" rel="noreferrer">
                  Open paper
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
