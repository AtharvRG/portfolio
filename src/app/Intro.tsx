// src/app/Intro.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Options from './Options';

const facePics = [
  '/1.png',
  '/2.png',
  '/3.png',
  '/4.png',
  '/5.png',
  '/6.png',
  '/7.png',
];

export default function Intro() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [shuffledPics, setShuffledPics] = useState<string[]>([]);
  const router = useRouter();

  // Shuffle the images once on mount
  useEffect(() => {
    const shuffled = [...facePics];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledPics(shuffled);
  }, []);

  useEffect(() => {
    if (shuffledPics.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % shuffledPics.length);
    }, 500);
    return () => clearInterval(interval);
  }, [shuffledPics]);

  useEffect(() => {
    const showArgTimer = setTimeout(() => setStep(1), 2500);
    const revealTimer = setTimeout(() => setStep(2), 4000);
    const vanishNameTimer = setTimeout(() => setStep(3), 5000);
    const showOptionsTimer = setTimeout(() => setStep(4), 5500);

      // Redirect to /options after intro animation
      const redirectTimer = setTimeout(() => {
        router.replace('/options');
      }, 5700);

    return () => {
      clearTimeout(showArgTimer);
      clearTimeout(revealTimer);
      clearTimeout(vanishNameTimer);
      clearTimeout(showOptionsTimer);
        clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="relative flex items-center justify-center h-screen w-screen bg-background overflow-hidden">
      {step < 4 && (
        <>
          {shuffledPics.length > 0 && (
            <div className="absolute" style={{ width: '45rem', height: '45rem' }}>
              <Image
                src={shuffledPics[currentImageIndex]}
                alt="Face"
                fill
                className="object-cover rounded-md"
                priority
                sizes="240px"
                draggable={false}
              />
            </div>
          )}
          {/* Keep the overlay fade for step >= 1, but remove animation */}
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-lg"
            style={{ opacity: step >= 1 ? 1 : 0, transition: 'opacity 0.5s ease-out' }}
          />
        </>
      )}

      {/* Keep the animated name reveal as before */}
      <AnimatePresence>
        {step >= 1 && step < 3 && (
          <motion.div
            className="absolute z-10 text-text-heading text-6xl md:text-8xl font-sans font-black flex items-baseline justify-center whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: -50, opacity: 0, transition: { duration: 0.5, ease: 'easeIn' } }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex items-baseline"
              animate={{ x: step >= 2 ? '-3rem' : 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              <span className="font-light">A</span>
              <motion.div
                className="overflow-hidden font-light"
                initial={{ width: 0 }}
                animate={{ width: step >= 2 ? 'auto' : 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.6, 0.2, 1], delay: 0.1 }}
              >
                tharv
              </motion.div>
            </motion.div>
            <span className="mx-4 font-light">R</span>
            <motion.div
              className="flex items-baseline"
              animate={{ x: step >= 2 ? '3rem' : 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
            <span className="font-light">G</span>
              <motion.div
                className="overflow-hidden font-light"
                initial={{ width: 0 }}
                animate={{ width: step >= 2 ? 'auto' : 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.6, 0.2, 1], delay: 0.1 }}
              >
                achchi
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}