import Image from "next/image";
import Link from "next/link";
import { formatBlogDate } from "@/lib/date";
import { renderSimpleMarkdown } from "@/lib/markdown";
import type { BlogPost, PortfolioContent } from "@/lib/types";

type SiteShellProps = {
  content: PortfolioContent;
  posts: BlogPost[];
};

export function SiteShell({ content, posts }: SiteShellProps) {
  return (
    <div className="site-shell">
      <div className="site-backdrop" aria-hidden="true">
        <span className="backdrop-orb orb-one"></span>
        <span className="backdrop-orb orb-two"></span>
        <span className="backdrop-grid"></span>
      </div>

      <header className="site-header">
        <Link href="/" className="brand">
          <span className="brand-mark">NK</span>
          <span>
            <strong>{content.hero.name}</strong>
            <small>{content.hero.title}</small>
          </span>
        </Link>
        <nav className="main-nav">
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <Link href="/academia">Academia</Link>
          <Link href="/blog">Blog</Link>
        </nav>
        <a className="button button-primary" href={content.hero.primaryCtaHref}>
          Let&apos;s Talk
        </a>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">AI Engineer • Researcher • Builder</p>
              <h1>{content.hero.subtitle}</h1>
              <p className="hero-summary">{content.hero.summary}</p>
              <div className="hero-actions">
                <a className="button button-primary" href={content.hero.primaryCtaHref}>
                  {content.hero.primaryCtaLabel}
                </a>
                <a className="button button-secondary" href={content.hero.secondaryCtaHref}>
                  {content.hero.secondaryCtaLabel}
                </a>
              </div>
              <div className="hero-stat-strip">
                {content.metrics.map((metric) => (
                  <article key={metric.label} className="hero-stat-card">
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card">
                <div className="hero-image-wrap">
                  <Image src={content.hero.image} alt={content.hero.name} width={720} height={900} priority />
                </div>
                <div className="hero-card-caption">
                  <strong>{content.hero.name}</strong>
                  <span>{content.hero.availability}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="logo-marquee" aria-label="Technology stack">
            <div className="logo-track">
              {[...content.hero.stack, ...content.hero.stack].map((item, index) => (
                <span key={`${item}-${index}`} className="logo-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="metrics-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Proof of work</p>
              <h2>Results</h2>
            </div>
          </div>
          <div className="metrics-grid">
            {content.metrics.map((metric) => (
              <article key={metric.label} className="metric-card">
                <strong>{metric.value}</strong>
                <h2>{metric.label}</h2>
                <p>{metric.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section content-two-col">
          <div>
            <p className="eyebrow">About</p>
            <h2>{content.about.headline}</h2>
          </div>
          <div className="stacked-copy">
            <p>{content.about.summary}</p>
            <div className="badge-row">
              {content.hero.badges.map((badge) => (
                <span key={badge} className="badge">
                  {badge}
                </span>
              ))}
            </div>
            <ul className="feature-list feature-list-strong">
              {content.about.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="services" className="content-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Services</p>
              <h2>What I do</h2>
            </div>
          </div>
          <div className="card-grid">
            {content.services.map((service) => (
              <article key={service.title} className="feature-card">
                <p className="card-index">0{content.services.indexOf(service) + 1}</p>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="feature-list">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Projects</p>
              <h2>Featured work</h2>
            </div>
          </div>
          <div className="project-list">
            {content.projects.map((project) => (
              <article key={project.slug} className="project-card">
                <div className="project-image">
                  <Image src={project.image} alt={project.name} width={900} height={640} />
                </div>
                <div className="project-copy">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <p className="project-impact">{project.impact}</p>
                  <div className="tag-row">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="content-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Experience</p>
              <h2>Experience</h2>
            </div>
          </div>
          <div className="timeline">
            {content.experience.map((item) => (
              <article key={`${item.role}-${item.organization}`} className="timeline-item">
                <div>
                  <strong className="timeline-period">{item.period}</strong>
                  <h3>{item.role}</h3>
                  <p>{item.organization}</p>
                </div>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Approach</p>
              <h2>My approach</h2>
            </div>
          </div>
          <div className="card-grid">
            {content.approach.map((step) => (
              <article key={step.phase} className="feature-card">
                <p className="card-index">{step.phase}</p>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Principles</p>
              <h2>Delivery principles</h2>
            </div>
          </div>
          <div className="card-grid">
            {content.principles.map((principle) => (
              <article key={principle.title} className="feature-card">
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Writing</p>
              <h2>Latest posts</h2>
            </div>
            <Link href="/blog" className="button button-secondary">
              View all posts
            </Link>
          </div>
          <div className="card-grid">
            {posts.map((post) => (
              <article key={post.slug} className="blog-card">
                <Image src={post.coverImage} alt={post.title} width={800} height={480} />
                <div>
                  <p className="meta-row">
                    <span>{post.readTime}</span>
                    <span>{formatBlogDate(post.publishedAt, "short")}</span>
                  </p>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-link">
                    Read article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Testimonials</p>
              <h2>Client feedback</h2>
            </div>
          </div>
          <div className="quote-grid">
            {content.testimonials.map((testimonial) => (
              <blockquote key={testimonial.quote} className="quote-card">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
                <footer>
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="cta-panel">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Let&apos;s build together</h2>
            <p>
              Let&apos;s discuss your idea, architecture, or current implementation and shape the next phase with clarity.
            </p>
          </div>
          <div className="cta-actions">
            <a className="button button-primary" href={`mailto:${content.contact.email}`}>
              {content.contact.email}
            </a>
            <a className="button button-secondary" href={content.contact.cvHref}>
              Download CV
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>{content.hero.name}</strong>
          <p>{content.hero.title}</p>
        </div>
        <div className="footer-links">
          <a href={content.social.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={content.social.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={content.social.scholar} target="_blank" rel="noreferrer">
            Scholar
          </a>
          <Link href="/academia">Academia</Link>
          <a href={content.social.upwork} target="_blank" rel="noreferrer">
            Upwork
          </a>
          <Link href="/admin/login">Admin</Link>
        </div>
      </footer>
    </div>
  );
}

export function BlogListing({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="simple-page">
      <header className="simple-header">
        <Link href="/" className="text-link">
          Back to portfolio
        </Link>
        <div>
          <p className="eyebrow">Blog</p>
          <h1>Thoughts on AI systems, delivery, and product strategy</h1>
        </div>
      </header>
      <div className="blog-list-page">
        {posts.map((post) => (
          <article key={post.slug} className="blog-list-item">
            <Image src={post.coverImage} alt={post.title} width={900} height={520} />
            <div>
              <p className="meta-row">
                <span>{formatBlogDate(post.publishedAt, "long")}</span>
                <span>{post.readTime}</span>
              </p>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="tag-row">
                {post.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}`} className="button button-secondary">
                Read post
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <article className="article-shell">
      <header className="article-header">
        <Link href="/blog" className="text-link">
          Back to blog
        </Link>
        <p className="meta-row">
          <span>{formatBlogDate(post.publishedAt, "long")}</span>
          <span>{post.readTime}</span>
        </p>
        <h1>{post.title}</h1>
        <p className="article-excerpt">{post.excerpt}</p>
        <div className="tag-row">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </header>
      <Image src={post.coverImage} alt={post.title} width={1200} height={680} className="article-image" />
      <div className="article-content">{renderSimpleMarkdown(post.content)}</div>
    </article>
  );
}
