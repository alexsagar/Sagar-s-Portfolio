import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

const EXPERIENCES = [
  {
    role: "Full-Stack Software Engineer",
    company: "Freelance & Independent Consulting",
    period: "2023 - Present",
    location: "Kathmandu, Nepal",
    description: "Designing and delivering end-to-end full-stack web applications, Payload CMS platforms, and scalable REST API services for global clients.",
    highlights: [
      "Built custom Next.js 14+ client portals with PostgreSQL backends.",
      "Engineered automated GitHub REST integration & ISR caching mechanisms.",
      "Optimized Core Web Vitals achieving 95+ performance scores.",
    ],
  },
  {
    role: "MERN Stack Developer & Digital Strategist",
    company: "Digital Product Initiatives",
    period: "2022 - 2023",
    location: "Kathmandu, Nepal",
    description: "Developed user-centric React interfaces, Express backend microservices, and SEO-optimized Web applications.",
    highlights: [
      "Architected CinemaGhar seat booking and ticket reservation UI.",
      "Created scalable state management patterns and REST API endpoints.",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 border-b border-[#1A1D23] bg-[#0A0C0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <div className="font-mono text-xs text-[#67E8F9] uppercase tracking-widest mb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>CAREER TRACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F4F0] tracking-tight">
            Work Experience & Background
          </h2>
        </div>

        <div className="space-y-8 max-w-4xl">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={index}
              className="bg-[#101215] border border-[#1F2228] rounded-xl p-8 space-y-6 hover:border-[#67E8F9]/30 transition-colors relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1F2228] pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#F4F4F0]">{exp.role}</h3>
                  <div className="text-sm font-mono text-[#67E8F9]">{exp.company}</div>
                </div>

                <div className="flex flex-col sm:items-end font-mono text-xs text-[#92969D] space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#92969D] leading-relaxed">{exp.description}</p>

              <div className="space-y-2 pt-2">
                {exp.highlights.map((item, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs font-mono text-[#F4F4F0]">
                    <CheckCircle2 className="w-4 h-4 text-[#67E8F9] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
