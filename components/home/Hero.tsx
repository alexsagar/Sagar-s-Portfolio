import React from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Terminal, Activity, GitCommit, MapPin } from "lucide-react";
import { GitHubUserActivity } from "@/lib/github/types";

interface HeroProps {
  activity: GitHubUserActivity;
}

export function Hero({ activity }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-[#1A1D23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Positioning */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101215] border border-[#1F2228] font-mono text-xs text-[#92969D]">
              <MapPin className="w-3.5 h-3.5 text-[#67E8F9]" />
              <span>Kathmandu, Nepal</span>
              <span className="text-[#1F2228]">|</span>
              <span className="text-[#F4F4F0]">Full-Stack Software Engineer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F4F4F0] leading-[1.1]">
              I build digital products <br className="hidden sm:inline" />
              from <span className="text-[#67E8F9] font-mono">idea ? production.</span>
            </h1>

            <p className="text-lg text-[#92969D] max-w-xl font-normal leading-relaxed">
              Full-stack developer building fast, scalable and thoughtfully designed web applications. Specializing in modern React, Next.js, Node.js, and PostgreSQL architectures.
            </p>

            {/* Stack Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Payload CMS"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-[#101215] border border-[#1F2228] font-mono text-xs text-[#92969D]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#F4F4F0] text-[#070809] font-mono font-semibold text-sm hover:bg-[#67E8F9] transition-colors"
              >
                <span>View my work</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href="https://github.com/alexsagar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#101215] border border-[#1F2228] text-[#F4F4F0] font-mono text-sm hover:border-[#67E8F9]/50 transition-colors"
              >
                <Github className="w-4 h-4 text-[#67E8F9]" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Right Column: Developer Status Panel */}
          <div className="lg:col-span-5">
            <div className="bg-[#101215] border border-[#1F2228] rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
              
              {/* Console Bar */}
              <div className="bg-[#15171B] border-b border-[#1F2228] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#67E8F9]" />
                  <span className="text-[#F4F4F0] font-semibold">sagar@dev</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
              </div>

              {/* Console Body */}
              <div className="p-5 space-y-4">
                
                {/* Status Field */}
                <div>
                  <div className="text-[#92969D] text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-[#10B981]" />
                    <span>STATUS</span>
                  </div>
                  <div className="text-[#F4F4F0] font-medium flex items-center gap-2 bg-[#15171B] px-3 py-2 rounded border border-[#1F2228]">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span>Shipping production code</span>
                  </div>
                </div>

                {/* Currently Building */}
                <div>
                  <div className="text-[#92969D] text-[11px] uppercase tracking-wider mb-1">CURRENTLY BUILDING</div>
                  <div className="text-[#67E8F9] font-medium bg-[#15171B] px-3 py-2 rounded border border-[#1F2228]">
                    SajiloKhata & Portfolio v2 Architecture
                  </div>
                </div>

                {/* Latest Commit */}
                <div>
                  <div className="text-[#92969D] text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <GitCommit className="w-3 h-3 text-[#8B5CF6]" />
                    <span>LATEST COMMIT</span>
                  </div>
                  <div className="text-[#F4F4F0] bg-[#15171B] px-3 py-2 rounded border border-[#1F2228] space-y-1">
                    <div className="text-[#92969D] truncate">{activity.latestCommitMessage}</div>
                    <div className="text-[10px] text-[#8B5CF6] flex items-center justify-between">
                      <span>repo: {activity.latestRepoName}</span>
                      <span>synced live</span>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-[#15171B] p-3 rounded border border-[#1F2228]">
                    <div className="text-[#92969D] text-[10px] uppercase">GITHUB REPOS</div>
                    <div className="text-lg font-bold text-[#F4F4F0] mt-0.5">{activity.publicReposCount}+</div>
                  </div>
                  <div className="bg-[#15171B] p-3 rounded border border-[#1F2228]">
                    <div className="text-[#92969D] text-[10px] uppercase">PRIMARY STACK</div>
                    <div className="text-xs font-semibold text-[#67E8F9] mt-1 truncate">Next.js / Node / PG</div>
                  </div>
                </div>

              </div>

              {/* Console Footer */}
              <div className="bg-[#15171B] border-t border-[#1F2228] px-4 py-2 text-[10px] text-[#92969D] flex justify-between items-center">
                <span>SYSTEM: ONLINE</span>
                <span className="text-[#67E8F9]">VERCEL V2 API READY</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
