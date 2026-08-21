export interface CommandOutput {
  type: "text" | "json" | "list" | "link" | "error";
  title?: string;
  content: string | string[];
  links?: { label: string; url: string }[];
}

export const COMMANDS: Record<string, { description: string; execute: () => CommandOutput }> = {
  help: {
    description: "Display available system commands",
    execute: () => ({
      type: "list",
      title: "AVAILABLE COMMANDS",
      content: [
        "about       - Who I am and my engineering background",
        "projects    - Technical projects and active repositories",
        "experience  - Career track, roles, and deliverables",
        "skills      - System stack, databases, and infrastructure",
        "github      - GitHub profile and repository telemetry",
        "contact     - Direct contact information",
        "resume      - Technical resume overview & download",
        "whoami      - System user identity",
        "stack       - High-level architecture summary",
        "clear       - Clear terminal screen output",
      ],
    }),
  },
  whoami: {
    description: "Display current user session",
    execute: () => ({
      type: "text",
      content: [
        "USER: Sagar Nepali",
        "ROLE: Full-Stack Software Engineer",
        "LOCATION: Kathmandu, Nepal (UTC+5:45)",
        "FOCUS: Next.js, Node.js, PostgreSQL, System Architecture",
      ],
    }),
  },
  about: {
    description: "Engineering background and philosophy",
    execute: () => ({
      type: "text",
      title: "ABOUT SAGAR NEPALI",
      content: [
        "Full-Stack Software Engineer with a focus on building high-throughput web applications,",
        "scalable API microservices, distributed PostgreSQL databases, and clean user interfaces.",
        "",
        "Engineering Philosophy:",
        "• Predictable state transitions and deterministic system boundaries.",
        "• Core Web Vitals optimization and performance budget enforcement.",
        "• Type-safe contracts across the entire stack (TypeScript, Next.js, PostgreSQL).",
      ],
    }),
  },
  projects: {
    description: "Featured engineering projects",
    execute: () => ({
      type: "list",
      title: "FEATURED ENGINEERING PROJECTS",
      content: [
        "[01] SajiloKhata    - Ledger & financial management platform (Next.js, PostgreSQL)",
        "[02] CinemaGhar     - Real-time seat reservation dashboard UI (React, Node, Express)",
        "[03] Portfolio v2   - Developer workspace console with Payload CMS backend & GitHub sync",
        "",
        "Tip: Type 'github' to view live repository links.",
      ],
    }),
  },
  experience: {
    description: "Career track and deliverables",
    execute: () => ({
      type: "list",
      title: "PROFESSIONAL EXPERIENCE",
      content: [
        "2023 - PRESENT | Full-Stack Software Engineer (Freelance / Independent)",
        "• Built custom Next.js 14+ client portals with PostgreSQL backends.",
        "• Engineered automated GitHub REST integration & ISR caching mechanisms.",
        "",
        "2022 - 2023    | MERN Stack Developer & Digital Strategist",
        "• Architected CinemaGhar seat booking and ticket reservation UI.",
        "• Created scalable REST API endpoints and state management patterns.",
      ],
    }),
  },
  skills: {
    description: "Technical skills and stack",
    execute: () => ({
      type: "list",
      title: "TECHNICAL STACK & COMPETENCIES",
      content: [
        "LANGUAGES     : TypeScript, JavaScript (ESNext), SQL, HTML5, CSS3",
        "FRONTEND      : Next.js 14 (App Router), React 18, Tailwind CSS, GSAP, Three.js",
        "BACKEND & DATA: Node.js, Express.js, PostgreSQL, Payload CMS 3.x, MongoDB",
        "INFRASTRUCTURE: Docker, Vercel, Sentry, GitHub Actions CI/CD",
      ],
    }),
  },
  stack: {
    description: "Architecture overview",
    execute: () => COMMANDS.skills.execute(),
  },
  github: {
    description: "GitHub profile and telemetry",
    execute: () => ({
      type: "link",
      title: "GITHUB PROFILE & TELEMETRY",
      content: "GitHub Username: alexsagar | Public Repositories: 18+",
      links: [
        { label: "Open GitHub Profile", url: "https://github.com/alexsagar" },
        { label: "View Portfolio Repository", url: "https://github.com/alexsagar/Sagar-s-Portfolio" },
      ],
    }),
  },
  contact: {
    description: "Direct contact info",
    execute: () => ({
      type: "link",
      title: "DIRECT CONTACT CONSOLE",
      content: [
        "Email: contact@sagar-nepali.com.np",
        "Location: Kathmandu, Nepal",
        "LinkedIn: linkedin.com/in/alexsagar",
      ],
      links: [
        { label: "Send Email", url: "mailto:contact@sagar-nepali.com.np" },
        { label: "LinkedIn Profile", url: "https://linkedin.com/in/alexsagar" },
      ],
    }),
  },
  resume: {
    description: "Download technical resume",
    execute: () => ({
      type: "text",
      title: "RESUME OVERVIEW",
      content: [
        "Sagar Nepali - Full-Stack Software Engineer",
        "Experience: 3+ Years in Full-Stack Web Systems & Digital Products",
        "Location: Kathmandu, Nepal",
        "",
        "For direct PDF requests, please email contact@sagar-nepali.com.np",
      ],
    }),
  },
};
