import type { BlogPost, PortfolioContent } from "@/lib/types";

export const seedPortfolioContent: PortfolioContent = {
  hero: {
    name: "Dr. Naveed Khan Baloch",
    title: "AI Systems Architect",
    subtitle: "Building reliable AI systems for real products.",
    summary:
      "I help startups and established teams launch dependable AI systems, from strategy and prototyping to production deployment, with a focus on healthcare, automation, hiring, and intelligent SaaS.",
    location: "Taxila, Pakistan",
    availability: "Available for consulting, fractional AI leadership, and build partnerships.",
    primaryCtaLabel: "Book a Strategy Call",
    primaryCtaHref: "mailto:naveedk09@gmail.com",
    secondaryCtaLabel: "Download CV",
    secondaryCtaHref: "/data/NaveedCV.pdf",
    image: "/images/Latest.webp",
    badges: [
      "PhD in Computer Engineering",
      "20+ peer-reviewed publications",
      "Top-Rated Plus AI Engineer"
    ],
    stack: [
      "Python",
      "PyTorch",
      "LangGraph",
      "OpenAI",
      "AWS",
      "Docker",
      "Supabase"
    ]
  },
  about: {
    headline: "Bridging research depth with business-ready execution.",
    summary:
      "My work sits at the intersection of AI research, product strategy, and engineering delivery. I design systems that are explainable, scalable, and useful in the real world, whether that means multi-agent workflows, retrieval-augmented generation, evaluation pipelines, or AI product roadmaps for growing teams.",
    highlights: [
      "Built production AI systems for clients across the USA, Canada, and Europe.",
      "Led academic research and mentorship while staying hands-on with modern AI delivery.",
      "Designed healthcare, EdTech, recruitment, and automation products with measurable outcomes.",
      "Comfortable across architecture, experimentation, APIs, deployment, and stakeholder communication."
    ]
  },
  metrics: [
    {
      label: "Years Building",
      value: "12+",
      detail: "AI systems, software products, and applied research"
    },
    {
      label: "Published Work",
      value: "20+",
      detail: "Peer-reviewed papers in intelligent computing"
    },
    {
      label: "Delivery Footprint",
      value: "Global",
      detail: "Remote collaboration with international teams"
    }
  ],
  services: [
    {
      title: "AI Product Strategy",
      description: "Roadmapping the right product and workflow before expensive implementation begins.",
      outcomes: [
        "Use-case prioritization",
        "Architecture recommendations",
        "Evaluation and rollout plans"
      ]
    },
    {
      title: "LLM and Agent Systems",
      description: "Building robust copilots, RAG pipelines, and autonomous workflows that support real operational use.",
      outcomes: [
        "Multi-agent orchestration",
        "Retrieval and tool use",
        "Guardrails and observability"
      ]
    },
    {
      title: "Custom AI Delivery",
      description: "Shipping full-stack AI products, APIs, and dashboards with deployment and iteration in mind.",
      outcomes: [
        "Backend APIs",
        "Data integrations",
        "Cloud-ready deployment"
      ]
    }
  ],
  projects: [
    {
      slug: "recrubotx",
      name: "RecrubotX",
      category: "Hiring Intelligence",
      description:
        "An end-to-end agentic hiring platform for resume parsing, scheduling, voice interviews, and structured candidate evaluation.",
      impact: "Reduced recruiter workload with automated screening and interview workflows.",
      image: "/images/interviewAI.webp",
      tech: ["OpenAI", "LangChain", "Python", "Voice AI"]
    },
    {
      slug: "doctor-botx",
      name: "Doctor BotX",
      category: "Healthcare AI",
      description:
        "A clinical assistant powered by retrieval workflows, speech integration, and conversational decision support.",
      impact: "Improved access to structured medical knowledge during clinician workflows.",
      image: "/images/doctorbotx.webp",
      tech: ["LangGraph", "Qdrant", "Whisper", "RAG"]
    },
    {
      slug: "bokafy",
      name: "Bokafy",
      category: "Hospitality SaaS",
      description:
        "A booking and operations platform using conversational AI for reservations, real-time updates, and smart table management.",
      impact: "Unified web, chat, and voice bookings into one operational flow.",
      image: "/images/bokafy.webp",
      tech: ["React", "Node.js", "Pinecone", "Supabase"]
    }
  ],
  experience: [
    {
      role: "AI Engineer",
      organization: "Independent Consulting",
      period: "2018 - Present",
      description:
        "Architecting AI systems, LLM workflows, and product-ready automation for international clients."
    },
    {
      role: "AI and NLP Engineer",
      organization: "SkillSoft",
      period: "2021 - Present",
      description:
        "Creating enterprise AI learning pathways and practical training for modern ML and NLP adoption."
    },
    {
      role: "Assistant Professor",
      organization: "UET Taxila",
      period: "2012 - Present",
      description:
        "Teaching, mentoring, and publishing research in AI systems, intelligent computing, and applied machine learning."
    },
    {
      role: "AI Consultant",
      organization: "Bluell AB",
      period: "2024 - Present",
      description:
        "Designing intelligent monitoring and automation solutions combining devices, analytics, and LLM-driven insights."
    },
    {
      role: "Assistant Professor",
      organization: "UET Taxila",
      period: "2012 - Present",
      description:
        "Teaching, mentoring, and contributing to AI research and academic development in computer engineering."
    }
  ],
  approach: [
    {
      phase: "Phase 1",
      title: "Planning & Strategy",
      description:
        "I collaborate to map out your goals, target audience, and key functionality so we can define the right site structure, flow, and content requirements."
    },
    {
      phase: "Phase 2",
      title: "Development & Progress Update",
      description:
        "Once the direction is clear, I move into implementation and share progress along the way so you always know what is being built and why."
    },
    {
      phase: "Phase 3",
      title: "Deployment & Launch",
      description:
        "I translate the approved design and functionality into a production-ready website and make sure launch and delivery are handled cleanly."
    }
  ],
  principles: [
    {
      title: "Client-First Approach",
      description:
        "I shape each project around your objectives, communicate clearly, and focus on outcomes that create real value."
    },
    {
      title: "Modern Tech Stack",
      description:
        "I work with current AI and engineering tools so the systems I build are practical, scalable, and maintainable."
    },
    {
      title: "AI-Powered Solutions",
      description:
        "I design intelligent workflows, retrieval systems, and agentic automation that improve speed, quality, and decision-making."
    },
    {
      title: "Global Flexibility",
      description:
        "I collaborate remotely across time zones with a process that stays responsive without sacrificing delivery quality."
    },
    {
      title: "Ready to Collaborate",
      description:
        "Fast onboarding, clear milestones, and a partnership mindset make it easier to move from idea to execution."
    }
  ],
  publications: [
    {
      slug: "iwo-iga-hybrid-whale-optimization-for-2d-noc",
      title: "IWO-IGA—A Hybrid Whale Optimization Algorithm Featuring Improved Genetic Characteristics for Mapping Real-Time Applications onto 2D Network on Chip",
      authors: "Sharoon Saleem, Fawad Hussain, Naveed Khan Baloch",
      venue: "Algorithms, 17(3), 115",
      journalName: "Algorithms",
      impactFactor: "2.1",
      impactFactorSourceUrl: "https://www.mdpi.com/journal/algorithms/news-and-conferences/news/12303",
      year: 2024,
      doi: "10.3390/a17030115",
      publicationUrl: "https://www.mdpi.com/1999-4893/17/3/115",
      abstract:
        "This research proposes a hybrid whale-optimization and genetic approach for mapping real-time applications onto 2D NoC, showing improvements in power, energy, latency, and convergence behavior.",
      keywords: ["Whale Optimization", "Genetic Algorithm", "2D-NoC", "Real-Time Mapping"],
      citationCount: 9,
      citationSourceLabel: "9 citations (Google Scholar citation page provided by user)",
      citationSourceUrl: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=iHF3OyUAAAAJ&sortby=pubdate&citation_for_view=iHF3OyUAAAAJ:3fE2CSJIrl8C"
    }
  ],
  testimonials: [
    {
      quote:
        "Great research scientist and very easy to work with.",
      author: "Client Feedback",
      role: "Research Collaboration"
    },
    {
      quote:
        "Delivered exactly what we needed and communicated clearly throughout the project. Very reliable and thoughtful in his approach.",
      author: "Client Feedback",
      role: "AI Product Client"
    },
    {
      quote:
        "Strong technical depth, quick to understand requirements, and professional from start to finish. I would gladly work with him again.",
      author: "Client Feedback",
      role: "International Client"
    }
  ],
  social: {
    linkedin: "https://www.linkedin.com/in/naveed-khan-baloch-1954518/",
    github: "https://github.com/NaveedKhanBaloch",
    scholar: "https://scholar.google.com/citations?hl=en&user=iHF3OyUAAAAJ",
    upwork: "https://www.upwork.com/freelancers/~01c766a0a5b535c55f"
  },
  contact: {
    email: "naveedk09@gmail.com",
    phone: "+92 333 555 0000",
    calendarHref: "mailto:naveedk09@gmail.com",
    cvHref: "/data/NaveedCV.pdf"
  }
};

