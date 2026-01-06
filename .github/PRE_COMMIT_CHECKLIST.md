# Pre-Commit Checklist — Bloat Prevention

> **Use this checklist before every commit to maintain a lean, maintainable codebase.**
>
> AI agents should review this before making changes. Developers should verify before committing.

---

## ✅ Code Quality Checks

### 1. Dead Code Removal
- [ ] No unused components exist
- [ ] No unused functions or hooks exist
- [ ] No unused variables or constants exist
- [ ] No imports that aren't referenced
- [ ] No commented-out code blocks (except critical documentation)
- [ ] No duplicate implementations of the same logic

### 2. Component Responsibility
- [ ] Each component has **one clear purpose**
- [ ] No components with overlapping responsibilities
- [ ] Props are minimal and all actively used
- [ ] State variables are necessary and referenced
- [ ] No "just in case" logic branches

### 3. Imports & Dependencies
- [ ] All imports are used in the file
- [ ] No duplicate imports
- [ ] Path aliases (`@/`) used consistently
- [ ] No new npm packages added without discussion
- [ ] Existing utilities reused before creating new ones

---

## 🎨 Style & CSS Checks

### 4. Tailwind Cleanup
- [ ] No unused Tailwind classes
- [ ] No conflicting utilities (e.g., `mt-4 mb-4 py-4`)
- [ ] Semantic color tokens used (no `blue-500`, `red-600`)
- [ ] Responsive utilities minimal and intentional
- [ ] No stacked spacing utilities that override each other

### 5. Animation Consistency
- [ ] Framer Motion patterns follow established conventions
- [ ] No custom CSS animations unless documented
- [ ] Stagger animations use `containerVariants`/`itemVariants` pattern
- [ ] Animation durations consistent with design system

---

## 🏗️ Architecture Checks

### 6. File Structure
- [ ] Files in correct directories (`components/`, `lib/`, `app/`)
- [ ] No duplicate files serving the same purpose
- [ ] Naming follows project conventions
- [ ] Related files grouped logically (e.g., `Gallery/` subfolder)

### 7. State Management
- [ ] Store only contains actively used state
- [ ] No parallel state implementations
- [ ] State initialization follows documented pattern
- [ ] Zustand store methods are minimal and necessary

### 8. Data Flow
- [ ] One source of truth for each data type
- [ ] Server components for data fetching only
- [ ] Client components marked with `'use client'`
- [ ] Props flow clearly from parent to child

---

## 🧪 Testing & Validation

### 9. Build Verification
- [ ] `npm run build` passes without errors
- [ ] No TypeScript errors
- [ ] No ESLint warnings introduced
- [ ] File size increases are justified

### 10. Functionality Check
- [ ] All existing features still work
- [ ] No unintended UI changes
- [ ] Animations and interactions unchanged
- [ ] Mobile and desktop layouts preserved

---

## 📝 Documentation Checks

### 11. Code Clarity
- [ ] Complex logic has brief inline comments
- [ ] New patterns documented in `copilot-instructions.md`
- [ ] Breaking changes noted
- [ ] No misleading variable names

### 12. Commit Message
- [ ] Clear, concise description of changes
- [ ] References issue/feature if applicable
- [ ] Lists removed dead code
- [ ] Explains any refactoring rationale

---

## 🚫 Red Flags — DO NOT COMMIT IF:

- ❌ Build fails or has TypeScript errors
- ❌ Temporary "TODO" code is present
- ❌ Commented-out code blocks remain
- ❌ Duplicate components/logic introduced
- ❌ New unused files added
- ❌ Standard Tailwind colors used (not semantic tokens)
- ❌ Functions/hooks created but never called
- ❌ State variables set but never read
- ❌ Props passed but never used
- ❌ Imports added but never referenced

---

## 🧠 AI Agent Guidelines

> When implementing features or fixes:

### Modify, Don't Duplicate
- **Edit existing components** instead of creating parallel versions
- Reuse established patterns before inventing new ones
- Delete old implementations when replacing logic
- Consolidate similar functions into one reusable utility

### Explicit Cleanup
- When replacing logic, **explicitly delete the old version**
- Don't keep legacy code "just in case"
- Remove experimental code immediately if not proceeding
- Clean up after exploratory development

### Pattern Adherence
- Follow animation patterns in `copilot-instructions.md`
- Use semantic color tokens from `tailwind.config.js`
- Match state initialization patterns from `EditorView.tsx`
- Respect component responsibilities documented in architecture

### Minimal Additions
- Add only what's necessary for the feature
- Combine related changes in one commit
- Test before committing
- Document if introducing new patterns

---

## 🎯 Goal

> **Maintain a lean, predictable codebase that:**
> - Humans can read and understand quickly
> - AI agents can navigate without confusion
> - New features integrate cleanly
> - Technical debt stays minimal

---

## 📊 Cleanup Score

Before committing, rate your changes:

- **Green (0-2 files)**: Minimal, focused change ✅
- **Yellow (3-5 files)**: Reasonable scope, verify impact ⚠️
- **Red (6+ files)**: Large change, break into smaller commits 🛑

Large changes increase risk. Keep commits atomic and targeted.

---

_Last Updated: January 2026_
_Review this checklist periodically and update as patterns evolve._
