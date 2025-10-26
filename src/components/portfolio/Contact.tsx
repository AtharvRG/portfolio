// src/components/Contact.tsx
'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';
import TextBorderAnimation from '@/components/animata/TextBorderAnimation';
import { seededShuffle } from '@/lib/utils';

const socialLinks = [
    { name: "Email", href: "mailto:atharv2703123@gmail.com" },
    { name: "Github", href: "https://github.com/AtharvRG" },
    { name: "Twitter", href: "https://twitter.com/AGachchi" },
    { name: "Peerlist", href: "https://peerlist.io/kairoarg" },
    { name: "Linkedin", href: "https://linkedin.com/in/atharvrgachchi" },
    { name: "Instagram", href: "https://instagram.com/atharv.rg" },
];

const playlist = [
  { title: "Remnants", artist: "Be'lakor", image: "/music/belakor.jpg", link: "https://music.youtube.com/watch?v=mRBYWAgRXsw&si=4SBF3STjRgbgRnIt" },
  { title: "Happy", artist: "Pharrell Williams", image: "/music/happy.jpg", link: "https://music.youtube.com/watch?v=dJqxQzxLbHM&si=uhy5J0bynDOeSbpt" },
  { title: "Urn, Pt. II: As Embers Dance in Our Eyes", artist: "Ne Obliviscaris", image: "/music/ne-obliviscaris.jpg", link: "https://music.youtube.com/watch?v=IFQ4mY2FLsE&si=KMzmKoX9cZybYYEo" },
  { title: "Eyrie", artist: "Ne Obliviscaris", image: "/music/ne-obliviscaris2.jpg", link: "https://music.youtube.com/watch?v=xpmhxvi2rtQ&si=508M1i1ic3psKO4n" },
  { title: "Libera, Pt. I: Saturnine Spheres", artist: "Ne Obliviscaris", image: "/music/ne-obliviscaris.jpg", link: "https://music.youtube.com/watch?v=r1x47f-VsL0&si=7UASzCoOGDfLs5oC" },
  { title: "Le Miroir", artist: "Alcest", image: "/music/alcest.jpg", link: "https://music.youtube.com/watch?v=e5KajWwRMwY&si=Ke9Zk5wZh8psl6-Y" },
  { title: "Venator", artist: "Be'lakor", image: "/music/belakor2.jpg", link: "https://music.youtube.com/watch?v=S9kRBAeBJQI&si=NOhMRWDIfK2ZRkxN" },
  { title: "Not Unlike The Waves (2016 - Remastered)", artist: "Agalloch", image: "/music/agalloch.jpg", link: "https://music.youtube.com/watch?v=gDH-YCCeL3c&si=btuXcVkWoQRuqB9i" },
  { title: "Song of Storms", artist: "Alina Gingertail", image: "/music/SOS.jpg", link: "https://music.youtube.com/watch?v=k8Bz7DB7U8g&si=qgoM51q-qvXaLI-I" },
  { title: "Leni (Crystal Castles Vs GoodBooks)", artist: "GoodBooks", image: "/music/goodbooks.jpg", link: "https://music.youtube.com/watch?v=evBnDFokvKU&si=K5I0Vibib59ei2_6" },
  { title: "Feel it Still", artist: "Portugal. The Man", image: "/music/portugal-the-man.jpg", link: "https://music.youtube.com/watch?v=OPKTk5vUtDY&si=nNCwlcdn0jtKtAok" },
  { title: "Aria Math", artist: "C418", image: "/music/c418.jpg", link: "https://music.youtube.com/watch?v=lDQef_S3cy4&si=7E0a6LkApRQL2XeT" },
  { title: "Судно (Борис Рижий)", artist: "Molchat Doma", image: "/music/molchat-doma.jpg", link: "https://music.youtube.com/watch?v=s1ATTIQrmIQ&si=jTJULPRfi7Y_0NEa" },
];

const containerVariants = { visible: { transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } };

export default function Contact() {
  // Get a daily seed (YYYYMMDD as number)
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  // Memoize the shuffled playlist for the day
  const dailyPlaylist = useMemo(() => seededShuffle(playlist, seed), [seed]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  // Auto-cycle every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSongIndex(prev => (prev + 1) % dailyPlaylist.length);
    }, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, [dailyPlaylist.length]);

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % dailyPlaylist.length);
  };

  const getCurrentSong = () => dailyPlaylist[currentSongIndex];
  const getNextSong = () => dailyPlaylist[(currentSongIndex + 1) % dailyPlaylist.length];
  return (
    <SectionWrapper>
      <SectionHeader title="Get In Touch" shapeType="circle" />
      <div className="h-full grid md:grid-cols-2 gap-16 items-center px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-7xl font-serif italic">
            Let&apos;s <span className="text-pink-light font-bold font-dance">Build </span> <br/>Something<span className="text-pink-light font-harmond font-bold"> Great.</span>
          </h2>

          <p className="mt-8 max-w-md text-off-white/80 font-serif text-lg">
            I&apos;m always open to discussing new challenges, sharing insights, or grabbing a virtual coffee. Whether it&apos;s a potential role or a collaboration idea, drop me a line.
          </p>
          <div className="mt-12" />
          {/* Music Widget */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/50 w-[33rem]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
                  <a
                    href={getCurrentSong().link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full max-w-[32rem] flex"
                    style={{ textDecoration: 'none' }}
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-lg overflow-hidden relative group-hover:ring-2 group-hover:ring-[#ff0000]/40 mr-4"
                      key={currentSongIndex}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <Image
                        src={getCurrentSong().image}
                        alt={getCurrentSong().title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </motion.div>
                    <AnimatePresence mode="wait">
                      <motion.div 
                        className="flex flex-col justify-center min-w-0"
                        key={`info-${currentSongIndex}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="font-gotham text-off-white font-medium text-sm truncate">Vibing To</p>
                        <p className="font-gotham text-off-white/90 font-semibold truncate">{getCurrentSong().title}</p>
                        <p className="font-gotham text-off-white/60 text-sm truncate">{getCurrentSong().artist}</p>
                      </motion.div>
                    </AnimatePresence>
                  </a>
                  <motion.button 
                    onClick={nextSong}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-4 h-4 text-off-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
        </div>
            
            <motion.div 
              className="mt-3 pt-3 border-t border-white/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              
              <a
                href={getNextSong().link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
                style={{ textDecoration: 'none' }}
              >
                <motion.div 
                  className="w-8 h-8 rounded overflow-hidden relative group-hover:ring-2 group-hover:ring-[#ff0000]/40"
                  key={`next-${currentSongIndex}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                >
                  <Image
                    src={getNextSong().image}
                    alt={getNextSong().title}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </motion.div>
                
                <AnimatePresence mode="wait">
                  <motion.div 
                    className="flex-1 min-w-0"
                    key={`next-info-${currentSongIndex}`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <p className="font-gotham text-off-white/50 text-xs">Next up</p>
                    <p className="font-gotham text-off-white/80 font-medium text-sm truncate">{getNextSong().title}</p>
                    <p className="font-gotham text-off-white/50 text-xs truncate">{getNextSong().artist}</p>
                  </motion.div>
                </AnimatePresence>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="flex flex-col items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {socialLinks.map(link => (
            <motion.a 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              key={link.name} 
              className="w-full text-left py-3 group" 
              variants={itemVariants}
            >
              {/* 2. Replace the old <span> with the new component */}
              <TextBorderAnimation
                text={link.name}
                className="font-sans text-3xl text-off-white/80 transition-colors duration-300 group-hover:text-off-white"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}