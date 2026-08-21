"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitHubUserActivity } from "@/lib/github/types";

interface LiveGitHubSectionProps {
  activity?: GitHubUserActivity;
}

export function LiveGitHubSection({ activity }: LiveGitHubSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 border-b border-[#1F2228] bg-[#0A0C0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#101215] border border-[#1F2228] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono">
          <div className="space-y-2">
            <div className="text-xs text-[#67E8F9] uppercase tracking-widest">
              [02] // CONTINUOUS INTEGRATION & REPOSITORY PIPELINE
            </div>
            <h3 className="text-xl font-bold text-[#F4F4F0] font-sans">
              Automated GitHub REST Activity & Telemetry
            </h3>
            <p className="text-xs text-[#92969D]">
              LATEST COMMIT: &quot;{activity?.latestCommitMessage || "feat: engineering console updates"}&quot; ON &quot;{activity?.latestRepoName || "Sagar-s-Portfolio"}&quot;
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a
              href={`https://github.com/${activity?.username || "alexsagar"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#15171B] border border-[#1F2228] hover:border-[#67E8F9] text-[#F4F4F0] transition-colors"
            >
              OPEN GITHUB PROFILE &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
