"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github, Instagram, Linkedin, X } from "lucide-react";
import { socialMedia } from "@/data";
import { motion, useReducedMotion } from "framer-motion";

export function Wordmark() {
  return <span className="wordmark">sagar<span>nepali<span className="wordmark-dot">.</span></span></span>;
}

export function SocialLinks() {
  const icons = [Github, Instagram, Linkedin];
  return <div className="social-links">{socialMedia.map((social, index) => {
    const Icon = icons[index];
    return <a key={social.id} href={social.link} target="_blank" rel="noopener noreferrer" aria-label={social.name}><Icon size={21} strokeWidth={2} /></a>;
  })}</div>;
}

export function SiteHeader() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <motion.header initial={reduced ? false : { y: -25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="site-header wrap">
      <Link href="/" aria-label="Sagar Nepali home"><Wordmark /></Link>
      <nav className="desktop-nav" aria-label="Main navigation"><Link href="/projects">Projects</Link><Link href="/#about">About me</Link><Link href="/#services">Services</Link><Link href="/blog">Blog</Link></nav>
      <Link href="/contact" className="pill header-contact">Let’s talk <span aria-hidden="true">↗</span></Link>
      <button ref={trigger} className="menu-toggle" aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-menu" onClick={() => { menu.current?.showModal(); setOpen(true); }}><span /><span /></button>
    </motion.header>
    <dialog ref={menu} id="mobile-menu" className="mobile-menu" onClose={() => { setOpen(false); trigger.current?.focus(); }}>
      <div className="mobile-menu-top"><Wordmark /><button onClick={() => menu.current?.close()} aria-label="Close navigation"><X size={30} /></button></div>
      <nav aria-label="Mobile navigation">{[["Home", "/"], ["Projects", "/projects"], ["About me", "/#about"], ["Services", "/#services"], ["Blog", "/blog"], ["Let’s talk", "/contact"]].map(([label, href]) => <Link key={label} href={href} onClick={() => menu.current?.close()}>{label}<ArrowUpRight /></Link>)}</nav>
      <SocialLinks />
    </dialog>
  </>;
}

export function SiteFooter() {
  const reduced = useReducedMotion();
  return <footer>
    <Link href="/contact" className="footer-marquee" aria-label="Let’s work together"><span aria-hidden="true">Let’s work together! <span>✳</span> Let’s work together! <span>✳</span>&nbsp;</span></Link>
    <motion.div initial={reduced ? false : { y: 70 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="footer-panel"><div className="footer-grid">
      <div className="footer-brand"><Link href="/" aria-label="Sagar Nepali home"><Wordmark /></Link><p>Creative work. Real connections.<br />Kathmandu, Nepal.</p><SocialLinks /></div>
      <div><h2>Explore</h2><Link href="/">Home <ArrowUpRight /></Link><Link href="/projects">Projects <ArrowUpRight /></Link><Link href="/#about">About me <ArrowUpRight /></Link><Link href="/#services">Services <ArrowUpRight /></Link><Link href="/blog">Blog & Insights <ArrowUpRight /></Link><Link href="/contact">Contact <ArrowUpRight /></Link></div>
      <div><h2>Have something in mind?</h2><a href="mailto:alexsagar07@gmail.com" className="footer-email">alexsagar07@gmail.com <ArrowUpRight /></a><p>Websites, visuals, videos,<br />and your next big idea.</p></div>
    </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Sagar Nepali</span><span>Made with care, in Kathmandu.</span><a href="#top">Back to top ↑</a></div></motion.div>
  </footer>;
}
