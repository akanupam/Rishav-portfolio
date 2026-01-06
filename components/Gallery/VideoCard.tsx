'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface VideoCardProps {
  videoUrl: string;
  title: string;
  index: number;
  onOpen: (index: number) => void;
}

export function VideoCard({ videoUrl, title, index, onOpen }: VideoCardProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-[200px] sm:w-[240px] aspect-[9/16] bg-panel border-2 border-border rounded-xl overflow-hidden hover:border-accent-primary transition-all duration-300 hover:shadow-glow-blue cursor-pointer"
      onClick={() => !hasError && onOpen(index)}
      role="button"
      tabIndex={0}
      aria-label={`Play ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          !hasError && onOpen(index);
        }
      }}
    >
      {/* Error State */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-panel p-4 text-center">
          <svg
            className="w-12 h-12 text-text-secondary/50 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-text-secondary text-xs">Failed to load video</p>
        </div>
      ) : (
        <>
          {/* Video Thumbnail */}
          <video
            src={videoUrl}
            className="w-full h-full object-cover"
            playsInline
            preload="metadata"
            muted
            onError={() => setHasError(true)}
          />

          {/* Play Button Overlay */}
          <motion.div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-300 group-hover:bg-black/50">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent-primary/90 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center shadow-lg shadow-accent-primary/30 transition-all duration-300"
            >
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
