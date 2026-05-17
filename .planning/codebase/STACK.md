# Technology Stack

**Last Updated:** 2026-05-17  
**Project:** Doces Paixão - Confeitaria Artesanal Website

---

## Core Technologies

### Frontend Framework
- **React 19.2.2** - Latest React with concurrent features
- **TypeScript 5.4.5** - Strict type checking enabled
- **Vite 5.3.0** - Fast build tool and dev server

### UI & Styling
- **Tailwind CSS 3.4.4** - Utility-first CSS framework
- **Styled Components 6.3.12** - CSS-in-JS for component styling
- **Custom Design System** - Defined in `tailwind.config.ts`
  - Custom color palette (rose, mint, peach, ink)
  - Custom fonts: Cormorant Garamond (display), DM Sans (body)
  - Custom animations (fade-down, fade-up, kenburns, scroll-line)

### Routing & Navigation
- **React Router DOM 6.30.3** - Client-side routing

### Forms & Validation
- **React Hook Form 7.71.2** - Form state management
- **Zod 4.3.6** - Schema validation
- **@hookform/resolvers 5.2.2** - Zod integration with React Hook Form

### Content Management
- **Sanity CMS 5.17.1** - Headless CMS
- **@sanity/client 7.18.0** - Sanity API client
- **@sanity/image-url 2.0.3** - Image URL builder for Sanity

### Email Integration
- **EmailJS Browser 4.4.1** - Client-side email sending

### PWA Support
- **vite-plugin-pwa 1.2.0** - Progressive Web App capabilities
- **Workbox** - Service worker with runtime caching

### SEO & Meta
- **react-helmet-async 3.0.0** - Dynamic meta tags management

---

## Development Tools

### Build & Bundling
- **Vite 5.3.0** - Build tool
  - Dev server on port 3000
  - ESBuild minification
  - CSS minification enabled
  - Source maps disabled in production

### Code Quality
- **ESLint 8.57.0** - Linting
  - @typescript-eslint/eslint-plugin 7.0.0
  - @typescript-eslint/parser 7.0.0
  - eslint-plugin-react-hooks 4.6.2
  - eslint-plugin-react-refresh 0.4.7
- **Prettier 3.3.0** - Code formatting
  - prettier-plugin-tailwindcss 0.6.1

### CSS Processing
- **PostCSS 8.4.38** - CSS transformations
- **Autoprefixer 10.4.19** - Vendor prefix automation

---

## Runtime Environment

### Node.js
- **Type:** ES Modules ("type": "module" in package.json)
- **Target:** ES2020

### TypeScript Configuration
- **Target:** ES2020
- **Module:** ESNext
- **Module Resolution:** bundler
- **JSX:** react-jsx (React 18+ transform)
- **Strict Mode:** Enabled
- **Path Aliases:** @/* → ./src/*

### Browser Support
- Modern browsers (ES2020+)
- DOM and DOM.Iterable APIs

---

## Package Scripts

- dev: Start dev server
- build: Type check + build
- preview: Preview production build
- lint: Run linter
- lint:fix: Auto-fix lint issues
- format: Format code

---

## Key Dependencies Summary

| Category | Libraries |
|----------|-----------|
| **Core** | React 19, TypeScript 5, Vite 5 |
| **Styling** | Tailwind CSS, Styled Components |
| **Forms** | React Hook Form, Zod |
| **CMS** | Sanity CMS |
| **Routing** | React Router DOM |
| **PWA** | vite-plugin-pwa, Workbox |
| **Email** | EmailJS |
| **SEO** | react-helmet-async |
