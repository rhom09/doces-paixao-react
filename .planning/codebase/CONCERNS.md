# Technical Concerns

**Last Updated:** 2026-05-17  
**Project:** Doces Paixão - Confeitaria Artesanal Website

---

## Critical Issues

### 1. No Error Boundary
**Severity:** HIGH  
**Impact:** App crashes completely on unhandled errors

**Current State:**
- No React Error Boundary implemented
- Errors crash entire application
- No graceful degradation

**Recommendation:**
Add ErrorBoundary component to wrap the app and catch React errors gracefully.

---

### 2. Environment Variables Exposed
**Severity:** MEDIUM  
**Impact:** Sanity project ID visible in client bundle

**Current State:**
- VITE_SANITY_PROJECT_ID bundled in client code
- Public API keys for EmailJS (if used)

**Risk Assessment:**
- Sanity: Low risk (read-only public API)
- EmailJS: Medium risk (potential abuse)

**Recommendation:**
- Document that Sanity API is read-only
- Implement rate limiting for EmailJS
- Consider backend proxy for sensitive operations

---

### 3. No Loading States
**Severity:** MEDIUM  
**Impact:** Poor UX during data fetching

**Current State:**
- SkeletonCard component exists but may not be used consistently
- No global loading indicator
- No error states for failed fetches

**Recommendation:**
- Implement loading states for all async operations
- Add error boundaries for data fetching
- Show skeleton loaders during initial load

---

## Security Concerns

### 1. Client-Side Email Sending
**Severity:** MEDIUM  
**Issue:** EmailJS public keys exposed in client

**Risk:**
- Potential spam/abuse
- Rate limiting bypass attempts
- API key exposure

**Mitigation:**
- Use EmailJS rate limiting features
- Implement client-side rate limiting
- Consider backend email proxy

---

### 2. No Content Security Policy
**Severity:** MEDIUM  
**Issue:** No CSP headers configured

**Risk:**
- XSS vulnerabilities
- Unauthorized script execution
- Data exfiltration

**Recommendation:**
Configure CSP headers to restrict script sources and prevent XSS attacks.

---

### 3. No Input Sanitization
**Severity:** LOW  
**Issue:** Form inputs not sanitized before sending

**Current State:**
- React Hook Form validation only
- No XSS protection on user input
- EmailJS handles sanitization

**Risk:** Low (EmailJS sanitizes, no database storage)

---

## Performance Concerns

### 1. No Code Splitting
**Severity:** MEDIUM  
**Impact:** Large initial bundle size

**Current State:**
- Single bundle for entire app
- All sections loaded upfront
- No lazy loading for routes/components

**Recommendation:**
Use React.lazy() to split heavy sections like Produtos and Galeria.

---

### 2. Unoptimized Images
**Severity:** MEDIUM  
**Impact:** Slow page load, high bandwidth usage

**Current State:**
- Sanity images may not specify size parameters
- No responsive image srcset
- No WebP format enforcement

**Recommendation:**
Use Sanity image builder with width, height, format, and quality parameters.

---

### 3. No Bundle Analysis
**Severity:** LOW  
**Impact:** Unknown bundle size, potential bloat

**Recommendation:**
Install rollup-plugin-visualizer to analyze bundle composition.

---

## Accessibility Concerns

### 1. Missing ARIA Labels
**Severity:** MEDIUM  
**Impact:** Poor screen reader experience

**Areas to Check:**
- Icon-only buttons (WhatsApp, social media)
- Form inputs (may be missing labels)
- Navigation elements

**Recommendation:**
Audit all interactive elements and add aria-label for icon buttons.

---

### 2. Keyboard Navigation
**Severity:** MEDIUM  
**Impact:** Unusable for keyboard-only users

**Areas to Check:**
- Mobile menu toggle
- Form submission
- Scroll-to-top button
- Product cards

**Recommendation:**
Test all interactions with keyboard only and ensure focus indicators are visible.

---

### 3. Color Contrast
**Severity:** LOW  
**Impact:** May not meet WCAG AA standards

**Areas to Check:**
- Text on colored backgrounds
- Button states (hover, disabled)
- Form validation messages

