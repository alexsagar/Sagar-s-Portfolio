"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CommandPalette } from "./CommandPalette";

export function Header() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#070809]/90 backdrop-blur-md border-b border-[#1F2228]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between font-mono text-xs">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="inline-block w-2 h-2 rounded-full bg-[#67E8F9] animate-pulse" />
            <span className="font-bold tracking-widest text-[#F4F4F0] uppercase">
              SAGAR NEPALI <span className="text-[#92969D] font-normal">{"//"} SOFTWARE ENGINEER</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[#92969D]">
            <Link href="/projects" className="hover:text-[#F4F4F0] transition-colors">
              [01] PROJECTS
            </Link>
            <Link href="/about" className="hover:text-[#F4F4F0] transition-colors">
              [02] ABOUT
            </Link>
            <Link href="/lab" className="hover:text-[#F4F4F0] transition-colors">
              [03] LAB
            </Link>
            <Link href="/contact" className="hover:text-[#F4F4F0] transition-colors">
              [04] CONTACT
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPaletteOpen(true)}
              className="px-3 py-1.5 rounded bg-[#101215] border border-[#1F2228] hover:border-[#67E8F9]/50 text-[#92969D] hover:text-[#F4F4F0] flex items-center gap-2 transition-all"
            >
              <span className="text-[#67E8F9]">EXECUTE</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#15171B] text-[10px] border border-[#1F2228]">
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
