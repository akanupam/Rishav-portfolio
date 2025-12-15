# Rishav Portfolio

A cinematic, editor-style portfolio website for video editor Rishav. Built with Next.js, React, Tailwind CSS, and Framer Motion.

## Features

✨ **Cinematic Design** — Dark, editor-inspired UI resembling professional NLE software  
🎬 **Interactive Timeline** — Select and preview clips in a timeline interface  
📺 **Embed Support** — Instagram Reels and Google Drive videos integrated seamlessly  
✨ **Smooth Animations** — Framer Motion for elegant, cinematic transitions  
📱 **Fully Responsive** — Desktop-first, mobile-optimized layout  
♿ **Accessible** — WCAG-compliant with keyboard navigation and motion preferences  

## Tech Stack

- **Next.js 14** — App Router for modern full-stack development
- **React 18** — UI components and state management
- **Tailwind CSS** — Utility-first styling with custom color palette
- **Framer Motion** — Advanced animations and interactions
- **Zustand** — Lightweight state management for clip selection

## Project Structure

```
rishav-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles and animations
├── components/
│   ├── Navigation.tsx      # Top navigation bar
│   ├── Hero.tsx            # Hero section with title and CTA
│   ├── EditorView.tsx      # Main editor interface container
│   ├── PreviewMonitor.tsx  # Video player with embed support
│   ├── Timeline.tsx        # Interactive timeline track
│   ├── ProjectBin.tsx      # Clip grid display
│   ├── ClipThumbnail.tsx   # Individual clip card
│   ├── About.tsx           # About section with skills
│   └── ContactModal.tsx    # Contact form modal
├── lib/
│   ├── store.ts            # Zustand state management
│   └── clips.ts            # Dummy clip data
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## Color Palette

| Element | Color | Usage |
|---------|-------|-------|
| Background | `#0B0D10` | Main background |
| Panel BG | `#12151C` | Component containers |
| Primary Accent | `#7C7CFF` | Selection, highlights |
| Secondary Accent | `#4FD1C5` | Hover states, alternate highlight |
| Text Primary | `#E6E8EB` | Main content |
| Text Secondary | `#9AA0AA` | Metadata, descriptions |
| Border | `#1F242F` | Component dividers |

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Features & Components

### Hero Section
- Animated title with sweeping playhead effect
- Scroll indicator animation
- "View Edits" CTA button with hover effects

### Editor View
**Three-panel layout:**

1. **Preview Monitor**
   - Embeds Instagram Reels and Google Drive videos
   - Displays metadata overlays (title, tags, duration)
   - Smooth transitions between clips

2. **Timeline**
   - Interactive clip selector with visual feedback
   - Shows clip title, tags, duration
   - Active state with glowing accent color
   - Total duration calculation

3. **Project Bin**
   - Grid layout of all available clips
   - Thumbnail cards with hover preview
   - Category tags and descriptions
   - Responsive grid (1–3 columns)

### About Section
- Professional bio and experience summary
- Skills grid with visual feedback
- Tools and software list
- Stats display (experience, projects completed)

### Contact Modal
- Form styled as "Export Settings"
- Input labels mimicking editor terminology
- Success state with animated confirmation
- Social links in footer

### Navigation
- Sticky top bar with logo
- Section links (responsive)
- Portfolio version display

## State Management

Uses **Zustand** for minimal, efficient state:

```typescript
interface PortfolioStore {
  clips: Clip[]
  selectedClipId: string | null
  isPlaying: boolean
  selectClip: (id: string) => void
  togglePlay: () => void
  getSelectedClip: () => Clip | undefined
}
```

## Animations

All animations use Framer Motion with smooth spring physics:

- **Entrance Animations**: Staggered fade-in + slide-up (0.6s total)
- **Clip Selection**: Scale (1 → 1.05), border glow, crossfade
- **Hover Effects**: Scale, color shift, shadow updates
- **Timeline**: Active indicator with layout animation
- **Form Submit**: Loading spinner, success checkmark

**Respects** `prefers-reduced-motion` for accessibility.

## Embeds

### Instagram Reels
- Embed URL: `https://www.instagram.com/p/[POST_ID]/embed`
- Auto-responsive iframe

### Google Drive Videos
- Share link must be public
- Embed URL: `https://drive.google.com/file/d/[FILE_ID]/preview`

**Note:** Customize embed URLs in `lib/clips.ts` with actual post/file IDs.

## Responsive Design

| Breakpoint | Size | Changes |
|-----------|------|---------|
| Mobile | < 640px | 1-column grid, stacked layout, smaller typography |
| Tablet | 640–1024px | 2-column grid, side-by-side sections |
| Desktop | > 1024px | 3-column grid, full layout |

## Customization

### Update Portfolio Content

Edit `lib/clips.ts`:
```typescript
const CLIPS = [
  {
    id: 'your-id',
    title: 'Your Project Title',
    duration: 30,
    embedType: 'instagram' | 'drive',
    embedUrl: 'your-url',
    category: ['Tag1', 'Tag2'],
    description: 'Your description...',
    thumbnail: 'your-image-url'
  }
]
```

### Change Color Scheme

Edit `tailwind.config.js` colors:
```javascript
colors: {
  'accent-primary': '#YourColor'
}
```

### Adjust Animation Speed

Edit animation configs in component files:
```typescript
transition={{ duration: 0.3 }} // Adjust duration
```

## Performance

- **Fast page load** — Optimized images and lazy loading
- **Smooth animations** — 60fps with GPU acceleration
- **Lightweight bundle** — ~40KB gzipped
- **SEO-friendly** — Next.js metadata and semantic HTML

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Mobile browsers: iOS Safari 12+, Chrome Mobile, Samsung Internet

## License

© 2024 Rishav. All rights reserved.

## Contact

- **Email**: hello@rishav.com
- **Instagram**: @rishav.edits
- **LinkedIn**: linkedin.com/in/rishav

---

**Built with** ❤️ **using Next.js, React, Tailwind CSS, and Framer Motion**
