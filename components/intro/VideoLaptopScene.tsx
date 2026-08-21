"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

interface VideoLaptopSceneProps {
  onComplete: () => void;
  onScreenFill?: () => void;
}

export function VideoLaptopScene({ onComplete, onScreenFill }: VideoLaptopSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const screenOverlayRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  const triggerComplete = useRef(onComplete);
  triggerComplete.current = onComplete;

  const triggerScreenFill = useRef(onScreenFill);
  triggerScreenFill.current = onScreenFill;

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    const screenOverlay = screenOverlayRef.current;

    if (!video || !container) return;

    // Safety fallback timer (max 6.5s)
    const fallbackTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        if (triggerScreenFill.current) triggerScreenFill.current();
        triggerComplete.current();
      }
    }, 6500);

    const handlePlay = () => {
      // GSAP Timeline synced with Video playback:
      // 1. As laptop lid opens in video, reveal terminal screen overlay
      // 2. Zoom container into the screen center
      const tl = gsap.timeline({
        onComplete: () => {
          if (!completedRef.current) {
            completedRef.current = true;
            if (triggerScreenFill.current) triggerScreenFill.current();
            setTimeout(() => triggerComplete.current(), 300);
          }
        },
      });

      // Reveal terminal overlay as lid opens
      if (screenOverlay) {
        tl.to(screenOverlay, {
          opacity: 1,
          duration: 1.2,
          ease: "power2.inOut",
          delay: 0.8,
        });
      }

      // Smooth zoom towards laptop display
      tl.to(
        container,
        {
          scale: 3.2,
          transformOrigin: "50% 45%",
          duration: 2.2,
          ease: "power3.inOut",
        },
        "+=0.4"
      );
    };

    video.addEventListener("play", handlePlay);

    // Auto play video
    video.play().catch(() => {
      // If autoplay blocked, trigger handler manually
      handlePlay();
    });

    return () => {
      video.removeEventListener("play", handlePlay);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40 bg-[#050607] overflow-hidden flex items-center justify-center">
      {/* Zoomable Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl aspect-video flex items-center justify-center"
      >
        {/* Photorealistic Video of Laptop Opening */}
        <video
          ref={videoRef}
          src="/vecteezy_laptop-animation-with-green-screen-with-markers-for-tracking_47225425.mp4"
          muted
          playsInline
          className="w-full h-full object-contain rounded-lg shadow-2xl"
        />

        {/* Terminal Screen Embedded Overlay Positioned Over Display */}
        <div
          ref={screenOverlayRef}
          className="absolute opacity-0 transition-opacity duration-500 w-[58%] h-[54%] top-[22%] left-[21%] bg-[#050607] border border-[#1F2228] p-4 font-mono text-[10px] sm:text-xs text-[#F4F4F0] selection:bg-[#67E8F9] selection:text-[#050607] rounded shadow-2xl overflow-hidden flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#1F2228] pb-2 text-[#8B9098]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2 h-2 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-1.5 font-bold text-[#F4F4F0]">sagar@portfolio:~$</span>
              </div>
              <div className="hidden sm:block">SAGAR.DEV // OS v2.0</div>
            </div>

            <div className="space-y-1.5 text-[#8B9098]">
              <div className="text-[#F4F4F0] font-bold">SAGAR NEPALI - FULL-STACK SOFTWARE ENGINEER</div>
              <div>Booting workspace environment...</div>
              <div className="text-[#67E8F9]">Status: System Online &bull; Ready</div>
            </div>

            <div className="pt-1 text-[11px]">
              <div className="text-[#67E8F9] font-bold">Try typing commands:</div>
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

          <div className="flex items-center gap-2 text-[#67E8F9] font-bold pt-2 border-t border-[#1F2228]">
            <span>sagar@portfolio:~$</span>
            <span className="w-2 h-3 bg-[#67E8F9] animate-pulse inline-block" />
          </div>
        </div>
      </div>

      {/* Overlay Status Note */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-[#8B9098] tracking-widest uppercase pointer-events-none">
        BOOTING WORKSPACE ENVIRONMENT...
      </div>
    </div>
  );
}
