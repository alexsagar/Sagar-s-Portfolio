"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface VideoLaptopSceneProps {
  onComplete: () => void;
}

export function VideoLaptopScene({ onComplete }: VideoLaptopSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  const triggerComplete = useRef(onComplete);
  triggerComplete.current = onComplete;

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // Ensure video is played
    video.play().catch((err) => {
      console.warn("Video playback warning:", err);
    });

    // Safety fallback timer (max 7.5s)
    const fallbackTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        triggerComplete.current();
      }
    }, 7500);

    // Unhurried, cinematic GSAP zoom timeline
    // 1. Visitor watches the full photorealistic laptop open cleanly (0.0s to 2.5s)
    // 2. Camera slowly and continuously pushes into the screen center (2.5s to 5.5s)
    // 3. Smooth handoff to interactive Terminal
    const tl = gsap.timeline({
      delay: 2.2, // Wait for laptop lid to open in video
      onComplete: () => {
        if (!completedRef.current) {
          completedRef.current = true;
          triggerComplete.current();
        }
      },
    });

    tl.to(container, {
      scale: 3.5,
      transformOrigin: "50% 45%",
      duration: 3.0,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40 bg-[#050607] overflow-hidden flex items-center justify-center">
      {/* Zoomable Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl aspect-video flex items-center justify-center bg-[#050607]"
      >
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
      </div>

      {/* Overlay Status Note */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-[#8B9098] tracking-widest uppercase pointer-events-none">
        INITIALIZING SYSTEM WORKSPACE...
      </div>
    </div>
  );
}
