'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { VideoCard } from './VideoCard';
import { VideoModal } from './VideoModal';
import type { VideoMetadata } from '@/lib/videos';

interface GalleryClientProps {
  videos: VideoMetadata[];
}

export function GalleryClient({ videos }: GalleryClientProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const openModal = (index: number) => {
    setSelectedVideoIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateVideo = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedVideoIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
    } else {
      setSelectedVideoIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  if (videos.length === 0) {
    return (
      <section
        id="gallery"
        className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 bg-gradient-to-b from-background to-panel"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-text-primary mb-4">
            Gallery
          </h2>
          <p className="text-text-secondary">No videos found. Add videos to the /public/videos folder.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 bg-gradient-to-b from-background to-panel"
    >
      <motion.div
        className="max-w-7xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-text-primary">
              Gallery
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full" />
          </div>
          <p className="text-text-secondary text-sm sm:text-base max-w-2xl">
            A collection of recent reels and short-form content
          </p>
        </motion.div>

        {/* Slider Container */}
        <motion.div variants={itemVariants} className="relative group">
          {/* Left Arrow - Hidden on mobile */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-panel/90 border border-border rounded-full hover:bg-accent-primary/20 hover:border-accent-primary transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow - Hidden on mobile */}
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-panel/90 border border-border rounded-full hover:bg-accent-primary/20 hover:border-accent-primary transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="flex-shrink-0 snap-center group/card"
              >
                <VideoCard
                  videoUrl={video.videoUrl}
                  title={video.title}
                  index={index}
                  onOpen={openModal}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="flex justify-center pt-4">
          <a
            href="https://drive.google.com/drive/folders/1h54X9IMYGDEOcRMfIHNr4_MuUhPFKw8l"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-panel border-2 border-accent-primary text-accent-primary font-semibold rounded-lg hover:bg-accent-primary/10 hover:shadow-glow-blue transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>See more of my work</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {isModalOpen && (
          <VideoModal
            videoUrl={videos[selectedVideoIndex].videoUrl}
            title={videos[selectedVideoIndex].title}
            currentIndex={selectedVideoIndex}
            totalVideos={videos.length}
            onClose={closeModal}
            onNavigate={navigateVideo}
          />
        )}
      </AnimatePresence>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
