// src/components/portfolio/Projects.tsx
'use client';
import React from 'react';
import Expandable from '@/components/animata/carousel/expandable';
import { useEffect, useRef, useState } from 'react';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';

// The final, placeholder-free data for your projects
const projectItems = [
  {
    image: "https://www.colorhexa.com/194254.png",
    title: "Fractal",
    description: "Fractal is a web-based, multi-file code playground that parses code live with Tree-sitter for instant AST exploration. It allows users to create, organize, and share snippets via compressed URLs or GitHub Gists.",
    video: "/project/Fractal-1.mp4",
  },
  {
    image: "https://www.colorhexa.com/1c485c.png",
    title: "Lemma",
    description: "Lemma is an in-browser time-travel debugger that records your code's execution, letting you step through it like a movie. Instantly debug JavaScript, Python, Go, Rust, and C++ with zero installation, and share your entire session with a single link.",
    video: "/project/Lemma-1.mp4"
  },
  {
    image: "https://www.colorhexa.com/1e4f65.png",
    title: "Arth⠀Shikshak",
    description: "Arth Shikshak is a personalized financial intelligence platform. It helps you track, analyze, plan, and achieve your financial goals with ease and confidence.",
    video: "/project/ArthShikshak-1.mp4"
  },
  {
    image: "https://www.colorhexa.com/21556d.png",
    title: "Fuel⠀Forge",
    description: "Fuel-Forge is an AI-powered fuel blending optimization platform that uses machine learning to predict fuel properties. It helps optimize blend compositions for gasoline and diesel fuels.",
    video: "/project/FuelForge-1.mp4"
  },
  {
    image: "https://www.colorhexa.com/235c76.png",
    title: "Revera",
    description: "Revera is a decentralized prediction market platform built on the Sui blockchain. It allows users to create, participate in, and manage markets for a wide range of events, leveraging blockchain technology for transparency, security, and fairness.",
    video: "/project/Revera-1.mp4"
  },
];

export default function Projects() {
  const [showMessage, setShowMessage] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Called by Expandable when user hovers a section
  const handleSectionHover = (hoveredIndex: number, currentActive: number) => {
    setActiveIndex(currentActive);
    if (hoveredIndex !== currentActive) {
      setShowMessage(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setShowMessage(true);
      }, 5000);
    } else {
      // If hovering active, keep message visible and reset timer
      setShowMessage(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setShowMessage(true);
      }, 5000);
    }
  };

  useEffect(() => {
    // Show message on mount, start timer
    setShowMessage(true);
    timerRef.current = setTimeout(() => {
      setShowMessage(true);
    }, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <SectionWrapper>
      <SectionHeader title="Projects" shapeType="rectangle" />
      <div className="h-full flex items-center justify-center">
        <div className="w-full max-w-7xl px-8">
          <div className="w-full flex flex-col items-center justify-center">
            <span
              className={`mb-4 px-4 py-2 rounded bg-black/10 text-off-white text-sm transition-opacity duration-700 ${showMessage ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              style={{ zIndex: 1 }}
            >
              Hover over to each section for different project details
            </span>
            <Expandable list={projectItems} className="h-[65vh] max-h-[550px]" onSectionHover={handleSectionHover} />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}