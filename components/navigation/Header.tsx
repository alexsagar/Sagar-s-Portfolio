"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Command, FolderGit2, User, Briefcase, Mail } from "lucide-react";
import { CommandPalette } from "./CommandPalette";

export function Header() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#070809]/90 backdrop-blur-md border-b border-[#1A1D23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-1.5 rounded-md bg-[#101215] border border-[#1F2228] group-hover:border-[#67E8F9]/50 transition-colors">
              <Terminal className="w-4 h-4 text-[#67E8F9]" />
            </div>
            <span className="font-mono text-sm font-bold tracking-tight text-[#F4F4F0]">
              SAGAR<span className="text-[#67E8F9]">.DEV</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-mono text-xs">
            <Link href="/projects" className="text-[#92969D] hover:text-[#F4F4F0] transition-colors">
              /projects
            </Link>
            <a href="#experience" className="text-[#92969D] hover:text-[#F4F4F0] transition-colors">
              /experience
            </a>
            <a href="#stack" className="text-[#92969D] hover:text-[#F4F4F0] transition-colors">
              /stack
            </a>
            <a href="#contact" className="text-[#92969D] hover:text-[#F4F4F0] transition-colors">
              /contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPaletteOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#101215] border border-[#1F2228] hover:border-[#67E8F9]/50 text-xs font-mono text-[#92969D] hover:text-[#F4F4F0] flex items-center gap-2 transition-colors"
            >
              <Command className="w-3.5 h-3.5 text-[#67E8F9]" />
              <span>SEARCH</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#15171B] text-[10px] text-[#92969D] border border-[#1F2228]">
                Ctrl K
              </kbd>
            </button>
          </div>
        </div>
      </header>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}
