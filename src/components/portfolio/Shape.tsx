// src/components/portfolio/Shape.tsx
'use client';
import { motion } from 'framer-motion';

interface ShapeProps {
  type: 'circle' | 'square' | 'triangle' | 'rectangle' | null;
}

export default function Shape({ type }: ShapeProps) {
  if (!type) return null;

  const animation = {
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1,
    },
  };

  const svgProps = {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
  };

  return (
    <motion.svg {...svgProps} animate={animation}>
      {type === 'circle' && <circle cx="8" cy="8" r="7" />}
      {type === 'square' && <rect x="1" y="1" width="14" height="14" />}
      {type === 'triangle' && <path d="M8 1 L1 15 H15 Z" />}
      {type === 'rectangle' && <rect x="1" y="4" width="14" height="8" />}
    </motion.svg>
  );
}