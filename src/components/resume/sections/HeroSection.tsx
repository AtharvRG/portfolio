// src/components/resume/sections/HeroSection.tsx
'use client';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function HeroSection() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[30vh] flex flex-col justify-center text-center items-center py-20"
    >
      <motion.h1 variants={itemVariants} className="font-serif text-5xl md:text-7xl tracking-tight text-off-white">
        Atharv R Gachchi
      </motion.h1>
      <motion.h2 variants={itemVariants} className="font-nura text-xl md:text-2xl text-accent-cyan mt-4">
        Student | Developer | Tech Enthusiast
      </motion.h2>
      <motion.div variants={itemVariants} className="flex items-center gap-2 text-pink-light/80 mt-6">
        <MapPin size={16} />
        <span>Karnataka, India</span>
      </motion.div>
    </motion.section>
  );
}