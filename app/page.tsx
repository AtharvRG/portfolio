"use client"; // Required for many of the UI components
import React from "react";
import Image from "next/image"; // For profile picture later
import Link from "next/link";
import { cn } from "@/lib/utils"; // Utility for class names

// Aceternity UI Imports
import { AuroraBackground } from "@/components/ui/aurora-background";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { HoverEffect } from "@/components/ui/card-hover-effect"; // For Tech Stack
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { AnimatePresence, motion } from "framer-motion"; // For CanvasRevealEffect cards and About Me background

// Icons (ensure @tabler/icons-react is installed)
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandDiscord,
  IconMail,
  IconCode, // Generic icon for projects
  IconDeviceDesktopCode, // For Zenith AI
  IconCurrencyBitcoin, // For Aptos
  IconDatabase, // For CRUD
  IconBrandFlutter, // For Flutter apps
  IconBrain, // For ML
  IconBuildingStore, // For Arth Shikshak
  IconShieldLock, // For SL Security
} from "@tabler/icons-react";


// Data for sections
const heroDetails = {
  title: "Upcoming Coder – Powered by Stack Overflow and Hope",
  name: "Atharv R Gachchi",
  headline: "Transforming Curiosity into Code.",
  intro: "Hey there! I'm Atharv R Gachchi, a student with a lifelong curiosity for technology, now channeling it into software development. From keypad mobiles to complex algorithms, I love figuring out how things work and building solutions.",
  profilePic: "/profile-placeholder.png", // Replace with your actual image path in /public
  cvLink: "/atharv_gachchi_cv.pdf", // Replace with your CV path in /public
};

const techStack = {
  languagesCore: [
    { title: "Python (Intermediate)", description: "Actually gets what’s going on... most of the time" },
    { title: "C/C++ (Introductory)", description: "It’s complicated. The compiler and I are in couples therapy" },
    { title: "HTML/CSS/Vanilla JS (Basics)", description: "Can make websites that mostly behave" },
  ],
  frontendDesktop: [
    { title: "React (Ok-ish & Improving)", description: "Occasionally tames JSX dragons" },
    { title: "Next.js (Exploring)", description: "Lost, but enjoying the tour" },
    { title: "Electron.js (Building Desktop Magic)", description: "Because web tech belongs on your desktop too" },
    { title: "Flutter (Crafting Android Experiences)", description: "Cross-platform dreams, one widget at a time" },
  ],
  backendDatabases: [
    { title: "SQL (Getting along well)", description: "Our queries are on speaking terms" },
    { title: "MongoDB (Also friendly)", description: "NoSQL, no problem (usually)" },
  ],
  emergingInterests: [
    { title: "AI/ML", description: "Slowly falling into the rabbit hole... send snacks" },
    { title: "Blockchain", description: "I don’t get crypto, but the tech? Super cool" },
  ],
};

