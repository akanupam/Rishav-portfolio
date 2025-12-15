'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clip, usePortfolioStore } from '@/lib/store';
import { PreviewMonitor } from './PreviewMonitor';
import { Timeline } from './Timeline';

interface EditorViewProps {
  clips: Clip[];
}

export function EditorView({ clips }: EditorViewProps) {
  const { selectedClipId, selectClip } = usePortfolioStore();

  // Initialize clips on mount
  useEffect(() => {
    if (clips.length > 0 && !selectedClipId) {
      selectClip(clips[0].id);
    }
  }, [clips, selectedClipId, selectClip]);

  const selectedClip = clips.find((c) => c.id === selectedClipId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const panelVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="editor"
      className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 space-y-8 sm:space-y-12 bg-gradient-to-b from-background via-background to-background"
    >
      <motion.div
        className="max-w-7xl mx-auto w-full space-y-10 sm:space-y-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section Header with Animation */}
        <motion.div
          variants={panelVariants}
          className="space-y-4"
        >
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-text-primary">
              Edits
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full" />
          </div>
          <p className="text-text-secondary text-sm sm:text-base max-w-2xl">
            Explore selected clips from recent projects
          </p>
        </motion.div>

        {/* Preview Monitor - Responsive */}
        <motion.div 
          variants={panelVariants}
          className="w-full"
        >
          <PreviewMonitor clip={selectedClip} />
        </motion.div>

        {/* Timeline - Responsive Layout */}
        <motion.div 
          variants={panelVariants}
          className="w-full"
        >
          <Timeline clips={clips} />
        </motion.div>

        {/* See More Link */}
        <motion.div
          variants={panelVariants}
          className="pt-8 flex justify-center"
        >
          <a
            href="https://drive.google.com/drive/folders/1h54X9IMYGDEOcRMfIHNr4_MuUhPFKw8l"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-accent-primary hover:text-text-primary bg-panel rounded-lg border border-border hover:border-accent-primary transition-all duration-300 group text-base sm:text-lg font-semibold hover:shadow-glow-blue"
          >
            See more of my work{' '}
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
