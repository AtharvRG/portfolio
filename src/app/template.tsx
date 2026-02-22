"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLoad } from "@/context/LoadContext";

export default function Template({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useLoad();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // DO NOT run the page transition if the initial preloader is still running
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Ensure content starts hidden and scaled down slightly
      gsap.set(contentRef.current, { opacity: 0, scale: 0.98, y: 40 });

      // 1. Curtain slides up
      tl.to(overlayRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
      })
      // 2. Content scales and fades in
      .to(contentRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      }, "-=0.6");
    });

    return () => ctx.revert();
  }, [isLoaded]); // Re-run this effect once isLoaded becomes true

  return (
    <>
      {/* The Route Transition Curtain (Only visible on page changes, not initial load) */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-black pointer-events-none"
        style={{ transform: "translateY(0%)" }}
      />

      {/* The Page Content */}
      <div ref={contentRef} className="opacity-0">
        {children}
      </div>
    </>
  );
}