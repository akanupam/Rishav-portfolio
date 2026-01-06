'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroProps {
  onEnterTimeline: () => void;
}

export function Hero({ onEnterTimeline }: HeroProps) {
  const fullText = 'Cinematographer & Editor ';
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = 80;
    const deletingSpeed = 50;
    const pauseBeforeDelete = 2000;
    const pauseBeforeType = 500;

    if (!isDeleting && currentIndex < fullText.length) {
      // Typing forward
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentIndex === fullText.length) {
      // Pause before deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseBeforeDelete);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentIndex > 0) {
      // Deleting backward
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => prev - 1);
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentIndex === 0) {
      // Pause before retyping
      const timeout = setTimeout(() => {
        setIsDeleting(false);
      }, pauseBeforeType);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isDeleting, fullText]);
  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Main heading with layered animation
  const headingVariants = {
    hidden: { opacity: 0, y: 60, rotateX: 20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  // Subtitle slide and fade
  const subtitleVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  // Button bounce entrance
  const buttonVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Ambient glow animation behind text
  const glowVariants = {
    animate: {
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.1, 1],
      transition: {
        duration: 4,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 md:px-8 pt-20 relative overflow-hidden"
    >
      {/* Animated gradient background layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(124, 124, 255, 0.1) 0%, transparent 70%)',
        }}
        variants={glowVariants}
        animate="animate"
      />

      {/* Ambient glow accent - secondary */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(79, 209, 197, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 6,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background opacity-50 pointer-events-none" />

      <motion.div
        className="max-w-7xl w-full text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title with enhanced animation */}
        <motion.div
          variants={headingVariants}
          className="relative mb-8 md:mb-12"
        >
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72 aspect-square">
              {/* Animated glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(124, 124, 255, 0.6), rgba(79, 209, 197, 0.4))',
                  filter: 'blur(20px)',
                }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Profile Image */}
              <Image
                src="/profile/profile.jpg"
                alt="Rishav Profile"
                width={576}
                height={576}
                sizes="(max-width: 768px) 224px, 288px"
                quality={90}
                className="relative rounded-full object-cover w-full h-full border-4 border-accent-primary/50 shadow-lg shadow-accent-primary/50"
                priority
              />
            </div>
          </motion.div>

          {/* Text with letter-by-letter effect */}
          <div className="relative inline-block">
            {/* Glow backdrop behind text */}
            <motion.div
              className="absolute inset-0 blur-2xl opacity-60"
              style={{
                background: 'linear-gradient(135deg, rgba(124, 124, 255, 0.3), rgba(79, 209, 197, 0.2))',
              }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-text-primary mb-6 relative z-10">
              I&apos;M RISHAV
            </h1>
          </div>

          {/* Animated line accent under title */}
          <motion.div
            className="relative h-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent rounded-full overflow-hidden mt-6"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: 'easeOut',
            }}
            style={{ originX: 0.5 }}
          />

          {/* Animated playhead element - enhanced */}
          <motion.div
            className="relative h-0.5 bg-panel rounded-full overflow-hidden mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.div
              className="absolute h-full w-2 bg-accent-secondary rounded-full blur-sm"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2.5,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: 0.8,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Subtitle with typewriter animation */}
        <motion.p
          variants={subtitleVariants}
          className="text-lg md:text-2xl text-text-secondary mb-8 font-light tracking-wide min-h-[2rem] md:min-h-[2.5rem]"
        >
          {displayedText}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-0.5 h-5 md:h-7 bg-accent-primary ml-1 align-middle"
          />
        </motion.p>

        {/* CTA Button with enhanced micro-interactions */}
        <motion.button
          variants={buttonVariants}
          whileHover={{
            scale: 1.08,
            boxShadow: '0 0 30px rgba(124, 124, 255, 0.8), 0 0 60px rgba(124, 124, 255, 0.5), 0 0 90px rgba(79, 209, 197, 0.3)',
          }}
          whileTap={{ scale: 0.92 }}
          onClick={onEnterTimeline}
          className="relative px-10 py-4 md:px-14 md:py-5 bg-accent-primary text-background font-bold rounded-lg transition-all duration-300 overflow-hidden group shadow-lg shadow-accent-primary/40"
        >
          {/* Button shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
            initial={{ x: '-100%' }}
            whileHover={{
              x: '100%',
              transition: { duration: 0.6 },
            }}
          />
          <span className="relative z-10">View Gallery</span>
        </motion.button>
      </motion.div>

      {/* Scroll down arrow */}
      <motion.div
        animate={{
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <svg
          className="w-6 h-6 text-accent-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
