// src/components/effects/VariableProximity.tsx
'use client';
import React, { useRef, useEffect, MutableRefObject, HTMLAttributes, CSSProperties } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// A custom hook to track the mouse position relative to a container
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

// A component for a single, self-animating letter
const Letter = ({
  char,
  mousePosition,
  fromSettings,
  toSettings,
  radius,
}: {
  char: string;
  mousePosition: { x: any; y: any };
  fromSettings: string;
  toSettings: string;
  radius: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const distance = useMotionValue(Infinity);

  // This effect calculates the distance from the letter to the mouse
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

    // We listen for changes in the mouse position to update the distance
    const unsubscribeX = x.on("change", updateDistance);
    const unsubscribeY = y.on("change", updateDistance);
    
    // Initial calculation
    updateDistance();

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mousePosition, distance]);

  // Use Framer Motion's `useTransform` to map distance to font weight and optical size
  const fontWeight = useTransform(distance, [0, radius], [900, 300]);
  const opticalSize = useTransform(distance, [0, radius], [48, 24]);

  return (
    <motion.span
      ref={ref}
      style={{
        fontWeight,
        fontOpticalSizing: 'auto',
        // @ts-ignore - a little hack to get custom properties working with motion
        fontVariationSettings: useTransform(
          [fontWeight, opticalSize],
          ([fw, os]) => `'wght' ${fw}, 'opsz' ${os}`
        )
      }}
    >
      {char}
    </motion.span>
  );
};

// The main component that orchestrates everything
interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  containerRef: MutableRefObject<HTMLElement | null>;
  radius?: number;
  className?: string;
  style?: CSSProperties;
}

const VariableProximity = React.forwardRef<HTMLSpanElement, VariableProximityProps>(
  ({ label, containerRef, radius = 100, className, style }, ref) => {
    const mousePosition = useMousePosition(containerRef);

    return (
      <span ref={ref} className={className} style={style}>
        {label.split('').map((char, i) => (
          <Letter
            key={i}
            char={char}
            mousePosition={mousePosition}
            fromSettings="'wght' 300, 'opsz' 24"
            toSettings="'wght' 900, 'opsz' 48"
            radius={radius}
          />
        ))}
      </span>
    );
  }
);

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;