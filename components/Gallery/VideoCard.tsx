'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface VideoCardProps {
  videoUrl: string;
  posterUrl: string;
  title: string;
  index: number;
  onOpen: (index: number) => void;
}

export function VideoCard({ videoUrl, posterUrl, title, index, onOpen }: VideoCardProps) {
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
          if (!hasError) {
            onOpen(index);
          }
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
            poster={posterUrl}
            className="w-full h-full object-cover"
            playsInline
            preload="none"
            muted
            onError={() => setHasError(true)}
          />

          {/* Play Button Overlay */}
          <motion.div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 group-hover:bg-black/30">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent-primary/30 border border-white/15 flex items-center justify-center transition-all duration-300"
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-0.5"
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
