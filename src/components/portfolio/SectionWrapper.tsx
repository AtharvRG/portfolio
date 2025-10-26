// src/components/portfolio/SectionWrapper.tsx
'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper = React.forwardRef<HTMLDivElement, SectionWrapperProps>(
  ({ children, className }, ref) => {
    return (
      <motion.section
        ref={ref}
        className={cn(
          "h-screen w-full snap-start flex flex-col relative overflow-hidden",
          className
        )}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.section>
    );
  }
);

SectionWrapper.displayName = 'SectionWrapper';
export default SectionWrapper;