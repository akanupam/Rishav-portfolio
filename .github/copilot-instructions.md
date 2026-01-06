# Rishav Portfolio — AI Coding Instructions

## Project Overview
Cinematic, NLE-style portfolio for video editor Rishav. Next.js 14 (App Router), React 18, TypeScript strict mode, Tailwind CSS with custom tokens, Framer Motion, Zustand state. Dual content system: hardcoded clips (embeds) + server-rendered gallery (self-hosted videos).

## Architecture

### Core Application Flow
1. **[app/page.tsx](app/page.tsx)** — Server component; async loads Gallery, passes to HomeClient wrapper
2. **[components/HomeClient.tsx](components/HomeClient.tsx)** — Client wrapper; orchestrates Navigation → Hero → Gallery → EditorView → About → Contact with smooth scroll refs
3. **Two Content Systems**:
   - **EditorView** (embeds): Timeline + PreviewMonitor for Instagram/Drive clips from [lib/clips.ts](lib/clips.ts)
   - **Gallery** (self-hosted): Server reads `/public/videos/*.mp4`, GalleryClient renders horizontal scroll with VideoModal
4. **[lib/store.ts](lib/store.ts)** — Zustand store for EditorView state only (`selectedClipId`, `selectClip()`, `togglePlay()`)
5. **[lib/videos.ts](lib/videos.ts)** — Server-only module; reads `/public/videos/` directory, generates `VideoMetadata[]` with auto-formatted titles

### Gallery System (Self-Hosted Videos)
**Server pipeline**: [components/Gallery.tsx](components/Gallery.tsx) calls `getVideosFromDirectory()` → reads `/public/videos/` → passes `VideoMetadata[]` to GalleryClient
**Client rendering**: [components/Gallery/GalleryClient.tsx](components/Gallery/GalleryClient.tsx) → horizontal scroll with VideoCard thumbnails → modal on click
**Modal**: [components/Gallery/VideoModal.tsx](components/Gallery/VideoModal.tsx) — native `<video>` player with keyboard nav (Esc/←/→), focus trap, auto-play
**File conventions**:
- Videos in `/public/videos/` (`.mp4`, `.webm`, `.mov`, `.avi`)
- Titles auto-formatted from filename: `my_video_clip.mp4` → "My Video Clip"
- No metadata files needed—everything derived from filesystem

### EditorView System (Third-Party Embeds)
**Data source**: [lib/clips.ts](lib/clips.ts) — hardcoded `CLIPS` array (id, title, duration, thumbnail SVG data URI, embedType, embedUrl, category[], description)
**Components**: [components/EditorView.tsx](components/EditorView.tsx) → PreviewMonitor + Timeline
**Embed types**: 
- `instagram`: Shows thumbnail overlay with CTA button to external link
- `drive`: Renders iframe with Google Drive `/preview` URL
**Store integration**: [lib/store.ts](lib/store.ts) manages `selectedClipId`, initialized via useEffect pattern (see below)

### State Initialization Pattern (Critical)
EditorView uses this exact pattern to prevent re-render loops:
```tsx
useEffect(() => {
  if (clips.length > 0 && !selectedClipId) {
    selectClip(clips[0].id);
  }
}, [clips, selectedClipId, selectClip]);
```
**Never** call `selectClip()` unconditionally or in multiple components—it triggers re-renders.

## Key Patterns & Conventions

