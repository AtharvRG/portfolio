// src/components/portfolio/Hero.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrambledText from '@/components/effects/ScrambledText';
import heroBg from '../../../public/hero-bg.jpg';



const SectionWrapper = ({ children, backgroundPositionY = 0 }: { children: React.ReactNode, backgroundPositionY?: number }) => (
  <section
    className="h-screen w-full snap-start relative overflow-hidden"
  >
    <motion.div
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      initial={{ filter: 'blur(32px)' }}
      animate={{ filter: 'blur(0px)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={heroBg}
        alt="Background"
        fill
        priority
        placeholder="blur"
        quality={72}
        style={{
          objectFit: 'cover',
          objectPosition: `center ${backgroundPositionY}px`,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        sizes="100vw"
        draggable={false}
      />
    </motion.div>
    <div className="absolute inset-0 bg-black/40 z-0" />
    <div className="relative z-10 flex flex-col h-full p-8">
      {children}
    </div>
  </section>
);

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.3 } } };
const professionalEase = [0.22, 1, 0.36, 1];
const lineVariants = {
  hidden: { width: 0 },
  visible: { width: '8rem', transition: { duration: 0.8, ease: professionalEase } },
};
const textVariants = {
  hidden: { opacity: 0, x: '-100%' },
  visible: { opacity: 1, x: '0%', transition: { duration: 1.0, ease: professionalEase, delay: 0.5 } },
};

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const scroller = document.querySelector('main');
    if (scroller) {
      const handleScroll = () => setScrollY(scroller.scrollTop);
      scroller.addEventListener('scroll', handleScroll);
      return () => scroller.removeEventListener('scroll', handleScroll);
    }
  }, []);
  const parallaxY = scrollY * 0.4;

  return (
    <SectionWrapper backgroundPositionY={parallaxY}>
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: professionalEase }}
      >
        <ScrambledText
          className="font-dance tracking-widest text-3xl text-off-white"
          radius={50} speed={0.8}
        >
          Atharv
        </ScrambledText>
        <motion.div
          className="w-4 h-4 border border-off-white rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
        />
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center -mt-16">
        <motion.div
          className="text-7xl md:text-9xl text-center align-middle mt-24 leading-none"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-center">
            <div className="overflow-hidden pr-4">
              <motion.span variants={textVariants} className="font-harmond inline-block">
                Precision
              </motion.span>
            </div>
            <motion.span variants={lineVariants} className="inline-block h-1 bg-off-white ml-8" />
          </div>
          <div className="flex items-center justify-center -mt-9">
            <motion.span
              variants={{
                hidden: { width: 0, x: '8rem' },
                visible: { width: '8rem', x: '0rem', transition: { duration: 0.8, ease: professionalEase } },
              }}
              className="inline-block h-1 bg-off-white mr-8"
            />
            <div className="overflow-hidden pl-4">
              <motion.span
                variants={{
                  hidden: { opacity: 0, x: '100%' },
                  visible: { opacity: 1, x: '0%', transition: { duration: 1.0, ease: professionalEase, delay: 0.5 } },
                }}
                className="font-ppn inline-block text-7xl md:text-9xl"
              >
                Dedication
              </motion.span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: professionalEase }}
        >
          <ScrambledText
            className="font-serif italic mt-16 text-center text-lg font-thin max-w-sm text-off-white/90"
            radius={80} speed={0.5} duration={1.5}
          >
            Concepts remain unproven until
            <br/>
            you manifest them as outcomes
          </ScrambledText>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}