// src/components/resume/sections/ContactSection.tsx
'use client';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const socials = [
  { icon: Mail, href: "mailto:atharv2703123@gmail.com", name: "Email" },
  { icon: Github, href: "https://github.com/AtharvRG", name: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/atharvrgachchi", name: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/AtharvRG", name: "Twitter" },
];

export default function ContactSection() {
  return (
    <section className="py-20 text-center">
      <SectionHeader title="Get In Touch" />
      <h2 className="font-harmond text-3xl md:text-4xl text-off-white">
        Let's Build Something Great
      </h2>
      <p className="font-gotham text-pink-light/80 mt-4 max-w-xl mx-auto">
        I'm currently seeking opportunities to contribute to innovative, growth-oriented tech environments. Feel free to reach out!
      </p>
      <div className="flex justify-center gap-6 mt-8">
        {socials.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.1, y: -5 }}
            className="p-3 bg-olive rounded-full text-pink-light hover:text-off-white hover:bg-accent-cyan transition-all duration-200"
          >
            <social.icon size={24} />
          </motion.a>
        ))}
      </div>
    </section>
  );
}