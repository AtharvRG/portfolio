"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TECH_CATEGORIES = [
  {
    title: "Languages",
    items: ["Python", "Go (Golang)", "Solidity", "Move", "Rust", "TypeScript", "SQLite", "MongoDB", "PostgreSQL"],
  },
  {
    title: "Frameworks",
    items: ["Next.js", "React", "Vite", "Flutter", "TailwindCSS", "Tree-sitter", "QuickJS (WASM)", "Electron.js", "Tensorflow", "PyTorch", "Scikit-learn"],
  },
  {
    title: "AI & Cloud",
    items: ["LLM Agents", "Groq API", "Google Gemini API", "RAG Pipelines", "Supabase", "MongoDB Atlas", "Solana", "Ethereum", "SUI"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Linux", "WSL"],
  },
];

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Header Fade-In
      gsap.fromTo(
        ".arsenal-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // 2. The Premium "Active Zone" Spotlight Logic
      const rows = gsap.utils.toArray<HTMLElement>(".tech-row");

      rows.forEach((row) => {
        const title = row.querySelector(".tech-title");
        const items = row.querySelectorAll(".tech-item");

        // First, fade the row in as it enters the screen
        gsap.fromTo(
          row,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
            },
          }
        );

        // Then, create the "Spotlight" effect when it hits the center of the screen
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 55%", // Triggers when the top of the row hits the middle of the screen
            end: "bottom 45%", // Ends when the bottom of the row leaves the middle
            // toggleActions dictate what happens on: [Enter, Leave, Enter-Back, Leave-Back]
            toggleActions: "play reverse play reverse",
          }
        });

        // The Spotlight Animations
        tl.to(row, {
          backgroundColor: "rgba(243, 90, 13, 0.08)", // A highly premium, subtle orange wash
          borderColor: "rgba(255, 255, 255, 0.4)", // Brighten the bottom border
          duration: 0.5,
          ease: "power2.out",
        }, 0)
          .to(title, {
            color: "#f35a0d", // Shift from Orange to White
            x: 20, // Elegant glide to the right
            duration: 0.5,
            ease: "power3.out",
          }, 0)
          .to(items, {
            color: "#ffffff", // Dim gray to bright white
            duration: 0.4,
            stagger: 0.02, // Lights them up one-by-one rapidly like a switchboard
            ease: "power2.out",
          }, 0);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen py-32 px-4 sm:px-8 md:px-16 lg:px-24 z-10 mix-blend-difference text-white"
    >
      {/* Section Header */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between border-b border-white/20 pb-8 mb-16 overflow-hidden">
        <h2 className="arsenal-header font-display text-[12vw] md:text-[8vw] leading-none tracking-tighter uppercase">
          The Arsenal
        </h2>
        <p className="arsenal-header font-sans text-sm md:text-base text-gray-400 max-w-xs mt-6 md:mt-0 uppercase tracking-widest">
          Tools & technologies utilized to engineer digital perfection.
        </p>
      </div>

      {/* The Editorial List */}
      <div className="w-full flex flex-col">
        {TECH_CATEGORIES.map((category, index) => (
          <div
            key={index}
            // Added -mx-6 and px-6 so the background highlight bleeds beautifully outside the text bounds
            className="tech-row flex flex-col lg:flex-row border-b border-white/10 py-10 lg:py-16 -mx-4 px-4 md:-mx-8 md:px-8 bg-transparent"
          >
            {/* Left Side: Category Title */}
            <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
              <h3 className="tech-title font-accent italic text-[10vw] sm:text-[8vw] lg:text-[4.5vw] text-white leading-none lowercase tracking-tight">
                {category.title}
              </h3>
            </div>

            {/* Right Side: The Tech Items */}
            <div className="w-full lg:w-2/3 flex flex-wrap gap-x-6 gap-y-4 md:gap-x-10 md:gap-y-6 items-center">
              {category.items.map((item, i) => (
                <span
                  key={i}
                  // Start as a dimmed gray
                  className="tech-item font-sans text-lg md:text-2xl lg:text-3xl uppercase tracking-tight text-gray-600 cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}