// src/app/portfolio/page.tsx
'use client'; // This page now handles GSAP setup, so it must be a client component.
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Arsenal from "@/components/portfolio/Arsenal";
import Projects from "@/components/portfolio/Projects";
import Contact from "@/components/portfolio/Contact";

export default function PortfolioPage() {
  const mainRef = useRef<HTMLElement>(null);

  // THE FIX: Register the GSAP plugin ONCE when the page mounts.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <main ref={mainRef} className="bg-olive-dark h-screen w-full overflow-y-scroll snap-y snap-proximity scroll-smooth">
      <Hero />
      {/* Pass the ref down to any component that uses ScrollTrigger */}
      <About scrollContainerRef={mainRef} />
      <Arsenal />
      <Projects />
      <Contact />
    </main>
  );
}