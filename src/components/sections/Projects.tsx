"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image, { StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';
import { ArrowUpRight, X } from 'lucide-react';
import ShinyText from '../ui/ShinyText';
import MoiraiImage from '../../app/assets/Moirai.jpg';
import NudgeImage from '../../app/assets/Nudge.jpg';
import ChameleonDocsImage from '../../app/assets/ChameleonDocs.jpg';
import ASAPImage from '../../app/assets/ASAP.jpg';
import GlassBoxImage from '../../app/assets/GlassBox.jpg';

interface Project { id: string; title: string; subtitle: string; description: string; src: StaticImageData; sc: string; live?: string; }
const projects: Project[] = [
  { id: '1', title: 'Moirai', subtitle: 'Narrative OS for your digital life', description: 'A local-first Windows app that captures raw system telemetry and weaves it into a human-readable story using LLMs—turning chaotic background data into an actionable journal without storing keystrokes.', src: MoiraiImage, sc: 'https://github.com/AtharvRG/moirai', live: 'https://moirai-ctc.vercel.app' },
  { id: '2', title: 'Nudge', subtitle: 'Private Solana payments via Blinks', description: 'A payment link app that uses ZK proofs and stealth addresses to let users accept SOL publicly while keeping their main wallet address completely private and unlinkable.', src: NudgeImage, sc: 'https://github.com/AtharvRG/budge', live: 'https://nuddge-ph.vercel.app' },
  { id: '3', title: 'Chameleon Docs', subtitle: 'AI parsing for Project/Service documents', description: 'A high-speed document intelligence tool that converts unstructured files into clean data, optimized to reduce latency by switching from standard APIs to efficient, local-first parsing runtimes.', src: ChameleonDocsImage, sc: 'https://github.com/AtharvRG/chameleon-docs', live: 'https://chameleon-anchor.vercel.app' },
  { id: '4', title: 'ASAP Protocol', subtitle: 'Discovery layer for the agent economy', description: 'A decentralized protocol that solves the "cold start" problem for AI agents, enabling on-chain service discovery and a novel x402 micro-payment handshake for autonomous machine-to-machine access.', src: ASAPImage, sc: 'https://github.com/AtharvRG/asap-protocol' },
  { id: '5', title: 'GlassBox', subtitle: 'X-Ray vision for LLM pipelines', description: 'An observability SDK that captures the "why" behind non-deterministic AI decisions, allowing developers to inspect the reasoning and filtering steps that led to a specific output.', src: GlassBoxImage, sc: 'https://github.com/AtharvRG/glassbox', live: 'https://glassbox-eq.vercel.app' },
];

