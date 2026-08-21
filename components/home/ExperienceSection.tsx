"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EXPERIENCES = [
  {
    period: "2023 - PRESENT",
    role: "Full-Stack Software Engineer",
    company: "Freelance & Independent Software Consulting",
    location: "Kathmandu, Nepal",
    summary: "Architecting enterprise Web applications, custom Payload CMS platforms, and automated REST API pipelines for international clients.",
    deliverables: [
      "Designed resilient Next.js 14+ client portals connected to PostgreSQL backends.",
      "Engineered automated GitHub REST synchronization with ISR revalidation.",
      "Optimized site performance to achieve top-tier Core Web Vitals metrics.",
    ],
  },
  {
    period: "2022 - 2023",
    role: "MERN Stack Developer & Digital Strategist",
    company: "Digital Product Initiatives",
    location: "Kathmandu, Nepal",
    summary: "Built high-performance React frontends, Node/Express API services, and user interfaces.",
    deliverables: [
      "Architected CinemaGhar seat management and ticket booking workflow.",
      "Engineered scalable state management patterns and REST API endpoints.",
    ],
  },
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".exp-item", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-24 border-b border-[#1F2228] bg-[#0A0C0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="font-mono">
          <div className="text-xs text-[#67E8F9] uppercase tracking-widest mb-2">
            [04] // CAREER TIMELINE & DELIVERABLES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F4F0] font-sans">
            Professional Experience & Track Record
          </h2>
        </div>

        <div className="space-y-8 max-w-5xl font-mono">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="exp-item bg-[#101215] border border-[#1F2228] p-8 space-y-6 hover:border-[#67E8F9]/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1F2228] pb-4 gap-2">
                <div>
                  <div className="text-xs text-[#67E8F9]">{exp.period}</div>
                  <h3 className="text-xl font-bold text-[#F4F4F0] font-sans mt-1">{exp.role}</h3>
                  <div className="text-xs text-[#92969D]">{exp.company} &bull; {exp.location}</div>
                </div>
              </div>

              <p className="text-xs text-[#92969D] leading-relaxed font-sans">{exp.summary}</p>

              <div className="space-y-2 pt-2 text-xs text-[#F4F4F0]">
                {exp.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2">
                    <span className="text-[#67E8F9]">&gt;</span>
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
