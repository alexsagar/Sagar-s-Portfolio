"use client";

import React, { useState, useEffect } from "react";
import { BootLoader } from "./BootLoader";
import { VideoLaptopScene } from "./VideoLaptopScene";
import { Terminal } from "@/components/terminal/Terminal";

type Step = "boot" | "laptop" | "terminal";

export function IntroExperience() {
  const [step, setStep] = useState<Step>("boot");

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        setStep("terminal");
      }
    }
  }, []);

  const handleSkip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setStep("terminal");
  };

  // If step is terminal, ONLY render Terminal cleanly
  if (step === "terminal") {
    return <Terminal />;
  }

  return (
    <div className="relative min-h-screen bg-[#050607]">
      {/* Skip Intro Button */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 z-50 font-mono text-xs text-[#8B9098] hover:text-[#67E8F9] px-3 py-1.5 rounded bg-[#0B0D10]/90 border border-[#1F2228] transition-colors backdrop-blur-sm"
      >
        [ Skip Intro ]
      </button>

      {/* Step 1: Boot Loader */}
      {step === "boot" && (
        <BootLoader onComplete={() => setStep("laptop")} />
      )}

      {/* Step 2: Photorealistic MP4 Video Laptop Scene */}
      {step === "laptop" && (
        <VideoLaptopScene
          onComplete={() => setStep("terminal")}
        />
      )}
    </div>
  );
}
