import React from "react";
import { Header } from "@/components/navigation/Header";
import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { LiveGitHubSection } from "@/components/home/LiveGitHubSection";
import { TechStackSection } from "@/components/home/TechStackSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { Footer } from "@/components/footer/Footer";
import { fetchGitHubOverview } from "@/lib/github/repositories";

export const revalidate = 3600; // Revalidate page every hour

export default async function HomePage() {
  const activity = await fetchGitHubOverview();

  return (
    <div className="min-h-screen bg-[#070809] text-[#F4F4F0] selection:bg-[#67E8F9]/20 selection:text-[#67E8F9]">
      <Header />
      <main>
        <Hero activity={activity} />
        <FeaturedProjects repositories={activity.featuredRepos} />
        <LiveGitHubSection activity={activity} />
        <TechStackSection />
        <ExperienceSection />
      </main>
      <Footer />
    </div>
  );
}
