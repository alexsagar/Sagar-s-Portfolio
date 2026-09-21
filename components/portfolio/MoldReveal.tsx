"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINES = ["Creativity", "meets", "purpose."];

// Deterministic per-letter scatter, so server and client agree and the motion never reshuffles.
const scatter = (index: number) => {
  const wobble = Math.sin(index * 12.9898) * 43758.5453;
  const random = wobble - Math.floor(wobble);
  const side = index % 2 ? 1 : -1;
  return {
    x: `${side * (16 + random * 30)}vw`,
    y: `${(index % 3 ? 1 : -1) * (12 + random * 28)}vh`,
    rotate: side * (45 + random * 85),
  };
};

export default function MoldReveal() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const scrub = { trigger: root.current, start: "top top", end: "62% top", scrub: 0.6 };
        const letters = gsap.utils.toArray<HTMLElement>(".mold-letter");

        gsap.to(letters, {
          x: (index: number) => scatter(index).x,
          y: (index: number) => scatter(index).y,
          rotate: (index: number) => scatter(index).rotate,
          scale: 2,
          ease: "none",
          scrollTrigger: { ...scrub, start: "18% top" },
        });
        gsap.fromTo(".mold-orb", { scale: 0.35, opacity: 0 }, { scale: 1, opacity: 1, ease: "none", scrollTrigger: scrub });
        gsap.to(".mold-cue", { opacity: 0, ease: "none", scrollTrigger: { ...scrub, end: "30% top" } });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <div className="mold" ref={root}>
      <div className="mold-stage">
        <span className="mold-orb" aria-hidden="true" />
        <h2 className="sr-only">Creativity meets purpose.</h2>
        <p className="mold-text" aria-hidden="true">
          {LINES.map((line, lineIndex) => (
            <span className="mold-line" key={line} aria-hidden="true">
              {Array.from(line).map((letter, index) => (
                <span className="mold-letter" key={index} style={{ willChange: "transform" }}>{letter}</span>
              ))}
              {lineIndex < LINES.length - 1 ? " " : null}
            </span>
          ))}
        </p>
        <span className="mold-cue" aria-hidden="true">( keep scrolling )</span>
      </div>
    </div>
  );
}
