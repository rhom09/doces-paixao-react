# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start Dev Server:** `npm run dev` (Vite)
- **Build Project:** `npm run build`
- **Preview Build:** `npm run preview`
- **Lint:** `npm run lint`
- **Lint Fix:** `npm run lint:fix`
- **Format:** `npm run format` (Prettier)
- **Sanity Studio:** Accessible at `/admin` (local) or via the configured `VITE_SANITY_PROJECT_ID`.

## Project Structure & Architecture

### Core Stack
- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS.
- **CMS:** Sanity.io (Headless) for all dynamic content.
- **Routing:** React Router v6 (`src/router/index.tsx`).
- **Forms:** React Hook Form + Zod for validation + EmailJS for delivery.
- **Animations:** Custom IntersectionObserver hooks (`useScrollReveal`) and Framer Motion.

### Architecture Patterns
- **Data-Driven Sections:** UI components in `src/components/sections/` fetch data via GROQ from Sanity. 
- **CMS Integration:** Configuration in `sanity.config.ts`. Schemas in `src/schemas/sanity/`.
- **Component Hierarchy:**
  - `src/components/layout/`: Global structures like `Header`, `Footer`.
  - `src/components/sections/`: Discrete landing page sections (Hero, Stats, etc.).
  - `src/components/ui/`: Atomic, reusable UI components (Buttons, Inputs).
- **Custom Hooks:** Business and UI logic encapsulated in `src/hooks/` (scroll position, masks, numeric counters).

### Key Files
- `src/App.tsx`: Main page layout and structured data (JSON-LD).
- `sanity.config.ts`: Sanity project and dataset configuration.
- `tailwind.config.ts`: Custom theme (colors, fonts, animations).

## Technical Constraints
- **React 19:** Use functional components and modern hooks.
- **Styling:** Use Tailwind CSS exclusively; follow the "rose" color palette defined in config.
- **Sanity:** Use `@sanity/image-url` for all CMS-delivered images to ensure optimization.
- **SEO:** Metadata managed via `react-helmet-async` in `src/components/ui/SEO.tsx`.
