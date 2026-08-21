"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STACK = [
  {
    category: "01 / CORE LANGUAGES & FRAMEWORKS",
    items: ["TypeScript", "JavaScript (ESNext)", "Node.js", "React 18+", "Next.js (App Router)", "HTML5 / CSS3"],
  },
  {
    category: "02 / BACKEND & DATABASE ARCHITECTURE",
    items: ["PostgreSQL", "MongoDB", "Payload CMS 3.x", "Express.js", "RESTful APIs", "GraphQL"],
  },
  {
    category: "03 / INFRASTRUCTURE & PERFORMANCE",
    items: ["ISR & Caching", "Docker", "Vercel / AWS", "Sentry Monitoring", "Git / GitHub Actions", "Core Web Vitals Optimization"],
  },
];

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".stack-col", {
        opacity: 0,
        y: 30,
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
    <section ref={sectionRef} id="stack" className="py-24 border-b border-[#1F2228] bg-[#070809]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="font-mono">
          <div className="text-xs text-[#67E8F9] uppercase tracking-widest mb-2">
            [03] // SYSTEM ARCHITECTURE & TECHNICAL CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F4F0] font-sans">
            Technology Stack & Engineering Competencies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STACK.map((col, idx) => (
            <div key={idx} className="stack-col space-y-4 border-l border-[#1F2228] pl-6 font-mono">
              <div className="text-xs text-[#67E8F9]">{col.category}</div>
              <ul className="space-y-2 text-sm text-[#92969D]">
                {col.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="hover:text-[#F4F4F0] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#1F2228] hover:bg-[#67E8F9]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
