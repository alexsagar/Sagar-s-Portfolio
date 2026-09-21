import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Tag, User } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { SiteHeader, SiteFooter } from "@/components/portfolio/SiteChrome";
import { sanityFetch } from "@/sanity/lib/client";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import { resolveImageUrl } from "@/sanity/lib/image";
import { blogPosts as defaultBlogPosts, type BlogPost } from "@/data/blog";

export const revalidate = 60;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: postSlugsQuery,
    tags: ["post"],
  }).catch(() => []);

  if (slugs && slugs.length > 0) {
    return slugs.map((slug) => ({ slug }));
  }

  return defaultBlogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Article Not Found | Sagar Nepali",
      description: "The requested blog article could not be found.",
    };
  }

  const coverUrl = resolveImageUrl(
    post.mainImage,
    post.coverImage || "/projects/cinemaghar.webp"
  );
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sagar-nepali.com.np";
  const absoluteCover = coverUrl.startsWith("http") ? coverUrl : `${siteUrl}${coverUrl}`;

  return {
    title: `${post.title} | Sagar Nepali`,
    description: post.excerpt,
    keywords: post.tags || [
      "Digital Marketing Nepal",
      "Website Development Nepal",
      "SEO Specialist Kathmandu",
      "Sagar Nepali",
    ],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Sagar Nepali"],
      images: [
        {
          url: absoluteCover,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [absoluteCover],
    },
  };
}

async function getPost(slug: string) {
  const sanityPost = await sanityFetch<any>({
    query: postBySlugQuery,
    params: { slug },
    tags: [`post:${slug}`, "post"],
  }).catch(() => null);

  if (sanityPost) return sanityPost;
  return defaultBlogPosts.find((p) => p.slug === slug) || null;
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imgUrl = resolveImageUrl(value);
      if (!imgUrl) return null;
      return (
        <figure className="article-figure">
          <div className="article-figure-media">
            <Image
              src={imgUrl}
              alt={value.alt || "Article illustration"}
              width={900}
              height={500}
              className="article-body-image"
            />
          </div>
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => <h2 className="article-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="article-h3">{children}</h3>,
    h4: ({ children }) => <h4 className="article-h4">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="article-blockquote">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="article-p">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="article-ul">{children}</ul>,
    number: ({ children }) => <ol className="article-ol">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target ? "noopener noreferrer" : undefined}
          className="article-link"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const coverUrl = resolveImageUrl(
    post.mainImage,
    post.coverImage || "/projects/cinemaghar.webp"
  );
  const postDate = new Date(post.publishedAt || Date.now()).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sagar-nepali.com.np";
  const absoluteCover = coverUrl.startsWith("http") ? coverUrl : `${siteUrl}${coverUrl}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteCover,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: "Sagar Nepali",
      url: siteUrl,
      jobTitle: "Digital Marketer & Full-Stack Web Developer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
    },
    publisher: {
      "@type": "Person",
      name: "Sagar Nepali",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags ? post.tags.join(", ") : undefined,
  };

  return (
    <div id="top" className="creative-site blog-article-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <main id="main" className="wrap blog-article-main">
        <div className="article-back-nav">
          <Link href="/blog" className="article-back-link">
            <ArrowLeft size={18} />
            <span>Back to all insights</span>
          </Link>
        </div>

        <article className="article-container">
          <header className="article-header">
            <div className="article-meta-top">
              <span className="blog-category-badge">{post.category}</span>
              <div className="article-meta-item">
                <Calendar size={15} aria-hidden="true" />
                <time dateTime={post.publishedAt}>{postDate}</time>
              </div>
              <div className="article-meta-item">
                <Clock size={15} aria-hidden="true" />
                <span>{post.readTime || "5 min read"}</span>
              </div>
            </div>

            <h1 className="article-title">{post.title}</h1>

            <p className="article-lead">{post.excerpt}</p>

            <div className="article-author-row">
              <div className="article-author-avatar">
                <Image
                  src="/profilepic.webp"
                  alt="Sagar Nepali"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div className="article-author-info">
                <span className="article-author-name">Sagar Nepali</span>
                <span className="article-author-role">
                  Digital Marketer & Web Developer • Kathmandu, Nepal
                </span>
              </div>
            </div>
          </header>

          <div className="article-cover-wrap">
            <Image
              src={coverUrl}
              alt={post.title}
              width={1200}
              height={650}
              priority
              className="article-cover-img"
            />
          </div>

          <div className="article-body">
            {post.body && Array.isArray(post.body) && post.body.length > 0 ? (
              <PortableText value={post.body} components={portableTextComponents} />
            ) : post.content && Array.isArray(post.content) ? (
              post.content.map((paragraph: string, idx: number) => (
                <p key={idx} className="article-p">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="article-p">{post.excerpt}</p>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <footer className="article-tags-wrap">
              <span className="article-tags-label">
                <Tag size={16} /> Related Topics:
              </span>
              <div className="article-tags-list">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="article-tag-item">
                    #{tag}
                  </span>
                ))}
              </div>
            </footer>
          )}

          <div className="article-author-bio-card">
            <div className="bio-photo">
              <Image
                src="/profilepic.webp"
                alt="Sagar Nepali"
                width={80}
                height={80}
                className="bio-img"
              />
            </div>
            <div className="bio-content">
              <h3>Written by Sagar Nepali</h3>
              <p>
                Based in Kathmandu, Nepal, I partner with forward-thinking businesses,
                startups, and creators to deliver high-performance web development,
                data-driven digital marketing campaigns, and technical SEO architecture.
              </p>
              <div className="bio-links">
                <Link href="/contact" className="pill pill-light">
                  Work with Sagar <ArrowUpRight size={18} />
                </Link>
                <Link href="/projects" className="bio-secondary-link">
                  View recent projects <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
