"use client";

import React, { useState, useEffect } from "react";
import { BootLoader } from "./BootLoader";
import { LaptopScene } from "./LaptopScene";
import { Terminal } from "@/components/terminal/Terminal";

type Step = "boot" | "laptop" | "terminal";

export function IntroExperience() {
  const [step, setStep] = useState<Step>("boot");
  const [skipIntro, setSkipIntro] = useState(false);
  const [canvasOpacity, setCanvasOpacity] = useState(1);

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

  const handleSkip = () => {
    setSkipIntro(true);
    setStep("terminal");
  };

  const handleScreenFill = () => {
    // Smoothly fade out WebGL canvas overlay as terminal DOM takes full viewport
    setCanvasOpacity(0);
  };

  if (skipIntro) {
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

      {/* DOM Terminal behind canvas */}
      <div className={step === "terminal" ? "opacity-100 transition-opacity duration-500" : "opacity-0 pointer-events-none"}>
        <Terminal />
      </div>

      {/* Boot Loader */}
      {step === "boot" && (
        <BootLoader onComplete={() => setStep("laptop")} />
      )}

      {/* 3D Laptop Scene Overlay */}
      {step === "laptop" && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-700 ease-out"
          style={{ opacity: canvasOpacity }}
        >
          <LaptopScene
            onScreenFill={handleScreenFill}
            onComplete={() => setStep("terminal")}
          />
        </div>
      )}
    </div>
  );
}
