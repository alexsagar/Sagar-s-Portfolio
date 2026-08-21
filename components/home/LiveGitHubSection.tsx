import React from "react";
import { GitBranch, GitCommit, Terminal, Activity, ArrowUpRight } from "lucide-react";
import { fetchGitHubOverview } from "@/lib/github/repositories";
import { GitHubUserActivity } from "@/lib/github/types";

interface LiveGitHubSectionProps {
  activity?: GitHubUserActivity;
}

export async function LiveGitHubSection({ activity }: LiveGitHubSectionProps) {
  const github = activity || (await fetchGitHubOverview());

  return (
    <section className="py-16 border-b border-[#1A1D23] bg-[#0A0C0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#101215] border border-[#1F2228] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="font-mono text-xs text-[#67E8F9] uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>LIVE GITHUB REPOSITORY SYNC</span>
            </div>
            <h3 className="text-xl font-bold text-[#F4F4F0]">
              Active Developer Pipeline & System Activity
            </h3>
            <p className="text-xs font-mono text-[#92969D]">
              Latest commit: <span className="text-[#F4F4F0]">&quot;{github.latestCommitMessage}&quot;</span> on repo <span className="text-[#67E8F9]">{github.latestRepoName}</span>
            </p>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <div className="border-r border-[#1F2228] pr-6 text-right hidden sm:block">
              <div className="text-[#92969D]">PUBLIC REPOS</div>
              <div className="text-2xl font-bold text-[#F4F4F0]">{github.publicReposCount}</div>
            </div>

            <a
              href={`https://github.com/${github.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-[#15171B] hover:bg-[#1A1D23] border border-[#1F2228] hover:border-[#67E8F9]/50 text-[#F4F4F0] flex items-center gap-2 transition-all group"
            >
              <GitBranch className="w-4 h-4 text-[#67E8F9]" />
              <span>VIEW GITHUB PROFILE</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#92969D] group-hover:text-[#F4F4F0]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
