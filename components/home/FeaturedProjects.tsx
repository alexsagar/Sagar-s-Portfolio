"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitHubRepository } from "@/lib/github/types";

interface FeaturedProjectsProps {
  repositories?: GitHubRepository[];
}

export function FeaturedProjects({ repositories = [] }: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const featured = repositories.slice(0, 3);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-24 border-b border-[#1F2228] bg-[#070809]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 font-mono">
          <div>
            <div className="text-xs text-[#67E8F9] uppercase tracking-widest mb-2">
              [01] // FEATURED ENGINEERING SYSTEMS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F4F0] tracking-tight font-sans">
              System Implementations & Repositories
            </h2>
          </div>

          <Link
            href="/projects"
            className="text-xs text-[#67E8F9] hover:underline uppercase tracking-wider"
          >
            VIEW ALL REPOSITORIES ({repositories.length}) &rarr;
          </Link>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((repo, idx) => (
            <div
              key={repo.id}
              className="bg-[#101215] border border-[#1F2228] rounded-none p-6 flex flex-col justify-between hover:border-[#67E8F9]/50 transition-colors space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#67E8F9] uppercase">
                    SYS.0{idx + 1} &bull; {repo.primaryLanguage || "TypeScript"}
                  </span>
                  <span className="text-[#92969D]">
                    STARS: {repo.stars} | FORKS: {repo.forks}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#F4F4F0] font-sans">
                    {repo.name}
                  </h3>
                  <p className="text-xs text-[#92969D] mt-2 leading-relaxed font-sans">
                    {repo.description || "Production repository codebase."}
                  </p>
                </div>
              </div>

              <div className="border-t border-[#1F2228] pt-4 font-mono text-xs flex items-center justify-between text-[#92969D]">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4F4F0] transition-colors"
                >
                  SOURCE CODE [GITHUB] &rarr;
                </a>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#67E8F9] hover:underline"
                  >
                    DEMO &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
