"use client";

import { useEffect, useRef, useState } from "react";
import { useLoad } from "@/context/LoadContext";
import { StaticImageData } from "next/image";
import MoiraiImage from '../../app/assets/Moirai.jpg';
import NudgeImage from '../../app/assets/Nudge.jpg';
import ChameleonDocsImage from '../../app/assets/ChameleonDocs.jpg';
import ASAPImage from '../../app/assets/ASAP.jpg';
import GlassBoxImage from '../../app/assets/GlassBox.jpg';

const ASSETS_TO_PRELOAD: (string | StaticImageData)[] = [
  MoiraiImage,
  NudgeImage,
  ChameleonDocsImage,
  GlassBoxImage,
  ASAPImage,
];

export default function Preloader() {
  const { isLoaded, setIsLoaded } = useLoad();
  const [mounted, setMounted] = useState(false);

  const preloaderRef = useRef<HTMLDivElement>(null);
  
  // The Shader Hole Element & its inner black cover
  const irisHoleRef = useRef<HTMLDivElement>(null);
  const holeCoverRef = useRef<HTMLDivElement>(null);

  // Typography Refs
  const flexContainerRef = useRef<HTMLDivElement>(null);
  const textRevealContainerRef = useRef<HTMLDivElement>(null);
  const textInnerRef = useRef<HTMLDivElement>(null);
  const slashRef = useRef<HTMLSpanElement>(null);
  const dotPlaceholderRef = useRef<HTMLDivElement>(null);
  
  // Slurp Targets (We include the non-breaking spaces here so they collapse too)
  const tharvRef = useRef<HTMLSpanElement>(null);
  const space1Ref = useRef<HTMLSpanElement>(null);
  const space2Ref = useRef<HTMLSpanElement>(null);
  const achchiRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoaded || !mounted) return;

    let loadedCount = 0;
    const totalAssets = ASSETS_TO_PRELOAD.length;

    const runAnimation = async () => {
      try {
        const gsapModule = await import("gsap");
        const gsap = gsapModule.default || gsapModule.gsap;

        // Initialize completely hidden to prevent flashes
        gsap.set(flexContainerRef.current, { opacity: 0 });
        gsap.set(textRevealContainerRef.current, { width: 0 });
        gsap.set(textInnerRef.current, { yPercent: 100, opacity: 0 });
        gsap.set(slashRef.current, { scaleY: 0, opacity: 0, transformOrigin: "bottom" });

        // Set the initial shader box dimensions
        gsap.set(irisHoleRef.current, {
          width: "min(300px, 60vw)",
          height: "min(400px, 60vh)",
          borderRadius: "0px",
          xPercent: -50,
          yPercent: -50,
          left: "50%",
          top: "50%"
        });

        // Tracking function: Keeps the shader hole perfectly tethered to the dot
        const trackDot = () => {
          if (!dotPlaceholderRef.current || !irisHoleRef.current) return;
          const rect = dotPlaceholderRef.current.getBoundingClientRect();
          gsap.set(irisHoleRef.current, {
            left: rect.left + rect.width / 2,
            top: rect.top + rect.height / 2,
          });
        };

        const getDotCenterX = () => {
          const r = dotPlaceholderRef.current?.getBoundingClientRect();
          return r ? r.left + r.width / 2 : window.innerWidth / 2;
        };

        const getDotCenterY = () => {
          const r = dotPlaceholderRef.current?.getBoundingClientRect();
          return r ? r.top + r.height / 2 : window.innerHeight / 2;
        };

        const tl = gsap.timeline({
          onComplete: () => setIsLoaded(true),
        });

        // 1. Fade in the Shader Box (Opacity of the black cover goes to 0)
        tl.to(holeCoverRef.current, {
          opacity: 0,
          duration: 1.2,
          ease: "power2.inOut",
        })
        .to({}, { duration: 0.2 }) // Slight pause

        // 2. Prep the text container (invisible, but allows dot to position itself in center)
        .set(flexContainerRef.current, { opacity: 1 })

        // 3. Smoothly Morph the Box into the Dot
        .to(irisHoleRef.current, {
          width: () => dotPlaceholderRef.current?.offsetWidth || 15,
          height: () => dotPlaceholderRef.current?.offsetHeight || 15,
           left: getDotCenterX,
           top: getDotCenterY,
          borderRadius: "50%",
          duration: 1.4,
          ease: "expo.inOut"
        })

        // 4. Slash appears like a lightsaber
        .to(slashRef.current, {
          scaleY: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(2)"
        })

        // 5. "Atharv R Gachchi" whips up from bottom & pushes out from Slash
        .to(textRevealContainerRef.current, {
          width: () => textInnerRef.current?.scrollWidth || 0,
          duration: 1.6,
          ease: "expo.inOut",
          onUpdate: trackDot // CRITICAL: Live track dot as the text pushes it right
        }, "whip")
        .to(textInnerRef.current, {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        }, "whip+=0.3")
        
        .to({}, { duration: 1 }) // Readability Pause

        // 6. Slurp into "ARG"
        .to([tharvRef.current, space1Ref.current, space2Ref.current, achchiRef.current], {
          width: 0,
          opacity: 0,
          duration: 1.4,
          ease: "expo.inOut",
          onUpdate: trackDot // Track the dot as it glides back towards the center
        })

        .to({}, { duration: 0.6 }) // Pause on "ARG /."

        // 7. Iris Out! Scale the transparent hole massively to reveal the site
        .to(irisHoleRef.current, {
          scale: 350, 
          duration: 1.8,
          ease: "power4.inOut",
          onUpdate: trackDot
        }, "iris")
        // Fade out the leftover text simultaneously
        .to(flexContainerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut"
        }, "iris");

      } catch {
        setIsLoaded(true);
      }
    };

    const checkDone = () => {
      loadedCount++;
      if (loadedCount >= totalAssets) {
        setTimeout(runAnimation, 200);
      }
    };

    if (totalAssets === 0) {
      setTimeout(runAnimation, 800);
    } else {
      ASSETS_TO_PRELOAD.forEach((asset) => {
        const url = typeof asset === "string" ? asset : asset.src;
        if (url.endsWith(".mp4") || url.endsWith(".webm")) {
          const video = document.createElement("video");
          video.src = url;
          video.onloadeddata = checkDone;
          video.onerror = checkDone; 
        } else {
          const img = new Image();
          img.src = url;
          img.onload = checkDone;
          img.onerror = checkDone;
        }
      });
    }
  }, [isLoaded, setIsLoaded, mounted]);

  if (isLoaded) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-auto bg-transparent"
    >
      <div className="absolute inset-0 z-10 w-full h-full" />

      {/* 
        THE IRIS OUT MASK 
        A massive 150vmax border acts as our solid black screen.
        The transparent center is what reveals the WebGL background underneath.
      */}
      <div 
        ref={irisHoleRef}
        className="fixed z-20 pointer-events-none"
        style={{
          boxSizing: 'content-box',
          border: '150vmax solid #050505',
          willChange: 'transform, width, height, left, top',
        }}
      >
        <div ref={holeCoverRef} className="w-full h-full bg-[#050505]" />
      </div>

      {/* THE TYPOGRAPHY ENGINE */}
      <div 
        ref={flexContainerRef}
        className="relative z-30 flex items-end justify-center mix-blend-difference text-white font-display uppercase tracking-tighter text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[6vw] leading-none opacity-0"
      >
        {/* TEXT REVEAL WRAPPER (Handles horizontal slide out) */}
        <div 
          ref={textRevealContainerRef} 
          className="flex items-end justify-end overflow-hidden whitespace-nowrap pb-2"
        >
          {/* INNER TEXT WRAPPER (Handles the vertical whip-up fade) */}
          <div ref={textInnerRef} className="flex items-end leading-none">
            <span>A</span>
            <span ref={tharvRef} className="inline-flex overflow-hidden">THARV</span>
            
            {/* Added exact gaps for 'Atharv R Gachchi' */}
            <span ref={space1Ref} className="inline-flex overflow-hidden w-[0.25em]" />
            
            <span>R</span>
            
            <span ref={space2Ref} className="inline-flex overflow-hidden w-[0.25em]" />
            
            <span>G</span>
            <span ref={achchiRef} className="inline-flex overflow-hidden">ACHCHI</span>
          </div>
        </div>

        {/* THE SLASH & DOT (Perfectly aligned to bottom baseline) */}
        <div className="flex items-end pb-2 ml-1 sm:ml-2">
          <span ref={slashRef} className="inline-block leading-none">/</span>
          <div 
            ref={dotPlaceholderRef} 
            className="w-[1.6vw] h-[1.6vw] min-w-[10px] min-h-[10px] rounded-full ml-1 mb-[0.12em]" 
          />
        </div>
      </div>
    </div>
  );
}