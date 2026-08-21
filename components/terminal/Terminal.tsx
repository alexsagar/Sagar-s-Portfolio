"use client";

import React, { useState, useRef, useEffect } from "react";
import { COMMANDS, CommandOutput } from "./commands";

interface HistoryEntry {
  command: string;
  output: CommandOutput;
  timestamp: string;
}

export function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [cmdHistoryIndex, setCmdHistoryIndex] = useState<number>(-1);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when history updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Focus input on mount / click
  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  const handleExecute = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const commandObj = COMMANDS[trimmed];
    let output: CommandOutput;

    if (commandObj) {
      output = commandObj.execute();
    } else {
      output = {
        type: "error",
        content: `command not found: '${trimmed}'. Type 'help' to see available system commands.`,
      };
    }

    const now = new Date().toLocaleTimeString("en-US", { hour12: false });
    setHistory((prev) => [...prev, { command: cmdText, output, timestamp: now }]);
    setCmdHistory((prev) => [...prev, cmdText]);
    setCmdHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleExecute(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = cmdHistoryIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdHistoryIndex - 1);
      setCmdHistoryIndex(nextIdx);
      setInput(cmdHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistoryIndex === -1) return;
      const nextIdx = cmdHistoryIndex + 1;
      if (nextIdx >= cmdHistory.length) {
        setCmdHistoryIndex(-1);
        setInput("");
      } else {
        setCmdHistoryIndex(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(COMMANDS).find((c) => c.startsWith(input.trim().toLowerCase()));
      if (match) {
        setInput(match);
      }
    }
  };

  return (
    <div
      onClick={focusInput}
      className="min-h-screen bg-[#050607] text-[#F4F4F0] font-mono p-4 sm:p-8 flex flex-col justify-between selection:bg-[#67E8F9] selection:text-[#050607]"
    >
      <div className="max-w-4xl w-full mx-auto space-y-6">
        {/* Terminal Header Bar */}
        <div className="border-b border-[#1F2228] pb-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8B9098]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-2 font-bold text-[#F4F4F0]">sagar@portfolio:~$</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>SYSTEM: SAGAR.DEV OS v2.0</span>
            <span className="text-[#67E8F9]">READY</span>
          </div>
        </div>

        {/* Welcome Banner & Non-Technical Clickable Command Chips */}
        <div className="bg-[#0B0D10] border border-[#1F2228] p-6 space-y-4 rounded-lg">
          <div className="text-sm font-bold text-[#F4F4F0]">
            Welcome to Sagar Nepali&apos;s Developer Workspace Terminal.
          </div>
          <p className="text-xs text-[#8B9098] leading-relaxed">
            Type system commands directly into the terminal prompt below, or click any command button:
          </p>

          {/* Clickable Suggestion Chips for non-technical visitors */}
          <div className="flex flex-wrap gap-2 pt-2">
            {["about", "projects", "experience", "skills", "contact", "github", "help"].map((cmd) => (
              <button
                key={cmd}
                onClick={(e) => {
                  e.stopPropagation();
                  handleExecute(cmd);
                }}
                className="px-3 py-1.5 rounded bg-[#15171B] border border-[#1F2228] hover:border-[#67E8F9] text-xs text-[#67E8F9] hover:text-[#F4F4F0] transition-colors"
              >
                [ {cmd} ]
              </button>
            ))}
          </div>
        </div>

        {/* Output History */}
        <div className="space-y-6 text-xs sm:text-sm">
          {history.map((entry, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2 text-[#67E8F9]">
                <span>sagar@portfolio:~$</span>
                <span className="text-[#F4F4F0] font-bold">{entry.command}</span>
                <span className="text-[10px] text-[#8B9098] ml-auto">{entry.timestamp}</span>
              </div>

              <div className="pl-4 border-l border-[#1F2228] space-y-2">
                {entry.output.title && (
                  <div className="font-bold text-[#67E8F9]">{entry.output.title}</div>
                )}

                {Array.isArray(entry.output.content) ? (
                  entry.output.content.map((line, lIdx) => (
                    <div key={lIdx} className="text-[#8B9098] leading-relaxed">
                      {line}
                    </div>
                  ))
                ) : (
                  <div className="text-[#8B9098] leading-relaxed">{entry.output.content}</div>
                )}

                {entry.output.links && (
                  <div className="flex flex-wrap gap-4 pt-2">
                    {entry.output.links.map((link, kIdx) => (
                      <a
                        key={kIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#67E8F9] hover:underline flex items-center gap-1"
                      >
                        <span>{link.label}</span>
                        <span>&rarr;</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Active Input Line */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold pt-2">
          <span className="text-[#67E8F9]">sagar@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help' or click a command..."
            className="flex-1 bg-transparent text-[#F4F4F0] outline-none font-mono caret-[#67E8F9]"
            autoFocus
          />
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Terminal Footer Info */}
      <div className="max-w-4xl w-full mx-auto border-t border-[#1F2228] pt-4 mt-8 flex flex-wrap justify-between text-[11px] text-[#8B9098]">
        <div>Tip: Press &apos;Tab&apos; for autocomplete | &apos;Up/Down&apos; for history</div>
        <div>SAGAR NEPALI &bull; KATHMANDU, NEPAL</div>
      </div>
    </div>
  );
}
