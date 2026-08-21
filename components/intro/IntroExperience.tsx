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

  // Absolute hard safety timer: if ANYTHING in WebGL/R3F/Loader stalls, force terminal after 2.5s
  useEffect(() => {
    const hardTimer = setTimeout(() => {
      setStep("terminal");
    }, 2500);

    return () => clearTimeout(hardTimer);
  }, []);

  useEffect(() => {
    // Check prefers-reduced-motion or WebGL availability
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      // Simple WebGL check
      let webglAvailable = true;
      try {
        const canvas = document.createElement("canvas");
        webglAvailable = Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
      } catch (e) {
        webglAvailable = false;
      }

      if (prefersReducedMotion || !webglAvailable) {
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

      {/* 3D Laptop Scene Overlay */}
      {step === "laptop" && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-500 ease-out"
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
