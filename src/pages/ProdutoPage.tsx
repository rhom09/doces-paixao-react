import { useParams, Link, Navigate } from 'react-router-dom'
import { PRODUCT_BY_ID_QUERY, SITE_SETTINGS_QUERY } from '@/lib/queries'
import { useSanity } from '@/hooks/useSanity'
import { Skeleton } from '@/components/ui/SkeletonCard'
import { RevealWrapper } from '@/components/ui/index'
import { cn } from '@/utils/cn'
import { useState } from 'react'
import type { Product, SiteSettings } from '@/types'

const tagConfig = {
  bestseller: { label: '⭐ Mais Vendido', className: 'bg-rose/90 text-white' },
  novo:       { label: '🆕 Novidade',     className: 'bg-mint/90 text-white' },
  premium:    { label: '🎀 Premium',      className: 'bg-peach/95 text-ink' },
} as const

function getGallery(imageUrl: string) {
  if (!imageUrl) return []
  const base = imageUrl.split('?')[0]
  return [
    `${base}?w=800&q=85`,
    `${base}?w=800&q=85&crop=entropy`,
    `${base}?w=800&q=85&crop=faces`,
  ]
}

export default function ProdutoPage() {
  const { id } = useParams<{ id: string }>()
  const { data: product, loading: loadingProduct } = useSanity<Product>(PRODUCT_BY_ID_QUERY, { id })
  const { data: settings } = useSanity<SiteSettings>(SITE_SETTINGS_QUERY)
  const [activeImg, setActiveImg] = useState(0)

  if (loadingProduct) return <div className="pt-32 pb-20"><Skeleton className="h-[600px] container mx-auto" /></div>
  if (!product) return <Navigate to="/cardapio" />

  const imageUrl = product.image?.asset?._ref ? `https://cdn.sanity.io/images/vjt8hf0f/production/${product.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}` : ''
  const gallery = getGallery(imageUrl)
  const tag = product.tag ? tagConfig[product.tag] : null

  return (
    <div className="min-h-screen bg-canvas pt-28 pb-20">
      <div className="container mx-auto max-w-[1180px] px-7 py-16">

        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-[0.82rem] font-medium text-muted">
          <Link to="/" className="hover:text-rose transition-colors">Home</Link>
          <i className="fas fa-chevron-right text-[0.6rem] opacity-30" />
          <Link to="/cardapio" className="hover:text-rose transition-colors">Cardápio</Link>
          <i className="fas fa-chevron-right text-[0.6rem] opacity-30" />
          <span className="text-rose-light">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div className="space-y-4">
            <RevealWrapper className="aspect-square overflow-hidden rounded-[32px] border border-border-soft bg-white shadow-sm">
              <img
                src={gallery[activeImg]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </RevealWrapper>
            <div className="grid grid-cols-3 gap-4">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    'aspect-square overflow-hidden rounded-2xl border-2 transition-all',
                    activeImg === i ? 'border-rose shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  )}
                >
                  <img src={img} alt={`${product.name} ${i}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <RevealWrapper direction="right">
              {tag && (
                <div className={cn('mb-6 inline-block rounded-full px-5 py-2 text-[0.75rem] font-bold shadow-sm', tag.className)}>
                  {tag.label}
                </div>
              )}
              <h1 className="mb-4 font-display text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-ink leading-tight">
                {product.name}
              </h1>
              <div className="mb-8 font-display text-[2.2rem] font-bold text-rose">
                {product.price}
                <span className="ml-1 text-[1.1rem] font-light text-muted">{product.priceNote}</span>
              </div>

              <div className="mb-10 rounded-[24px] bg-white p-8 border border-border-soft shadow-sm">
                <h3 className="mb-3 text-[0.95rem] font-bold uppercase tracking-widest text-ink">Descrição</h3>
                <p className="text-[1.05rem] leading-[1.8] text-muted">{product.description}</p>
              </div>

              <div className="mb-10 grid gap-4 grid-cols-2">
                <div className="rounded-2xl border border-border-soft bg-rose/5 p-5 text-center transition-colors hover:bg-rose/10">
                  <div className="mb-1 text-[1.5rem]">🧁</div>
                  <div className="text-[0.8rem] font-bold text-ink uppercase tracking-tighter">Artesanal</div>
                </div>
                <div className="rounded-2xl border border-border-soft bg-rose/5 p-5 text-center transition-colors hover:bg-rose/10">
                  <div className="mb-1 text-[1.5rem]">🎀</div>
                  <div className="text-[0.8rem] font-bold text-ink uppercase tracking-tighter">Premium</div>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/encomenda"
                  className="flex flex-[2] items-center justify-center gap-3 rounded-2xl bg-rose py-4.5 font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-rose-deep"
                >
                  <i className="fas fa-shopping-cart" />
                  Fazer Encomenda
                </Link>
                <a
                  href={`https://wa.me/${settings?.phone.replace(/\D/g, '') || '5511999999999'}?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20produto%20${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-border-soft py-4.5 font-semibold text-ink transition-all hover:bg-canvas"
                >
                  <i className="fab fa-whatsapp text-lg text-[#25d366]" />
                  Dúvidas
                </a>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </div>
  )
}
