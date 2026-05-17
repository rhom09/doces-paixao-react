# Project Requirements: Doces Paixão 🧁

## 1. Functional Requirements
### Content Management (Sanity.io)
- **Product Catalog:** Manage titles, descriptions, prices, categories, and images.
- **Gallery:** Manage professional photos of cakes and events.
- **Testimonials:** Manage customer reviews with photos.
- **About/Differentiators:** Manage "Our Story" and "Why Us" content.
- **Dynamic Stats:** Manage numbers like "Clients Served" or "Cakes Made".

### UI/UX
- **Responsive Design:** Mobile-first approach for 85%+ social traffic.
- **Category Filtering:** Filter products by type (Cakes, Sweets, Gift Boxes).
- **Interactive Reveal:** Scroll-based entrance animations for sections.
- **Performance:** Optimized images (WebP/AVIF) and LCP < 2.5s.

### Conversion & Communication
- **WhatsApp Integration:** "Order via WhatsApp" button on product cards with pre-filled messages. Correct Phone: 5511985738330.
- **Editorial Contact Section:** Focus on address and direct actions (Instagram/WhatsApp) instead of forms.
- **Delivery Zone Info:** Display clear information about delivery areas (Jd. Boa Vista/SP).

## 2. Technical Requirements
- **Framework:** React 19 + Vite + TypeScript.
- **Styling:** Tailwind CSS with custom branding.
- **CMS Integration:** GROQ queries for data fetching; \`@sanity/image-url\` for optimization.
- **Deployment:** Vercel with automatic CI/CD.

## 3. Success Criteria
- [ ] 100% of landing page content is manageable via Sanity.
- [ ] Lighthouse Performance score > 90.
- [ ] Zero TypeScript errors in production build.
- [ ] Fully functional WhatsApp and Contact form flows.
