# Project Structure

**Last Updated:** 2026-05-17  
**Project:** Doces Paixão - Confeitaria Artesanal Website

---

## Root Directory

```
doces-paixao-react/
├── .planning/           # GSD planning documents
├── public/              # Static assets
├── src/                 # Source code
├── .eslintrc.cjs        # ESLint configuration
├── .gitignore           # Git ignore rules
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── tsconfig.node.json   # TypeScript config for Node scripts
└── vite.config.ts       # Vite build configuration
```

---

## Source Directory Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── BottomNav.tsx      # Mobile bottom navigation
│   │   ├── Footer.tsx         # Redesigned Site footer
│   │   ├── Header.tsx         # Site header with SVG logo
│   │   └── MainLayout.tsx     # Root layout wrapper with WhatsApp FAB
│   ├── sections/
│   │   ├── Contato.tsx        # Editorial contact section (No form)
│   │   ├── Hero.tsx           # Hero/landing section
│   │   ├── Produtos.tsx       # Products showcase (Primary image source)
│   │   ├── Sections.tsx       # Diferenciais, Depoimentos, CTABand (Gallery Removed)
│   │   ├── Sobre.tsx          # About section (Sanity integrated)
│   │   └── Stats.tsx          # Statistics section
│   └── ui/
│       ├── Button.tsx         # Button component
│       ├── index.tsx          # UI exports barrel
│       ├── InstallBanner.tsx  # PWA install prompt
│       ├── SEO.tsx            # SEO meta tags
│       └── SkeletonCard.tsx   # Loading skeleton
├── data/
│   ├── depoimentos.ts         # Customer testimonials data
│   ├── diferenciais.ts        # Business differentials data
│   ├── produtos.ts            # Products catalog data
│   └── stats.ts               # Statistics data
├── hooks/
│   ├── useCounter.ts          # Animated counter hook
│   ├── usePhoneMask.ts        # Phone formatting hook
│   ├── useSanity.ts           # Sanity CMS data fetching
│   ├── useScrollPosition.ts   # Scroll position tracking
│   ├── useScrollReveal.ts     # Scroll-based animations
│   └── useScrollToTop.ts      # Scroll to top functionality
├── lib/
│   ├── queries.ts             # Sanity GROQ queries
│   └── sanity.ts              # Sanity client configuration
├── App.tsx                    # Root application component
├── index.css                  # Global styles
└── main.tsx                   # Application entry point
```

---

## Component Organization

### Layout Components (`components/layout/`)
**Purpose:** Structural components that define page layout
- Shared across all pages
- Handle navigation and page structure
- Responsive behavior

### Section Components (`components/sections/`)
**Purpose:** Page sections (self-contained blocks)
- Each section is independent
- Can be reordered easily
- Contains section-specific logic

### UI Components (`components/ui/`)
**Purpose:** Reusable, generic components
- No business logic
- Highly reusable
- Props-based configuration

---

## Data Organization

### Static Data (`data/`)
**Pattern:** TypeScript modules with typed exports

**Files:**
- `produtos.ts` - Product catalog (name, description, price, image)
- `depoimentos.ts` - Customer testimonials (name, text, rating)
- `diferenciais.ts` - Business differentials (icon, title, description)
- `stats.ts` - Statistics (number, label, suffix)

**Why Static:**
- Fast loading (no API calls)
- Type-safe
- Easy to update
- Can be migrated to Sanity later

---

## Hooks Organization

### Custom Hooks (`hooks/`)
**Pattern:** Reusable React hooks for common functionality

**Categories:**
1. **Animation Hooks:**
   - `useCounter.ts` - Animated number counting
   - `useScrollReveal.ts` - Scroll-triggered animations

2. **Utility Hooks:**
   - `usePhoneMask.ts` - Phone number formatting
   - `useScrollPosition.ts` - Track scroll position
   - `useScrollToTop.ts` - Scroll to top functionality

3. **Data Hooks:**
   - `useSanity.ts` - Fetch data from Sanity CMS

---

## Library Code (`lib/`)

### Sanity Integration
- `sanity.ts` - Client configuration and image URL builder
- `queries.ts` - GROQ queries for Sanity API

**Pattern:** Centralized external service configuration

---

## Configuration Files

### TypeScript
- `tsconfig.json` - Main TypeScript config
- `tsconfig.node.json` - Node scripts config (Vite)

**Key Settings:**
- Strict mode enabled
- Path aliases: `@/*` → `src/*`
- JSX: react-jsx (React 18+)

### Build Tools
- `vite.config.ts` - Vite configuration
  - React plugin
  - PWA plugin
  - Path aliases
  - Dev server settings

### Styling
- `tailwind.config.ts` - Tailwind CSS configuration
  - Custom colors
  - Custom fonts
  - Custom animations
- `postcss.config.js` - PostCSS plugins

### Code Quality
- `.eslintrc.cjs` - ESLint rules
  - TypeScript support
  - React hooks rules
  - React refresh rules

---

## Public Assets

```
public/
├── icons/
│   ├── DocesPaixao192.png    # PWA icon 192x192
│   └── DocesPaixao512.png    # PWA icon 512x512
└── (other static assets)
```

---

## Entry Points

### HTML Entry
- `index.html` - Root HTML file
  - Loads `src/main.tsx`
  - PWA manifest link
  - Meta tags

### JavaScript Entry
- `src/main.tsx` - Application bootstrap
  - React DOM render
  - Router setup
  - Global styles import

### Application Root
- `src/App.tsx` - Root component
  - Section composition
  - SEO setup
  - JSON-LD structured data

---

## Naming Conventions

### Files
- **Components:** PascalCase (e.g., `Hero.tsx`, `Button.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useCounter.ts`)
- **Data:** camelCase (e.g., `produtos.ts`)
- **Config:** kebab-case (e.g., `vite.config.ts`)

### Directories
- **Lowercase:** `components/`, `hooks/`, `data/`, `lib/`
- **Subdirectories:** Lowercase (e.g., `layout/`, `sections/`, `ui/`)

---

## Module Boundaries

### Clear Separation
1. **Components** - UI rendering
2. **Hooks** - Reusable logic
3. **Data** - Static content
4. **Lib** - External services

### Import Patterns
- Use path aliases: `@/components/...`
- Barrel exports for UI: `@/components/ui`
- Direct imports for specific components

---

## Build Output

```
dist/
├── assets/
│   ├── index-[hash].js      # Bundled JavaScript
│   ├── index-[hash].css     # Bundled CSS
│   └── (other assets)
├── icons/                    # PWA icons
├── index.html               # Entry HTML
├── manifest.webmanifest     # PWA manifest
└── sw.js                    # Service worker
```

---

## Growth Patterns

### Adding New Sections
1. Create component in `components/sections/`
2. Import in `App.tsx`
3. Add to render tree

### Adding New UI Components
1. Create in `components/ui/`
2. Export from `components/ui/index.tsx`
3. Use via `@/components/ui`

### Adding New Hooks
1. Create in `hooks/`
2. Follow `use` prefix convention
3. Export hook function

### Adding New Data
1. Create TypeScript file in `data/`
2. Define types
3. Export typed data
