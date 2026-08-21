"use client";

import React, { useState, useEffect } from "react";
import { BootLoader } from "./BootLoader";
import { VideoLaptopScene } from "./VideoLaptopScene";
import { Terminal } from "@/components/terminal/Terminal";

type Step = "boot" | "laptop" | "terminal";

export function IntroExperience() {
  const [step, setStep] = useState<Step>("boot");
  const [skipIntro, setSkipIntro] = useState(false);
  const [canvasOpacity, setCanvasOpacity] = useState(1);

  // Absolute hard safety timer: if ANYTHING stalls, force terminal after 4.5s
  useEffect(() => {
    const hardTimer = setTimeout(() => {
      setStep("terminal");
    }, 4500);

    return () => clearTimeout(hardTimer);
  }, []);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        setStep("terminal");
        setSkipIntro(true);
      }
    }
  }, []);

  const handleSkip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSkipIntro(true);
    setStep("terminal");
  };

  const handleScreenFill = () => {
    setCanvasOpacity(0);
  };

  if (skipIntro || step === "terminal") {
    return <Terminal />;
  }

  return (
    <div
      onClick={() => handleSkip()}
      className="relative min-h-screen bg-[#050607] cursor-pointer"
    >
      {/* Skip Intro Button */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 z-50 font-mono text-xs text-[#8B9098] hover:text-[#67E8F9] px-3 py-1.5 rounded bg-[#0B0D10]/90 border border-[#1F2228] transition-colors backdrop-blur-sm"
      >
        [ Skip Intro / Click Anywhere ]
      </button>

      {/* Boot Loader */}
      {step === "boot" && (
        <BootLoader onComplete={() => setStep("laptop")} />
      )}

      {/* Photorealistic MP4 Video Laptop Scene Overlay */}
      {step === "laptop" && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-500 ease-out"
          style={{ opacity: canvasOpacity }}
        >
          <VideoLaptopScene
            onScreenFill={handleScreenFill}
            onComplete={() => setStep("terminal")}
          />
        </div>
      )}
    </div>
  );
}
