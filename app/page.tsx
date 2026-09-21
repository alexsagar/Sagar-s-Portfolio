import Portfolio from "@/components/portfolio/Portfolio";
import { sanityFetch } from "@/sanity/lib/client";
import { clientsQuery, featuredPostsQuery, projectsQuery, testimonialsQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const [sanityProjects, sanityClients, sanityTestimonials, sanityPosts] = await Promise.all([
    sanityFetch<any[]>({ query: projectsQuery, tags: ["project"] }),
    sanityFetch<any[]>({ query: clientsQuery, tags: ["client"] }),
    sanityFetch<any[]>({ query: testimonialsQuery, tags: ["testimonial"] }),
    sanityFetch<any[]>({ query: featuredPostsQuery, tags: ["post"] }),
  ]);

  return (
    <Portfolio
      sanityProjects={sanityProjects || undefined}
      sanityClients={sanityClients || undefined}
      sanityTestimonials={sanityTestimonials || undefined}
      sanityPosts={sanityPosts || undefined}
    />
  );
}