**Recommendation:**
Run Lighthouse accessibility audit and ensure 4.5:1 contrast ratio.

---

## Technical Debt

### 1. No Testing
**Severity:** HIGH  
**Impact:** No confidence in refactoring, high bug risk

**Current State:**
- Zero test coverage
- No CI/CD pipeline
- Manual testing only

**Recommendation:** See TESTING.md for implementation plan

---

### 2. Mixed Styling Approaches
**Severity:** LOW  
**Impact:** Inconsistent styling patterns

**Current State:**
- Tailwind CSS utility classes
- Styled Components for some components
- Inline styles in some places

**Recommendation:**
Standardize on Tailwind CSS and migrate Styled Components.

---

### 3. Hardcoded Content
**Severity:** LOW  
**Impact:** Easy to update content (Improved)

**Current State:**
- Most content moved to Sanity CMS (Products, Stats, Testimonials, About, Settings).
- Some structural strings remain in components.
- Gallery removed to simplify content management.

**Recommendation:**
Move all content to Sanity CMS for easier management.

---

## Dependency Concerns

### 1. React 19 (Bleeding Edge)
**Severity:** LOW  
**Risk:** Potential instability, limited ecosystem support

**Current State:**
- Using React 19.2.2 (latest)
- Some libraries may not be fully compatible

**Recommendation:**
Monitor for breaking changes and test thoroughly before updates.

---

### 2. No Dependency Auditing
**Severity:** MEDIUM  
**Risk:** Security vulnerabilities in dependencies

**Recommendation:**
Run npm audit regularly and set up Dependabot or Renovate.

---

### 3. No Lock File Verification
**Severity:** LOW  
**Risk:** Inconsistent installs across environments

**Recommendation:**
Commit package-lock.json and use npm ci in CI/CD.

---

## Monitoring & Observability

### 1. No Error Tracking
**Severity:** HIGH  
**Impact:** Unknown production errors

**Current State:**
- No Sentry or error tracking service
- Console errors only
- No user feedback on errors

**Recommendation:**
Install Sentry for error tracking and monitoring.

---

### 2. No Analytics
**Severity:** MEDIUM  
**Impact:** No usage insights

**Current State:**
- No Google Analytics
- No user behavior tracking
- No conversion tracking

**Recommendation:**
Add Google Analytics 4 to track user behavior and conversions.

---

### 3. No Performance Monitoring
**Severity:** MEDIUM  
**Impact:** Unknown performance issues

**Recommendation:**
Add Web Vitals tracking and monitor Lighthouse scores.

---

## Deployment Concerns

### 1. No CI/CD Pipeline
**Severity:** MEDIUM  
**Impact:** Manual deployments, no automated checks

**Recommendation:**
Set up GitHub Actions to automate build, test, and deploy.

---

### 2. No Environment Management
**Severity:** LOW  
**Impact:** Single environment (production)

**Recommendation:**
Set up staging environment for testing before production.

---

### 3. No Rollback Strategy
**Severity:** MEDIUM  
**Impact:** Difficult to revert bad deployments

**Recommendation:**
Use deployment platform with rollback capability (Vercel, Netlify).

---

## Priority Matrix

| Issue | Severity | Effort | Priority |
|-------|----------|--------|----------|
| No Error Boundary | HIGH | LOW | 1 |
| No Testing | HIGH | HIGH | 2 |
| No Error Tracking | HIGH | LOW | 3 |
| No Code Splitting | MEDIUM | MEDIUM | 4 |
| No Loading States | MEDIUM | LOW | 5 |
| Client-Side Email | MEDIUM | MEDIUM | 6 |
| No CSP Headers | MEDIUM | LOW | 7 |
| Accessibility Issues | MEDIUM | MEDIUM | 8 |
| No Analytics | MEDIUM | LOW | 9 |
| Unoptimized Images | MEDIUM | LOW | 10 |

---

## Quick Wins (Low Effort, High Impact)

1. Add Error Boundary (30 min)
2. Add Sentry error tracking (1 hour)
3. Implement loading states (2 hours)
4. Add CSP headers (30 min)
5. Optimize Sanity images (1 hour)
