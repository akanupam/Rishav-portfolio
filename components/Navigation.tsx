'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-8 md:py-6 backdrop-blur-md bg-background/80 border-b border-border"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="#" className="text-xl md:text-2xl font-bold tracking-tighter">
          <span className="text-accent-primary">R</span>V
        </Link>
        
        <div className="hidden md:flex gap-8 text-text-secondary text-sm">
          <a href="#hero" className="hover:text-accent-primary transition-colors">Home</a>
          <a href="#editor" className="hover:text-accent-primary transition-colors">Edits</a>
          <a href="#about" className="hover:text-accent-primary transition-colors">About</a>
        </div>

        <a
          href="https://www.instagram.com/rishavkumar46895/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent-primary transition-colors"
          aria-label="Instagram"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
            <circle cx="12" cy="12" r="3.5"/>
            <circle cx="18.5" cy="5.5" r="1.5"/>
          </svg>
        </a>
      </div>
    </motion.nav>
  );
}
