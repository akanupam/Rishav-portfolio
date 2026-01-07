'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface VideoModalProps {
  videoUrl: string;
  posterUrl: string;
  title: string;
  totalVideos: number;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export function VideoModal({
  videoUrl,
  posterUrl,
  title,
  totalVideos,
  onClose,
  onNavigate,
}: VideoModalProps) {
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus management and keyboard navigation
  useEffect(() => {
    // Store previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus close button on mount
    closeButtonRef.current?.focus();

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate('prev');
      } else if (e.key === 'ArrowRight') {
        onNavigate('next');
      } else if (e.key === 'Tab') {
        // Simple focus trap
        e.preventDefault();
        const focusableElements = document.querySelectorAll(
          '[role="dialog"] button:not([disabled])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // Restore focus
      previousFocusRef.current?.focus();
    };
  }, [onClose, onNavigate]);

  // Auto-play video when modal opens or video changes
  useEffect(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.play().catch(() => {
        // Autoplay prevented, user can click play manually
      });
    }
  }, [videoUrl]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-lg mx-4 aspect-[9/16] bg-panel rounded-2xl overflow-hidden shadow-2xl border-2 border-accent-primary/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video Player */}
        <video
          ref={modalVideoRef}
          src={videoUrl}
          poster={posterUrl}
          className="w-full h-full object-cover"
          controls
          playsInline
          loop
          aria-label={title}
        />

        {/* Close Button */}
        <motion.button
          ref={closeButtonRef}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent-primary/20 hover:border-accent-primary transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-accent-primary"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5 text-text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>

        {/* Navigation Arrows */}
        {totalVideos > 1 && (
          <>
            {/* Left Arrow */}
            <motion.button
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent-primary/20 hover:border-accent-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-primary"
              aria-label="Previous video"
            >
              <svg
                className="w-6 h-6 text-text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            {/* Right Arrow */}
            <motion.button
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent-primary/20 hover:border-accent-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-primary"
              aria-label="Next video"
            >
              <svg
                className="w-6 h-6 text-text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </>
        )}
      </motion.div>

      {/* Keyboard hints */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-secondary text-sm opacity-60 pointer-events-none">
        • Use arrow keys to navigate
      </div>
    </motion.div>
  );
}
