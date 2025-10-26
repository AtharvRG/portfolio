// src/components/resume/sections/ExperienceSection.tsx
'use client';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { Briefcase } from 'lucide-react';

const experienceData = [
  {
    role: "AI Engineer",
    company: "Juggle Technologies Private Limited",
    duration: "Sep 2025 - Jan 2026 ",
    description: "~ Currently Working"
  },
  {
    role: "App Developer",
    company: "CampusAdda Technologies Pvt Ltd",
    duration: "Oct 2024 - April 2025",
    description: "Contributed to the UI and logical implementation of the Car Pooling Section in the CampusAdda app using Flutter and Dart."
  },
  
];

export default function ExperienceSection() {
  return (
    <section className="py-16">
      <SectionHeader title="Professional Experience" />
      <div className="relative border-l-2 border-olive/30 ml-4 md:ml-8">
        {experienceData.map((job, index) => (
          <motion.div
            key={index}
            className="mb-12 pl-8 md:pl-12 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="absolute -left-4 top-1 h-8 w-8 bg-dark-card rounded-full flex items-center justify-center border-2 border-olive/50">
              <Briefcase className="text-accent-emerald" size={16} />
            </div>
            <p className="text-xs text-pink-light/70">{job.duration}</p>
            <h3 className="text-xl font-serif text-off-white mt-1">{job.role}</h3>
            <h4 className="text-md font-garamond text-accent-purple">{job.company}</h4>
            <p className="font-gotham text-pink-light/90 mt-2 text-sm max-w-prose">{job.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}