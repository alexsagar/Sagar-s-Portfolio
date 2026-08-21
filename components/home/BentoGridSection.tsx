"use client";

import React from "react";
import GridGlobe from "@/components/ui/GridGlobe";

export function BentoGridSection() {
  return (
    <section className="py-24 border-b border-[#1F2228] bg-[#070809]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="font-mono">
          <div className="text-xs text-[#67E8F9] uppercase tracking-widest mb-2">
            [05] // BENTO GRID ENGINEERING SPOTLIGHT
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F4F0] font-sans">
            Technical Architecture & Visual Highlights
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Three.js Interactive 3D World Globe */}
          <div className="lg:col-span-2 bg-[#101215] border border-[#1F2228] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#67E8F9]/40 transition-colors group">
            <div className="p-8 space-y-3 font-mono">
              <div className="text-xs text-[#67E8F9] uppercase tracking-widest">
                SYS.GLOBE // THREE.JS 3D CANVAS
              </div>
              <h3 className="text-2xl font-bold text-[#F4F4F0] font-sans">
                Global Edge Infrastructure & Distributed State
              </h3>
              <p className="text-xs text-[#92969D] font-sans leading-relaxed max-w-xl">
                High-availability server infrastructure synchronized across international edge nodes with automated ISR caching and low-latency database connection pooling.
              </p>
            </div>

            <div className="h-64 sm:h-80 w-full relative bg-gradient-to-b from-[#101215] to-[#0A0C0E]">
              <GridGlobe />
            </div>
          </div>

          {/* Card 2: WebGL Shader & GSAP Engine */}
          <div className="bg-[#101215] border border-[#1F2228] rounded-xl p-8 flex flex-col justify-between hover:border-[#67E8F9]/40 transition-colors font-mono space-y-6">
            <div className="space-y-4">
              <div className="text-xs text-[#67E8F9] uppercase tracking-widest">
                GRAPHICS // THREE.JS + GSAP
              </div>
              <h3 className="text-xl font-bold text-[#F4F4F0] font-sans">
                Interactive WebGL Particles & Animation Pipelines
              </h3>
              <p className="text-xs text-[#92969D] font-sans leading-relaxed">
                Frame-perfect 60FPS animation ticker linked to Lenis inertia scrolling and GPU-accelerated BufferGeometry particle clouds.
              </p>
            </div>

            <div className="bg-[#15171B] border border-[#1F2228] p-4 text-xs text-[#92969D] space-y-2">
              <div className="text-[#F4F4F0] font-bold">SYSTEM TELEMETRY</div>
              <div className="flex justify-between">
                <span>RENDERER:</span>
                <span className="text-[#67E8F9]">WebGL2 / Three.js</span>
              </div>
              <div className="flex justify-between">
                <span>TICKER ENGINE:</span>
                <span className="text-[#67E8F9]">GSAP 3 ScrollTrigger</span>
              </div>
              <div className="flex justify-between">
                <span>SCROLL ENGINE:</span>
                <span className="text-[#67E8F9]">Lenis Inertia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
