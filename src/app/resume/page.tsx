// src/app/resume/page.tsx
'use client';

import { ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Import all of your sections
import HeroSection from '@/components/resume/sections/HeroSection';
import AboutSection from '@/components/resume/sections/AboutSection';
import ExperienceSection from '@/components/resume/sections/ExperienceSection';
import ProjectsSection from '@/components/resume/sections/ProjectsSection';
import SkillsSection from '@/components/resume/sections/SkillsSection';
import CoursesSection from '@/components/resume/sections/CoursesSection'; 
import EducationSection from '@/components/resume/sections/EducationSection';
import ContactSection from '@/components/resume/sections/ContactSection';

export default function ResumePage() {
  return (
    <div className="bg-dark-bg text-off-white font-sans antialiased">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 md:p-6 bg-dark-bg/50 backdrop-blur-lg border-b border-olive"
      >
        <Link
          href="/options"
          className="flex items-center gap-2 px-4 py-2 bg-olive text-white rounded-lg hover:bg-opacity-80 transition-colors duration-200 font-ver text-sm"
        >
          <ArrowLeft size={16} />
          Back to Main
        </Link>
        <a 
          href="/atharv_gachchi_cv.pdf" // Ensure your PDF is in the /public folder
          download 
          className="flex items-center gap-2 px-4 py-2 bg-olive text-white rounded-lg hover:bg-opacity-80 transition-colors duration-200 font-ver text-sm"
        >
          <Download size={16} />
          Download PDF
        </a>
      </motion.header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 pt-24 md:pt-32">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <CoursesSection />
        <ContactSection />
      </main>

      <footer className="text-center py-8 text-pink-light/50 font-mayes text-sm">
        <p>&copy; {new Date().getFullYear()} Atharv R Gachchi. All rights reserved.</p>
      </footer>
    </div>
  );
}