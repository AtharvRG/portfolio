// src/components/portfolio/SectionTitle.tsx
'use client';
import { motion } from 'framer-motion';

export default function SectionTitle({ title }: { title: string }) {
  return (
    <motion.div
      className="flex items-center justify-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <span className="flex-grow h-px bg-border-color" />
      <h2 className="font-nura font-black text-5xl mx-8 text-text-heading">{title}</h2>
      <span className="flex-grow h-px bg-border-color" />
    </motion.div>
  );
}