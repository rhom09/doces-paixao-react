import { useState } from 'react'
import { LabelTag, SectionHead, RevealWrapper } from '@/components/ui/index'
import type { Product, ProductTab, ProductTag } from '@/types'
import { cn } from '@/utils/cn'

import { ALL_PRODUCTS_QUERY } from '@/lib/queries'
import { useSanity } from '@/hooks/useSanity'
import { urlFor } from '@/lib/sanity'
import { SkeletonCard } from '@/components/ui/SkeletonCard'

const TABS: ProductTab[] = ['Todos', 'Bolos', 'Docinhos', 'Tortas', 'Especiais']

const tagConfig: Record<NonNullable<ProductTag>, { label: string; className: string }> = {
  bestseller: { label: '⭐ Mais Vendido', className: 'bg-rose/90 text-white' },
  novo:       { label: '🆕 Novidade',     className: 'bg-mint/90 text-white' },
  premium:    { label: '🎀 Premium',      className: 'bg-peach/95 text-ink' },
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [liked, setLiked] = useState(false)
  const tag = product.tag ? tagConfig[product.tag] : null

  return (
    <RevealWrapper
      delay={(index % 3) * 80}
      className="group cursor-pointer overflow-hidden rounded-[28px] border border-border-soft bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-rose-light hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={product.image ? urlFor(product.image).url() : product.imageUrl}
          alt={product.imageAlt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        />

        {tag && (
          <span className={cn('absolute left-3.5 top-3.5 rounded-full px-3 py-1 text-[0.72rem] font-semibold tracking-[0.06em]', tag.className)}>
            {tag.label}
          </span>
        )}

        <button
          aria-label="Curtir"
          onClick={() => setLiked(!liked)}
          className={cn(
            'absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full text-[0.9rem] transition-all',
            'bg-white/90 backdrop-blur-sm',
            liked ? 'bg-rose text-white' : 'text-rose hover:scale-115 hover:bg-rose hover:text-white'
          )}
        >
          <i className={liked ? 'fas fa-heart' : 'far fa-heart'} />
        </button>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-mint-deep">
          {product.category}
        </div>
        <h3 className="mb-2 font-display text-[1.25rem] text-ink">{product.name}</h3>
        <p className="mb-4 text-[0.85rem] leading-[1.65] text-muted">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="font-display text-[1.5rem] font-bold text-rose-deep">
            {product.price}
            {product.priceNote && (
              <small className="font-body text-[0.75rem] font-normal text-muted"> {product.priceNote}</small>
            )}
          </div>
          <button
            aria-label="Adicionar"
            className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-rose-pale text-rose text-[0.95rem] transition-all hover:bg-rose hover:text-white"
          >
            <i className="fas fa-shopping-bag" />
          </button>
        </div>
      </div>
    </RevealWrapper>
  )
}

export function Produtos() {
  const { data: products, loading, error } = useSanity<Product[]>(ALL_PRODUCTS_QUERY)
  const [activeTab, setActiveTab] = useState<ProductTab>('Todos')

  const filtered = activeTab === 'Todos'
    ? products || []
    : (products || []).filter((p) => p.category === activeTab)

  return (
    <section className="bg-canvas py-[120px]" id="produtos">
      <div className="container mx-auto max-w-[1180px] px-7">

        <RevealWrapper>
          <SectionHead
            tag={<LabelTag>🍰 Cardápio</LabelTag>}
            title={<>Nossos <em className="italic text-rose">Produtos</em></>}
            subtitle="Delícias preparadas diariamente com ingredientes frescos e muito amor"
            center
          />
        </RevealWrapper>

        {/* Tabs */}
        <RevealWrapper delay={80} className="mb-12 flex flex-wrap justify-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'rounded-full border px-5 py-2 font-body text-[0.84rem] font-medium transition-all duration-300',
                activeTab === tab
                  ? 'border-rose bg-rose text-white shadow-[0_4px_16px_rgba(196,86,107,0.28)]'
                  : 'border-border bg-white text-muted hover:border-rose-light hover:text-rose'
              )}
            >
              {tab}
            </button>
          ))}
        </RevealWrapper>

        {error ? (
          <p className="py-10 text-center text-red-500">Erro ao carregar os produtos.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            ) : (
              filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))
            )}
          </div>
        )}

      </div>
    </section>
  )
}
