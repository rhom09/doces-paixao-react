# Architecture

**Last Updated:** 2026-05-17  
**Project:** Doces Paixão - Confeitaria Artesanal Website

---

## Application Type

**Single Page Application (SPA)**
- React-based client-side rendered application
- No server-side rendering (SSR)
- Static hosting compatible
- Progressive Web App (PWA) capabilities

---

## Architectural Pattern

### Component-Based Architecture
- **Pattern:** Presentational/Container components
- **State Management:** React hooks (useState, useEffect, custom hooks)
- **No global state library:** No Redux, Zustand, or Context API for global state
- **Data Fetching:** Custom hooks with Sanity client

### Directory Structure Pattern
```
src/
├── components/
│   ├── layout/       # Layout components (Header, Footer, MainLayout)
│   ├── sections/     # Page sections (Hero, Produtos, Contato)
│   └── ui/           # Reusable UI components (Button, SEO)
├── data/             # Static data files
├── hooks/            # Custom React hooks
├── lib/              # External service clients (Sanity)
└── main.tsx          # Application entry point
```

---

## Component Architecture

### Layout Components
**Purpose:** Structural components that define page layout

- `MainLayout.tsx` - Root layout wrapper
- `Header.tsx` - Top navigation
- `Footer.tsx` - Bottom footer
- `BottomNav.tsx` - Mobile bottom navigation

**Pattern:** Composition-based layout system

### Section Components
**Purpose:** Self-contained page sections

- `Hero.tsx` - Landing hero section
- `Stats.tsx` - Statistics display
- `Sobre.tsx` - About section (Integrated with Sanity)
- `Produtos.tsx` - Products showcase
- `Sections.tsx` - Diferenciais, Depoimentos, CTABand (Gallery removed for conversion focus)
- `Contato.tsx` - Editorial contact info (Instagram, WhatsApp, Address)

**Pattern:** Each section is independent and self-contained

### UI Components
**Purpose:** Reusable, generic components

- `Button.tsx` - Button component
- `SEO.tsx` - Meta tags and SEO
- `InstallBanner.tsx` - PWA install prompt
- `SkeletonCard.tsx` - Loading skeleton

**Pattern:** Presentational components with props

---

## Data Flow

### Static Data
**Location:** `src/data/`
- `produtos.ts` - Product catalog
- `depoimentos.ts` - Customer testimonials
- `diferenciais.ts` - Business differentials
- `stats.ts` - Statistics data

**Pattern:** TypeScript modules exporting typed data

### Dynamic Data (Sanity CMS)
**Flow:**
1. Component mounts
2. Custom hook (`useSanity`) fetches data
3. Loading state displayed
4. Data rendered when available
5. Error state if fetch fails

**Hooks:**
- `useSanity.ts` - Generic Sanity data fetching hook

### Form Data
**Flow:**
1. User fills form (React Hook Form)
2. Client-side validation (Zod schema)
3. Submit to EmailJS
4. Success/error feedback

---

## Routing Architecture

### Single Route Application
- **Router:** React Router DOM 6.30.3
- **Routes:** Single root route ("/")
- **Navigation:** Scroll-based sections (no route changes)

**Pattern:** One-page website with anchor-based navigation

---

## State Management

### Local Component State
- `useState` for component-specific state
- `useEffect` for side effects
- No prop drilling (components are self-contained)

### Custom Hooks
- `useCounter.ts` - Animated counter
- `usePhoneMask.ts` - Phone number formatting
- `useSanity.ts` - Sanity data fetching
- `useScrollPosition.ts` - Scroll tracking
- `useScrollReveal.ts` - Scroll animations
- `useScrollToTop.ts` - Scroll to top functionality

**Pattern:** Extract reusable logic into custom hooks

---

## Styling Architecture

### Hybrid Approach
1. **Tailwind CSS** - Utility classes for layout and spacing
2. **Styled Components** - Component-specific styles
3. **Custom Tailwind Config** - Design system tokens

**Pattern:** Tailwind for structure, Styled Components for complex styling

### Design System
**Location:** `tailwind.config.ts`

**Tokens:**
- Colors: rose, mint, peach, ink, cream
- Typography: Cormorant Garamond (display), DM Sans (body)
- Animations: fade-down, fade-up, kenburns, scroll-line
- Shadows: sm, md, lg
- Border radius: 2xl, 3xl, 4xl

---

## Performance Architecture

### Code Splitting
- Vite automatic code splitting
- Dynamic imports for heavy components (if needed)

### Image Optimization
- Sanity image CDN with automatic optimization
- Lazy loading via browser native loading="lazy"
- Service worker caching

### Caching Strategy
1. **Static Assets:** Cached by service worker
2. **Sanity API:** NetworkFirst (10s timeout)
3. **Unsplash Images:** CacheFirst (30 days)

---

## SEO Architecture

### Meta Tags
- `react-helmet-async` for dynamic meta tags
- `SEO.tsx` component for default meta
- JSON-LD structured data in `App.tsx`

**Structured Data:**
- Schema.org Bakery type
- Business information
- Opening hours
- Address

---

## Build Architecture

### Development
- Vite dev server (port 3000)
- Hot Module Replacement (HMR)
- Fast refresh for React

### Production
- TypeScript compilation check
- Vite build with ESBuild minification
- CSS minification
- No source maps
- Output: `dist/` directory

---

## Deployment Architecture

**Target:** Static hosting (Vercel, Netlify, GitHub Pages)
- No server required
- CDN distribution
- HTTPS required for PWA
- Service worker registration

---

## Error Handling

### Current State
- Basic try/catch in async operations
- No global error boundary
- No error tracking service

### Recommendations
- Add React Error Boundary
- Implement error logging
- Add Sentry or similar service
