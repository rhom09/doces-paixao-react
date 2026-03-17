import { useParams, Link, Navigate } from 'react-router-dom'
import { PRODUCTS } from '@/data/produtos'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { RevealWrapper } from '@/components/ui/index'
import { cn } from '@/utils/cn'
import { useState } from 'react'

const tagConfig = {
  bestseller: { label: '⭐ Mais Vendido', className: 'bg-rose/90 text-white' },
  novo:       { label: '🆕 Novidade',     className: 'bg-mint/90 text-white' },
  premium:    { label: '🎀 Premium',      className: 'bg-peach/95 text-ink' },
} as const

// Generate extra gallery images from the same Unsplash photo
function getGallery(imageUrl: string) {
  const base = imageUrl.split('?')[0]
  return [
    `${base}?w=800&q=85`,
    `${base}?w=800&q=85&crop=entropy`,
    `${base}?w=800&q=85&crop=faces`,
  ]
}

export default function ProdutoPage() {
  const { id } = useParams<{ id: string }>()
  const product = PRODUCTS.find((p) => p.id === Number(id))

  const [activeImg, setActiveImg] = useState(0)

  if (!product) return <Navigate to="/404" replace />

  const gallery = getGallery(product.imageUrl)
  const tag = product.tag ? tagConfig[product.tag] : null

  return (
    <>
      <Header />
      <main className="min-h-screen bg-canvas pt-28">
        <div className="container mx-auto max-w-[1180px] px-7 py-16">

          {/* Breadcrumb */}
          <nav className="mb-10 flex items-center gap-2 text-[0.85rem] text-muted">
            <Link to="/" className="hover:text-rose">Início</Link>
            <span>/</span>
            <Link to="/cardapio" className="hover:text-rose">Cardápio</Link>
            <span>/</span>
            <span className="text-ink">{product.name}</span>
          </nav>

          <div className="grid gap-16 lg:grid-cols-2">
            {/* Gallery */}
            <RevealWrapper direction="left">
              <div className="overflow-hidden rounded-[28px] border border-border-soft shadow-md">
                <img
                  key={activeImg}
                  src={gallery[activeImg]}
                  alt={product.imageAlt}
                  className="aspect-[4/3] w-full object-cover transition-opacity duration-300"
                />
              </div>
              <div className="mt-4 flex gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={cn(
                      'overflow-hidden rounded-xl border-2 transition-all',
                      i === activeImg ? 'border-rose shadow-[0_0_0_3px_rgba(196,86,107,0.2)]' : 'border-border-soft hover:border-rose-light'
                    )}
                  >
                    <img src={src} alt="" className="h-16 w-20 object-cover" />
                  </button>
                ))}
              </div>
            </RevealWrapper>

            {/* Details */}
            <RevealWrapper direction="right">
              {tag && (
                <span className={cn('mb-4 inline-block rounded-full px-3 py-1 text-[0.75rem] font-semibold tracking-wide', tag.className)}>
                  {tag.label}
                </span>
              )}

              <div className="mb-1 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-mint-deep">
                {product.category}
              </div>
              <h1 className="mb-4 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-ink">
                {product.name}
              </h1>
              <p className="mb-6 text-[1rem] leading-[1.85] text-muted">{product.description}</p>

              {/* Details list */}
              <ul className="mb-8 space-y-3">
                {[
                  { icon: 'fa-leaf',       text: 'Ingredientes 100% frescos e selecionados' },
                  { icon: 'fa-clock',      text: 'Prazo de encomenda: mínimo 3 dias úteis' },
                  { icon: 'fa-truck',      text: 'Entrega disponível na região' },
                  { icon: 'fa-paintbrush',text: 'Personalização disponível sob consulta' },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-[0.9rem] text-muted">
                    <i className={cn('fas mt-0.5 text-rose', icon)} />
                    {text}
                  </li>
                ))}
              </ul>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="font-display text-[2.2rem] font-bold text-rose-deep">{product.price}</span>
                {product.priceNote && (
                  <span className="text-[0.85rem] text-muted">{product.priceNote}</span>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/encomenda"
                  className="flex-1 rounded-2xl bg-rose py-3.5 text-center font-medium text-white shadow-[0_4px_20px_rgba(196,86,107,0.35)] transition-all hover:-translate-y-0.5 hover:bg-rose-deep"
                >
                  <i className="fas fa-inbox mr-2" /> Fazer Encomenda
                </Link>
                <a
                  href={`https://wa.me/5511999999999?text=Olá! Tenho interesse no produto: ${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl border border-[#25d366] px-5 py-3.5 font-medium text-[#25d366] transition-all hover:bg-[#25d366] hover:text-white"
                >
                  <i className="fab fa-whatsapp text-[1.1rem]" /> WhatsApp
                </a>
              </div>

              <Link to="/cardapio" className="mt-6 flex items-center gap-1.5 text-[0.85rem] text-muted hover:text-rose">
                <i className="fas fa-arrow-left text-[0.8rem]" /> Voltar ao cardápio
              </Link>
            </RevealWrapper>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