const projects = [
    {
      title: "Aptos Blockchain Document Management dApp",
      description: "A web3 doc manager built on Aptos because centralization felt boring. I played around with smart contracts and frontends to make document storage feel... slightly less terrifying.",
      links: [{ name: "GitHub", url: "https://github.com/AtharvRG/aptos-dapp" }],
      tech: "Aptos, Move, React, Vite",
      icon: <IconCurrencyBitcoin className="w-8 h-8 text-neutral-300" />,
      visual: "Visual Placeholder: Aptos dApp Screenshot",
    },
    {
      title: "Inventory Management CRUD App",
      description: "Same app, two flavors — one SQL, one MongoDB. Built it to practice backend basics, and somewhere along the way, I started caring about schemas more than sleep.",
      links: [
        { name: "SQL GitHub", url: "https://github.com/AtharvRG/CRUD-SQL" },
        { name: "MongoDB GitHub", url: "https://github.com/AtharvRG/CRUD-mDB" },
      ],
      tech: "SQL, MongoDB, HTML/CSS/JS, Node.js",
      icon: <IconDatabase className="w-8 h-8 text-neutral-300" />,
      visual: "Visual Placeholder: CRUD App Interface",
    },
    {
      title: "Batch Attendance Manager (Flutter)",
      description: "Made this for my mom — she teaches dance and had a notebook chaos situation going on. So I built a neat little app to handle batches, attendance, and fee tracking. It’s still in beta, but it already makes her life (and mine) smoother.",
      links: [{ name: "GitHub", url: "https://github.com/AtharvRG/Batch-Attendence-Manager" }],
      tech: "Flutter, Dart",
      icon: <IconBrandFlutter className="w-8 h-8 text-neutral-300" />,
      visual: "Visual Placeholder: Batch Manager App UI",
    },
    {
      title: "Zenith AI – Desktop Assistant",
      description: "My personal beast. Built with Electron and Python, it’s a desktop assistant that handles tasks, chats, and probably judges me when I forget syntax. I’ve been refining it endlessly — still not perfect, but getting close.",
      links: [{ name: "GitHub", url: "https://github.com/AtharvRG/Zenith-AI" }],
      tech: "Electron.js, Python, HTML/CSS/JS",
      icon: <IconDeviceDesktopCode className="w-8 h-8 text-neutral-300" />,
      visual: "Visual Placeholder: Zenith AI Interface",
    },
    {
      title: "Vedic Maths App (Flutter)",
      description: "My very first Flutter project! It teaches basic Vedic maths tricks. I lost the code (don’t ask), but the APK still exists — living proof of where it all began.",
      links: [{ name: "APK", url: "https://drive.google.com/file/d/1rOdqCA7UmjGi_IgIZvveFIsogMZLU8AT/view?usp=sharing" }],
      tech: "Flutter, Dart",
      icon: <IconBrandFlutter className="w-8 h-8 text-neutral-300" />,
      visual: "Visual Placeholder: Vedic Maths App Screenshot",
    },
    {
      title: "Rainfall Prediction (ML)",
      description: "Used machine learning to predict whether it’ll rain tomorrow. Features? Temp, humidity, wind, and weather guesswork. It’s surprisingly decent, which even surprised me.",
      links: [{ name: "GitHub", url: "https://github.com/AtharvRG/Rainfall-Classification" }],
      tech: "Python, Scikit-learn, Pandas",
      icon: <IconBrain className="w-8 h-8 text-neutral-300" />,
      visual: "Visual Placeholder: Rainfall Prediction Graph",
    },
    {
      title: "Arth Shikshak – Financial Buddy (In Progress)",
      description: "It's my Pride as a web dev and a part of Google’s Solution Challenge 2025. It’s a financial advisor tool built with Gemini + TS + MongoDB. Still being shaped, but the goal is to help people (especially students) manage money without needing a finance degree.",
      links: [
        { name: "Main GitHub", url: "https://github.com/AtharvRG/arth-shikshak-main" },
        { name: "MVP GitHub", url: "https://github.com/AtharvRG/Arth-Shikshak-MVP" },
        { name: "Demo Video", url: "https://www.youtube.com/watch?v=DZffn-WxsIA" },
      ],
      tech: "TypeScript, Google Gemini, MongoDB, Next.js/React",
      icon: <IconBuildingStore className="w-8 h-8 text-neutral-300" />,
      visual: "Visual Placeholder: Arth Shikshak UI Mockup",
    },
    {
      title: "SL Security (Frontend Collab)",
      description: "This one’s a frontend for a fake scam site (relax, it’s for a comp). We tried making it look super real… maybe a bit too real. Just a fun collab with a friend that ended up looking alarmingly legit.",
      links: [
        { name: "Live Demo", url: "https://geervan.github.io/SL-Security/" },
        { name: "GitHub", url: "https://github.com/Geervan/SL-Security" },
      ],
      tech: "HTML, CSS, JavaScript",
      icon: <IconShieldLock className="w-8 h-8 text-neutral-300" />,
      visual: "Visual Placeholder: SL Security Website Screenshot",
    },
];

const aboutMe = {
  philosophy: "I strive to write code with the precision of a craftsman and the curiosity of an explorer. Passion for learning, a knack for problem-solving, and yes, an occasional terrible pun, are all part of the package. Building things that work, and work well, is the ultimate reward."
};

