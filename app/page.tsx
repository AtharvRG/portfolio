"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Aceternity UI Imports
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { BentoGrid } from "@/components/ui/bento-grid";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

// Tabler Icons
import {
  IconDownload,
  IconBrandGithub as IconBrandGithubTabler,
  IconBrandPython,
  IconBrandCpp,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandJavascript,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandFlutter,
  IconDatabase,
  IconCpu,
  IconCube,
  IconDeviceDesktopCode,
  IconArrowRight,
  IconCalculator,
  IconCloudRain,
  IconBuildingBank,
  IconShieldLock,
  IconUsersGroup,
  IconRobot,
  IconBoxMultiple,
} from "@tabler/icons-react";

// React Icons (for Contact Section)
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaDiscord, FaEnvelope } from 'react-icons/fa';

// --- DATA ---
const heroDetails = {
  titlePart1: "Upcoming Coder",
  titlePart2: "Powered by Stack Overflow and Hope",
  name: "Atharv R Gachchi",
  headline: "Transforming Curiosity into Code.",
  intro: "Hey there! I'm Atharv R Gachchi, a student with a lifelong curiosity for technology, now channeling it into software development. From keypad mobiles to complex algorithms, I love figuring out how things work and building solutions.",
  profilePic: "/profile-no-bg.png", 
  cvLink: "/atharv_gachchi_cv.pdf", 
};

const techStack = [
  {
    id: 1, title: "Languages & Core", className: "md:col-span-2",
    items: [
      { name: "Python (Intermediate)", description: "Actually gets what’s going on... most of the time", icon: <IconBrandPython size={24} className="text-yellow-400" /> },
      { name: "C/C++ (Introductory)", description: "It’s complicated. Compiler & I are in therapy.", icon: <IconBrandCpp size={24} className="text-blue-400" /> },
      { name: "HTML/CSS/Vanilla JS (Basics)", description: "Websites that mostly behave.", icon: <div className="flex gap-1"><IconBrandHtml5 size={22} className="text-orange-500" /><IconBrandCss3 size={22} className="text-blue-500" /><IconBrandJavascript size={22} className="text-yellow-300" /></div> },
    ],
  },
  {
    id: 2, title: "Frontend & Desktop", className: "md:col-span-1",
    items: [
      { name: "React", description: "Taming JSX dragons.", icon: <IconBrandReact size={24} className="text-sky-400" /> },
      { name: "Next.js", description: "Lost, enjoying the tour.", icon: <IconBrandNextjs size={24} className="text-neutral-300" /> },
      { name: "Electron.js", description: "Desktop magic.", icon: <IconDeviceDesktopCode size={24} className="text-indigo-400" /> },
      { name: "Flutter", description: "Cross-platform dreams.", icon: <IconBrandFlutter size={24} className="text-teal-400" /> },
    ],
  },
  {
    id: 3, title: "Backend & Databases", className: "md:col-span-1",
    items: [
      { name: "SQL", description: "Queries on speaking terms.", icon: <IconDatabase size={24} className="text-amber-500" /> },
      { name: "MongoDB", description: "NoSQL, no problem (usually).", icon: <IconDatabase size={24} className="text-green-500" /> },
    ],
  },
  {
    id: 4, title: "Emerging Interests", className: "md:col-span-2",
    items: [
      { name: "AI/ML", description: "Falling into the rabbit hole... send snacks.", icon: <IconCpu size={24} className="text-purple-400" /> },
      { name: "Blockchain", description: "Tech? Super cool. Crypto? Still figuring it out.", icon: <IconCube size={24} className="text-pink-400" /> },
    ],
  },
];

