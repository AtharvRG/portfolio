"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const text = "I am a creative digital engineer specializing in building immersive experiences. I blend high-end aesthetic design with flawless technical execution to craft websites that leave a lasting impression.";
  const words = text.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordElements = gsap.utils.toArray<HTMLElement>(".word");

      gsap.fromTo(
        wordElements,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".about-label",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center px-6 sm:px-12 md:px-24 py-24 z-10 mix-blend-difference"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-0">

        {/* Left Column: Section Label */}
        <div className="md:col-span-4 flex flex-col justify-start">
          <p className="about-label font-sans text-xs md:text-sm uppercase tracking-widest text-gray-400">
            01 // About Me
          </p>
        </div>

        {/* Right Column: Massive Scrubbing Text */}
        <div
          ref={textRef}
          className="md:col-span-8 flex flex-wrap gap-x-[1.5vw] gap-y-[1vw] items-baseline"
        >
          {words.map((word, index) => {
            const isHighlight = ["immersive", "experiences.", "flawless"].includes(word);
            const isDotted = word.includes("impression");

            // We move the sizing INTO the conditions so we can boost the dotted font
            let fontClasses = " font-sans uppercase tracking-tight text-[8vw] sm:text-[6vw] md:text-[4.5vw]";

            if (isHighlight) {
              fontClasses = " cursor-target font-accent italic text-accent lowercase text-[8vw] sm:text-[6vw] md:text-[4.5vw]";
            } else if (isDotted) {
              // Boosted size by ~25% to match the visual weight of the sans font!
              // Also added a slight downward transform if the baseline looks too high
              fontClasses = " cursor-target font-agno uppercase tracking-tight text-[10vw] sm:text-[7.5vw] md:text-[5.5vw] translate-y-[4px]";
            }

            return (
              <span
                key={index}
                className={`word leading-[1.1] text-white ${fontClasses}`}
              >
                {word}
              </span>
            );
          })}
        </div>

      </div>
    </section>
  );
}