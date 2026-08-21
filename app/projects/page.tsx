import React from "react";
import Link from "next/link";
import { FolderGit2, Star, GitFork, ExternalLink, ArrowRight, Filter } from "lucide-react";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { fetchUserRepositories } from "@/lib/github/repositories";

export const revalidate = 3600;

export default async function ProjectsPage() {
  const repos = await fetchUserRepositories();

  return (
    <div className="min-h-screen bg-[#070809] text-[#F4F4F0] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="border-b border-[#1A1D23] pb-8 space-y-4">
          <div className="font-mono text-xs text-[#67E8F9] uppercase tracking-widest flex items-center gap-2">
            <FolderGit2 className="w-4 h-4" />
            <span>PROJECT ARCHIVE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#F4F4F0]">
            Engineering Projects & Repositories
          </h1>
          <p className="text-base text-[#92969D] max-w-3xl leading-relaxed">
            Exploration of open-source systems, full-stack applications, and experimental tools automatically synchronized with GitHub API.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
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

                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#15171B] text-[#92969D] border border-[#1F2228]"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-[#1F2228] pt-4 font-mono text-xs">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#92969D] hover:text-[#F4F4F0] flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#67E8F9] hover:underline flex items-center gap-1"
                  >
                    <span>Live Demo</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
