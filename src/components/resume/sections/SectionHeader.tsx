// src/components/resume/sections/SectionHeader.tsx
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <motion.div
      className="flex items-center gap-4 mb-12"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-nura font-bold uppercase tracking-widest text-lg text-pink-light/90 whitespace-nowrap">
        {title}
      </h2>
      <div className="w-full h-px bg-olive" />
    </motion.div>
  );
}