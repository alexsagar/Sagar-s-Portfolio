import React from "react";
import { Cpu, Layout, Database, Wrench, Layers } from "lucide-react";

const STACK_GROUPS = [
  {
    category: "Frontend Architecture",
    icon: Layout,
    items: [
      { name: "Next.js 14/15/16", level: "Primary" },
      { name: "React 18/19", level: "Primary" },
      { name: "TypeScript", level: "Primary" },
      { name: "Tailwind CSS", level: "Primary" },
      { name: "Framer Motion", level: "Advanced" },
    ],
  },
  {
    category: "Backend & Systems",
    icon: Cpu,
    items: [
      { name: "Node.js & Express", level: "Primary" },
      { name: "Payload CMS", level: "Advanced" },
      { name: "REST & GraphQL APIs", level: "Primary" },
      { name: "Server Actions / ISR", level: "Advanced" },
    ],
  },
  {
    category: "Database & Storage",
    icon: Database,
    items: [
      { name: "PostgreSQL", level: "Primary" },
      { name: "MongoDB", level: "Advanced" },
      { name: "Prisma / Drizzle", level: "Proficient" },
      { name: "Redis Caching", level: "Proficient" },
    ],
  },
  {
    category: "DevOps & Tools",
    icon: Wrench,
    items: [
      { name: "Git & GitHub Actions", level: "Primary" },
      { name: "Vercel / Docker", level: "Advanced" },
      { name: "ESLint & TypeScript", level: "Primary" },
      { name: "Postman & Insomnia", level: "Proficient" },
    ],
  },
];

export function TechStackSection() {
  return (
    <section id="stack" className="py-24 border-b border-[#1A1D23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div>
          <div className="font-mono text-xs text-[#67E8F9] uppercase tracking-widest mb-2 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>TECHNICAL TOOLKIT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F4F0] tracking-tight">
            Structured Stack & Architecture
          </h2>
        </div>

        {/* Toolkit Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STACK_GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.category}
                className="bg-[#101215] border border-[#1F2228] rounded-xl p-6 space-y-5 hover:border-[#67E8F9]/30 transition-colors"
              >
                <div className="flex items-center gap-3 border-b border-[#1F2228] pb-3">
                  <div className="w-8 h-8 rounded bg-[#15171B] border border-[#1F2228] flex items-center justify-center text-[#67E8F9]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-mono text-xs font-semibold text-[#F4F4F0] uppercase tracking-wider">
                    {group.category}
                  </h3>
                </div>

                <div className="space-y-2">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-2 rounded bg-[#15171B]/60 border border-[#1F2228] font-mono text-xs"
                    >
                      <span className="text-[#F4F4F0]">{item.name}</span>
                      <span className="text-[10px] text-[#92969D] px-1.5 py-0.5 rounded bg-[#101215] border border-[#1F2228]">
                        {item.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