interface ProjectFeatureData {
  title: string; description: string; icon: React.ReactNode;
  tech: string; links: { name: string; url: string }[];
}
const projectsDataForFeature: ProjectFeatureData[] = [
    {
      title: "Aptos Blockchain Document Management dApp",
      description: "A web3 doc manager built on Aptos because centralization felt boring. I played around with smart contracts and frontends to make document storage feel... slightly less terrifying.",
      icon: <IconCube className="w-8 h-8 text-purple-400" />,
      tech: "Aptos, Move, React, Vite",
      links: [{ name: "GitHub", url: "https://github.com/AtharvRG/aptos-dapp" }],
    },
    {
      title: "Inventory Management CRUD App",
      description: "Same app, two flavors — SQL & MongoDB. Built for backend basics, schemas became an obsession.",
      icon: <IconBoxMultiple className="w-8 h-8 text-sky-400" />,
      tech: "SQL, MongoDB, HTML/CSS/JS, Node.js",
      links: [
        { name: "SQL GitHub", url: "https://github.com/AtharvRG/CRUD-SQL" },
        { name: "MongoDB GitHub", url: "https://github.com/AtharvRG/CRUD-mDB" },
      ],
    },
    {
      title: "Batch Attendance Manager (Flutter)",
      description: "Made for my mom’s dance classes to tame notebook chaos. Handles batches, attendance, and fees.",
      icon: <IconUsersGroup className="w-8 h-8 text-teal-400" />,
      tech: "Flutter, Dart",
      links: [{ name: "GitHub", url: "https://github.com/AtharvRG/Batch-Attendence-Manager" }],
    },
    {
      title: "Zenith AI – Desktop Assistant",
      description: "My personal beast with Electron & Python. Handles tasks, chats, and probably judges my syntax.",
      icon: <IconRobot className="w-8 h-8 text-indigo-400" />,
      tech: "Electron.js, Python, HTML/CSS/JS",
      links: [{ name: "GitHub", url: "https://github.com/AtharvRG/Zenith-AI" }],
    },
    {
      title: "Vedic Maths App (Flutter)",
      description: "My very first Flutter project! Teaches Vedic maths tricks. Code lost (don’t ask), APK lives on.",
      icon: <IconCalculator className="w-8 h-8 text-orange-400" />,
      tech: "Flutter, Dart",
      links: [{ name: "APK", url: "https://drive.google.com/file/d/1rOdqCA7UmjGi_IgIZvveFIsogMZLU8AT/view?usp=sharing" }],
    },
    {
      title: "Rainfall Prediction (ML)",
      description: "Used machine learning to predict rain using temp, humidity, wind. Surprisingly decent!",
      icon: <IconCloudRain className="w-8 h-8 text-blue-400" />,
      tech: "Python, Scikit-learn, Pandas",
      links: [{ name: "GitHub", url: "https://github.com/AtharvRG/Rainfall-Classification" }],
    },
    {
      title: "Arth Shikshak – Financial Buddy (In Progress)",
      description: "Google Solution Challenge 2025 entry. Financial advisor with Gemini + TS + MongoDB.",
      icon: <IconBuildingBank className="w-8 h-8 text-green-400" />,
      tech: "TypeScript, Google Gemini, MongoDB, Next.js/React",
      links: [
        { name: "Main GitHub", url: "https://github.com/AtharvRG/arth-shikshak-main" },
        { name: "MVP GitHub", url: "https://github.com/AtharvRG/Arth-Shikshak-MVP" },
        { name: "Demo Video", url: "https://www.youtube.com/watch?v=DZffn-WxsIA" },
      ],
    },
    {
      title: "SL Security (Frontend Collab)",
      description: "Frontend for a fake scam site (for a comp). Looked alarmingly legit. Fun collab!",
      icon: <IconShieldLock className="w-8 h-8 text-red-400" />,
      tech: "HTML, CSS, JavaScript",
      links: [
        { name: "Live", url: "https://geervan.github.io/SL-Security/" },
        { name: "GitHub", url: "https://github.com/Geervan/SL-Security" },
      ],
    },
];

const aboutMe = {
  title: "A Bit More About Me",
  philosophy: "I strive to write code with the precision of a craftsman and the curiosity of an explorer. Passion for learning, a knack for problem-solving, and yes, an occasional terrible pun, are all part of the package. Building things that work, and work well, is the ultimate reward."
};

