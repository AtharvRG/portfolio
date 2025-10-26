// src/components/resume/sections/SkillsSection.tsx
'use client';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const skills = {
  "Languages": ["Python", "C/C++", "Assembly", "JavaScript", "Dart", "SQL", "HTML", "CSS", "Move"],
  "Frameworks & Libraries": ["React", "Next.js", "Node.js", "Vite", "Electron.js", "Flutter", "Scikit-learn", "Pandas", "PyTorch", "Tensorflow"],
  "Databases": ["MongoDB", "PostgreSQL", "MySQL", "SQLite"],
  "Tools & Platforms": ["Git", "VS Code", "Android Studio", "Aptos Blockchain", "Sui Blockchain", "Google Gemini API"],
  "Interests": ["Artificial Intelligence", "Machine Learning", "Blockchain Technology"]
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const tagVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SkillsSection() {
  return (
    <section className="py-16">
      <SectionHeader title="Technologies & Skills" />
      <div className="space-y-8">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-serif text-accent-cyan text-lg mb-4">{category}</h3>
            <motion.div 
              className="flex flex-wrap gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {items.map((skill) => (
                <motion.span
                  key={skill}
                  variants={tagVariants}
                  className="font-gotham bg-olive px-4 py-2 rounded-md text-sm text-pink-light hover:bg-accent-cyan hover:text-dark-bg transition-colors duration-200 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}