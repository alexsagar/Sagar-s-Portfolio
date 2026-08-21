import React from "react";
import Link from "next/link";
import { FolderGit2, Star, GitFork, ExternalLink, ArrowUpRight } from "lucide-react";
import { fetchUserRepositories } from "@/lib/github/repositories";
import { GitHubRepository } from "@/lib/github/types";

interface FeaturedProjectsProps {
  repositories?: GitHubRepository[];
}

export async function FeaturedProjects({ repositories }: FeaturedProjectsProps) {
  const repos = repositories || (await fetchUserRepositories());
  const featured = repos.slice(0, 3);

  return (
    <section id="projects" className="py-24 border-b border-[#1A1D23] bg-[#070809]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-[#67E8F9] uppercase tracking-widest mb-2 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4" />
              <span>FEATURED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F4F0] tracking-tight">
              Selected Engineering Projects
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#67E8F9] hover:underline group"
          >
            <span>VIEW ALL PROJECTS ({repos.length})</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((repo) => (
            <div
              key={repo.id}
              className="bg-[#101215] border border-[#1F2228] rounded-xl p-6 flex flex-col justify-between hover:border-[#67E8F9]/40 transition-colors group space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#15171B] border border-[#1F2228] text-[#67E8F9]">
                    {repo.primaryLanguage || "TypeScript"}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#92969D]">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#F4F4F0] group-hover:text-[#67E8F9] transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-xs text-[#92969D] mt-2 line-clamp-3 leading-relaxed">
                    {repo.description || "No description provided."}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#1F2228] pt-4 font-mono text-xs">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#92969D] hover:text-[#F4F4F0] flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
