# Rishav Portfolio — AI Coding Instructions

## Project Overview
Cinematic, editor-style portfolio for video editor Rishav built with Next.js 14, React 18, TypeScript, Tailwind CSS, and Framer Motion. The UI mimics professional NLE (non-linear editing) software with a dark, sophisticated aesthetic. Zero backend—all state managed client-side via Zustand, all data from [lib/clips.ts](lib/clips.ts).

## Architecture

### Core Application Flow
1. **Root Layout** ([app/layout.tsx](app/layout.tsx)) — Sets metadata and applies global background styles
2. **Main Page** ([app/page.tsx](app/page.tsx)) — Renders all sections (Hero, EditorView, About, Contact); imports CLIPS from lib
3. **EditorView** ([components/EditorView.tsx](components/EditorView.tsx)) — Container managing three-panel editor interface
   - Accepts `clips` prop from parent; initializes first clip on mount
   - Uses `usePortfolioStore()` to manage `selectedClipId`, `isPlaying`
4. **Zustand Store** ([lib/store.ts](lib/store.ts)) — Centralized state with `Clip` interface, select/toggle methods
5. **Clips Data** ([lib/clips.ts](lib/clips.ts)) — Immutable CLIPS array with embeds (Instagram Reels, Google Drive videos)

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
- **Required for interactive components**: Add `'use client'` when using `usePortfolioStore()`
- **Store interface**: `Clip` has `id`, `title`, `duration`, `thumbnail`, `embedType` ('instagram' | 'drive'), `embedUrl`, `category[]`, `description`
- **Selection pattern**: `selectClip(id)` auto-sets `isPlaying: true` → triggers PreviewMonitor re-render
- **Initialization**: EditorView checks `if (!selectedClipId)` on mount and calls `selectClip(clips[0].id)` to avoid re-selection loops
- **Helper hook**: `useInitializeClips(clips)` initializes store atomically; avoid calling separately

### Animation Patterns (Framer Motion)
- **Standard stagger**: Container with `staggerChildren: 0.2` + child items with `y: 20` initial state → 0.6s transition
  ```tsx
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } } }
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }
  ```
- **Scroll reveal**: Use `whileInView="visible" viewport={{ once: true, margin: '-100px' }}` for lazy loading (EditorView pattern)
- **Nesting**: Motion.div container always wraps item arrays; never apply variants directly to children list

### Styling with Tailwind
- **Color Tokens** ([tailwind.config.js](tailwind.config.js)): ALWAYS use semantic names, never standard Tailwind colors
  - Background: `bg-background` (#0B0D10), panels: `bg-panel` (#12151C)
  - Text: `text-primary` (#E6E8EB), `text-secondary` (#9AA0AA)
  - Accent: `accent-primary` (#7C7CFF purple), `accent-secondary` (#4FD1C5 cyan)
  - Border: `border-border` (#1F242F)
- **Glow Effects**: `shadow-glow-blue`, `shadow-glow-cyan` for neon, combine with hover transitions
- **Custom Animations Rendering
- **Client components**: Any using hooks (`usePortfolioStore()`, `useEffect`, `useRef`) or animations need `'use client'`
  - EditorView, Timeline, PreviewMonitor, ClipThumbnail, About, ContactModal all client-side
- **Server-side parent**: [app/page.tsx](app/page.tsx) imports CLIPS and passes as prop to EditorView
- **No API routes**: All clip data hardcoded in [lib/clips.ts](lib/clips.ts); no dynamic fetching or backend
- **Email integration hint**: `@emailjs/browser` available if contact form needs backend integration
### Client vs. Server
- All interactive components (`EditorView`, `Timeline`, `ProjectBin`, `ClipThumbnail`, `ContactModal`) require `'use client'` directive
- Pass data as props from server-rendered parent ([app/page.tsx](app/page.tsx))
- No API routes or dynamic fetching — all data from [lib/clips.ts](lib/clips.ts)

## Developer Workflows

### Local Development(http://localhost:3000) with hot reload
npm run build    # Production build with TypeScript checking; errors block deploy
npm run start    # Run built app locally (must `npm run build` first)
npm run lint     # ESLint via `next lint` (enforces eslint-config-next rules)
```

### Common Tasks
1. **Add clips**: Edit CLIPS array in [lib/clips.ts](lib/clips.ts); auto-populate store on EditorView mount
2. **New section**: Create component in [components/](components/), add `'use client'` if interactive, import in [app/page.tsx](app/page.tsx)
3. **New state**: Extend `PortfolioStore` interface in [lib/store.ts](lib/store.ts), add setter via `set()` callback
4. **New animation**: Define container/item variants following EditorView pattern; extract to `lib/variants.ts` if reused
5. **Styling**: Use color tokens from tailwind config; test dark theme contrast manually (WCAG AA)ort in [app/page.tsx](app/page.tsx)
3. **New animation** & Patterns

- **Clip Initialization Bug Prevention**: EditorView only calls `selectClip()` if `!selectedClipId`; calling multiple times causes re-renders. Never initialize in multiple components.
- **Embed Validation**: PreviewMonitor checks `embedType` ('instagram' | 'drive') and renders iframe only if matched. Unsupported types silently fail.
- **Color Token Hard Requirement**: Use ONLY semantic names (bg-background, text-primary, accent-primary). Standard Tailwind colors (red-500, blue-500) will not display correctly.
- **TypeScript Strict Mode**: Enforced in [tsconfig.json](tsconfig.json)—all component props, hook returns must be typed. Missing types cause build failures.
- **Motion Children**: Framer Motion variants must be on Motion.* wrapper, not child JSX elements. Nesting Motion components inside Motion containers works but use sparingly (performance).must be passed as props
- **Embed Types**: Only 'instagram' and 'drive' supported; validation happens in PreviewMonitor component
- **Tailwind Colors**: All colors are custom tokens; don't use standard Tailwind colors (red-500, blue-500, etc.)
- **TypeScript Strict Mo & Integrations
- **framer-motion** (10.16.16): All animations via Motion.div/motion.* components; no CSS animations except keyframes
- **zustand** (4.4.1): Lightweight store via `create()`, single source of clip truth
- **@emailjs/browser**: Available for ContactModal; not yet integrated—add if needed for contact form
- **next/image**: Not used; thumbnails are SVG data URIs in clip objects
- **Embeds**: iframe src relies on Instagram/Google Drive external CDN; no server-side rendering of embeds

## Project Governance
- **No Backend**: Pure frontend—clip data static, no database, no API routes
- **Dark Theme Fixed**: Background #0B0D10 is identity; always maintain contrast ratios (WCAG AA)
- **Third-Party Embeds**: Instagram Reels and Google Drive videos only; no self-hosted video servers
- **Mobile-First CSS**: Tailwind breakpoints prioritize responsive, but design desktop-first (editor software context)
- All clips embed via third-party (Instagram, Google Drive); no self-hosted video hosting
- Mobile responsiveness handled via Tailwind breakpoints; desktop-first design
