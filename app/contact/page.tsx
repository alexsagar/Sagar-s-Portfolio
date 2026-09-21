import AnimatedSection from "@/components/portfolio/AnimatedSection";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import ContactForm from "@/components/portfolio/ContactForm";
import { SiteFooter, SiteHeader } from "@/components/portfolio/SiteChrome";

export const metadata: Metadata = { title: "Let’s talk | Sagar Nepali", description: "Talk to Sagar Nepali about website design, photo editing, video editing, digital marketing, and SEO.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <div id="top" className="creative-site"><SiteHeader /><main id="main"><AnimatedSection className="contact-hero"><h1>Your next idea.<br />Let’s bring it<br />to life.</h1><a className="pill pill-light" href="#contact-form">Tell me about it <ArrowUpRight size={23} /></a><p>Or email <a href="mailto:alexsagar07@gmail.com">alexsagar07@gmail.com</a></p></AnimatedSection><AnimatedSection id="contact-form" className="contact-form-section wrap"><h2>Drop me a line.</h2><ContactForm /></AnimatedSection></main><SiteFooter /></div>;
}
