import AnimatedSection from "@/components/portfolio/AnimatedSection";
import type { Metadata } from "next";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import { SiteHeader, SiteFooter } from "@/components/portfolio/SiteChrome";
import { sanityFetch } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Projects | Sagar Nepali",
  description:
    "Explore Sagar Nepali’s website design and development projects, from CinemaGhar to GamePasal.",
  alternates: { canonical: "/projects" },
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const sanityProjects = await sanityFetch<any[]>({
    query: projectsQuery,
    tags: ["project"],
  });

  return (
    <div id="top" className="creative-site">
      <SiteHeader />
      <main id="main" className="wrap">
        <AnimatedSection className="section-title page-intro">
          <span className="section-label">Selected work</span>
          <h1 className="sr-only">Sagar Nepali’s projects</h1>
          <h2>
            Ideas made<br />
            <span className="gradient-text">real.</span>
          </h2>
          <p>
            A collection of websites I’ve designed and built. Explore each project on GitHub to see the work behind the screen.
          </p>
        </AnimatedSection>
        <ProjectGallery all items={sanityProjects || undefined} />
      </main>
      <SiteFooter />
    </div>
  );
}
