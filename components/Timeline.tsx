'use client';

import { motion } from 'framer-motion';
import { Clip, usePortfolioStore } from '@/lib/store';

interface TimelineProps {
  clips: Clip[];
}

export function Timeline({ clips }: TimelineProps) {
  const { selectedClipId, selectClip } = usePortfolioStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-4 sm:space-y-5"
    >
      {/* Timeline Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <h3 className="text-sm font-mono text-text-secondary uppercase tracking-widest">
          ▶ Timeline Track
        </h3>
        <div className="text-xs text-text-secondary font-mono">
          {clips.length} clips
        </div>
      </div>

      {/* Timeline Track Container */}
      <div className="bg-gradient-to-r from-panel to-panel/50 border-2 border-border/50 rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3 backdrop-blur-sm">
        {clips.map((clip, index) => (
          <motion.button
            key={clip.id}
            variants={itemVariants}
            onClick={() => selectClip(clip.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative group w-full cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
              selectedClipId === clip.id
                ? 'ring-2 ring-accent-primary shadow-lg shadow-accent-primary/40'
                : 'hover:ring-1 hover:ring-accent-secondary/50'
            }`}
          >
            {/* Background Gradient - Fixed height */}
            <div
              className={`h-16 sm:h-20 w-full bg-gradient-to-r transition-all duration-300 flex items-center relative overflow-hidden ${
                selectedClipId === clip.id
                  ? 'from-accent-primary/40 via-accent-primary/20 to-transparent'
                  : 'from-border/40 to-transparent group-hover:from-accent-secondary/30'
              }`}
            >
              {/* Shimmer Effect on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                }}
              />

              {/* Content */}
              <div className="px-3 sm:px-4 h-full flex items-center justify-between w-full relative z-10">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span className="text-xs font-mono text-text-secondary flex-shrink-0 bg-background/50 rounded px-2 py-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 text-left">
                    <p className="text-xs sm:text-sm font-bold text-text-primary truncate">
                      {clip.title}
                    </p>
                    <p className="text-xs text-text-secondary truncate">
                      {clip.category.join(' • ')}
                    </p>
                  </div>
                </div>

                {/* Duration Badge */}
                {/* <div className="ml-2 sm:ml-4 flex-shrink-0 px-2 sm:px-3 py-1 bg-background/60 rounded text-xs font-mono text-text-secondary">
                  {clip.embedType === 'instagram' ? '📸' : '🎬'}
                </div> */}
              </div>

              {/* Active Indicator Line */}
              {selectedClipId === clip.id && (
                <motion.div
                  layoutId="activeClip"
                  className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent-primary to-accent-secondary"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
