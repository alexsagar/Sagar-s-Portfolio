import React from "react";
import Link from "next/link";
import { Terminal, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#070809] border-t border-[#1A1D23] py-12 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#F4F4F0] font-bold">
              <Terminal className="w-4 h-4 text-[#67E8F9]" />
              <span>SAGAR NEPALI</span>
            </div>
            <p className="text-[#92969D] max-w-md">
              Full-Stack Developer & Software Engineer based in Kathmandu, Nepal. Dedicated to clean architecture and performance.
            </p>
          </div>

          <div className="flex items-center gap-6 text-[#92969D]">
            <a
              href="https://github.com/alexsagar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4F4F0] flex items-center gap-1 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://linkedin.com/in/alexsagar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4F4F0] flex items-center gap-1 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="mailto:contact@sagar-nepali.com.np"
              className="hover:text-[#F4F4F0] flex items-center gap-1 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </div>

        <div className="border-t border-[#1A1D23] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#92969D]">
          <div>
            &copy; {new Date().getFullYear()} Sagar Nepali. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Built with Next.js 14, Tailwind & Payload CMS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
