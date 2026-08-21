"use client";

import React, { useState, useEffect } from "react";
import { BootLoader } from "./BootLoader";
import { LaptopScene } from "./LaptopScene";
import { Terminal } from "@/components/terminal/Terminal";

type Step = "boot" | "laptop" | "terminal";

export function IntroExperience() {
  const [step, setStep] = useState<Step>("boot");
  const [skipIntro, setSkipIntro] = useState(false);

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

  if (skipIntro || step === "terminal") {
    return <Terminal />;
  }

  return (
    <div className="relative min-h-screen bg-[#050607]">
      {/* Skip Intro Button */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 z-50 font-mono text-xs text-[#8B9098] hover:text-[#67E8F9] px-3 py-1.5 rounded bg-[#0B0D10] border border-[#1F2228] transition-colors"
      >
        [ Skip Intro ]
      </button>

      {step === "boot" && (
        <BootLoader onComplete={() => setStep("laptop")} />
      )}

      {step === "laptop" && (
        <LaptopScene onComplete={() => setStep("terminal")} />
      )}
    </div>
  );
}
