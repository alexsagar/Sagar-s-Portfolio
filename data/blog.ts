export interface BlogPost {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  coverImage?: string;
  mainImage?: any;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "The 2026 Guide to Modern Website Development & Digital Marketing in Nepal",
    slug: "website-development-digital-marketing-nepal",
    category: "Website Development",
    excerpt: "Why modern businesses in Kathmandu need lightning-fast, conversion-focused websites paired with strategic multi-channel digital marketing.",
    publishedAt: "2026-09-15T09:00:00Z",
    readTime: "6 min read",
    tags: ["Website Development", "Digital Marketing", "Next.js", "SEO Nepal"],
    featured: true,
    coverImage: "/projects/cinemaghar.webp",
    content: [
      "In Nepal’s rapidly evolving digital economy, simply having a generic social media page or an outdated static website is no longer enough to win customer trust and capture high-value leads.",
      "Modern website development demands high-performance tech stacks like Next.js, React, and Tailwind CSS that achieve sub-second page loads, mobile responsiveness, and zero cumulative layout shift. When search engines like Google evaluate your site, user experience (Core Web Vitals) directly impacts whether you appear on page 1 or page 5.",
      "Pairing modern development with data-backed digital marketing—including meta performance ads, Google Ads, local SEO, and content storytelling—creates an organic flywheel that converts casual visitors into loyal paying clients."
    ],
  },
  {
    id: "post-2",
    title: "How Local SEO & Search Visibility Scale Businesses in Kathmandu",
    slug: "local-seo-search-visibility-kathmandu",
    category: "SEO Strategy",
    excerpt: "Actionable local SEO strategies to dominate Google search results, capture high-intent local queries, and outrank competitors in Nepal.",
    publishedAt: "2026-09-02T11:30:00Z",
    readTime: "5 min read",
    tags: ["SEO Specialist", "Local SEO", "Google Search", "Kathmandu Business"],
    featured: true,
    coverImage: "/projects/teantea.webp",
    content: [
      "Search Engine Optimization (SEO) in Nepal has graduated from keyword stuffing to semantic relevance, structured entity data, and authority building.",
      "For companies operating in Kathmandu, optimizing for local search intent means establishing clear Google Business Profile signals, Schema.org LocalBusiness markup, high-speed mobile architecture, and consistent NAP (Name, Address, Phone) citations across local directories.",
      "By answering the specific questions your prospective clients are typing into Google, your website becomes an automated, 24/7 lead generation engine that compounds in value over time."
    ],
  },
  {
    id: "post-3",
    title: "Maximizing ROI with Video Editing and Performance Marketing",
    slug: "video-editing-performance-marketing-roi",
    category: "Digital Marketing",
    excerpt: "How compelling video storytelling and creative post-production elevate paid social media advertising campaigns into high-converting revenue drivers.",
    publishedAt: "2026-08-20T14:15:00Z",
    readTime: "4 min read",
    tags: ["Video Editing", "Performance Marketing", "Social Media Ads", "Meta Ads"],
    featured: true,
    coverImage: "/projects/gamepasal.webp",
    content: [
      "Attention is the new currency. In today’s crowded social feeds across TikTok, Instagram Reels, and YouTube, the first 3 seconds of a video determine whether an ad generates a click or gets scrolled past.",
      "Combining professional post-production (using tools like Adobe Premiere and After Effects) with rigorous performance marketing metrics allows you to test creative hooks, retention rates, and click-through rates systematically.",
      "Great editing isn't just about flashy visual effects—it’s about clarity, pacing, and guiding the viewer directly toward a clear call-to-action."
    ],
  },
];
