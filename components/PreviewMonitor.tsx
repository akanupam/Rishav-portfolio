'use client';

import { motion } from 'framer-motion';
import { Clip } from '@/lib/store';

interface PreviewMonitorProps {
  clip: Clip | undefined;
}

export function PreviewMonitor({ clip }: PreviewMonitorProps) {
  if (!clip) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="aspect-video bg-panel border-2 border-border rounded-2xl flex items-center justify-center shadow-lg">
          <p className="text-text-secondary text-sm">No clip selected</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key={clip.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      {/* Preview Monitor Container with depth */}
      <div className="relative group">
        {/* Ambient glow behind preview */}
        <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary/20 via-accent-secondary/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

        <div className="relative aspect-video bg-panel border-2 border-accent-primary rounded-2xl overflow-hidden shadow-2xl shadow-accent-primary/30 flex items-center justify-center">
          {/* Instagram Embed with Responsive Container */}
          {clip.embedType === 'instagram' && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4 sm:p-6 text-center">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('${clip.thumbnail}')`,
                }}
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4">
                <p className="text-text-secondary text-xs sm:text-sm max-w-xs px-4">
                  Instagram content - visit the link to view
                </p>
                <motion.a
                  href={clip.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-accent-primary text-background font-semibold rounded-lg hover:shadow-glow-blue transition-all duration-300 text-sm sm:text-base"
                >
                  View on Instagram
                </motion.a>
              </div>
            </div>
          )}

          {/* Google Drive Embed - Responsive */}
          {clip.embedType === 'drive' && (
            <iframe
              src={clip.embedUrl}
              className="w-full h-full"
              style={{ border: 'none', overflow: 'hidden' }}
              allow="autoplay"
              title={clip.title}
            />
          )}
        </div>
      </div>

      {/* Metadata Section - Below Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {/* Title */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
            {clip.title}
          </h3>
          
          {/* Categories/Tags */}
          <div className="flex flex-wrap gap-2">
            {clip.category.map((cat) => (
              <motion.span
                key={cat}
                whileHover={{ scale: 1.05 }}
                className="text-xs sm:text-sm px-3 py-1.5 bg-accent-primary/20 text-accent-primary rounded-full font-mono border border-accent-primary/40 hover:border-accent-primary/80 transition-colors cursor-default"
              >
                {cat}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl">
          {clip.description}
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-text-secondary font-mono pt-4 border-t border-border/50">
          <div>
            <span className="text-accent-primary">Type:</span> {clip.embedType === 'instagram' ? 'Instagram Reel' : 'Video'}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
