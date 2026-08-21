"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface VideoLaptopSceneProps {
  onComplete: () => void;
}

export function VideoLaptopScene({ onComplete }: VideoLaptopSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalScreenRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  const triggerComplete = useRef(onComplete);
  triggerComplete.current = onComplete;

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    const terminalScreen = terminalScreenRef.current;

    if (!video || !container || !terminalScreen) return;

    // Initially hide terminal screen overlay completely until lid opens
    gsap.set(terminalScreen, { opacity: 0, display: "none" });

    video.play().catch((err) => {
      console.warn("Video playback warning:", err);
    });

    // Safety fallback timer (max 9.0s)
    const fallbackTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        triggerComplete.current();
      }
    }, 9000);

    // Sequence:
    // 0.0s - 1.8s: Laptop lid opens in video. Terminal is 100% INVISIBLE.
    // 1.8s: Lid is fully open. Terminal screen powers ON inside laptop display.
    // 2.6s: ONLY AFTER terminal is shown inside laptop screen, slowly zoom into display.
    // 5.8s: Handoff to interactive full-screen Terminal.
    const tl = gsap.timeline({
      onComplete: () => {
        if (!completedRef.current) {
          completedRef.current = true;
          triggerComplete.current();
        }
      },
    });

    // Step 1: Wait 1.8s while laptop lid opens in video
    tl.to({}, { duration: 1.8 });

    // Step 2: Show and fade in terminal overlay inside laptop screen
    tl.to(terminalScreen, {
      display: "flex",
      opacity: 1,
      duration: 0.6,
      ease: "power1.in",
    });

    // Step 3: Hold terminal visible on laptop screen before zooming
    tl.to({}, { duration: 0.8 });

    // Step 4: NOW slowly zoom into the laptop display
    tl.to(container, {
      scale: 3.6,
      transformOrigin: "50% 46%",
      duration: 3.2,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40 bg-[#050607] overflow-hidden flex items-center justify-center">
      {/* Zoomable Video Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl aspect-video flex items-center justify-center bg-[#050607]"
      >
        {/* Laptop Opening MP4 Video */}
        <video
          ref={videoRef}
          muted
          autoPlay
          playsInline
          preload="auto"
          className="w-full h-full object-contain bg-[#050607]"
        >
          <source
            src="/vecteezy_laptop-animation-with-green-screen-with-markers-for-tracking_47225425.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* 
          TERMINAL UI EMBEDDED DIRECTLY INSIDE LAPTOP SCREEN
          Mapped over the green screen area of the laptop display
        */}
        <div
          ref={terminalScreenRef}
          style={{ opacity: 0, display: "none" }}
          className="absolute w-[54%] h-[50%] top-[23%] left-[23%] bg-[#050607] border border-[#1F2228] p-4 sm:p-6 font-mono text-[10px] sm:text-xs text-[#F4F4F0] selection:bg-[#67E8F9] selection:text-[#050607] rounded shadow-2xl overflow-hidden flex flex-col justify-between"
        >
          <div className="space-y-3">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-[#1F2228] pb-2 text-[#8B9098]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2 h-2 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-2 font-bold text-[#F4F4F0]">sagar@portfolio:~$</span>
              </div>
              <div className="hidden sm:block text-[10px]">SAGAR.DEV // OS v2.0</div>
            </div>

            {/* Terminal Screen Body */}
            <div className="space-y-1.5 text-[#8B9098]">
              <div className="text-[#F4F4F0] font-bold">SAGAR NEPALI - FULL-STACK SOFTWARE ENGINEER</div>
              <div>Booting workspace environment...</div>
              <div className="text-[#67E8F9]">Status: System Online &bull; Ready</div>
            </div>

            {/* Terminal Command Chips */}
            <div className="pt-1 text-[11px]">
              <div className="text-[#67E8F9] font-bold">System Commands:</div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["about", "projects", "experience", "skills", "contact", "help"].map((cmd) => (
                  <span
                    key={cmd}
                    className="px-1.5 py-0.5 rounded bg-[#15171B] border border-[#1F2228] text-[#67E8F9]"
                  >
                    [ {cmd} ]
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Terminal Prompt Cursor */}
          <div className="flex items-center gap-2 text-[#67E8F9] font-bold pt-2 border-t border-[#1F2228]">
            <span>sagar@portfolio:~$</span>
            <span className="w-2 h-3 bg-[#67E8F9] animate-pulse inline-block" />
          </div>
        </div>
      </div>

      {/* Overlay Status Note */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-[#8B9098] tracking-widest uppercase pointer-events-none">
        INITIALIZING WORKSPACE ENVIRONMENT...
      </div>
    </div>
  );
}
