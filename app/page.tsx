import React from "react";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { EngineeringCanvas } from "@/components/canvas/EngineeringCanvas";
import { Spotlight } from "@/components/ui/Spotlight";
import { Header } from "@/components/navigation/Header";
import { Hero } from "@/components/home/Hero";
import { BentoGridSection } from "@/components/home/BentoGridSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { LiveGitHubSection } from "@/components/home/LiveGitHubSection";
import { TechStackSection } from "@/components/home/TechStackSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { Footer } from "@/components/footer/Footer";
import { fetchGitHubOverview } from "@/lib/github/repositories";

export const revalidate = 3600;

export default async function HomePage() {
  const activity = await fetchGitHubOverview();

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#070809] text-[#F4F4F0] selection:bg-[#67E8F9] selection:text-[#070809]">
        <EngineeringCanvas />
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#67E8F9" />

        <div className="relative z-10">
          <Header />
          <main>
            <Hero activity={activity} />
            <BentoGridSection />
            <FeaturedProjects repositories={activity.featuredRepos} />
            <LiveGitHubSection activity={activity} />
            <TechStackSection />
            <ExperienceSection />
          </main>
          <Footer />
        </div>
      </div>
    </SmoothScrollProvider>
  );
}
