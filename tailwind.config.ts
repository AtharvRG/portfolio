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
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
      },
      // ADD THIS FONT FAMILY CONFIGURATION:
      fontFamily: {
        display: ["var(--font-one-more)", "sans-serif"],
        sans: ["var(--font-gambio)", "sans-serif"],
        accent: ["var(--font-once-after)", "serif"],
        agno: ["var(--font-agno)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;