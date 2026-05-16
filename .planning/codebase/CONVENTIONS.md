# Code Conventions

**Last Updated:** 2026-05-16  
**Project:** Doces Paixão - Confeitaria Artesanal Website

---

## TypeScript Conventions

### Strict Mode
- **Enabled:** All strict TypeScript checks
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

### Type Definitions
- **Prefer:** Explicit types for function parameters and return values
- **Avoid:** `any` type (use `unknown` if needed)
- **Use:** Type inference for simple variables

**Example:**
```typescript
// Good
function formatPrice(price: number): string {
  return `R$ ${price.toFixed(2)}`
}

// Avoid
function formatPrice(price: any) {
  return `R$ ${price.toFixed(2)}`
}
```

### Interface vs Type
- **Interfaces:** For object shapes, especially props
- **Types:** For unions, intersections, primitives

---

## React Conventions

### Component Definition
- **Prefer:** Function components (no class components)
- **Export:** Default export for components
- **Props:** Define interface for props

**Example:**
```typescript
interface HeroProps {
  title: string
  subtitle?: string
}

export default function Hero({ title, subtitle }: HeroProps) {
  return <div>...</div>
}
```

### Hooks Usage
- **Order:** Follow Rules of Hooks (top-level, consistent order)
- **Custom Hooks:** Prefix with `use`
- **Dependencies:** Always specify dependency arrays

### JSX
- **Self-closing:** Use for components without children
- **Fragments:** Use `<>` shorthand when no key needed
- **Conditional Rendering:** Use ternary or `&&` operator

---

## Naming Conventions

### Files
- **Components:** PascalCase (e.g., `Hero.tsx`, `Button.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useCounter.ts`)
- **Utils/Lib:** camelCase (e.g., `sanity.ts`, `queries.ts`)
- **Data:** camelCase (e.g., `produtos.ts`)

### Variables
- **Constants:** UPPER_SNAKE_CASE for true constants
- **Variables:** camelCase
- **Components:** PascalCase
- **Hooks:** camelCase with `use` prefix

### Functions
- **Regular functions:** camelCase
- **Component functions:** PascalCase
- **Event handlers:** `handle` prefix (e.g., `handleClick`)

---

## Import Conventions

### Import Order
1. External dependencies (React, libraries)
2. Internal components
3. Hooks
4. Utils/lib
5. Types
6. Styles

**Example:**
```typescript
import { useState, useEffect } from 'react'
import { Hero } from '@/components/sections/Hero'
import { useCounter } from '@/hooks/useCounter'
import { client } from '@/lib/sanity'
import type { Product } from '@/types'
```

### Path Aliases
- **Use:** `@/` prefix for absolute imports
- **Avoid:** Relative imports beyond parent directory

```typescript
// Good
import { Button } from '@/components/ui/Button'

// Avoid
import { Button } from '../../../components/ui/Button'
```

---

## Styling Conventions

### Tailwind CSS
- **Prefer:** Utility classes for layout and spacing
- **Order:** Responsive modifiers last (e.g., `text-base md:text-lg`)
- **Custom Classes:** Define in `tailwind.config.ts`

### Styled Components
- **Use for:** Complex component-specific styles
- **Naming:** PascalCase with component name prefix

**Example:**
```typescript
const HeroContainer = styled.div`
  background: linear-gradient(...);
`
```

### Class Names
- **Conditional:** Use template literals or classnames library
- **Responsive:** Mobile-first approach

---

## ESLint Rules

### Enforced Rules
- `@typescript-eslint/no-unused-vars` - Error (except `_` prefix)
- `prefer-const` - Error
- `no-console` - Warn (allow `console.warn`, `console.error`)
- `react-refresh/only-export-components` - Warn

### Disabled Rules
- None explicitly disabled

---

## Code Formatting

### Prettier Configuration
- **Enabled:** Automatic formatting on save
- **Plugin:** prettier-plugin-tailwindcss (sorts Tailwind classes)

### Formatting Rules
- **Semicolons:** Required
- **Quotes:** Single quotes for strings
- **Trailing Commas:** ES5 (objects, arrays)
- **Tab Width:** 2 spaces
- **Line Length:** 80-100 characters (not enforced)

---

## Component Structure

### Standard Component Template
```typescript
import { useState } from 'react'
import type { ComponentProps } from './types'

interface Props {
  // Props definition
}

export default function ComponentName({ prop1, prop2 }: Props) {
  // Hooks
  const [state, setState] = useState()
  
  // Event handlers
  const handleEvent = () => {
    // Logic
  }
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

---

## Data Conventions

### Static Data Files
- **Export:** Named exports for data arrays
- **Types:** Define interfaces for data shapes
- **Location:** `src/data/`

**Example:**
```typescript
export interface Product {
  id: string
  name: string
  price: number
}

export const produtos: Product[] = [
  { id: '1', name: 'Bolo', price: 50 },
]
```

---

## Git Conventions

### Commit Messages
- **Format:** Conventional Commits (type: description)
- **Types:** feat, fix, chore, docs, style, refactor, test

**Examples:**
- `feat: add contact form validation`
- `fix: correct image loading issue`
- `chore: update dependencies`

### Branch Naming
- **Pattern:** `type/description`
- **Examples:** `feat/contact-form`, `fix/image-loading`

---

## Error Handling

### Current Patterns
- Try/catch for async operations
- Optional chaining for nullable values
- Nullish coalescing for defaults

**Example:**
```typescript
try {
  const data = await fetchData()
  return data?.items ?? []
} catch (error) {
  console.error('Failed to fetch:', error)
  return []
}
```

---

## Performance Conventions

### React Performance
- **Avoid:** Unnecessary re-renders
- **Use:** `useMemo` for expensive computations
- **Use:** `useCallback` for event handlers passed to children

### Image Optimization
- **Use:** Sanity image CDN with size parameters
- **Use:** `loading="lazy"` for below-fold images
- **Use:** Appropriate image formats (WebP via Sanity)

---

## Accessibility Conventions

### Semantic HTML
- Use semantic elements (`<nav>`, `<main>`, `<section>`)
- Proper heading hierarchy (h1 → h2 → h3)

### ARIA
- Add `aria-label` for icon-only buttons
- Use `alt` text for images
- Ensure keyboard navigation works

---

## Documentation Conventions

### Code Comments
- **Minimal:** Code should be self-documenting
- **Use for:** Complex logic, workarounds, TODOs
- **Avoid:** Obvious comments

### Component Documentation
- Props interface serves as documentation
- Add JSDoc for complex components

---

## Testing Conventions

### Current State
- **No tests:** No testing framework configured
- **Recommendation:** Add Vitest + React Testing Library

### Future Conventions
- Test files: `ComponentName.test.tsx`
- Location: Co-located with components
- Coverage: Focus on critical paths
