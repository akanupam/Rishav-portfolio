'use client';

import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { EditorView } from '@/components/EditorView';
import { About } from '@/components/About';
import { CLIPS } from '@/lib/clips';
import { useRef } from 'react';

export default function Home() {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleEnterTimeline = () => {
    editorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main style={{ backgroundColor: '#0B0D10', color: '#E6E8EB' }} className="overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <Hero onEnterTimeline={handleEnterTimeline} />

      {/* Editor View Section */}
      <div ref={editorRef}>
        <EditorView clips={CLIPS} />
      </div>

      {/* About Section */}
      <About />

      {/* Contact CTA */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-8">
        <div className="max-w-3xl text-center space-y-8">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
            Ready to Collaborate?
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            Whether you're looking for a talented video editor, motion designer, or colorist,
            I'm ready to bring your vision to life.
          </p>
          <a
            href="https://instagram.com/rishavkumar46895/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-accent-secondary text-background font-semibold rounded-lg hover:shadow-glow-cyan transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Start a Project
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 md:px-8 text-center text-text-secondary text-sm font-mono">
        <p>© 2024 Rishav — All Rights Reserved</p>
      </footer>
    </main>
  );
}
