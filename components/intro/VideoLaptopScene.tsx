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

    // Safety fallback (max 5.5s)
    const fallbackTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        triggerComplete.current();
      }
    }, 5500);

    const startAnimation = () => {
      // GSAP Timeline synced with Video playback:
      // 1. Video plays laptop opening.
      // 2. Camera zooms into the screen.
      // 3. Transition to terminal.
      const tl = gsap.timeline({
        onComplete: () => {
          if (!completedRef.current) {
            completedRef.current = true;
            triggerComplete.current();
          }
        },
      });

      tl.to(
        container,
        {
          scale: 3.6,
          transformOrigin: "50% 45%",
          duration: 2.2,
          ease: "power3.inOut",
          delay: 1.2,
        }
      );
    };

    video.addEventListener("play", startAnimation);

    video.play().catch(() => {
      startAnimation();
    });

    return () => {
      video.removeEventListener("play", startAnimation);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40 bg-[#050607] overflow-hidden flex items-center justify-center">
      {/* Zoomable Video Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl aspect-video flex items-center justify-center"
      >
        <video
          ref={videoRef}
          src="/vecteezy_laptop-animation-with-green-screen-with-markers-for-tracking_47225425.mp4"
          muted
          playsInline
          className="w-full h-full object-contain rounded-lg shadow-2xl"
        />
      </div>

      {/* Overlay Status Note */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-[#8B9098] tracking-widest uppercase pointer-events-none">
        BOOTING WORKSPACE ENVIRONMENT...
      </div>
    </div>
  );
}
