"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { projects as defaultProjects } from "@/data";
import { resolveImageUrl } from "@/sanity/lib/image";

// Matched to the reference: the middle card leads, then the outer columns rise past it.
const cardTravel = [
  ["0%", "-50%"],
  ["-25%", "10%"],
  ["0%", "-90%"],
  ["70%", "-60%"],
  ["0%", "-50%"],
];

export interface ProjectItem {
  id?: string | number;
  _id?: string;
  title: string;
  des?: string;
  description?: string;
  img?: string;
  fallbackImg?: string;
  image?: any;
  category?: string;
  link?: string;
  githubLink?: string;
  iconLists?: string[];
  tags?: string[];
}

function ProjectCard({ project, index, progress, all }: {
  project: ProjectItem;
  index: number;
  progress: MotionValue<number>;
  all: boolean;
}) {
  const reduced = useReducedMotion();
  const travel = cardTravel[index % cardTravel.length];
  const y = useTransform(progress, [0, 1], travel);

  const imgSrc = resolveImageUrl(project.image, project.img || project.fallbackImg || "/projects/cinemaghar.webp");
  const projectLink = project.link || project.githubLink || "#";
  const projectCategory = project.category || (index === 2 || index === 3 ? "Website design & development" : "Website design");
  const projectDesc = project.description || project.des;

  return (
    <motion.a
      className={`project-card project-card-${(index % 5) + 1}`}
      style={!all && !reduced ? { y } : undefined}
      initial={all && !reduced ? { y: 65, opacity: 0.4 } : false}
      whileInView={all ? { y: 0, opacity: 1 } : undefined}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      href={projectLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="project-art">
        <Image
          src={imgSrc}
          alt={`${project.title} website preview`}
          width={1000}
          height={700}
          sizes="(max-width: 700px) 90vw, (max-width: 1200px) 45vw, 30vw"
          loading="lazy"
          decoding="async"
        />
        <span className="project-visit">
          <ArrowUpRight size={28} />
          <span className="sr-only">View {project.title}</span>
        </span>
      </div>
      <div className="project-caption">
        <h3>{project.title}</h3>
        <p>{projectCategory}</p>
      </div>
      {all && projectDesc && <p className="project-description">{projectDesc}</p>}
    </motion.a>
  );
}

export function ProjectGallery({ all = false, items }: { all?: boolean; items?: ProjectItem[] }) {
  const container = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.6], [1, 1, 0]);

  const displayProjects: ProjectItem[] = (items && items.length > 0 ? items : defaultProjects) as ProjectItem[];

  return (
    <div ref={container} className={all ? "project-gallery" : "project-showcase"}>
      {!all && <div className="project-heading-track">
        <motion.div className="section-title project-heading" style={reduced ? undefined : { opacity: headingOpacity }}>
          <span className="section-label">Projects</span>
          <h2>Ideas turned<br />into websites.</h2>
        </motion.div>
      </div>}
      <div className={`project-grid ${all ? "project-grid-all" : "project-grid-scroll"}`}>
        {displayProjects.map((project, index) => (
          <ProjectCard
            key={project._id || project.id || index}
            project={project}
            index={index}
            progress={scrollYProgress}
            all={all}
          />
        ))}
        {!all && (
          <Link className="more-projects" href="/projects">
            <span>Explore<br />more<br />projects</span>
            <ArrowUpRight size={56} />
          </Link>
        )}
      </div>
    </div>
  );
}
