export type SocialLinks = {
  linkedin: string;
  github: string;
  scholar: string;
  upwork: string;
};

export type HeroContent = {
  name: string;
  title: string;
  subtitle: string;
  summary: string;
  location: string;
  availability: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  image: string;
  badges: string[];
  stack: string[];
};

export type Metric = {
  label: string;
  value: string;
  detail: string;
};

export type Service = {
  title: string;
  description: string;
  outcomes: string[];
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  impact: string;
  image: string;
  tech: string[];
  href?: string;
};

export type ExperienceItem = {
  role: string;
  organization: string;
  period: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type ApproachStep = {
  phase: string;
  title: string;
  description: string;
};

export type Principle = {
  title: string;
  description: string;
};

export type Publication = {
  slug: string;
  title: string;
  authors: string;
  venue: string;
  journalName?: string;
  impactFactor?: string | null;
  impactFactorSourceUrl?: string;
  year: number;
  doi: string;
  publicationUrl: string;
  abstract: string;
  keywords: string[];
  citationCount: number | null;
  citationSourceLabel: string;
  citationSourceUrl: string;
};

export type ContactContent = {
  email: string;
  phone: string;
  calendarHref: string;
  cvHref: string;
};

export type PortfolioContent = {
  hero: HeroContent;
  about: {
    headline: string;
    summary: string;
    highlights: string[];
  };
  metrics: Metric[];
  services: Service[];
  projects: Project[];
  experience: ExperienceItem[];
  approach: ApproachStep[];
  principles: Principle[];
  publications: Publication[];
  testimonials: Testimonial[];
  social: SocialLinks;
  contact: ContactContent;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  status: "published" | "draft";
};
