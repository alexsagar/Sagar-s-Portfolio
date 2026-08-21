"use client";

import React, { useEffect, useState, useRef } from "react";

interface BootLoaderProps {
  onComplete: () => void;
}

export function BootLoader({ onComplete }: BootLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const completedRef = useRef(false);

  const triggerComplete = useRef(onComplete);
  triggerComplete.current = onComplete;

  useEffect(() => {
    // Smooth 1.0s boot loader progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (!completedRef.current) {
            completedRef.current = true;
            setTimeout(() => triggerComplete.current(), 150);
          }
          return 100;
        }
        const next = prev + 20;
        if (next > 35) setStep(1);
        if (next > 70) setStep(2);
        return Math.min(100, next);
      });
    }, 120);

    const fallbackTimer = setTimeout(() => {
      clearInterval(interval);
      if (!completedRef.current) {
        completedRef.current = true;
        triggerComplete.current();
      }
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#050607] text-[#F4F4F0] font-mono flex flex-col justify-between p-8 selection:bg-[#67E8F9] selection:text-[#050607]">
      <div className="max-w-xl w-full mx-auto my-auto space-y-8">
        <div className="space-y-2 border-b border-[#1F2228] pb-4">
          <div className="text-xs text-[#8B9098] tracking-widest uppercase">
            SAGAR.DEV / SYSTEM BOOT
          </div>
          <div className="text-xl font-bold text-[#F4F4F0]">
            INITIALIZING WORKSPACE
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#8B9098]">01 RENDERER</span>
            <span className="text-[#67E8F9] font-bold">READY</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#8B9098]">02 INTERFACE</span>
            <span className={step >= 1 ? "text-[#67E8F9] font-bold" : "text-[#8B9098]"}>
              {step >= 1 ? "READY" : "LOADING..."}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#8B9098]">03 WORKSPACE</span>
            <span className={step >= 2 ? "text-[#67E8F9] font-bold" : "text-[#8B9098]"}>
              {step >= 2 ? "MOUNTED" : "INITIALIZING..."}
            </span>
          </div>
        </div>

        {/* Progress Bar Line */}
        <div className="space-y-2 pt-4">
          <div className="h-1 w-full bg-[#15171B] overflow-hidden rounded">
            <div
              className="h-full bg-[#67E8F9] transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-[#8B9098]">
            <span>BOOTING SYSTEM...</span>
            <span className="text-[#67E8F9] font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-[#8B9098]">
        SAGAR NEPALI &bull; KATHMANDU (UTC+5:45)
      </div>
    </div>
  );
}
