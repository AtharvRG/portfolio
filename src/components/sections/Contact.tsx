"use client";

import React, { useEffect, useState, useRef } from "react";
import { isSafari, isMobile } from "../../utils/detectBrowser";
import { ArrowRight } from "lucide-react";
import { useLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";

// --- Utility to split text into characters for GSAP ---
const SplitText = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <span className="inline-block overflow-visible pr-4">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`char-reveal inline-block origin-bottom ${className}`}
          style={{ willChange: "transform" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

interface MenuItemData {
  title: string;
  subtitle: string;
  link?: string;
  icon: React.ElementType;
}

const Mail: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}><title>Gmail</title><path fill="currentColor" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" /></svg>
);

const Github: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}><title>GitHub</title><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
);

const Twitter: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg role="img" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" {...props}><title>X</title><path fill="currentColor" d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" /></svg>
);

const Briefcase: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}><title>Upwork</title><path fill="currentColor" d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" /></svg>
);

const Sparkles: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg role="img" viewBox="0 0 600 600" width="900" height="900" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(0.000000,596.000000) scale(0.100000,-0.100000)">
      <path fill="currentColor" d="M2673 5088 c-5 -7 -19 -49 -32 -93 -193 -678 -692 -1264 -1335 -1569 -106 -50 -218 -93 -361 -139 l-100 -32 -3 -41 c-6 -80 -86 -74 971 -74 837 0 945 2 965 16 l22 15 0 945 c0 633 -3 952 -10 965 -8 15 -21 19 -59 19 -27 0 -53 -5 -58 -12z
M3031 5081 c-8 -13 -11 -316 -11 -965 l0 -945 22 -15 c20 -14 128 -16 963 -16 750 0 945 3 959 13 22 16 19 106 -4 117 -8 4 -87 31 -176 59 -506 163 -955 497 -1269 946 -148 212 -234 385 -325 655 l-56 165 -46 3 c-38 2 -49 -1 -57 -17z
M852 2908 c-13 -13 -16 -86 -4 -105 4 -7 55 -26 112 -44 295 -87 563 -225 825 -422 106 -81 319 -289 410 -403 205 -254 366 -560 460 -874 14 -46 31 -87 38 -92 22 -14 73 -8 90 10 16 17 17 98 17 965 0 846 -2 947 -16 961 -14 14 -115 16 -968 16 -727 0 -955 -3 -964 -12z
M3036 2904 c-14 -14 -16 -115 -16 -964 0 -1058 -6 -980 70 -980 50 0 63 14 85 96 54 208 186 495 319 694 316 476 775 827 1311 1002 88 28 163 57 167 62 12 17 9 81 -4 94 -9 9 -237 12 -964 12 -853 0 -954 -2 -968 -16z"/>
    </g>
  </svg>
);

const menuItems: MenuItemData[] = [
  { title: 'Send a Message', subtitle: 'atharv2703123@gmail.com', link: 'mailto:atharv2703123@gmail.com', icon: Mail },
  { title: 'GitHub', subtitle: 'Open Source', link: 'https://github.com/AtharvRG', icon: Github },
  { title: 'X / Twitter', subtitle: 'Thoughts & Updates', link: 'https://x.com/AGachchi', icon: Twitter },
  { title: 'Upwork', subtitle: 'Hire Me', link: 'https://www.upwork.com/freelancers/~0168dd8f2acf2fa1d9', icon: Briefcase },
  { title: 'Contra', subtitle: 'Independent Work', link: 'https://contra.com/atharv_rg', icon: Sparkles }
];

