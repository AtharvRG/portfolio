// src/components/portfolio/FlowingMenu.tsx
'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

// The props interface is updated to use 'logos' instead of 'image'
interface MenuItemProps {
  link: string;
  text: string;
  logos?: string[];
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

// This component is the fundamental "tile" of our marquee content.
// It is wrapped in forwardRef so we can measure its width.
const MarqueeBelt = React.forwardRef<HTMLDivElement, { text: string, logos: string[] }>(
  ({ text, logos }, ref) => (
    <div ref={ref} className="flex items-center shrink-0">
      {/* Repeat the pattern a few times to ensure the belt is long enough for measurement */}
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="flex items-center shrink-0">
          <span className="text-olive-dark uppercase font-sans font-bold text-[4vh] leading-[1.2] px-8 whitespace-nowrap">
            {text}
          </span>
          <div className="flex items-center gap-6 shrink-0">
            {logos.map((src, i) => (
              <Image key={i} src={src} alt={`${text} logo ${i}`} width={56} height={56} className="object-contain" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
);
MarqueeBelt.displayName = 'MarqueeBelt';

const MenuItem: React.FC<MenuItemProps> = ({ link, text, logos = [] }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null); // This is the element we will animate
  const anchorTextRef = React.useRef<HTMLSpanElement>(null);
  const beltRef = useRef<HTMLDivElement>(null); // This is the element we will measure

  // *** THE DEFINITIVE FIX: ROBUST GSAP ANIMATION LOGIC ***
  useEffect(() => {
    // Use gsap.context for proper cleanup in React, scoped to the component's main element
    const ctx = gsap.context(() => {
      if (!marqueeInnerRef.current || !beltRef.current) return;

      const PIXELS_PER_SECOND = 80;
      let tween: gsap.core.Tween | null = null;

      const setupMarquee = () => {
        const beltWidth = beltRef.current!.offsetWidth;
        const duration = beltWidth / PIXELS_PER_SECOND;

        if (tween) tween.kill(); // Kill any previous animation
        gsap.set(marqueeInnerRef.current, { x: 0 }); // Reset position before starting

        // Animate the CONTAINER of the belts, not the belts themselves. This is key.
        tween = gsap.to(marqueeInnerRef.current, {
          x: -beltWidth, // Move left by the width of one belt
          duration: duration,
          ease: 'none',
          repeat: -1, // Loop forever
        });
      };

      // Use a ResizeObserver on the first belt. It fires when the layout is calculated.
      const observer = new ResizeObserver(() => {
        // We only need the first measurement
        if (beltRef.current!.offsetWidth > 0) {
          setupMarquee();
          // Once we have the width, we can stop observing to save performance.
          observer.disconnect();
        }
      });
      observer.observe(beltRef.current);

      return () => {
        observer.disconnect();
        if (tween) tween.kill();
      };
    }, itemRef);

    return () => ctx.revert(); // Cleanup function for the context
  }, []);

  // ORIGINAL HOVER LOGIC (proven to work)
  const animationDefaults = { duration: 0.6, ease: 'expo' };
  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };
  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    gsap.to(marqueeRef.current, { y: '0%', duration: 0.6, ease: 'expo' });
  };
  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    gsap.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%', duration: 0.6, ease: 'expo' });
  };

  return (
    <div className="flex-1 relative overflow-hidden text-center border-b border-olive-light" ref={itemRef}>
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-wistle text-off-white text-[3.5vh]"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span ref={anchorTextRef}>{text}</span>
      </a>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-off-white translate-y-[101%]"
        ref={marqueeRef}
      >
        {/*
          THE NEW JSX STRUCTURE: A single flex container holding the two content belts.
          We animate this container ('marqueeInnerRef').
        */}
        <div 
          className="h-full flex items-center absolute top-0 left-0"
          ref={marqueeInnerRef}
        >
          <MarqueeBelt ref={beltRef} text={text} logos={logos} />
          <MarqueeBelt text={text} logos={logos} />
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;