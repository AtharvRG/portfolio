import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Important for dark mode support in components
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite", // For AuroraBackground
      },
      keyframes: {
        aurora: { // For AuroraBackground
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;