export const seedBlogPosts: BlogPost[] = [
  {
    slug: "designing-agentic-ai-for-real-business-workflows",
    title: "Designing Agentic AI for Real Business Workflows",
    excerpt:
      "A practical look at where agents add real value and where simpler automation is the smarter choice.",
    content: `# Designing Agentic AI for Real Business Workflows

Agentic systems become useful when they are attached to a concrete workflow, clear tools, and measurable outcomes.

## Where they work well

- Multi-step research and analysis tasks
- Support operations that require summarization and retrieval
- Hiring, onboarding, and document-heavy business flows

## What matters most

The strongest systems are not the most complex ones. They are the ones with clear boundaries, strong evaluation, and fallback paths for humans when confidence drops.

## My rule of thumb

Start with the smallest workflow that creates clear leverage. Then add autonomy only where it improves speed or quality.`,
    coverImage: "/images/interviewAI.webp",
    tags: ["Agentic AI", "LLM Systems", "Product Strategy"],
    publishedAt: "2026-04-10",
    readTime: "4 min read",
    status: "published"
  },
  {
    slug: "rag-systems-that-stay-trustworthy-in-production",
    title: "RAG Systems That Stay Trustworthy in Production",
    excerpt:
      "Retrieval is easy to demo and much harder to keep accurate after launch. Here are the habits that help.",
    content: `# RAG Systems That Stay Trustworthy in Production

Retrieval quality depends on more than a vector database. It depends on source quality, chunking strategy, metadata, and evaluation discipline.

## Common failure modes

- Outdated source material
- Weak chunk boundaries
- Missing citation patterns
- No feedback loop after launch

## A better approach

Treat RAG as a product system instead of a prompt feature. Track data freshness, test retrieval quality, and review edge cases with actual users.`,
    coverImage: "/images/doctorbotx.webp",
    tags: ["RAG", "Evaluation", "Production AI"],
    publishedAt: "2026-04-05",
    readTime: "3 min read",
    status: "published"
  },
  {
    slug: "from-research-to-shipping-ai-products",
    title: "From Research to Shipping AI Products",
    excerpt:
      "What changes when you move from experiments and papers into systems clients can depend on.",
    content: `# From Research to Shipping AI Products

Research gives us depth. Product work adds constraints. Good AI delivery needs both.

## The transition

Moving from promising results to useful products means caring about latency, maintainability, integration, and user trust.

## What teams need

- Clear scope
- Evidence-based model selection
- Instrumentation
- Rollout plans
- A pathway for iteration after launch

Good delivery is not just about model quality. It is about whether the full workflow works under real pressure.`,
    coverImage: "/images/bokafy.webp",
    tags: ["AI Delivery", "Product Engineering", "Research"],
    publishedAt: "2026-03-28",
    readTime: "4 min read",
    status: "published"
  }
];
