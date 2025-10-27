// src/components/effects/ScrollFloat.tsx
'use client';
import { useEffect, useMemo, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
// ScrollTrigger is registered in the parent page, so we don't need to import it here,
// but it's good practice to know it's being used.

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef: React.RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  stagger?: number;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 2,
  stagger = 0.03
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(' ').map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.5ch]">
        {word.split('').map((char, charIndex) => (
          <span className="char inline-block" key={charIndex}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    // GSAP's context is the modern, safe way to handle animations and cleanup in React.
    const ctx = gsap.context(() => {
      // Guard clauses to ensure all required elements are present.
      if (!containerRef.current || !scrollContainerRef.current) return;

      const charElements = gsap.utils.toArray<HTMLSpanElement>(".char", containerRef.current);
      if (charElements.length === 0) return;

      gsap.fromTo(
        charElements,
        {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: '50% 0%'
        },
        {
          duration: animationDuration,
          ease: 'back.inOut(1.7)',
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger: stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollContainerRef.current, // Explicitly tell ScrollTrigger what to watch
            start: 'top 90%', // Start when the top of the text enters 90% from the bottom of the viewport
            end: 'bottom 60%', // End when the bottom of the text reaches 60% from the top
            scrub: 1.5 // A smooth scrub value
          }
        }
      );
    }, containerRef); // Scope the context to this component

    return () => ctx.revert(); // GSAP's cleanup function
  }, [children, scrollContainerRef, stagger, animationDuration]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${containerClassName}`}>
      <p className={`inline-block ${textClassName}`}>{splitText}</p>
    </div>
  );
};

export default ScrollFloat;