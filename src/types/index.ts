// ── Produto ──────────────────────────────────────────────────
export type ProductTag = 'bestseller' | 'novo' | 'premium' | null

export interface Product {
  id: string
  name: string
  category: 'Bolos' | 'Docinhos' | 'Tortas' | 'Especiais'
  description: string
  price: string
  priceNote?: string
  imageUrl: string
  imageAlt: string
  tag: ProductTag
}

// ── Depoimento ───────────────────────────────────────────────
export interface Testimonial {
  id: string
  text: string
  authorName: string
  authorRole: string
  avatarUrl: string
  rating: number // 1–5, suporta .5
}

// ── Diferencial ──────────────────────────────────────────────
export interface Diferencial {
  id: number
  number: string
  icon: string        // classe Font Awesome, ex: 'fas fa-leaf'
  title: string
  description: string
}

// ── Stat ─────────────────────────────────────────────────────
export interface Stat {
  id: number
  icon: string
  value: string           // ex: '4.9' (estático) ou '' quando usa counter
  counterTarget?: number  // ex: 1800 (animado via JS)
  suffix?: string         // ex: '+'
  label: string
  colorClass: string      // Tailwind bg+text para o ícone
}

// ── Galeria item ─────────────────────────────────────────────
export interface GalleryItem {
  id: number
  imageUrl: string
  alt: string
  caption: string
  span?: 'col' | 'row' | 'both'
}

// ── Tabs ─────────────────────────────────────────────────────
export type ProductTab = 'Todos' | 'Bolos' | 'Docinhos' | 'Tortas' | 'Especiais'

// ── Site Settings ────────────────────────────────────────────
export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface SiteSettings {
  phone: string
  address: string
  email: string
  socialLinks: SocialLink[]
}
