# External Integrations

**Last Updated:** 2026-05-17  
**Project:** Doces Paixão - Confeitaria Artesanal Website

---

## Content Management System

### Sanity CMS
- **Version:** 5.17.1
- **Client Version:** 7.18.0
- **Purpose:** Headless CMS for dynamic content management
- **Configuration:** `src/lib/sanity.ts`

**Environment Variables:**
- `VITE_SANITY_PROJECT_ID` - Sanity project identifier
- `VITE_SANITY_DATASET` - Dataset name (defaults to 'production')

**Features Used:**
- Content API with CDN enabled
- Image URL builder for optimized images
- API Version: 2024-01-01

**Content Types Managed:**
- Products (doces/confeitaria items)
- Statistics/metrics
- Testimonials (depoimentos)
- Differentials (diferenciais)
- About/Story (Sobre)
- Site Settings (Address, Phone, Socials)
- Sanity Studio integrated at /admin

**Caching Strategy:**
- CDN enabled (`useCdn: true`)
- Workbox runtime caching with NetworkFirst strategy
- 10-second network timeout fallback

---

## Email Service

### EmailJS
- **Package:** @emailjs/browser 4.4.1
- **Purpose:** Client-side email sending for contact form
- **Integration Point:** `src/components/sections/Contato.tsx`

**Use Case:**
- Contact form submissions
- Customer inquiries
- No backend email server required

**Security Note:**
- Public API keys exposed in client
- Rate limiting handled by EmailJS service

---

## Image Services

### Unsplash
- **Purpose:** Stock photography for hero/gallery sections
- **Caching:** CacheFirst strategy via Workbox
- **Cache Duration:** 30 days
- **Max Entries:** 50 images

**Workbox Configuration:**
```javascript
{
  urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
  handler: 'CacheFirst',
  cacheName: 'unsplash-images',
  expiration: {
    maxEntries: 50,
    maxAgeSeconds: 2592000 // 30 days
  }
}
```

### Sanity Image CDN
- **Purpose:** Optimized image delivery from Sanity
- **Features:** Automatic resizing, format conversion, quality optimization
- **Caching:** NetworkFirst with 10s timeout

---

## Progressive Web App (PWA)

### Service Worker
- **Plugin:** vite-plugin-pwa 1.2.0
- **Strategy:** autoUpdate
- **Manifest:** Configured in `vite.config.ts`

**PWA Manifest:**
- Name: "Doces Paixão"
- Theme Color: #c4566b (rose)
- Background Color: #fdfaf7 (cream)
- Display: standalone
- Language: pt-BR
- Icons: 192x192 and 512x512 PNG

**Offline Capabilities:**
- Cached static assets
- Cached Unsplash images (30 days)
- Network-first for Sanity API

---

## Third-Party APIs

### None Currently
- No payment gateways
- No analytics services
- No authentication providers
- No social media APIs

---

## External Dependencies

### CDN Resources
- Google Fonts (Cormorant Garamond, DM Sans) - likely loaded via CSS
- No external JavaScript CDNs

### Build-Time Only
- npm registry for package installation
- No runtime external dependencies

---

## Environment Configuration

**Required Environment Variables:**
```
VITE_SANITY_PROJECT_ID=<sanity-project-id>
VITE_SANITY_DATASET=production
```

**Optional:**
- EmailJS configuration (service ID, template ID, public key)

---

## Integration Security

**Current State:**
- Sanity: Read-only public API (CDN enabled)
- EmailJS: Client-side public keys
- Unsplash: Public image URLs

**Recommendations:**
- Consider rate limiting for EmailJS
- Monitor Sanity API usage
- Implement CSP headers for production

---

## Data Flow

1. **Page Load:**
   - Fetch content from Sanity CMS
   - Load cached images from service worker
   - Render static content

2. **Contact Form:**
   - User submits form
   - EmailJS sends email
   - Success/error feedback to user

3. **Offline Mode:**
   - Service worker serves cached assets
   - Sanity API requests fail gracefully
   - Static content remains available
