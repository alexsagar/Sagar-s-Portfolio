import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/portfolio/SiteChrome";
import BlogList from "@/components/portfolio/BlogList";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { blogPosts as defaultBlogPosts } from "@/data/blog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog & Strategy Guides | Digital Marketing & Website Development | Sagar Nepali",
  description:
    "Expert perspectives on modern website development, digital marketing campaigns, local SEO, and video editing for businesses in Kathmandu, Nepal and beyond.",
  keywords: [
    "Digital Marketing Nepal",
    "Website Development Nepal",
    "SEO Specialist Kathmandu",
    "Web Developer Nepal",
    "Performance Marketing Kathmandu",
    "Local SEO Nepal",
    "Video Editing Kathmandu",
    "Sagar Nepali Blog",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog & Strategy Guides | Digital Marketing & Website Development | Sagar Nepali",
    description:
      "Expert perspectives on modern website development, digital marketing campaigns, local SEO, and video editing for businesses in Kathmandu, Nepal and beyond.",
    url: "https://sagar-nepali.com.np/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const sanityPosts = await sanityFetch<any[]>({
    query: postsQuery,
    tags: ["post"],
  }).catch(() => null);

  const posts = sanityPosts && sanityPosts.length > 0 ? sanityPosts : defaultBlogPosts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Sagar Nepali - Digital Marketing & Website Development Blog",
    url: "https://sagar-nepali.com.np/blog",
    description:
      "Practical guides and technical playbooks on digital marketing, website development, local SEO, and video post-production by Sagar Nepali.",
    author: {
      "@type": "Person",
      name: "Sagar Nepali",
      jobTitle: "Digital Marketer & Full-Stack Web Developer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `https://sagar-nepali.com.np/blog/${post.slug}`,
      datePublished: post.publishedAt,
    })),
  };

  return (
    <div id="top" className="creative-site blog-page-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <main id="main" className="wrap blog-index-main">
        <header className="page-intro blog-index-header">
          <span className="section-label">Insights & Strategy</span>
          <h1>Digital Marketing, Web Development & SEO</h1>
          <p>
            In-depth guides, technical breakdowns, and growth playbooks tailored for
            businesses looking to scale their digital footprint from Kathmandu to the world.
          </p>
        </header>

        <BlogList posts={posts} />

        <section className="blog-cta-banner">
          <div className="blog-cta-content">
            <h2>Ready to transform your digital presence?</h2>
            <p>
              Whether you need a custom high-performance website or a targeted digital marketing strategy,
              I help your brand turn traffic into lasting relationships.
            </p>
            <Link href="/contact" className="pill pill-light">
              Let’s talk about your project <ArrowUpRight size={20} />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
