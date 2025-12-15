# Rishav Portfolio — AI Coding Instructions

## Project Overview
Cinematic, editor-style portfolio for video editor Rishav built with Next.js 14, React 18, TypeScript, Tailwind CSS, and Framer Motion. The UI mimics professional NLE (non-linear editing) software with a dark, sophisticated aesthetic.

## Architecture

### Core Application Flow
1. **Root Layout** ([app/layout.tsx](app/layout.tsx)) — Sets metadata and applies global background styles
2. **Main Page** ([app/page.tsx](app/page.tsx)) — Renders all sections (Hero, EditorView, About, Contact)
3. **EditorView** ([components/EditorView.tsx](components/EditorView.tsx)) — Container managing the three-panel editor interface
   - Passes clips from parent and manages selected clip state
   - Initializes first clip on mount via Zustand store
4. **Zustand Store** ([lib/store.ts](lib/store.ts)) — Centralized state: `selectedClipId`, `isPlaying`, `clips` array
5. **Clips Data** ([lib/clips.ts](lib/clips.ts)) — Mock data array with embeds (Instagram Reels, Google Drive videos)

### Component Hierarchy
```
page.tsx
├── Navigation
├── Hero
├── EditorView (state container)
│   ├── PreviewMonitor (displays selected clip via embed)
│   ├── Timeline (horizontal clip selector)
│   └── ProjectBin (grid of all clips)
├── About
└── ContactModal
```

## Key Patterns & Conventions

### State Management with Zustand
- Use `'use client'` directive in any component accessing `usePortfolioStore()`
- Store interface defines shape: `Clip` object includes `id`, `embedType` ('instagram' | 'drive'), `embedUrl`
- Selection flow: `selectClip(id)` → auto-sets `isPlaying: true` → PreviewMonitor re-renders
- Example: `components/EditorView.tsx` initializes clips on mount with `selectClip(clips[0].id)`

### Animation Patterns (Framer Motion)
- Standard container/item variants with `staggerChildren` for sequential animations:
  ```tsx
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
  ```
- Use `whileInView` + `viewport={{ once: true }}` for lazy reveal on scroll (Timeline, ProjectBin)
- Typical transition duration: 0.4s for items, 0.2s stagger delay

### Styling with Tailwind
- **Color Tokens** ([tailwind.config.js](tailwind.config.js)): Use semantic names (`bg-background`, `text-primary`, `border-border`, `accent-primary`)
- **Custom Shadows**: `shadow-glow-blue`, `shadow-glow-cyan` for neon effects
- **Custom Animations**: `animate-sweep`, `animate-pulse-glow` for cinematic effects
- **Font Stack**: Inter (sans) + JetBrains Mono (monospace) — defined via CSS variables in globals.css
- Dark theme: Background `#0B0D10`, panels `#12151C`, borders `#1F242F`

### Client vs. Server
- All interactive components (`EditorView`, `Timeline`, `ProjectBin`, `ClipThumbnail`, `ContactModal`) require `'use client'` directive
- Pass data as props from server-rendered parent ([app/page.tsx](app/page.tsx))
- No API routes or dynamic fetching — all data from [lib/clips.ts](lib/clips.ts)

## Developer Workflows

### Local Development
```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build (checks TypeScript)
npm run start    # Run production build locally
npm run lint     # ESLint check (uses next lint)
```

### Adding a New Feature
1. **New clips**: Add to `CLIPS` array in [lib/clips.ts](lib/clips.ts); auto-loads into store
2. **New section component**: Create in [components/](components/) with `'use client'` if interactive; import in [app/page.tsx](app/page.tsx)
3. **New animation**: Define variants in component file or extract to shared utility; follow stagger pattern
4. **Store state**: Extend `PortfolioStore` interface in [lib/store.ts](lib/store.ts); add setter function

## Important Gotchas

- **Clip Initialization**: EditorView checks `if (!selectedClipId)` on mount to avoid re-selecting; clips must be passed as props
- **Embed Types**: Only 'instagram' and 'drive' supported; validation happens in PreviewMonitor component
- **Tailwind Colors**: All colors are custom tokens; don't use standard Tailwind colors (red-500, blue-500, etc.)
- **TypeScript Strict Mode**: Enabled in [tsconfig.json](tsconfig.json); all component props must be typed

## External Dependencies
- **framer-motion**: Handles all animations; Motion components wrap JSX elements
- **zustand**: Client-side state store; no server-side state management
- **next/image** (not used): Use plain `<img>` or SVG for thumbnails
- **Instagram/Drive Embeds**: Iframes rendered in PreviewMonitor; rely on external CDN for embed scripts

## Project-Specific Notes
- No database, API, or backend — purely frontend showcase
- Dark theme is non-negotiable for the "editor aesthetic"
- All clips embed via third-party (Instagram, Google Drive); no self-hosted video hosting
- Mobile responsiveness handled via Tailwind breakpoints; desktop-first design
