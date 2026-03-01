"use client";

import { useEffect, useRef, useState } from "react";
import { isSafari } from "../../utils/detectBrowser";
import { useLoad } from "@/context/LoadContext";
import Counter from "./Counter";
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
  // Set accurate loading state starting from 0 and moving up
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded) return;

    let loadedCount = 0;
    const totalAssets = ASSETS_TO_PRELOAD.length;

    // A proxy object for GSAP to animate the number smoothly — we will lazy-load GSAP.
    const progressObj: { value: number } = { value: 0 };

    let gsapInstance: any = null;
    let gsapAvailable = false;

    const animateWithGSAP = async (targetProgress: number) => {
      try {
        const gsapModule = (await import('gsap')) as any;
        gsapInstance = gsapModule.default ?? gsapModule;
        gsapAvailable = true;
        return new Promise<void>((resolve) => {
          gsapInstance.to(progressObj, {
            value: targetProgress,
            duration: 2.5,
            ease: 'power2.inOut',
            onUpdate: () => setProgress(progressObj.value),
            onComplete: () => resolve(),
          });
        });
      } catch (err) {
        gsapAvailable = false;
        // Fallback: simple linear increment
        return new Promise<void>((resolve) => {
          const start = progressObj.value;
          const delta = targetProgress - start;
          const duration = 600; // ms
          const startTime = performance.now();
          const step = (t: number) => {
            const elapsed = t - startTime;
            const p = Math.min(1, elapsed / duration);
            progressObj.value = start + delta * p;
            setProgress(progressObj.value);
            if (p < 1) requestAnimationFrame(step);
            else resolve();
          };
          requestAnimationFrame(step);
        });
      }
    };

    const updateProgress = async () => {
      loadedCount++;
      const targetProgress = totalAssets > 0 ? (loadedCount / totalAssets) * 100 : 100;

      await animateWithGSAP(targetProgress);

      if (loadedCount === totalAssets || totalAssets === 0) {
        setTimeout(triggerOutro, 1800);
      }
    };

    const triggerOutro = async () => {
      if (!isSafari()) {
        try {
          if (!gsapInstance) {
            const gsapModule = (await import('gsap')) as any;
            gsapInstance = gsapModule.default ?? gsapModule;
          }

          const tl = gsapInstance.timeline({
            onComplete: () => setIsLoaded(true),
          });

          tl.to(textRef.current, {
            scale: 1.5,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.inOut',
          }).to(
            containerRef.current,
            {
              yPercent: -100,
              duration: 1.2,
              ease: 'power4.inOut',
              roundProps: 'y',
            },
            '-=0.4'
          );
        } catch (err) {
          // If GSAP fails, just mark loaded and hide immediately
          setIsLoaded(true);
        }
      } else {
        // Safari fallback: simple CSS transition
        if (textRef.current) {
          textRef.current.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
          textRef.current.style.transform = 'scale(1.5)';
          textRef.current.style.opacity = '0';
        }
        if (containerRef.current) {
          containerRef.current.style.transition = 'transform 1.2s ease';
          containerRef.current.style.transform = 'translateY(-100%)';
        }
        setTimeout(() => setIsLoaded(true), 1400);
      }
    };

    // Preload Logic
    if (totalAssets === 0) {
      // If no assets, just fake a 1.5s loading time for the aesthetic
      setTimeout(updateProgress, 1500);
    } else {
      ASSETS_TO_PRELOAD.forEach((asset) => {
        // Next.js StaticImageData objects store their URL in the .src property
        const url = typeof asset === 'string' ? asset : asset.src;

        if (url.endsWith(".mp4") || url.endsWith(".webm")) {
          const video = document.createElement("video");
          video.src = url;
          video.onloadeddata = updateProgress;
          video.onerror = updateProgress; // Continue even if one fails
        } else {
          const img = new Image();
          img.src = url;
          img.onload = updateProgress;
          img.onerror = updateProgress;
        }
      });
    }
  }, [isLoaded, setIsLoaded]);

  if (isLoaded) return null;

  return (
    <div
      ref={containerRef}
      // Changed to items-center justify-center
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
    >
      <div
        ref={textRef}
        className="flex items-end font-display leading-none text-white mix-blend-difference text-center"
      >
        <Counter
          value={progress} // Raw float ensures continuous odometer rolling
          places={[100, 10, 1]} // Forces DOM to keep 100 array intact, stops the components from illegally re-mounting resulting in snaps
          fontSize={typeof window !== 'undefined' && window.innerWidth > 768 ? 200 : 120} // Safe for SSR routing
          textColor="white"
          fontWeight={900}
          className="font-display tracking-tighter mix-blend-difference" // apply typography class
          gradientHeight={0}
          padding={10}
        />
        <span className="text-[12vw] md:text-[6vw] leading-none ml-2 tracking-tighter" style={{ marginBottom: typeof window !== 'undefined' && window.innerWidth > 768 ? '1.5rem' : '0.75rem' }}>%</span>
      </div>
    </div>
  );
}