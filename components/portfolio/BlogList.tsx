"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search, Tag } from "lucide-react";
import { resolveImageUrl } from "@/sanity/lib/image";

interface BlogPostItem {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  tags?: string[];
  coverImage?: string;
  mainImage?: any;
}

export default function BlogList({ posts }: { posts: BlogPostItem[] }) {
  const reduced = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="blog-list-container">
      <div className="blog-filter-bar">
        <div className="blog-categories" role="tablist" aria-label="Filter blog posts by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category}
              className={`blog-category-filter-btn ${
                selectedCategory === category ? "is-active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="blog-search-wrap">
          <Search size={18} className="blog-search-icon" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search articles, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="blog-search-input"
            aria-label="Search blog articles"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="blog-search-clear"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="blog-empty-state">
          <p>No articles found matching your criteria.</p>
          <button
            type="button"
            className="pill pill-light"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="blog-all-grid">
          {filteredPosts.map((post, index) => {
            const cover = resolveImageUrl(
              post.mainImage,
              post.coverImage || "/projects/cinemaghar.webp"
            );
            const postDate = new Date(post.publishedAt || Date.now()).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            );

            return (
              <motion.article
                key={post._id || post.slug || index}
                initial={reduced ? false : { y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="blog-card"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="blog-card-media"
                  aria-label={post.title}
                >
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
                  <h2 className="blog-card-title">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="blog-card-tags">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="blog-card-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="blog-card-footer">
                    <Link href={`/blog/${post.slug}`} className="blog-card-link">
                      Read full article <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </div>
  );
}