// --- The Direction-Aware Parallax Row ---
const FlowingRow: React.FC<MenuItemData & { speed?: number }> = ({
  title, subtitle, link, icon: Icon, speed = 15
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(4);

  const animationDefaults = { duration: 0.7, ease: "expo.out" };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };
    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [title]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      if (animationRef.current) animationRef.current.kill();

      const effectiveSpeed = (typeof window !== 'undefined' && (isSafari() || isMobile())) ? Math.max(speed * 2, 30) : speed;
      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: effectiveSpeed,
        ease: 'none',
        repeat: -1,
        force3D: true
      });
    };

    const timer = setTimeout(setupMarquee, 100);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) animationRef.current.kill();
    };
  }, [title, repetitions, speed]);

  const isAnimatingClick = useRef(false);

  const handleMouseEnter = (ev: { clientX: number, clientY: number }) => {
    if (isAnimatingClick.current) return;
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap.timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%', overwrite: 'auto' }, 0);
  };

  const handleMouseLeave = (ev: { clientX: number, clientY: number }) => {
    if (isAnimatingClick.current) return;
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap.timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%', overwrite: 'auto' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%', overwrite: 'auto' }, 0);
  };

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const onCursorEnter = (e: Event) => {
      const customEvent = e as CustomEvent;
      const clientX = customEvent.detail?.x ?? (el.getBoundingClientRect().left + el.offsetWidth / 2);
      const clientY = customEvent.detail?.y ?? (el.getBoundingClientRect().top + el.offsetHeight / 2);
      handleMouseEnter({ clientX, clientY });
    };

    const onCursorLeave = (e: Event) => {
      const customEvent = e as CustomEvent;
      const clientX = customEvent.detail?.x ?? (el.getBoundingClientRect().left + el.offsetWidth / 2);
      const clientY = customEvent.detail?.y ?? (el.getBoundingClientRect().top + el.offsetHeight / 2);
      handleMouseLeave({ clientX, clientY });
    };

    el.addEventListener('cursor-enter', onCursorEnter);
    el.addEventListener('cursor-leave', onCursorLeave);

    return () => {
      el.removeEventListener('cursor-enter', onCursorEnter);
      el.removeEventListener('cursor-leave', onCursorLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!link || isAnimatingClick.current) return;

    const isMobile = window.innerWidth <= 768 || window.matchMedia('(hover: none)').matches;

    if (isMobile) {
      ev.preventDefault();
      isAnimatingClick.current = true;

      // Force highlight visible
      if (marqueeRef.current && marqueeInnerRef.current) {
        gsap.to([marqueeRef.current, marqueeInnerRef.current], { y: '0%', duration: 0.4, ease: "expo.out", overwrite: "auto" });
      }

      if (animationRef.current) {
        // Race car speed up (0 to 100 in 2 seconds!)
        // timeScale 60 means it's running 60x faster than normal.
        gsap.to(animationRef.current, {
          timeScale: 150, // True blinding speed
          duration: 1.8,  // Faster ramp to hit top speed quicker
          ease: "power2.inOut", // Starts moving immediately (no laggy idle), accelerates hard, holds, then we catch it at the top
          onComplete: () => {
            // Slam the brakes
            gsap.to(animationRef.current, {
              timeScale: 0,
              duration: 0.5, // Firm, quick brake
              ease: "back.out(1.2)", // Minute spring effect instead of massive kickback
              onComplete: () => {
                // Open link
                if (link.startsWith('mailto:')) {
                  window.location.href = link;
                } else {
                  window.open(link, '_blank', 'noopener,noreferrer');
                }

                // Revert behind the scenes
                setTimeout(() => {
                  if (marqueeRef.current && marqueeInnerRef.current) {
                    gsap.to(marqueeRef.current, { y: '101%', duration: 0.5, ease: "power2.inOut" });
                    gsap.to(marqueeInnerRef.current, { y: '-101%', duration: 0.5, ease: "power2.inOut" });
                  }
                  if (animationRef.current) {
                    gsap.set(animationRef.current, { timeScale: 1 });
                  }
                  isAnimatingClick.current = false;
                }, 800);
              }
            });
          }
        });
      }
      return;
    }

    // Desktop
    if (link.startsWith('mailto:')) {
      window.location.href = link;
      return;
    }
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      ref={itemRef}
      onClick={handleClick}
      className="footer-row-anim relative w-full border-t border-white/20 py-8 md:py-12 overflow-hidden cursor-pointer group cursor-target block"
    >
      {/* 1. Base State (Black BG, White Text) */}
      <div className="relative z-10 flex justify-between items-center w-full px-4 md:px-12 pointer-events-none">
        <h2 className="font-display text-4xl sm:text-6xl md:text-[6vw] leading-none uppercase tracking-tighter pt-2 text-white">
          {title}
        </h2>
        <div className="flex items-center gap-4">
          <span className="font-sans text-[10px] md:text-sm uppercase tracking-widest hidden sm:block text-white">
            {subtitle}
          </span>
          <div className="relative overflow-hidden w-6 h-6 md:w-10 md:h-10">
            <ArrowRight className="absolute inset-0 -rotate-45 text-white transition-transform duration-[700ms] ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:translate-x-full group-hover:-translate-y-full" />
            <ArrowRight className="absolute inset-0 -rotate-45 -translate-x-full translate-y-full text-white transition-transform duration-[700ms] ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
          </div>
        </div>
      </div>

      {/* 2. Hover State (Orange BG, White Marquee + White Icons) */}
      <div
        ref={marqueeRef}
        // CHANGED: bg-white -> bg-accent
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none translate-y-[101%] bg-accent z-20"
      >
        <div className="h-full w-fit flex items-center" ref={marqueeInnerRef}>
          {[...Array(repetitions)].map((_, idx) => (
            <div className="marquee-part flex items-center flex-shrink-0" key={idx}>
              {/* CHANGED: text-[#050505] -> text-white */}
              <span className="whitespace-nowrap uppercase font-display text-4xl sm:text-6xl md:text-[6vw] leading-none tracking-tighter pt-2 px-[4vw] text-white">
                {title}
              </span>
              <div className="flex items-center justify-center">
                {/* CHANGED: text-[#050505] -> text-white */}
                <Icon className="w-10 h-10 md:w-16 md:h-16 text-white" strokeWidth={1.5} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main Contact Section ---
export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [time, setTime] = useState("");
  const [ms, setMs] = useState("");

  // Precision Clock
  useEffect(() => {
    // Use an interval to avoid rerendering every rAF frame — keeps CPU lower on Safari/Firefox
    let mounted = true;
    const tick = () => {
      if (!mounted) return;
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setMs(now.getMilliseconds().toString().padStart(3, '0').slice(0, 2));
    };
    tick();
    const id = window.setInterval(tick, 100);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  // GSAP Cinematic Entrance — lazily load ScrollTrigger when the section enters viewport.
  useEffect(() => {
    let ctx: gsap.Context | null = null;
    let observer: IntersectionObserver | null = null;

    const fallbackReveal = () => {
      const chars = containerRef.current?.querySelectorAll('.char-reveal') ?? [];
      const rows = containerRef.current?.querySelectorAll('.footer-row-anim') ?? [];
      const metas = containerRef.current?.querySelectorAll('.meta-reveal') ?? [];

      chars.forEach((el, i) => {
        const node = el as HTMLElement;
        node.style.transition = 'transform 1.2s cubic-bezier(.19,1,.22,1) ' + (i * 0.03) + 's, opacity 1.2s ' + (i * 0.03) + 's';
        node.style.transform = 'translateY(0%) rotateZ(0deg) scale(1)';
        node.style.opacity = '1';
      });
      rows.forEach((el, i) => {
        const node = el as HTMLElement;
        node.style.transition = 'transform 1.2s cubic-bezier(.19,1,.22,1) ' + (i * 0.1) + 's';
        node.style.transform = 'translateY(0%)';
      });
      metas.forEach((el, i) => {
        const node = el as HTMLElement;
        node.style.transition = 'transform 1s cubic-bezier(.19,1,.22,1) ' + (i * 0.05) + 's';
        node.style.transform = 'translateY(0%)';
      });
    };

    const onIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach(async (entry) => {
        if (!entry.isIntersecting) return;

        // If Safari, use the lightweight fallback (Safari's ScrollTrigger + heavy transforms can be janky)
        if (isSafari()) {
          fallbackReveal();
          if (observer) observer.disconnect();
          return;
        }

        try {
          const ScrollTriggerModule = await import('gsap/ScrollTrigger');
          gsap.registerPlugin(ScrollTriggerModule.ScrollTrigger);

          ctx = gsap.context(() => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 75%'
              }
            });

            tl.fromTo('.char-reveal',
              { yPercent: 130, rotateZ: 10, scale: 0.9, opacity: 0 },
              { yPercent: 0, rotateZ: 0, scale: 1, opacity: 1, duration: 1.2, stagger: 0.03, ease: 'expo.out' }
            )
              .fromTo('.footer-row-anim',
                { yPercent: 100 },
                { yPercent: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out' },
                '-=0.8'
              )
              .fromTo('.meta-reveal',
                { yPercent: 100 },
                { yPercent: 0, duration: 1, stagger: 0.05, ease: 'expo.out' },
                '-=0.9'
              );
          }, containerRef);

          if (observer) observer.disconnect();
        } catch (err) {
          // If dynamic import fails, fall back to simple reveal
          fallbackReveal();
          if (observer) observer.disconnect();
        }
      });
    };

    if (containerRef.current) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.25 });
      observer.observe(containerRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (ctx) ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex flex-col pt-32 z-10 text-zinc-100 overflow-hidden bg-transparent">

      {/* TOP: THE EDITORIAL HEADER */}
      <div className="flex flex-col items-start w-full px-4 md:px-12 mb-16 md:mb-24">
        <div className="flex items-center gap-3 mb-8 md:mb-12 overflow-hidden">
          <div className="meta-reveal flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <p className="about-label font-sans text-xs md:text-sm uppercase tracking-widest text-gray-400">
              04 // Initiate Contact
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-x-2 sm:gap-x-4 md:gap-x-8 w-full flex-nowrap whitespace-nowrap">
          <div className="overflow-hidden pb-2 md:pb-4 flex-shrink-0">
            <h1 className="text-[13.5vw] sm:text-[13vw] md:text-[9vw] tracking-tighter text-white font-agno leading-none">
              <SplitText text="HAVE AN" />
            </h1>
          </div>
          <div className="overflow-hidden pb-2 md:pb-4 pr-1 md:pr-8 flex-shrink-0">
            <h1 className="font-accent italic text-accent text-[13.5vw] sm:text-[14vw] md:text-[10vw] tracking-tight leading-none">
              <SplitText text="idea?" />
            </h1>
          </div>
        </div>
      </div>

      {/* MIDDLE: THE DIRECTION-AWARE MARQUEE ROWS */}
      <div className="w-full flex flex-col mt-auto border-b border-white/20">
        {menuItems.map((item, idx) => (
          <div key={idx} className="overflow-hidden">
            <FlowingRow {...item} />
          </div>
        ))}
      </div>

      {/* BOTTOM: TECHNICAL META DATA */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 px-4 md:px-12 py-8 gap-8 md:gap-0">
        <div className="flex flex-col items-start justify-center">
          <div className="overflow-hidden"><p className="meta-reveal font-agno text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1">Local Time (GMT +5:30)</p></div>
          <div className="overflow-hidden">
            <div className="meta-reveal cursor-target flex items-baseline font-sans text-sm md:text-base uppercase tracking-widest text-zinc-300 tabular-nums w-[120px]">
              <span>{time || "00:00:00"}</span>
              <span className="text-[10px] text-zinc-400 ml-1 w-[20px]">:{ms || "00"}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-center justify-center">
          <div className="overflow-hidden"><p className="meta-reveal font-agno text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1">Location</p></div>
          <div className="overflow-hidden">
            <p className="meta-reveal font-sans text-sm md:text-base uppercase tracking-widest text-zinc-300 cursor-target">Planet Earth</p>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end justify-center col-span-2 md:col-span-1">
          <div className="overflow-hidden"><p className="meta-reveal font-agno text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1">Navigation</p></div>
          <div className="overflow-hidden">
            <button
              onClick={() => lenis?.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })}
              className="meta-reveal group font-sans text-sm md:text-base uppercase tracking-widest text-zinc-300 hover:text-white transition-colors cursor-target"
            >
              Back to Top <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">↑</span>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}