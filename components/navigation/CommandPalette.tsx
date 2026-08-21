"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { FolderGit2, Home, User, Mail, FileText, Cpu, Github, ExternalLink } from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  const runCommand = (action: () => void) => {
    onOpenChange(false);
    action();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070809]/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-xl bg-[#101215] border border-[#1F2228] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <Command label="Command Palette" className="w-full">
          <div className="flex items-center border-b border-[#1F2228] px-4 py-3">
            <span className="font-mono text-xs text-[#67E8F9] mr-3">?</span>
            <Command.Input
              autoFocus
              placeholder="Type a command or search destination..."
              className="w-full bg-transparent text-sm text-[#F4F4F0] placeholder-[#92969D] focus:outline-none font-mono"
            />
            <button
              onClick={() => onOpenChange(false)}
              className="text-xs font-mono text-[#92969D] hover:text-[#F4F4F0] px-2 py-1 rounded bg-[#15171B] border border-[#1F2228]"
            >
              ESC
            </button>
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2 text-xs font-mono space-y-1">
            <Command.Empty className="p-4 text-center text-[#92969D]">No results found.</Command.Empty>

            <Command.Group heading="NAVIGATION" className="text-[#92969D] px-2 py-1 uppercase text-[10px] tracking-widest font-semibold">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/"))}
                className="flex items-center gap-3 px-3 py-2 rounded text-[#F4F4F0] hover:bg-[#15171B] cursor-pointer aria-selected:bg-[#15171B] aria-selected:text-[#67E8F9]"
              >
                <Home className="w-4 h-4 text-[#92969D]" />
                <span>Home</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/projects"))}
                className="flex items-center gap-3 px-3 py-2 rounded text-[#F4F4F0] hover:bg-[#15171B] cursor-pointer aria-selected:bg-[#15171B] aria-selected:text-[#67E8F9]"
              >
                <FolderGit2 className="w-4 h-4 text-[#92969D]" />
                <span>Projects Explorer</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/about"))}
                className="flex items-center gap-3 px-3 py-2 rounded text-[#F4F4F0] hover:bg-[#15171B] cursor-pointer aria-selected:bg-[#15171B] aria-selected:text-[#67E8F9]"
              >
                <User className="w-4 h-4 text-[#92969D]" />
                <span>About Sagar</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/contact"))}
                className="flex items-center gap-3 px-3 py-2 rounded text-[#F4F4F0] hover:bg-[#15171B] cursor-pointer aria-selected:bg-[#15171B] aria-selected:text-[#67E8F9]"
              >
                <Mail className="w-4 h-4 text-[#92969D]" />
                <span>Contact & Hire</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/lab"))}
                className="flex items-center gap-3 px-3 py-2 rounded text-[#F4F4F0] hover:bg-[#15171B] cursor-pointer aria-selected:bg-[#15171B] aria-selected:text-[#67E8F9]"
              >
                <Cpu className="w-4 h-4 text-[#92969D]" />
                <span>Developer Lab</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="EXTERNAL LINKS" className="text-[#92969D] px-2 py-1 uppercase text-[10px] tracking-widest font-semibold pt-2">
              <Command.Item
                onSelect={() => runCommand(() => window.open("https://github.com/alexsagar", "_blank"))}
                className="flex items-center justify-between px-3 py-2 rounded text-[#F4F4F0] hover:bg-[#15171B] cursor-pointer aria-selected:bg-[#15171B] aria-selected:text-[#67E8F9]"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-[#92969D]" />
                  <span>GitHub Profile</span>
                </div>
                <ExternalLink className="w-3 h-3 text-[#92969D]" />
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="border-t border-[#1F2228] px-4 py-2 flex items-center justify-between text-[11px] font-mono text-[#92969D] bg-[#070809]">
            <span>Navigate with ? ?, press Enter to select</span>
            <span className="text-[#67E8F9]">sagar.dev</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
