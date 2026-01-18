"use client";

import { useLoader } from "./LoaderContext";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const { isLoading } = useLoader();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-olive-dark"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Progress bar at top - now infinite animation until content loads */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-off-white/10 overflow-hidden">
            <motion.div
              className="h-full w-1/3 bg-gradient-to-r from-transparent via-off-white to-transparent"
              animate={{ x: ["-100%", "400%"] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </div>

          {/* Abstract morphing shapes container */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Outer rotating ring */}
            <motion.div
              className="absolute w-32 h-32 rounded-full border border-off-white/20"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />

            {/* Middle morphing shape */}
            <motion.div
              className="absolute w-20 h-20 bg-gradient-to-br from-off-white/10 to-pink-light/10 backdrop-blur-sm"
              animate={{ 
                borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
                rotate: [0, 180, 360],
                scale: [1, 1.15, 1],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Inner pulsing core */}
            <motion.div
              className="absolute w-8 h-8 rounded-full bg-off-white/30"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-off-white/40"
                initial={{ 
                  x: 0, 
                  y: 0 
                }}
                animate={{ 
                  x: [0, Math.cos(i * 60 * Math.PI / 180) * 50, 0],
                  y: [0, Math.sin(i * 60 * Math.PI / 180) * 50, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              />
            ))}
          </div>

          {/* Subtle ambient glow */}
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-off-white/5 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Loading message */}
          <motion.p
            className="mt-12 text-off-white/60 text-sm font-sans tracking-wide text-center max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Please wait till the site loads all the assets for best experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
