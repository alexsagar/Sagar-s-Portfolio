"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MousePointer2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SocialLinks } from "./SiteChrome";

gsap.registerPlugin(ScrollTrigger);

export default function CreativeHero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      root.current!.classList.add("is-animating");
      const context = gsap.context(() => {
        const lines = gsap.utils.toArray<HTMLElement>(".hero-line");
        const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
        const intro = root.current!.querySelector<HTMLElement>(".hero-intro")!;
        const kicker = root.current!.querySelector<HTMLElement>(".hero-kicker")!;
        const desktop = window.matchMedia("(min-width: 701px)").matches;
        const headlineStart = desktop ? 1.8 : 0;

        if (desktop) {
          const bounds = root.current!.getBoundingClientRect();
          const destination = kicker.getBoundingClientRect();
          gsap.set(intro, { autoAlpha: 1, x: (bounds.width - intro.offsetWidth) / 2, y: bounds.height * 0.35 });
          entrance.from(".hero-intro-copy", { opacity: 0, y: 18, duration: 0.45 }, 0)
            .from(".hero-intro-cursor", { opacity: 0, x: 110, y: 70, duration: 0.55 }, 0.3)
            .from(".hero-intro-insert", { width: 0, opacity: 0, marginInline: 0, duration: 0.55 }, 0.65)
            .to(".hero-intro-copy", { borderColor: "#aa83ff", duration: 0.2 }, 0.8)
            .to(".hero-intro-cursor", { opacity: 0, x: 35, y: 35, duration: 0.4 }, 1.35)
            .to(".hero-intro-copy", { borderColor: "transparent", duration: 0.2 }, 1.5)
            .to(intro, {
              x: destination.left - bounds.left,
              y: destination.top - bounds.top,
              scale: destination.width / intro.offsetWidth,
              transformOrigin: "top left",
              duration: 0.85,
              ease: "power3.inOut",
            }, 1.45)
            .to(intro, { autoAlpha: 0, duration: 0.15 }, 2.3);
        }

        lines.forEach((line, index) => {
          entrance.from(line.querySelectorAll(".hero-letter"), {
            yPercent: 115,
            rotation: 8,
            opacity: 0,
            duration: 1.05,
            stagger: 0.035,
          }, headlineStart + index * 0.17);
        });
        entrance.from(".hero-description, .hero-bottom, .mobile-hero-cta", {
          y: 20, opacity: 0, duration: 0.75, stagger: 0.08,
        }, headlineStart + 0.55);
        // A transform on a descendant breaks background-clip:text on .hero-third, so drop them once idle.
        entrance.set(".hero-letter", { clearProps: "transform,willChange" });
        entrance.call(() => root.current!.classList.remove("is-animating"));

        // The entrance moves letters; the scroll animation moves their parent lines.
        gsap.to(lines, {
          xPercent: index => [-12, 9, -7][index],
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={root} className="creative-hero wrap" aria-labelledby="hero-heading">
      <div className="hero-intro" aria-hidden="true">
        <p className="hero-intro-copy">I <span className="hero-intro-insert">don’t just</span> build websites.</p>
        <span className="hero-intro-cursor"><MousePointer2 size={28} fill="currentColor" /><span>Sagar</span></span>
      </div>
      <p className="mobile-intro">More than just a website.</p>
      <h1 id="hero-heading" aria-label="I make creative experiences.">
        {["I make", "Creative", "experiences."].map((line, index) => (
          <span key={line} className={`hero-line hero-${["first", "second", "third"][index]}`} aria-hidden="true">
            {Array.from(line).map((letter, character) => <span className="hero-letter" key={character}>{letter === " " ? "\u00a0" : letter}</span>)}
          </span>
        ))}
      </h1>
      <p className="hero-description">Websites, visuals & stories.<br />Thoughtfully made to connect.<br />Hi, I’m Sagar Nepali.</p>
      <Link href="/contact" className="pill mobile-hero-cta">Let’s talk <ArrowUpRight size={22} /></Link>
      <div className="hero-bottom">
        <p className="hero-kicker">I <span>don’t just</span> build websites.</p>
        <a href="#services" className="scroll-cue" aria-label="Explore my services"><ArrowDown size={20} /></a>
        <SocialLinks />
      </div>
    </section>
  );
}
