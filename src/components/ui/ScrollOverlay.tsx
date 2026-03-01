"use client";

import { useEffect, useRef } from "react";
import { isSafari } from "../../utils/detectBrowser";

export default function ScrollOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: unknown = null;
    let rafId = 0;
    let cleanupFallback: (() => void) | null = null;

    const setupWithGSAP = async () => {
      try {
        const gsapModule = (await import('gsap')) as typeof import('gsap');
        const ScrollTriggerModule = (await import('gsap/ScrollTrigger')) as typeof import('gsap/ScrollTrigger');

        type GsapLike = {
          default?: unknown;
          registerPlugin?: (p?: unknown) => void;
          context?: (fn: () => void) => { revert?: () => void };
          fromTo?: (...args: unknown[]) => void;
        };

        const gsap = (gsapModule.default as GsapLike) ?? (gsapModule as unknown as GsapLike);
        const scrollTriggerModuleTyped = ScrollTriggerModule as unknown as { ScrollTrigger?: unknown; default?: unknown };
        const ScrollTrigger = scrollTriggerModuleTyped.ScrollTrigger ?? scrollTriggerModuleTyped.default ?? ScrollTriggerModule;
        gsap.registerPlugin?.(ScrollTrigger);

        ctx = gsap.context ? gsap.context(() => {
          gsap.fromTo?.(
            overlayRef.current,
            { opacity: 0 },
            {
              opacity: 0.7,
              scrollTrigger: {
                trigger: document.body,
                start: '100px top',
                end: '500px top',
                scrub: true,
              },
            }
          );
        }) : null;
      } catch {
        // If GSAP fails to load, fallback to a lightweight scroll handler
        fallbackScroll();
      }
    };

    const fallbackScroll = () => {
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        rafId = requestAnimationFrame(() => {
          const y = window.scrollY || window.pageYOffset;
          // Map scroll 0..500 -> opacity 0..0.7
          const t = Math.max(0, Math.min(1, (y - 100) / 400));
          if (overlayRef.current) overlayRef.current.style.opacity = String(0.7 * t);
          ticking = false;
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      // Initial set
      onScroll();
      // cleanup will remove listener and cancel raf below
      cleanupFallback = () => window.removeEventListener('scroll', onScroll);
    };

    if (isSafari()) {
      fallbackScroll();
    } else {
      setupWithGSAP();
    }

    return () => {
      const maybeCtx = ctx as { revert?: () => void } | null;
      if (maybeCtx?.revert) maybeCtx.revert();
      if (cleanupFallback) cleanupFallback();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      // Fixed to background, z-[-40] puts it above WebGL (z-50) but below Content
      className="fixed inset-0 w-full h-full pointer-events-none bg-black/40 md:backdrop-blur-[6px] z-[-40]"
    />
  );
}