# Testing

**Last Updated:** 2026-05-16  
**Project:** Doces Paixão - Confeitaria Artesanal Website

---

## Current State

### No Testing Framework
- **Status:** No tests currently implemented
- **No test files:** Zero test coverage
- **No CI/CD:** No automated testing pipeline

---

## Recommended Testing Setup

### Testing Framework
**Vitest** - Recommended for Vite projects
- Fast, Vite-native test runner
- Jest-compatible API
- Built-in TypeScript support
- ESM support out of the box

**Installation:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Testing Library
**React Testing Library** - Component testing
- User-centric testing approach
- Encourages accessibility
- Works well with Vitest

---

## Proposed Test Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   └── Hero.test.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Header.test.tsx
├── hooks/
│   ├── useCounter.ts
│   └── useCounter.test.ts
└── lib/
    ├── sanity.ts
    └── sanity.test.ts
```

**Pattern:** Co-locate tests with source files

---

## Testing Priorities

### High Priority (Critical Paths)
1. **Contact Form** (Contato.tsx)
   - Form validation
   - Email submission
   - Error handling
   - Success feedback

2. **Custom Hooks**
   - useCounter - Animation logic
   - usePhoneMask - Phone formatting
   - useSanity - Data fetching

3. **UI Components**
   - Button - Click handlers, disabled state
   - SEO - Meta tag rendering
   - InstallBanner - PWA prompt logic

### Medium Priority
1. **Section Components**
   - Hero - Rendering, scroll behavior
   - Produtos - Product display, loading states
   - Stats - Counter animations

2. **Layout Components**
   - Header - Navigation, mobile menu
   - Footer - Links, social media
   - BottomNav - Mobile navigation

### Low Priority
1. **Static Data**
   - Data structure validation
   - Type checking (covered by TypeScript)

2. **Utility Functions**
   - Image URL builders
   - Formatters

---

## Coverage Goals

### Recommended Targets
- **Overall:** 70%+ coverage
- **Critical paths:** 90%+ coverage (forms, hooks)
- **UI components:** 60%+ coverage
- **Utils/lib:** 80%+ coverage

---

## CI/CD Integration

### GitHub Actions (Recommended)
```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test
```

---

## Current Gaps

### Missing Tests
- All components untested
- All hooks untested
- No integration tests
- No E2E tests

### Missing Infrastructure
- No test framework installed
- No CI/CD pipeline
- No coverage reporting
- No pre-commit hooks

---

## Implementation Roadmap

### Phase 1: Setup (1-2 hours)
1. Install Vitest + React Testing Library
2. Configure vitest.config.ts
3. Add test scripts to package.json
4. Write first test (Button component)

### Phase 2: Critical Tests (4-6 hours)
1. Contact form tests
2. Custom hooks tests
3. Core UI components tests

### Phase 3: Coverage (8-10 hours)
1. Section components tests
2. Layout components tests
3. Integration tests

### Phase 4: Automation (2-3 hours)
1. Set up GitHub Actions
2. Add pre-commit hooks
3. Configure coverage reporting
