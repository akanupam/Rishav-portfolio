'use client';

import { motion } from 'framer-motion';

export function About() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const skills = [
    'Premiere Pro',
    'Final Cut Pro',
    'After Effects',
    'DaVinci Resolve',
    'Color Grading',
    'Motion Design',
    'Sound Design',
    'VFX Compositing',
  ];

  const tools = [
    'Adobe Creative Suite',
    'Blackmagic Suite',
    'Cinema 4D',
    'Fusion',
    'REDcine-X',
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 md:px-8 py-24"
    >
      <motion.div
        className="max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-text-primary mb-4">
            About
          </h2>
          <div className="h-1 w-20 bg-accent-primary" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Bio */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 space-y-4"
          >
            <p className="text-text-secondary text-base leading-relaxed">
              With over 5 years of professional video editing experience, I specialize in
              crafting compelling visual narratives through meticulous editing, color
              grading, and motion design. My work spans commercial, corporate, and creative
              content across multiple platforms.
            </p>
            <p className="text-text-secondary text-base leading-relaxed">
              I believe in the power of precision editing and cinematic storytelling. Every
              frame, transition, and cut serves a purpose—to engage, inform, and inspire.
            </p>
            <p className="text-text-secondary text-base leading-relaxed">
              Currently available for freelance projects, collaborations, and full-time
              opportunities with forward-thinking creative teams.
            </p>
          </motion.div>

          {/* Profile Info */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-6"
          >
            <div className="bg-panel border border-border rounded-lg p-6 space-y-4">
              <div>
                <p className="text-xs text-text-secondary font-mono uppercase tracking-widest mb-1">
                  Experience
                </p>
                <p className="text-lg font-semibold text-text-primary">5+ Years</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary font-mono uppercase tracking-widest mb-1">
                  Projects Completed
                </p>
                <p className="text-lg font-semibold text-text-primary">150+</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary font-mono uppercase tracking-widest mb-1">
                  Specialization
                </p>
                <p className="text-lg font-semibold text-text-primary">Cinematic Edit</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div variants={itemVariants} className="mt-12 space-y-6">
          <h3 className="text-xl font-semibold text-text-primary">Core Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {skills.map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-3 bg-panel border border-border rounded-lg text-center text-sm font-medium text-accent-primary hover:shadow-glow-blue transition-all duration-300"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tools Section */}
        <motion.div variants={itemVariants} className="mt-12 space-y-6">
          <h3 className="text-xl font-semibold text-text-primary">Tools & Software</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tools.map((tool) => (
              <motion.div
                key={tool}
                whileHover={{ x: 4 }}
                className="px-4 py-3 bg-panel border border-border rounded-lg flex items-center gap-3 hover:border-accent-secondary transition-colors duration-300"
              >
                <div className="w-2 h-2 bg-accent-secondary rounded-full" />
                <span className="text-sm text-text-secondary">{tool}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