const contactInfo = [
  { name: "Email", value: "atharv2703123@gmail.com", link: "mailto:atharv2703123@gmail.com", icon: <IconMail className="h-8 w-8" /> , colors: [[230, 0, 0]] },
  { name: "LinkedIn", value: "atharvrgachchi", link: "https://www.linkedin.com/in/atharvrgachchi/", icon: <IconBrandLinkedin className="h-8 w-8" />, colors: [[0, 119, 181]] },
  { name: "GitHub", value: "AtharvRG", link: "https://github.com/AtharvRG", icon: <IconBrandGithub className="h-8 w-8" />, colors: [[50, 50, 50]] },
  { name: "Twitter", value: "@AGachchi", link: "https://x.com/AGachchi", icon: <IconBrandTwitter className="h-8 w-8" />, colors: [[29, 161, 242]] },
  { name: "Instagram", value: "kairoarg", link: "https://www.instagram.com/kairoarg/", icon: <IconBrandInstagram className="h-8 w-8" />, colors: [[193,53,132]] },
  { name: "Discord", value: "KairoARG#2299", link: "#", icon: <IconBrandDiscord className="h-8 w-8" />, colors: [[88,101,242]] }, // Discord links are tricky
];

const closingMessage = "Open to opportunities, collaborations, or just a chat about tech (or terrible puns!).";


