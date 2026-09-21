"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { SiAdobephotoshop, SiAdobeaftereffects, SiSemrush, SiGoogleads } from "react-icons/si";
import { testimonials as defaultTestimonials, workExperience } from "@/data";
import { blogPosts as defaultBlogPosts } from "@/data/blog";
import { services } from "@/data/services";
import { resolveImageUrl } from "@/sanity/lib/image";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { ProjectGallery, type ProjectItem } from "./ProjectGallery";
import AnimatedSection from "./AnimatedSection";
import CreativeHero from "./CreativeHero";
import MoldReveal from "./MoldReveal";

interface TestimonialItem {
  _id?: string;
  name: string;
  title: string;
  quote: string;
}

interface ClientItem {
  _id?: string;
  id?: string;
  name: string;
  subtitle?: string;
  logo?: any;
  content?: React.ReactNode;
}

function Testimonials({ items }: { items?: TestimonialItem[] }) {
  const clientQuotes = items && items.length > 0
    ? items
    : [defaultTestimonials[0], defaultTestimonials[2]];
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const move = useCallback((dir: number) => {
    setDirection(dir);
    setActive(current => (current + dir + clientQuotes.length) % clientQuotes.length);
  }, [clientQuotes.length]);

  // Auto-advance every 5 seconds, pause on hover / drag
  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => move(1), 5000);
    return () => clearInterval(id);
  }, [paused, reduced, move]);

  const quote = clientQuotes[active];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <AnimatedSection className="testimonial-section wrap" aria-label="Client testimonials">
      <div className="testimonial-top">
        <span className="section-label">Kind words</span>
        <span>From the people I've worked with</span>
      </div>
      <motion.div
        className="testimonial-body"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragStart={() => setPaused(true)}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 50) move(info.offset.x < 0 ? 1 : -1);
          setTimeout(() => setPaused(false), 800);
        }}
        onHoverStart={() => setPaused(true)}
        onHoverEnd={() => setPaused(false)}
      >
        <span className="quote-mark" aria-hidden="true">"</span>
        <div aria-live="polite" aria-atomic="true" style={{ position: 'relative', overflow: 'hidden', minHeight: '260px' }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={active}
              custom={direction}
              variants={reduced ? undefined : variants}
              initial={reduced ? false : "enter"}
              animate="center"
              exit={reduced ? undefined : "exit"}
              transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
            >
              <blockquote>{quote.quote}</blockquote>
              <p className="quote-person">
                {quote.name}
                <span>{quote.title}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      <div className="quote-controls">
        <span>
          {String(active + 1).padStart(2, "0")} / {String(clientQuotes.length).padStart(2, "0")}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Progress dots */}
          <div className="testimonial-dots">
            {clientQuotes.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot${i === active ? ' is-active' : ''}`}
                onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); setPaused(true); setTimeout(() => setPaused(false), 6000); }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <div>
            <button onClick={() => { move(-1); setPaused(true); setTimeout(() => setPaused(false), 6000); }} aria-label="Previous testimonial">
              <ArrowLeft />
            </button>
            <button onClick={() => { move(1); setPaused(true); setTimeout(() => setPaused(false), 6000); }} aria-label="Next testimonial">
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function BlogSection({ posts }: { posts?: any[] }) {
  const reduced = useReducedMotion();
  const items = posts && posts.length > 0 ? posts : defaultBlogPosts;

  return (
    <AnimatedSection id="blog" className="blog-section wrap" aria-label="Insights and guides">
      <div className="section-title">
        <span className="section-label">Insights & guides</span>
        <h2>Digital Marketing &<br />Website Strategy</h2>
        <p className="blog-section-subtitle">
          Actionable perspectives on search visibility, modern web engineering, and creative marketing for businesses in Nepal and beyond.
        </p>
      </div>

      <div className="blog-grid">
        {items.slice(0, 3).map((post, index) => {
          const cover = resolveImageUrl(post.mainImage, post.coverImage || "/projects/cinemaghar.webp");
          const postDate = new Date(post.publishedAt || Date.now()).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return (
            <motion.article
              key={post._id || post.slug || index}
              initial={reduced ? false : { y: 35, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="blog-card"
            >
              <Link href={`/blog/${post.slug}`} className="blog-card-media" aria-label={post.title}>
                <Image
                  src={cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="blog-card-image"
                />
                <span className="blog-category-badge">{post.category}</span>
              </Link>
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <time dateTime={post.publishedAt}>{postDate}</time>
                  <span>•</span>
                  <span>{post.readTime || "5 min read"}</span>
                </div>
                <h3 className="blog-card-title">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-footer">
                  <Link href={`/blog/${post.slug}`} className="blog-card-link">
                    Read article <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="blog-section-action">
        <Link href="/blog" className="pill pill-light">
          View all insights & guides <ArrowUpRight size={22} />
        </Link>
      </div>
    </AnimatedSection>
  );
}

function ClosingScene() {
  const scene = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: scene, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.25, 1.5]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-25, 35]);

  return (
    <section ref={scene} className="closing-scene" aria-labelledby="closing-heading">
      <div className="closing-sticky">
        <motion.div className="closing-orb" aria-hidden="true" style={reduced ? {} : { scale, rotate }} />
        <div className="closing-content">
          <p>Good ideas deserve to be seen.</p>
          <h2 id="closing-heading">Make your<br />next move.</h2>
          <Link href="/contact" className="pill pill-light">
            Say hello <ArrowUpRight size={22} />
          </Link>
          <p className="closing-caption">
            A website. A story. A fresh perspective.<br />
            Let’s make something that’s yours.
          </p>
        </div>
      </div>
    </section>
  );
}

const defaultClientPartners = [
  { id: "hypead", content: <span>Hype<span className="partner-ad">AD</span></span> },
  { id: "mindrisers", content: <span className="partner-mind">mindrisers<span>Learn. Build. Grow.</span></span> },
  { id: "duo", content: <span className="partner-duo">DUO<span>NEPAL</span></span> },
  { id: "babylon", content: <span className="partner-babylon">Babylon<span>National School</span></span> },
  { id: "streamstop", content: <span className="partner-stream">streamstop<span>↗</span></span> },
  {
    id: "dai",
    content: (
      <div className="partner-stacked-item">
        <Image
          src="/clients/da-investment-clean.png"
          alt="DAI"
          width={84}
          height={38}
          loading="lazy"
          className="partner-emblem-top"
        />
        <span className="partner-stacked-title">DA Investment</span>
        <span className="partner-stacked-sub">PVT. LTD.</span>
      </div>
    ),
  },
  {
    id: "dd",
    content: (
      <div className="partner-stacked-item">
        <Image
          src="/clients/dd-security-clean.png"
          alt="DD Security"
          width={44}
          height={44}
          loading="lazy"
          className="partner-emblem-top"
        />
        <span className="partner-stacked-title">DD Security</span>
        <span className="partner-stacked-sub">SERVICE</span>
      </div>
    ),
  },
  {
    id: "seven",
    content: (
      <div className="partner-stacked-item">
        <Image
          src="/clients/seven-seas-clean.png"
          alt="Seven Seas"
          width={40}
          height={42}
          loading="lazy"
          className="partner-emblem-top"
        />
        <span className="partner-stacked-title">Seven Seas</span>
        <span className="partner-stacked-sub">INTERCONTINENTAL</span>
      </div>
    ),
  },
  {
    id: "itti",
    content: (
      <span className="partner-itti">
        <Image
          src="/clients/itti-dark.svg"
          alt="ITTI"
          width={118}
          height={48}
          loading="lazy"
          className="partner-logo-img"
        />
      </span>
    ),
  },
];

function cleanBrandTitle(name: string, subtitle?: string): string {
  if (!subtitle) return name;
  const subLower = subtitle.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (subLower.includes("pvtltd") || subLower.includes("privatelimited")) {
    return name.replace(/\s*(pvt\.?\s*ltd\.?|private\s+limited)/i, "").trim();
  }
  if (subLower === "service" || subLower === "services") {
    return name.replace(/\s*services?/i, "").trim();
  }
  if (subLower === "intercontinental") {
    return name.replace(/\s*intercontinental/i, "").trim();
  }
  return name;
}

export default function Portfolio({
  sanityProjects,
  sanityClients,
  sanityTestimonials,
  sanityPosts,
}: {
  sanityProjects?: ProjectItem[];
  sanityClients?: ClientItem[];
  sanityTestimonials?: TestimonialItem[];
  sanityPosts?: any[];
}) {
  const reduced = useReducedMotion();

  // Combine Sanity clients or fallback to default
  const activeClients = (sanityClients && sanityClients.length > 0)
    ? sanityClients.map(c => {
        const imgSrc = c.logo ? resolveImageUrl(c.logo) : "";
        const isSvg = imgSrc.includes(".svg");
        const cleanTitle = cleanBrandTitle(c.name, c.subtitle);
        const isPureLogo = cleanTitle.toUpperCase() === "ITTI" || (!c.subtitle && imgSrc && cleanTitle.length <= 4);

        if (isPureLogo && imgSrc) {
          return {
            id: c._id || c.id || c.name,
            content: (
              <span className="partner-itti">
                <Image
                  src={imgSrc}
                  alt={c.name}
                  width={118}
                  height={48}
                  unoptimized={isSvg}
                  loading="lazy"
                  className="partner-logo-img"
                />
              </span>
            ),
          };
        }

        return {
          id: c._id || c.id || c.name,
          content: (
            <div className="partner-stacked-item">
              {imgSrc ? (
                <Image
                  src={imgSrc}
                  alt={c.name}
                  width={84}
                  height={42}
                  unoptimized={isSvg}
                  loading="lazy"
                  className="partner-emblem-top"
                />
              ) : null}
              <span className="partner-stacked-title">{cleanTitle}</span>
              {c.subtitle && <span className="partner-stacked-sub">{c.subtitle}</span>}
            </div>
          ),
        };
      })
    : defaultClientPartners;

  return (
    <div id="top" className="creative-site">
      <SiteHeader />
      <main id="main">
        <CreativeHero />

        <AnimatedSection id="services" className="services-section">
          <div className="wrap">
            <span className="section-label">What I do</span>
            <h2 className="sr-only">My services</h2>
            <div className="services-list">
              {services.map((service, index) => (
                <details key={service.name} className="service-row">
                  <summary>
                    <motion.span
                      className="service-mask"
                      initial={reduced ? false : "hidden"}
                      whileInView="show"
                      viewport={{ once: true, amount: 0.4 }}
                    >
                      <motion.span
                        variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                      >
                        {service.name}
                      </motion.span>
                    </motion.span>
                    <Plus aria-hidden="true" />
                    <motion.span
                      className="service-rule"
                      aria-hidden="true"
                      initial={reduced ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 + 0.15 }}
                    />
                  </summary>
                  <div className="service-detail">
                    <p>{service.description}</p>
                    <span>{service.tags}</span>
                    <Link href={`/contact?service=${encodeURIComponent(service.name)}`}>
                      Let’s talk about it <ArrowUpRight size={20} />
                    </Link>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="partners-section" aria-label="Clients and collaborators">
          <div className="wrap">
            <h2>Clients, collaborators and friends :)</h2>
          </div>
          <div className="partners-marquee-wrap">
            <div className="partners-marquee-track">
              {[...activeClients, ...activeClients].map((partner, index) => (
                <div className="partner-marquee-item" key={`${partner.id}-${index}`}>
                  {partner.content}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <section id="projects" className="projects-section wrap">
          <ProjectGallery items={sanityProjects} />
        </section>

        <section id="about" className="about-section">
          <MoldReveal />
          <div className="wrap">
            <div className="about-grid">
              <div className="about-photo">
                <Image
                  src="/profilepic.webp"
                  width={550}
                  height={620}
                  alt="Sagar Nepali"
                  loading="lazy"
                  decoding="async"
                />
                <span>Kathmandu, Nepal ↗</span>
              </div>
              <div className="about-copy">
                <h3>
                  I’m Sagar.<br />
                  Your creative collaborator.
                </h3>
                <p>
                  I bring websites, images, videos, and marketing together to help businesses tell their story.
                  Based in Kathmandu, I combine a developer’s attention to detail with a marketer’s understanding of what makes people connect.
                </p>
                <p>
                  From designing a website to editing your next video or improving your visibility in search,
                  I enjoy turning an idea into something people can see, use, and remember.
                </p>
                <Link className="text-link" href="/contact">
                  Have an idea? Let’s hear it <ArrowUpRight />
                </Link>
              </div>
            </div>

            <div className="experience-list">
              <h3>Along the way</h3>
              {workExperience.map((experience) => (
                <motion.div
                  initial={reduced ? false : { x: 40, opacity: 0.3 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="experience-row"
                  key={experience.id}
                >
                  <h4>{experience.title}</h4>
                  <p>{experience.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials items={sanityTestimonials} />

        <AnimatedSection id="toolbox" className="toolbox-section wrap">
          <div className="section-title">
            <span className="section-label">Tools & skills</span>
            <h2>My creative<br />toolbox</h2>
          </div>
          <div className="toolbox-grid">
            {[
              { label: "React", icon: "/re.svg" },
              { label: "Next.js", icon: "/next.svg" },
              { label: "Tailwind CSS", icon: "/tail.svg" },
              { label: "TypeScript", icon: "/ts.svg" },
              { label: "Photo editing", Glyph: SiAdobephotoshop, color: "#31A8FF" },
              { label: "Video editing", Glyph: SiAdobeaftereffects, color: "#9999FF" },
              { label: "Digital marketing", Glyph: SiGoogleads, color: "#4285F4" },
              { label: "SEO", Glyph: SiSemrush, color: "#FF642D" },
            ].map((tool, index) => (
              <motion.div
                initial={reduced ? false : { y: 70, rotate: index % 2 ? 12 : -12, opacity: 0.2 }}
                whileInView={{ y: 0, rotate: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 90, damping: 14, delay: index * 0.055 }}
                className="tool-item"
                key={tool.label}
              >
                <div className="tool-icon">
                  {tool.icon ? (
                    <Image src={tool.icon} alt="" width={62} height={62} loading="lazy" />
                  ) : tool.Glyph ? (
                    <tool.Glyph aria-hidden="true" style={tool.color ? { color: tool.color } : undefined} />
                  ) : null}
                </div>
                <span>{tool.label}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <BlogSection posts={sanityPosts} />

        <ClosingScene />
      </main>
      <SiteFooter />
    </div>
  );
}
