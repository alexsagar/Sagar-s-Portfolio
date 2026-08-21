"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { GitHubUserActivity } from "@/lib/github/types";

interface HeroProps {
  activity?: GitHubUserActivity;
}

export function Hero({ activity }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-20 pb-20 border-b border-[#1F2228] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#92969D] border-b border-[#1F2228] pb-4">
          <div className="flex items-center gap-4">
            <span className="text-[#67E8F9]">STATUS: AVAILABLE FOR CONSULTING / ROLES</span>
            <span>{"//"} LOCATION: KATHMANDU (UTC+5:45)</span>
          </div>
          <div>
            STACK: NODE.JS &bull; TYPESCRIPT &bull; NEXT.JS &bull; POSTGRESQL &bull; AWS
          </div>
        </div>

        <div className="max-w-4xl space-y-6">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F4F4F0] leading-[1.08]"
          >
            Engineering scalable web systems with precision.
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl text-[#92969D] max-w-3xl leading-relaxed font-sans"
          >
            Full-Stack Engineer with focus on clean server architecture, high-throughput APIs, revalidated content pipelines, and resilient user interfaces.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 font-mono border-t border-[#1F2228]">
          <div className="space-y-1">
            <div className="text-xs text-[#92969D]">EXPERIENCE LEVEL</div>
            <div className="text-2xl font-bold text-[#F4F4F0]">Senior / Full-Stack</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-[#92969D]">PUBLIC REPOSITORIES</div>
            <div className="text-2xl font-bold text-[#67E8F9]">{activity?.publicReposCount || 18}+</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-[#92969D]">DATABASE ARCHITECTURE</div>
            <div className="text-2xl font-bold text-[#F4F4F0]">PostgreSQL / MongoDB</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-[#92969D]">DEPLOYMENT VERIFICATION</div>
            <div className="text-2xl font-bold text-[#F4F4F0]">Strict CI/CD & ISR</div>
          </div>
        </div>
      </div>
    </section>
  );
}
