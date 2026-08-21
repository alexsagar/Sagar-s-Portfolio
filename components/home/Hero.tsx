"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { HoverBorderGradient } from "@/components/ui/HoverBorder";
import GridGlobe from "@/components/ui/GridGlobe";
import { GitHubUserActivity } from "@/lib/github/types";

interface HeroProps {
  activity?: GitHubUserActivity;
}

export function Hero({ activity }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (metricsRef.current) {
        gsap.from(metricsRef.current.children, {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.3,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex flex-col justify-between pt-16 pb-20 border-b border-[#1F2228] overflow-hidden bg-[#070809]"
    >
      {/* Aceternity Spotlight Beams */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#67E8F9" />
      <Spotlight className="top-10 left-full md:left-2/3" fill="#8B5CF6" />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto space-y-12">
        {/* Authentic Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#92969D] border-b border-[#1F2228] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-[#F4F4F0] font-bold">SAGAR NEPALI</span>
            <span>&bull;</span>
            <span>Kathmandu, Nepal</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Full-Stack Software Engineer</span>
          </div>
        </div>

        {/* Hero Split: Left Typography + Right Interactive 3D World Globe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Calls to Action */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-block px-3 py-1 rounded-full bg-[#101215] border border-[#1F2228] text-xs font-mono text-[#67E8F9]">
              SOFTWARE ENGINEERING & ARCHITECTURE
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F4F4F0] leading-[1.05] font-sans">
                Building scalable web applications & infrastructure.
              </h1>

              <div className="text-base sm:text-lg text-[#92969D] max-w-2xl font-sans leading-relaxed">
                <TextGenerateEffect words="Specializing in React, Next.js, Node.js, PostgreSQL, and modern web application development with clean architectural patterns." />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs pt-4">
              <Link href="/projects">
                <HoverBorderGradient
                  containerClassName="rounded-lg"
                  className="bg-[#070809] text-[#F4F4F0] flex items-center gap-2 px-6 py-3 font-bold"
                >
                  <span>VIEW PROJECTS ({activity?.publicReposCount || 18})</span>
                  <span className="text-[#67E8F9]">&rarr;</span>
                </HoverBorderGradient>
              </Link>

              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-lg bg-[#101215] border border-[#1F2228] hover:border-[#67E8F9] text-[#F4F4F0] transition-colors"
              >
                GET IN TOUCH &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Three.js Interactive 3D World Globe Canvas Container */}
          <div className="lg:col-span-5 h-[340px] sm:h-[420px] w-full rounded-2xl bg-gradient-to-b from-[#101215] to-[#0A0C0E] border border-[#1F2228] overflow-hidden relative shadow-2xl flex flex-col justify-between p-6">
            <div className="flex items-center justify-between font-mono text-xs text-[#92969D] z-10">
              <span className="text-[#67E8F9]">GLOBAL REPOSITORIES</span>
              <span>GITHUB INTEGRATION</span>
            </div>

            {/* WebGL Globe Render */}
            <div className="absolute inset-0 z-0">
              <GridGlobe />
            </div>

            <div className="z-10 font-mono text-[11px] text-[#92969D] bg-[#070809]/80 backdrop-blur-sm p-3 rounded border border-[#1F2228] flex justify-between">
              <span>FEATURED WORK</span>
              <span className="text-[#F4F4F0]">{activity?.featuredRepos?.length || 6} Repositories</span>
            </div>
          </div>
        </div>

        {/* Bottom Technical Core Stack Bar */}
        <div
          ref={metricsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#1F2228] font-mono"
        >
          <div className="space-y-1 bg-[#101215] border border-[#1F2228] p-4 rounded-lg">
            <div className="text-[11px] text-[#92969D]">FRONTEND</div>
            <div className="text-sm font-bold text-[#F4F4F0]">React &bull; Next.js &bull; TypeScript</div>
          </div>
          <div className="space-y-1 bg-[#101215] border border-[#1F2228] p-4 rounded-lg">
            <div className="text-[11px] text-[#92969D]">BACKEND & DATABASES</div>
            <div className="text-sm font-bold text-[#67E8F9]">Node.js &bull; PostgreSQL &bull; MongoDB</div>
          </div>
          <div className="space-y-1 bg-[#101215] border border-[#1F2228] p-4 rounded-lg">
            <div className="text-[11px] text-[#92969D]">GRAPHICS & SCROLL</div>
            <div className="text-sm font-bold text-[#F4F4F0]">Three.js &bull; GSAP &bull; Lenis</div>
          </div>
          <div className="space-y-1 bg-[#101215] border border-[#1F2228] p-4 rounded-lg">
            <div className="text-[11px] text-[#92969D]">CMS & INFRASTRUCTURE</div>
            <div className="text-sm font-bold text-[#F4F4F0]">Payload CMS &bull; REST APIs</div>
          </div>
        </div>
      </div>
    </section>
  );
}
