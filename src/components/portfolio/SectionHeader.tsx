// src/components/portfolio/SectionHeader.tsx
'use client';
import { motion } from 'framer-motion';
import Shape from './Shape';

interface SectionHeaderProps {
  title: string;
  shapeType: 'circle' | 'square' | 'triangle' | 'rectangle';
}

export default function SectionHeader({ title, shapeType }: SectionHeaderProps) {
  return (
    <motion.header 
      className="absolute top-0 left-0 right-0 p-8 flex items-center gap-4 z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.8 }}
    >
      <span className="font-nura font-bold uppercase tracking-widest text-sm text-pink-light/70 whitespace-nowrap">
        {title}
      </span>
      <div className="w-full h-px bg-off-white" />
      <div className="text-off-white/80">
        <Shape type={shapeType} />
      </div>
    </motion.header>
  );
}