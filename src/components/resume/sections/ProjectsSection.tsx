// src/components/resume/sections/ProjectsSection.tsx
'use client';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
    {
    title: "Lemma",
    tech: "TypeScript, WebAssembly, Next.js, React",
    description: "A in-browser time-travel debugger for JS, Python, Go, Rust & C++ that lets you step through code execution backwards and forwards.",
    links: [{ type: 'github', url: 'https://github.com/AtharvRG/lemma' }, { type: 'live', url: 'https://lemma-anchor.vercel.app' }]
  },
  {
    title: "Fractal",
    tech: "TypeScript, WebAssembly, Next.js, React",
    description: "A web-based multi-file code playground that parses code live with Tree-sitter for instant AST exploration. It lets users create, organize, and share snippets via compressed URLs or GitHub Gists. Supports numerous programming languages.",
    links: [{ type: 'github', url: 'https://github.com/AtharvRG/fractal' }, { type: 'live', url: 'https://fractal-anchor.vercel.app' }]
  },
  {
    title: "Arth Shikshak - Financial Buddy",
    tech: "TypeScript, MongoDB, Next.js, React",
    description: "A student-focused financial advisory platform leveraging Google's Gemini API to assist with budgeting and financial literacy.",
    links: [{ type: 'github', url: 'https://github.com/AtharvRG/arth-shikshak' }, { type: 'live', url: 'https://arth-shikshak.vercel.app' }]
  },
 {
    title: "Revera",
    tech: "Sui, TypeScript SDK, React",
    description: "A decentralized prediction market on the Sui blockchain, allowing users to create and participate in various event markets.",
    links: [{ type: 'github', url: 'https://github.com/AtharvRG/revera' }]
  },
  {
    title: "Aptos Blockchain Document Management dApp",
    tech: "Aptos, Move, React, Vite",
    description: "A decentralized app on the Aptos blockchain for secure document management, focusing on smart contract integration.",
    links: [{ type: 'github', url: 'https://github.com/AtharvRG/aptos-dapp' }]
  },
  {
    title: "Fuel-Forge",
    tech: "TypeScript, MongoDB, Next.js, React",
    description: "A sophisticated neural network model along with frontend with react, trained on extensive synthetic datasets of chemical properties and performance metrics, to predict and optimize the efficiency and emission profiles of chemical fuel blends.",
    links: [{ type: 'github', url: 'https://github.com/AtharvRG/Fuel-Forge' }]
  },
  {
    title: "Rainfall Binary Classifier",
    tech: "TypeScript, MongoDB, Next.js, React",
    description: "A machine learning model for predicting rainfall, built with dataset on various meteorological data and a focus on accuracy and performance.",
    links: [{ type: 'github', url: 'https://github.com/AtharvRG/Rainfall-Classification' }]
  },

];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

export default function ProjectsSection() {
  return (
    <section className="py-16">
      <SectionHeader title="Projects" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="bg-dark-card p-6 rounded-lg border border-olive/30 hover:border-accent-cyan transition-all duration-300 flex flex-col"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-xl font-serif text-off-white">{project.title}</h3>
            <p className="text-accent-purple text-xs font-mono mt-2 mb-4">{project.tech}</p>
            <p className="font-gotham text-pink-light/80 text-sm flex-grow">{project.description}</p>
            <div className="flex gap-4 mt-6">
              {project.links.map(link => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-pink-light/70 hover:text-off-white transition-colors">
                  {link.type === 'github' ? <Github size={20} /> : <ExternalLink size={20} />}
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}