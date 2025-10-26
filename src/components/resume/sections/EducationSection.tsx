// src/components/resume/sections/EducationSection.tsx
'use client';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { GraduationCap } from 'lucide-react';

const education = [
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "Manipal University Jaipur",
    duration: "Aug 2023 - Aug 2027 (Ongoing)"
  },
  {
    degree: "K-12 Education (CBSE Board)",
    institution: "Jindal Vidya Mandir",
    duration: "Mar 2011 - Apr 2023"
  }
];

export default function EducationSection() {
  return (
    <section className="py-16">
      <SectionHeader title="Education" />
      <div className="space-y-8">
        {education.map((edu, index) => (
          <motion.div 
            key={index}
            className="font-wistle bg-dark-card p-6 rounded-lg flex items-start gap-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <GraduationCap className="font-garamond text-accent-purple w-10 h-10 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-serif text-off-white">{edu.degree}</h3>
              <p className="text-pink-light/80 mt-1">{edu.institution}</p>
              <p className="text-pink-light/60 text-sm mt-1">{edu.duration}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}