const contactInfo = [
  { platform: "Email", value: "atharv2703123@gmail.com", link: "mailto:atharv2703123@gmail.com", icon: <FaEnvelope/>, colors: [[220, 38, 38]] },
  { platform: "LinkedIn", value: "in/atharvrgachchi", link: "https://www.linkedin.com/in/atharvrgachchi/", icon: <FaLinkedinIn/>, colors: [[37, 99, 235]] },
  { platform: "GitHub", value: "@AtharvRG", link: "https://github.com/AtharvRG", icon: <FaGithub/>, colors: [[55, 65, 81]] },
  { platform: "Twitter", value: "@AGachchi", link: "https://x.com/AGachchi", icon: <FaTwitter/>, colors: [[29, 161, 242]] },
  { platform: "Instagram", value: "@kairoarg", link: "https://www.instagram.com/kairoarg/", icon: <FaInstagram/>, colors: [[192, 38, 211]] },
  { platform: "Discord", value: "KairoARG#2299", link: "#", icon: <FaDiscord/>, colors: [[88, 101, 242]] },
];
const closingMessage = "Open to opportunities, collaborations, or just a chat about tech (or terrible puns!).";


// --- Reusable Components ---

const TechStackBentoItem = ({ className, title, items }: {
  className?: string; title?: string | React.ReactNode;
  items?: { name: string; description: string, icon?: React.ReactNode }[];
}) => (
  <div className={cn(
      "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-6 dark:bg-neutral-900 dark:border-white/[0.15] bg-neutral-50 border border-transparent justify-between flex flex-col space-y-4 relative overflow-hidden",
      className
  )}>
    <GlowingEffect blur={8} proximity={20} spread={25} glow={false} disabled={false} movementDuration={1.5} borderWidth={1} />
    <div className="group-hover/bento:translate-x-1 transition duration-200 z-10">
      <div className="font-sans font-bold text-xl text-neutral-700 dark:text-neutral-200 mb-4">{title}</div>
      <div className="font-sans font-normal text-neutral-600 text-sm dark:text-neutral-300 space-y-4">
        {items?.map((item, i) => (
          <div key={i} className="flex items-center space-x-3">
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            <div>
              <p className="font-semibold text-neutral-700 dark:text-neutral-100">{item.name}</p>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProjectFeatureItem = ({ title, description, icon, index, tech, links }: {
  title: string; description:string; icon: React.ReactNode; index: number;
  tech: string; links: { name: string; url: string }[];
}) => {
  const numCols = 2; // Assuming 2 columns for md and up for this layout
  const isFirstInRow = index % numCols === 0;
  const totalRows = Math.ceil(projectsDataForFeature.length / numCols);
  const currentRow = Math.floor(index / numCols);
  const isLastRow = currentRow === totalRows - 1;

  return (
    <div className={cn(
      "flex flex-col py-10 relative group/feature dark:border-neutral-800",
      !isFirstInRow && "lg:border-l", !isLastRow && "lg:border-b"
    )}>
      {!isLastRow && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-900 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {isLastRow && index >= numCols * (totalRows -1) && ( // Only for items in the last visual row if it's a full row
         <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-900 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-400 dark:text-neutral-400">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 dark:bg-neutral-700 group-hover/feature:bg-sky-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100 dark:text-neutral-100">{title}</span>
      </div>
      <p className="text-sm text-neutral-300 dark:text-neutral-300 max-w-xs relative z-10 px-10 mb-3">{description}</p>
      <p className="text-xs text-sky-400 dark:text-sky-400 relative z-10 px-10 mb-4">Tech: {tech}</p>
      <div className="mt-auto relative z-10 px-10 flex flex-wrap gap-3">
        {links.map(link => (
          <Link key={link.name} href={link.url} passHref legacyBehavior>
            <a target={link.url.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="text-xs bg-neutral-700 hover:bg-sky-600 text-neutral-200 hover:text-white px-3 py-1.5 rounded-md transition-colors duration-200 flex items-center">
              {link.name} <IconArrowRight size={12} className="ml-1" />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

const CornerIcon = ({ className, ...rest }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);

const ContactCard = ({ platform, value, icon, link, colors }: {
  platform: string; value: string; icon: React.ReactNode; link: string; colors?: number[][];
}) => {
  const [hovered, setHovered] = React.useState(false);

  // Define a base background for the card, which will be visible when not hovered
  // or if the CanvasRevealEffect is made partially transparent.
  const cardBaseBg = "bg-neutral-900"; // A dark background

  return (
    <Link href={link} passHref legacyBehavior>
      <a
        target={link.startsWith("http") || link.startsWith("mailto:") ? "_blank" : "_self"}
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        className={cn(
          "aspect-square h-60 sm:h-64 md:h-60", // Square shape
          "group/canvas-card flex items-center justify-center",
          "w-full mx-auto p-4 relative rounded-xl overflow-hidden",
          "transition-all duration-300",
          hovered ? "border-neutral-600 dark:border-neutral-500" : "border-black/[0.2] dark:border-white/[0.1]", // More subtle initial border
          cardBaseBg // Apply the base background
        )}
      >
        <CornerIcon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black opacity-30 group-hover/canvas-card:opacity-80 transition-opacity" />
        <CornerIcon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black opacity-30 group-hover/canvas-card:opacity-80 transition-opacity" />
        <CornerIcon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black opacity-30 group-hover/canvas-card:opacity-80 transition-opacity" />
        <CornerIcon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black opacity-30 group-hover/canvas-card:opacity-80 transition-opacity" />
        
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "circOut" }} // Smooth fade for the effect layer
              className="h-full w-full absolute inset-0"
            >
              <CanvasRevealEffect
                animationSpeed={3}

                containerClassName="bg-transparent" // Or try "bg-transparent" if you want dots over cardBaseBg
                colors={colors || [[59, 130, 246]]} // Default to a blue if no colors provided
                dotSize={2}
                opacities={[0.2, 0.2, 0.3, 0.3, 0.4, 0.6, 0.8, 1, 1, 1]} // Ensure full opacity at the end
                showGradient={false} // By default, CanvasRevealEffect adds a dark gradient overlay.
                                      // Set to false if you don't want it, especially if containerClassName provides the full bg.
                                      // For the twitter example, it seems like the gradient is part of the effect or desired.
                                      // If the twitter card's dot pattern *is* the background, then showGradient might be true or the gradient is implicit.
                                      // The demo for CanvasRevealEffect itself adds a radial gradient mask,
                                      // which is different from the `showGradient` prop.
              />
               {/* Optional: Add a subtle overlay if needed, like in the CanvasRevealEffectDemo for "Nisha is Munni" */}

            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full">
          <div className={cn(
            "text-center w-full mx-auto flex items-center justify-center text-4xl sm:text-5xl",
            "transition-all duration-300 ease-in-out",
            hovered ? "-translate-y-4 opacity-0" : "translate-y-0 opacity-100",
            hovered ? "text-white" : "text-neutral-400 dark:text-neutral-300" // Icon color change
          )}>
            {icon}
          </div>
          <div className="absolute inset-x-0 bottom-6 px-2">
            <h2 className={cn(
              "text-lg sm:text-xl font-bold relative z-10 mt-4",
              "transition-all duration-300 ease-in-out",
              hovered ? "opacity-100 -translate-y-2 text-white" : "opacity-0 translate-y-0 text-black dark:text-white",
              hovered && "delay-100" // Apply delay only on hover for text entrance
            )}>
              {platform}
            </h2>
            <p className={cn(
              "text-xs sm:text-sm relative z-10 mt-1",
              "transition-all duration-300 ease-in-out",
              hovered ? "opacity-100 -translate-y-2 text-neutral-300" : "opacity-0 translate-y-0 text-neutral-500 dark:text-neutral-400",
              hovered && "delay-150" // Apply delay only on hover
            )}>
              {value}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function PortfolioPage() {
  const [aboutMeHovered, setAboutMeHovered] = React.useState(false);

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" },
    }),
  };
  const heroIntroWords = heroDetails.intro.split(" ");

  const refinedHeroDetails = {
    ...heroDetails,
    titleLine1: "Upcoming Coder",
    titleLine2Part1: "Powered by", // "by" instead of "by " for cleaner animation of space
    titleLine2Highlight1: "Stack Overflow",
    titleLine2Part2: "and", // "and" instead of " and "
    titleLine2Highlight2: "Hope",
  };


  return (
    <div className="bg-black text-white antialiased selection:bg-sky-500 selection:text-black">
      {/* Hero Section */}
      <HeroHighlight
        containerClassName="min-h-screen flex items-center justify-center py-12 md:py-0 overflow-hidden"
      >
        {/* Changed items-end to items-center for the grid to vertically center content, image will still stick to bottom via its own container */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-10 gap-x-8 gap-y-10 items-center w-full max-w-7xl mx-auto px-4">
          {/* Text Content Area - self-center to ensure it's centered vertically within its allocated space */}
          <div className="md:col-span-6 lg:col-span-5 text-left self-center">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white" // Removed specific line-height, will control with margins
              initial="hidden" animate="visible"
            >
              {/* Line 1: Upcoming Coder */}
              <span className="block mb-3 sm:mb-4 md:mb-5 lg:mb-6"> {/* Increased margin-bottom significantly */}
                {refinedHeroDetails.titleLine1.split("").map((char, i) => (
                  <motion.span key={"line1-" + i} variants={titleVariants} custom={i} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>

              {/* Line 2: Powered by */}
              <span className="block mb-3 sm:mb-4 md:mb-5 lg:mb-6"> {/* Increased margin-bottom */}
                {refinedHeroDetails.titleLine2Part1.split("").map((char, i) => (
                  <motion.span
                    key={"line2p1-" + i} variants={titleVariants}
                    custom={refinedHeroDetails.titleLine1.length + i}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>

              {/* Line 3: Stack Overflow (Highlighted) */}
              <span className="block mb-3 sm:mb-4 md:mb-5 lg:mb-6"> {/* Increased margin-bottom */}
                <Highlight className="text-black dark:text-black px-3 py-1.5 inline-block rounded-lg"> {/* Slightly more padding, rounded-lg */}
                  {refinedHeroDetails.titleLine2Highlight1}
                </Highlight>
              </span>
              
              {/* Line 4: and Hope (Plain text "and", Highlighted "Hope") */}
              <span className="block"> {/* Final line, no bottom margin needed from here unless desired */}
                {refinedHeroDetails.titleLine2Part2.split("").map((char, i) => (
                  <motion.span
                    key={"line2p2-" + i} variants={titleVariants}
                    custom={refinedHeroDetails.titleLine1.length + refinedHeroDetails.titleLine2Part1.length + refinedHeroDetails.titleLine2Highlight1.length + i}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                <span className="inline-block mx-1 md:mx-2">{/* Space before Hope */}</span> 
                <Highlight className="text-black dark:text-black px-3 py-1.5 inline-block rounded-lg">
                  {refinedHeroDetails.titleLine2Highlight2}
                </Highlight>
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-md lg:text-lg text-neutral-300 mt-8 sm:mt-10 md:mt-12 leading-relaxed max-w-lg xl:max-w-xl" // Increased mt
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: refinedHeroDetails.titleLine1.length * 0.07 + 0.8, duration: 0.5 }}
            >
              {heroIntroWords.map((word, i) => (
                 <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: (refinedHeroDetails.titleLine1.length * 0.07 + 0.9) + i * 0.03, duration: 0.2 }}
                    className="inline-block mr-1.5"
                 >{word}</motion.span>
              ))}
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 items-center sm:items-start mt-8 sm:mt-10 md:mt-12" // Increased mt
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: refinedHeroDetails.titleLine1.length * 0.07 + 1.3, duration: 0.5 }}
            >
              <HoverBorderGradient
                  as="a" href={heroDetails.cvLink} target="_blank" rel="noopener noreferrer"
                  containerClassName="rounded-full border-transparent" 
                  className="bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white flex items-center space-x-2 px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-sky-500/30 transition-all duration-300 transform hover:scale-105"
              ><IconDownload size={18} /> <span>Download CV</span></HoverBorderGradient>
              <HoverBorderGradient
                  as="a" href="https://github.com/AtharvRG" target="_blank" rel="noopener noreferrer"
                  containerClassName="rounded-full border-transparent"
                  className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center space-x-2 px-5 py-2.5 text-sm font-medium"
              ><IconBrandGithubTabler size={16}/> <span>GitHub</span></HoverBorderGradient>
            </motion.div>
          </div>

          {/* Profile Picture Area - its parent div still uses items-end to stick it to the bottom of its cell */}
          <div className="md:col-span-4 lg:col-span-5 flex justify-center md:justify-end items-end h-full">
            <motion.div 
              className="w-[380px] h-[500px] sm:w-[450px] sm:h-[600px] md:w-[500px] md:h-[670px] lg:w-[550px] lg:h-[730px] xl:w-[600px] xl:h-[800px] relative"
              initial={{ opacity: 0, y: 150, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: refinedHeroDetails.titleLine1.length * 0.07 + 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image 
                src={heroDetails.profilePic} alt={heroDetails.name} 
                layout="fill" objectFit="contain" objectPosition="bottom"
                priority quality={85}
              />
            </motion.div>
          </div>
        </div>
      </HeroHighlight>


      {/* Tech Stack Section */}
      <section id="tech-stack" className="py-20 md:py-28 bg-neutral-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-sky-400">My Tech Arsenal</h2>
          <p className="text-center text-neutral-400 mb-12 md:mb-16 text-lg max-w-2xl mx-auto">
            The tools and technologies I wield to craft digital experiences and solve complex problems.
          </p>
          <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[auto]">
            {techStack.map((item) => (
              <TechStackBentoItem key={item.id} title={item.title} items={item.items} className={item.className} />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Projects Section - Feature Style */}
      <section id="projects" className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-purple-400">Creations & Code</h2>
           <p className="text-center text-neutral-400 mb-12 md:mb-16 text-lg max-w-2xl mx-auto">
            A glimpse into projects I've built, challenges I've tackled, and ideas I've brought to life.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 relative z-10 max-w-6xl mx-auto border-t border-l border-neutral-800">
            {projectsDataForFeature.map((project, index) => (
              <ProjectFeatureItem key={project.title} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
       <section
        id="about-me"
        onMouseEnter={() => setAboutMeHovered(true)} onMouseLeave={() => setAboutMeHovered(false)}
        className="min-h-[30rem] md:min-h-[35rem] py-20 md:py-28 flex flex-col items-center justify-center bg-neutral-950 w-full gap-4 mx-auto px-4 relative overflow-hidden"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center text-teal-400 relative z-20 mb-10 md:mb-12">
          {aboutMe.title}
        </h2>
        <div className="group text-center max-w-3xl mx-auto relative z-20">
          <TextGenerateEffect
            words={aboutMe.philosophy}
            className="text-xl md:text-2xl font-normal text-neutral-300 leading-relaxed"
          />
        </div>
        <AnimatePresence>
          {aboutMeHovered && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="h-full w-full absolute inset-0"
            >
              <CanvasRevealEffect
                animationSpeed={2.5} containerClassName="bg-transparent"
                colors={[ [59, 130, 246], [139, 92, 246] ]}
                opacities={[0.1,0.1,0.1,0.2,0.2,0.3,0.3,0.4,0.4,0.7]}
                dotSize={2} showGradient={false}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white_10%,transparent_60%)] bg-neutral-950/70 pointer-events-none" />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-pink-500">Let's Connect</h2>
          <p className="text-center text-neutral-400 mb-12 md:mb-16 text-lg max-w-2xl mx-auto">
            You’ve scrolled this far, might as well say hi! I'm open to opportunities, collaborations, or just a chat about tech.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch justify-center w-full gap-6 md:gap-8 max-w-5xl mx-auto">
            {contactInfo.map((contact) => (
              <ContactCard key={contact.platform} {...contact} />
            ))}
          </div>
        </div>
      </section>
      
      <footer className="text-center py-10 bg-neutral-950 text-neutral-500 text-sm border-t border-neutral-800">
        <p>© {new Date().getFullYear()} Atharv R Gachchi. All rights reserved.</p>
        <p className="mt-1">Crafted with Next.js, Tailwind CSS, and Aceternity UI.</p>
      </footer>
    </div>
  );
}