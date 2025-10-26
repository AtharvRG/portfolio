// src/components/resume/sections/AboutSection.tsx
'use client';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

export default function AboutSection() {
  return (
    <motion.section 
      className="py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <SectionHeader title="Objective" />
      <p className="font-garamond text-lg md:text-xl text-pink-light leading-relaxed text-center max-w-3xl mx-auto">
        A curious and driven Computer Science student passionate about building practical solutions 
        through hands-on experience in Python, React, Flutter, and AI/ML. Known for a proactive 
        learning approach and a commitment to writing clean, effective code. Seeking opportunities 
        to contribute to innovative, growth-oriented tech environments.
      </p>
    </motion.section>
  );
}