// Feature Card for Projects (adapting the FeatureSectionDemo structure)
const ProjectFeatureCard = ({
  title,
  description,
  icon,
  index,
  tech,
  links,
  visual,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  tech: string;
  links: { name: string; url: string }[];
  visual: string; // For placeholder
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 2 || index === 4 || index === 6) && "lg:border-l dark:border-neutral-800", // Adjusted for 2 columns
        index < projects.length - 2 && "lg:border-b dark:border-neutral-800" // Adjusted for 2 columns
      )}
    >
      {index < projects.length -2 && ( // Adjusted for 2 columns
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-900 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= projects.length - (projects.length % 2 === 0 ? 2 : 1) && ( // Adjusted for 2 columns
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-900 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-400 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-300 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
      <p className="text-xs text-blue-400 dark:text-blue-400 mt-2 relative z-10 px-10">
        Tech: {tech}
      </p>
       <div className="mt-3 relative z-10 px-10 flex flex-wrap gap-2">
        {links.map(link => (
          <Link key={link.name} href={link.url} passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer" className="text-sm text-sky-400 hover:text-sky-300 underline">
              {link.name}
            </a>
          </Link>
        ))}
      </div>
      <div className="mt-3 relative z-10 px-10 text-xs text-neutral-500">
          {/* Later replace this with an Image component */}
          {visual}
      </div>
    </div>
  );
};


// Card for Contact Section (adapting CanvasRevealEffectDemo structure)
const ContactCard = ({
  title,
  value,
  icon,
  children,
  link,
  colors
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  link: string;
  colors?: number[][];
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Link href={link} passHref legacyBehavior>
    <a
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[15rem] sm:h-[20rem]" // Adjusted height
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 text-center">
        <div className="group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex items-center justify-center text-white group-hover/canvas-card:text-white ">
          {icon}
        </div>
        <h2 className="dark:text-white text-lg sm:text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4 font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
         <p className="dark:text-neutral-300 text-xs sm:text-sm opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-neutral-600 mt-2 group-hover/canvas-card:text-neutral-300 group-hover/canvas-card:-translate-y-2 transition duration-200">
          {value}
        </p>
      </div>
    </a>
    </Link>
  );
};

const Icon = ({ className, ...rest }: any) => { // Helper Icon for ContactCard borders
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};


export default function PortfolioPage() {
  const [aboutMeHovered, setAboutMeHovered] = React.useState(false);

  return (
    <>
      {/* Hero Section */}
      <AuroraBackground>
        <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-4 md:mb-8">
            {heroDetails.title}
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl mx-auto gap-8">
            <div className="md:w-2/3 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-semibold text-slate-300 mb-2">{heroDetails.name}</h2>
              <p className="text-lg md:text-xl text-slate-200 mb-4">{heroDetails.headline}</p>
              <p className="text-md md:text-lg text-slate-300 leading-relaxed mb-6">
                {heroDetails.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href={heroDetails.cvLink} passHref legacyBehavior>
                  <HoverBorderGradient
                      as="a"
                      containerClassName="rounded-full"
                      className="bg-black text-white dark:bg-black dark:text-white flex items-center space-x-2"
                  >
                      Download CV
                  </HoverBorderGradient>
                </Link>
                <Link href="https://github.com/AtharvRG" passHref legacyBehavior>
                  <HoverBorderGradient
                      as="a"
                      containerClassName="rounded-full"
                      className="bg-transparent text-white dark:bg-transparent dark:text-white border border-slate-700" // Example for secondary button
                  >
                      <IconBrandGithub className="h-5 w-5 mr-2" /> GitHub
                  </HoverBorderGradient>
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              {/* Placeholder for Profile Pic */}
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                {/* <Image src={heroDetails.profilePic} alt={heroDetails.name} width={256} height={256} className="object-cover" /> */}
                <span className="text-white text-lg">Profile Pic</span>
              </div>
            </div>
          </div>
        </div>
      </AuroraBackground>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="py-20 bg-neutral-950 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">My Tech Stack</h2>
          <p className="text-center text-neutral-400 mb-12">Tools and technologies I work with.</p>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center text-sky-400">Languages & Core</h3>
            <HoverEffect items={techStack.languagesCore} className="lg:grid-cols-3" />
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6 text-center text-sky-400">Frontend & Desktop</h3>
            <HoverEffect items={techStack.frontendDesktop} className="lg:grid-cols-2 xl:grid-cols-4" />
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6 text-center text-sky-400">Backend & Databases</h3>
            <HoverEffect items={techStack.backendDatabases} className="lg:grid-cols-2" />
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6 text-center text-sky-400">Emerging Interests</h3>
            <HoverEffect items={techStack.emergingInterests} className="lg:grid-cols-2" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Things I've Built (So Far)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 relative z-10 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <ProjectFeatureCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
       <section
        id="about-me"
        onMouseEnter={() => setAboutMeHovered(true)}
        onMouseLeave={() => setAboutMeHovered(false)}
        className="min-h-[40rem] h-auto py-20 flex flex-col items-center justify-center bg-black w-full gap-4 mx-auto px-8 relative overflow-hidden"
      >
        <h2 className="text-4xl font-bold text-center text-white relative z-20 mb-8">
          A Bit More About Me
        </h2>
        <div 
          className="group text-center max-w-3xl mx-auto relative z-20"
        >
          <TextGenerateEffect
            words={aboutMe.philosophy}
            className="text-xl md:text-2xl font-medium text-neutral-300 group-hover:text-sky-300 transition-colors duration-300"
            wordClassName="text-neutral-300 group-hover:text-sky-300 transition-colors duration-300" // Ensure words also get hover color
          />
        </div>
        <AnimatePresence>
          {aboutMeHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full absolute inset-0"
            >
              <CanvasRevealEffect
                animationSpeed={3} // Slower animation
                containerClassName="bg-transparent" // Make it transparent to show page bg
                colors={[
                  [59, 130, 246], // Blue
                  [139, 92, 246],  // Purple
                ]}
                opacities={[0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.2, 0.3, 0.3, 0.5]} // Softer opacities
                dotSize={2}
                showGradient={false} // Remove the default dark gradient overlay if you want full color
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Radial gradient for the cute fade if needed, or rely on CanvasRevealEffect's own potential gradient */}
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)] bg-black/50 dark:bg-black/80 pointer-events-none" />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-neutral-950 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">You’ve Scrolled This Far...</h2>
          <p className="text-center text-neutral-400 mb-12">Might As Well Say Hi!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center w-full gap-6 mx-auto">
            {contactInfo.map((contact) => (
              <ContactCard
                key={contact.name}
                title={contact.name}
                value={contact.value}
                icon={contact.icon}
                link={contact.link}
                colors={contact.colors || [[125, 211, 252]]} // Default color if not specified
              >
                <CanvasRevealEffect
                  animationSpeed={3}
                  containerClassName={cn("rounded-lg", 
                    contact.name === "Email" ? "bg-red-900" :
                    contact.name === "LinkedIn" ? "bg-blue-900" :
                    contact.name === "GitHub" ? "bg-neutral-900" :
                    contact.name === "Twitter" ? "bg-sky-900" :
                    contact.name === "Instagram" ? "bg-pink-900" :
                    contact.name === "Discord" ? "bg-indigo-900" :
                    "bg-sky-800" // Fallback
                  )}
                  colors={contact.colors || [[125, 211, 252]]}
                  dotSize={2}
                />
              </ContactCard>
            ))}
          </div>
          <p className="text-center text-neutral-300 mt-16 text-lg">
            {closingMessage}
          </p>
        </div>
      </section>
      
      <footer className="text-center py-8 bg-black text-neutral-500 text-sm">
        <p>© {new Date().getFullYear()} Atharv R Gachchi. All rights reserved.</p>
        <p>Built with Next.js, Tailwind CSS, and Aceternity UI.</p>
      </footer>
    </>
  );
}