// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  extend: {
    colors: {
      // AXIOM PALETTE
      'olive-dark': '#0f2732ff', // Main background
      'olive': '#192d3fff',      // Card/component background
      'off-white': '#f8e7caff',  // Primary text
      'pink-light': '#ffe8f2ff', // Secondary text/borders
        // Vibrant accents for delight
        'accent-blue': '#3b82f6',
        'accent-purple': '#a78bfa',
        'accent-emerald': '#10b981',
        'accent-cyan': '#06b6d4',
        'accent-pink': '#d9a5dbff',
        // Gradient examples
        'gradient-start': '#3b82f6',
        'gradient-end': '#a78bfa',
        // Glassmorphism
        'glass-bg': 'rgba(255,255,255,0.15)',
        'glass-dark': 'rgba(24,39,63,0.6)',
        // Improved dark mode
        'dark-bg': '#10151c',
        'dark-card': '#192d3f',
        'dark-text': '#e0e7ef',
    },
    fontFamily: {
      sans: ['var(--font-neue)', 'sans-serif'], // For small UI text
      serif: ['var(--font-dm-serif)', 'serif'], // For elegant headings/text
      ppn: ['var(--font-ppn)', 'monospace'],
      dance: ['var(--font-dance)', 'cursive'],
      harmond: ['var(--font-harmond)', 'sans-serif'],
      ver: ['var(--font-ver)', 'sans-serif'], // For playful accents
      variable: ['var(--font-roboto-flex)', 'sans-serif'], // For code snippets
      mayes: ['var(--font-mayes)', 'sans-serif'],
      nura: ['var(--font-nura)', 'sans-serif'],
      wistle: ['var(--font-wistle)', 'serif'],
      gotham: ['var(--font-gotham)', 'sans-serif'],
      lato: ['var(--font-lato)', 'sans-serif'],
      garamond: ['var(--font-eb-garamond)', 'serif'],
    },
          keyframes: {
        // FIX: The marquee animation is simplified for the new structure
        marquee: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-100%)' }
        },
      marqueeSlow: { 'from': { transform: 'translateX(0%)' }, 'to': { transform: 'translateX(-50%)' } },
      "reveal-up": { "0%": { opacity: "0", transform: "translateY(80%)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      "reveal-down": { "0%": { opacity: "0", transform: "translateY(-80%)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      "content-blur": { "0%": { filter: "blur(0.3rem)" }, "100%": { filter: "blur(0)" } },
        // Modern delight animations
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'scale-up': { '0%': { transform: 'scale(0.95)' }, '100%': { transform: 'scale(1)' } },
        'glass-float': { '0%': { filter: 'blur(0.5rem)' }, '100%': { filter: 'blur(0)' } },
    },
    animation: {
        'fade-in': 'fade-in 0.8s ease-out',
        'scale-up': 'scale-up 0.5s cubic-bezier(0.18,0.89,0.82,1.04)',
        'glass-float': 'glass-float 1s ease-in',
    },
    transitionTimingFunction: { "minor-spring": "cubic-bezier(0.18,0.89,0.82,1.04)" },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'soft': '0 4px 24px 0 rgba(0,0,0,0.08)',
        'accent': '0 2px 8px 0 rgba(59,130,246,0.15)',
      },
  },
},
  plugins: [],
};
export default config;