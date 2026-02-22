"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate from 0 opacity to 1 as you scroll down
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        {
          opacity: 0.7, // Reduced from 1 to make it less dark
          scrollTrigger: {
            trigger: document.body,
            start: "100px top", // Starts fading 100px down
            end: "500px top",   // Fully faded by 800px down
            scrub: true,        // Tied directly to scrollbar
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={overlayRef}
      // Fixed to background, z-[-40] puts it above WebGL (z-50) but below Content
      className="fixed inset-0 w-full h-full pointer-events-none bg-black/40 md:backdrop-blur-[6px] z-[-40]"
    />
  );
}