// src/app/Options.tsx
'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import React, { useRef, useEffect, MutableRefObject, HTMLAttributes, CSSProperties, useState } from 'react';
import { useRouter } from 'next/navigation';

// --- Sub-components for the Variable Proximity Effect ---

function useMousePosition(containerRef: MutableRefObject<HTMLElement | null>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = 'touches' in ev ? ev.touches[0].clientX : ev.clientX;
      const clientY = 'touches' in ev ? ev.touches[0].clientY : ev.clientY;
      x.set(clientX - rect.left);
      y.set(clientY - rect.top);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('touchmove', updateMousePosition, { passive: true });
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('touchmove', updateMousePosition);
    };
  }, [containerRef, x, y]);

  return { x, y };
}

const Letter = ({ char, mousePosition, radius }: { char: string; mousePosition: { x: any; y: any }; radius: number; }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const distance = useMotionValue(Infinity);

  useEffect(() => {
    if (!ref.current) return;
    const { x, y } = mousePosition;

    const updateDistance = () => {
      const rect = ref.current!.getBoundingClientRect();
      const parentRect = ref.current!.parentElement!.parentElement!.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2 - parentRect.left;
      const letterCenterY = rect.top + rect.height / 2 - parentRect.top;
      const newDistance = Math.sqrt(
        Math.pow(x.get() - letterCenterX, 2) + Math.pow(y.get() - letterCenterY, 2)
      );
      distance.set(newDistance);
    };
    
    const unsubscribeX = x.on("change", updateDistance);
    const unsubscribeY = y.on("change", updateDistance);
    updateDistance();
    return () => { unsubscribeX(); unsubscribeY(); };
  }, [mousePosition, distance]);

  const fontWeight = useTransform(distance, [0, radius], [900, 300]);
  const opticalSize = useTransform(distance, [0, radius], [48, 24]);

  return (
    <motion.span
      ref={ref}
      style={{
        fontWeight,
        fontOpticalSizing: 'auto',
        // @ts-ignore
        fontVariationSettings: useTransform(
          [fontWeight, opticalSize],
          ([fw, os]) => `'wght' ${fw}, 'opsz' ${os}`
        )
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

const VariableProximity = ({ label, containerRef, radius = 100, className, style }: any) => {
  const mousePosition = useMousePosition(containerRef);
  return (
    <span className={className} style={style}>
      {label.split('').map((char: string, i: number) => (
        <Letter key={i} char={char} mousePosition={mousePosition} radius={radius} />
      ))}
    </span>
  );
};

// --- Main Options Component ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
};

const ProximityOption = ({ href, mainText, subText, mainClassName, subClassName, link = false, onActivate }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const Wrapper = link ? Link : 'a';
  const props = link ? { href } : { href, target: "_blank", rel: "noopener noreferrer" };

  // Intercept clicks so parent can control navigation after transition
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onActivate) onActivate(href, link);
  };

  return (
    // Note: when using Next's Link we still attach an onClick to the child wrapper
    <Wrapper {...props} onClick={handleClick}>
      <div
        ref={containerRef}
        className="group h-full border border-olive-light flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:bg-olive p-4 relative"
      >
        <VariableProximity
          label={mainText}
          containerRef={containerRef}
          radius={120}
          className={`font-mayes text-off-white transition-transform duration-300 group-hover:scale-105 ${mainClassName}`}
        />
        <VariableProximity
          label={subText}
          containerRef={containerRef}
          radius={80}
          className={`font-nura text-off-white/70 mt-2 ${subClassName}`}
        />
      </div>
    </Wrapper>
  );
};

export default function Options() {
  const router = useRouter();
  const [overlayShown, setOverlayShown] = useState(false);
  const [pendingNav, setPendingNav] = useState<{ href: string; isLink: boolean } | null>(null);

  const activateOption = (href: string, isLink: boolean) => {
    setPendingNav({ href, isLink });
    setOverlayShown(true);
  };

  const onTransitionComplete = () => {
    if (!pendingNav) {
      setOverlayShown(false);
      return;
    }

    const { href, isLink } = pendingNav;
    setOverlayShown(false);
    setPendingNav(null);

    // If it's an internal link use router.push, otherwise open in new tab
    if (isLink) {
      router.push(href);
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  // When overlay is shown after clicking an option, trigger the transition completion
  // after a short delay so the overlay/animation can play. This guarantees navigation
  // happens even if the overlay element isn't rendered here.
  useEffect(() => {
    if (!overlayShown || !pendingNav) return;
    const t = window.setTimeout(() => {
      onTransitionComplete();
    }, 350);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlayShown, pendingNav]);
  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col p-4 md:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex-1" variants={itemVariants}>
        <ProximityOption
          href="/portfolio"
          mainText="The Main Experience"
          subText="WEBSITE"
          mainClassName="text-5xl md:text-7xl tracking-wider"
          subClassName="text-2xl md:text-2xl"
          link
          onActivate={activateOption}
        />
      </motion.div>

      <div className="h-4 md:h-8"></div>

      <div className="flex-1 flex space-x-4 md:space-x-8">
        <motion.div className="w-1/2" variants={itemVariants}>
          <ProximityOption
            href="https://anchor-arg.vercel.app"
            mainText="Anchor"
            subText="Brand"
            mainClassName="text-5xl md:text-7xl"
            subClassName="text-2xl md:text-2xl uppercase tracking-widest"
            onActivate={activateOption}
          />
        </motion.div>
        <motion.div className="w-1/2" variants={itemVariants}>
          <ProximityOption
            href="/resume"
            mainText="Resume"
            subText="WEBSITE"
            mainClassName="text-5xl md:text-7xl"
            subClassName="text-2xl md:text-2xl uppercase tracking-widest"
            link
            onActivate={activateOption}
          />
        </motion.div>
      </div>
      {/* Transition overlay rendered at top-level so it covers everything in this page */}
    </motion.div>
  );
}