export default function ProjectsShowcase() {
  const [hoveredId, setHoveredId] = useState<string>(projects[0].id);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = 'unset';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      lenis?.start();
    };
  }, [activeProject, lenis]);

  // THE FIX: Flawless Interaction Logic
  const handleInteraction = (project: Project) => {
    const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

    if (!isTouchDevice) {
      // DESKTOP: A click ALWAYS opens the project instantly. No double-click bugs.
      setHoveredId(project.id);
      setActiveProject(project);
      return;
    }

    // MOBILE: Tap once to preview, tap again (or wait) to open.
    if (hoveredId === project.id) {
      setActiveProject(project);
    } else {
      setHoveredId(project.id);
      setTimeout(() => setActiveProject(project), 300);
    }
  };

  return (

    <div className="relative h-screen w-full text-zinc-100 font-sans overflow-hidden py-20 z-10">

      {/* BACKGROUND QUOTE */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <div className="flex flex-col items-center opacity-80">
          <h1 className="text-[10vw] md:text-[6vw] lg:text-[4.5vw] font-accent italic tracking-tighter uppercase text-center flex flex-col mix-blend-difference">
            <span>&quot;Talk is cheap,</span>
            <span className="relative">
              Show me the <span className="text-accent">code</span>&quot;
            </span>
          </h1>
          <p className="mt-4 md:mt-6 text-[2vw] md:text-[1vw] font-sans tracking-[0.3em] italic uppercase text-zinc-400 mix-blend-difference">
            ~ Linus Torvalds
          </p>
        </div>
      </div>

      {/* PREVIEW IMAGE - 120FPS GPU ACCELERATED */}
      <div className="absolute top-16 left-4 sm:top-24 sm:left-8 md:top-12 md:left-12 z-10 w-[260px] h-[180px] sm:w-[320px] sm:h-[220px] md:w-[400px] md:h-[260px] lg:w-[500px] lg:h-[320px] pointer-events-none">
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            project.id === hoveredId && activeProject?.id !== project.id && (
              <motion.div
                key={project.id}
                layoutId={`project-image-${project.id}`}
                initial={{ opacity: 0, scale: 0.95, z: 0 }}
                animate={{ opacity: 1, scale: 1, z: 0 }}
                exit={{ opacity: 0, scale: 0.95, z: 0 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl will-change-transform"
                style={{ transform: "translateZ(0)" }}
              >
                <Image src={project.src} alt={project.title} className="object-cover opacity-80" fill unoptimized sizes="(min-width: 1024px) 500px, (min-width: 768px) 400px, 280px" />
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* PROJECT LIST */}
      <div className="absolute bottom-12 right-4 sm:right-6 md:bottom-12 md:right-12 z-20 flex flex-col items-end">
        <p className="text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-zinc-400 mb-2 md:mb-4 mr-8">
          MY PROJECTS
        </p>
        <ul className="flex flex-col gap-0 items-end">
          {projects.map((project) => (
            <li
              key={project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onClick={() => handleInteraction(project)}
              className={`group relative text-lg sm:text-xl md:text-[2.5rem] font-sans uppercase tracking-tighter cursor-pointer transition-colors duration-300 pr-3 md:pr-8 ${hoveredId === project.id ? 'text-zinc-100' : 'text-zinc-500'} ${activeProject ? 'pointer-events-none' : ''}`}
            >
              {/* THE FIX: Title morphs perfectly from the list into the header! Added cursor-target directly here! */}
              <motion.span
                layoutId={`project-title-${project.id}`}
                className="inline-block relative z-10 py-0.5 md:py-1 cursor-target pr-2 md:pr-4 tracking-tighter" // Enforce tracking-tighter globally here
              >
                {hoveredId === project.id ? (
                  <span className="inline-block px-1 py-1 leading-normal">{project.title}</span>
                ) : (
                  <ShinyText text={project.title} speed={3} color="#71717a" shineColor="#e4e4e7" spread={140} />
                )}
              </motion.span>

              <AnimatePresence>
                {hoveredId === project.id && activeProject?.id !== project.id && (
                  <motion.div
                    initial={{ width: 40, x: 34, opacity: 0 }}
                    animate={{ width: 6, x: 0, opacity: 1 }}
                    exit={{ width: 0, x: -6, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25, mass: 1 }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-[4px] md:h-[6px] bg-accent rounded-full"
                  />
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>

      {/* DETAIL VIEW (React Portal Overlay) */}
      {mounted && createPortal(
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-lg pointer-events-auto"
            >
              <div className="absolute inset-0 z-0 cursor-pointer" onClick={() => setActiveProject(null)} />

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: 0.1 }}
                onClick={() => setActiveProject(null)}
                className="cursor-target absolute top-6 right-6 md:top-8 md:right-8 z-50 p-3 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition-colors"
              >
                <X size={20} strokeWidth={2} />
              </motion.button>

              <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 flex flex-col justify-center max-h-screen overflow-y-auto pointer-events-none">
                <div className="pointer-events-auto flex flex-col w-full pb-20 pt-20">

                  {/* THE FIX: The title flies in from the list! */}
                  <motion.h1
                    layoutId={`project-title-${activeProject.id}`}
                    className="text-3xl sm:text-4xl md:text-7xl font-display tracking-tighter mb-8 md:mb-12 text-center uppercase text-zinc-100 will-change-transform origin-center"
                    style={{ transform: "translateZ(0)" }}
                  >
                    {activeProject.title}
                  </motion.h1>

                  {/* THE FIX: The image flies in from the preview! */}
                  <motion.div
                    layoutId={`project-image-${activeProject.id}`}
                    className="relative w-full aspect-video md:aspect-[21/9] bg-zinc-900 rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-12 shadow-2xl border border-white/10 will-change-transform"
                    transition={{ type: "spring", bounce: 0.1, duration: 0.5 }} // Faster, tighter spring for 120fps feel
                    style={{ transform: "translateZ(0)" }}
                  >
                    <Image src={activeProject.src} alt={activeProject.title} className="object-cover opacity-90" fill unoptimized sizes="100vw" />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3, delay: 0.1 }} className="w-full flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                    <div className="flex-1">
                      <h2 className="text-xl md:text-3xl font-sans uppercase tracking-tight mb-4 text-zinc-100">{activeProject.subtitle}</h2>
                      <p className="text-zinc-400 text-sm md:text-base font-sans">{activeProject.description}</p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-6 md:min-w-[200px]">
                      <p className="text-zinc-400 text-xs uppercase tracking-widest font-sans md:text-right">Project Links</p>
                      <div className="flex flex-col gap-3">
                        {activeProject.live && (
                          <button
                            onClick={() => {
                              const style = document.getElementById('target-cursor-style');
                              if (style) style.innerText = '';
                              window.open(activeProject.live, '_blank');
                            }}
                            className="cursor-target group flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white rounded-full font-sans uppercase text-sm tracking-wider font-bold transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-white hover:text-black">
                            Live <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            const style = document.getElementById('target-cursor-style');
                            if (style) style.innerText = '';
                            window.open(activeProject.sc, '_blank');
                          }}
                          className="cursor-target group flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-full font-sans uppercase text-sm tracking-wider font-bold transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-white hover:text-black">
                          Source Code <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}