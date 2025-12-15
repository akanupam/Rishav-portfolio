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
    'DaVinci Resolve',
    'CapCut',
    'Color Grading',
    'Motion Design',
    'Sound Design',
  ];

  // const tools = [
  //   'Adobe Creative Suite',
  //   'Blackmagic Suite',
  //   'Cinema 4D',
  //   'Fusion',
  //   'REDcine-X',
  // ];

  return (
    <section
      id="about"
      className="flex items-center justify-center px-6 md:px-8 py-12 md:py-16"
    >
      <motion.div
        className="max-w-7xl w-full"
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
              With over 2.5 years of hands-on experience in video shooting and editing, I work on reels, concert highlights, and short-form content designed for social platforms. I focus on capturing real moments on camera and shaping them into clean, engaging edits.
            </p>
            <p className="text-text-secondary text-base leading-relaxed">
              For me, good videos come from a balance of strong shooting and thoughtful editing. Every cut, transition, and beat is chosen to match the energy of the moment and keep the viewer hooked.
            </p>
            <p className="text-text-secondary text-base leading-relaxed">
              Currently open to freelance projects, collaborations, and full-time opportunities where creativity and visual storytelling matter.
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
                <p className="text-lg font-semibold text-text-primary">2.5+ Years</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary font-mono uppercase tracking-widest mb-1">
                  Edited Videos
                </p>
                <p className="text-lg font-semibold text-text-primary">50+</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary font-mono uppercase tracking-widest mb-1">
                  Specialization
                </p>
                <p className="text-lg font-semibold text-text-primary">Shooting & Editing</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div variants={itemVariants} className="mt-12 space-y-6">
          <h3 className="text-xl font-semibold text-text-primary">Core Skills & Tools:</h3>
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
        {/* <motion.div variants={itemVariants} className="mt-12 space-y-6">
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
        </motion.div> */}
      </motion.div>
    </section>
  );
}
