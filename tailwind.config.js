/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0D10',
        panel: '#12151C',
        'accent-primary': '#7C7CFF',
        'accent-secondary': '#4FD1C5',
        'text-primary': '#E6E8EB',
        'text-secondary': '#9AA0AA',
        border: '#1F242F',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(124, 124, 255, 0.3)',
        'glow-cyan': '0 0 20px rgba(79, 209, 197, 0.3)',
      },
      animation: {
        'sweep': 'sweep 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        sweep: {
          '0%': { left: '-100%' },
          '50%': { left: '100%' },
          '100%': { left: '-100%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