### Framer Motion Animation Standards
**Staggered list reveal** (Timeline, EditorView):
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};
```
- Always wrap lists in `<motion.div variants={containerVariants}>` with `initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}`
- Apply `itemVariants` to each child, never to the list itself
- For clip transitions: `key={clip.id}` on motion.div with `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` (0.4s)

### Tailwind Color System (Hard Requirement)
NEVER use standard Tailwind colors (blue-500, red-500, etc.). Use ONLY these tokens from [tailwind.config.js](tailwind.config.js):
- **Background**: `bg-background` (#0B0D10), `bg-panel` (#12151C)
- **Text**: `text-text-primary` (#E6E8EB), `text-text-secondary` (#9AA0AA)
- **Accent**: `text-accent-primary` (#7C7CFF purple), `text-accent-secondary` (#4FD1C5 cyan)
- **Border**: `border-border` (#1F242F)
- **Effects**: `shadow-glow-blue` (purple glow), `shadow-glow-cyan` (teal glow)
- **Custom animations**: `animate-sweep`, `animate-pulse-glow` (both defined in config)

### Client vs. Server Components
**Requires `'use client'`**: EditorView, Timeline, PreviewMonitor, Hero, About, Navigation (all use hooks or Framer Motion)
**Server-rendered**: [app/page.tsx](app/page.tsx) only (imports CLIPS, passes to EditorView)
**Path alias**: `@/` maps to project root (e.g., `import { CLIPS } from '@/lib/clips'`)

### Embed Handling in PreviewMonitor
Two embed types validated via conditional rendering:
- **Instagram** (`embedType: 'instagram'`): Shows thumbnail with CTA button linking to `embedUrl`
- **Google Drive** (`embedType: 'drive'`): Renders iframe with `src={clip.embedUrl}` (no sandbox restrictions)
Unsupported types render nothing (no error fallback).

## Developer Workflows

### Commands
```bash
npm run dev      # Dev server at http://localhost:3000 (hot reload)
npm run build    # TypeScript strict checks; errors block build
npm run start    # Serve production build (must run build first)
npm run lint     # ESLint via next lint (eslint-config-next)
```

### Common Tasks
1. **Add clips**: Edit CLIPS array in [lib/clips.ts](lib/clips.ts); store auto-initializes on EditorView mount
2. **Add self-hosted videos**: Drop `.mp4`/`.webm`/`.mov`/`.avi` files into `/public/videos/`; title auto-formats from filename
3. **New section**: Create in [components/](components/), add `'use client'` if using hooks/motion, import in [components/HomeClient.tsx](components/HomeClient.tsx)
4. **New state**: Extend `PortfolioStore` in [lib/store.ts](lib/store.ts); add setter via `set((state) => ({ ...state, newProp: value }))`
5. **Styling**: Use semantic color tokens; test dark theme contrast (all text must meet WCAG AA)

## Critical Pitfalls

- **Clip Init Loop**: Never call `selectClip()` without checking `!selectedClipId` first
- **Color Tokens**: Standard Tailwind colors won't render (config overrides default palette)
- **TypeScript Strict**: Missing prop types cause build failures; all interfaces must be explicit
- **Motion Nesting**: Don't nest `<motion.*>` inside `<motion.*>` lists (causes layout thrash)
- **Embed URLs**: Instagram embeds need full profile URLs, not post IDs; Drive needs `/preview` suffix for iframe embeds

## Dependencies & Integrations
- **framer-motion** (10.16.16): All animations; no CSS keyframes except `animate-sweep`/`animate-pulse-glow`
- **zustand** (4.4.1): Single store instance; no middleware or persistence
- **@emailjs/browser** (4.4.1): Not yet integrated; available for future contact form
- **Path aliases**: `@/*` resolves to project root (tsconfig.json baseUrl)

## Project Constraints
- **Pure frontend**: No API routes, no server-side data fetching beyond filesystem reads, no database
- **Dual video systems**: Instagram/Drive embeds (hardcoded) + self-hosted videos (filesystem)
- **Dark theme fixed**: Background #0B0D10 is brand identity; never add light mode
- **Desktop-first**: Tailwind breakpoints optimize for 1920×1080, mobile via responsive utilities

## Code Quality Standards
**Before committing any changes**, review [PRE_COMMIT_CHECKLIST.md](.github/PRE_COMMIT_CHECKLIST.md) to prevent code bloat:
- Remove dead code immediately
- Delete old implementations when replacing logic
- Keep one source of truth per feature
- Ensure `npm run build` passes
- No commented-out code or unused imports
