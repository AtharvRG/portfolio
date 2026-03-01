"use client";

import { useEffect, useRef } from "react";
import { isSafari } from "../../utils/detectBrowser";

export default function ScrollOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any = null;
    let rafId = 0;

    const setupWithGSAP = async () => {
      try {
        const gsapModule = (await import('gsap')) as any;
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        const gsap = gsapModule.default ?? gsapModule;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger ?? ScrollTriggerModule.default ?? ScrollTriggerModule;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.fromTo(
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
        });
      } catch (err) {
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
      (fallbackScroll as any)._cleanup = () => window.removeEventListener('scroll', onScroll);
    };

    if (isSafari()) {
      fallbackScroll();
    } else {
      setupWithGSAP();
    }

    return () => {
      if (ctx && typeof ctx.revert === 'function') ctx.revert();
      if ((fallbackScroll as any)._cleanup) (fallbackScroll as any)._cleanup();
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