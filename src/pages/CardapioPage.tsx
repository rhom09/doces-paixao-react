import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ALL_PRODUCTS_QUERY } from '@/lib/queries'
import { useSanity } from '@/hooks/useSanity'
import { LabelTag, SectionHead, RevealWrapper } from '@/components/ui/index'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import { cn } from '@/utils/cn'
import { getProductImageUrl } from '@/utils/getImageUrl'
import type { ProductTab, ProductTag, Product } from '@/types'

const TABS: ProductTab[] = ['Todos', 'Bolos', 'Docinhos', 'Tortas', 'Especiais']

const tagConfig: Record<NonNullable<ProductTag>, { label: string; className: string }> = {
  bestseller: { label: '⭐ Mais Vendido', className: 'bg-rose/90 text-white' },
  novo:       { label: '🆕 Novidade',     className: 'bg-mint/90 text-white' },
  premium:    { label: '🎀 Premium',      className: 'bg-peach/95 text-ink' },
}

const PRICE_RANGES = [
  { label: 'Todos os preços', min: 0, max: Infinity },
  { label: 'Até R$ 15',       min: 0, max: 15 },
  { label: 'R$ 15 – R$ 80',  min: 15, max: 80 },
  { label: 'Acima de R$ 80', min: 80, max: Infinity },
]

function parsePrice(price: string) {
  return parseFloat(price.replace('R$', '').replace('.', '').replace(',', '.').trim()) || 0
}

export default function CardapioPage() {
  const { data: products, loading, error } = useSanity<Product[]>(ALL_PRODUCTS_QUERY)
  const [activeTab, setActiveTab] = useState<ProductTab>('Todos')
  const [priceRange, setPriceRange] = useState(0)

  const filtered = (products || [])
    .filter((p) => (activeTab === 'Todos' ? true : p.category === activeTab))
    .filter((p) => {
      const price = parsePrice(p.price)
      return price >= PRICE_RANGES[priceRange].min && price <= PRICE_RANGES[priceRange].max
    })

  return (
    <div className="min-h-screen bg-canvas pt-28 pb-32">
      <div className="container mx-auto max-w-[1180px] px-7 py-16">

        <RevealWrapper>
          <SectionHead
            tag={<LabelTag variant="rose">🍰 Cardápio Completo</LabelTag>}
            title={<>Nossas <em className="italic text-rose">Delícias</em></>}
            subtitle="Explore nossa variedade de doces artesanais feitos com ingredientes premium."
            center
          />
        </RevealWrapper>

        {/* Filters */}
        <div className="mb-14 flex flex-col items-center gap-8">
          <RevealWrapper delay={80} className="flex flex-wrap justify-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'rounded-full border px-6 py-2.5 font-body text-[0.88rem] font-medium transition-all duration-300',
                  activeTab === tab
                    ? 'border-rose bg-rose text-white shadow-lg'
                    : 'border-border bg-white text-muted hover:border-rose-light hover:text-rose'
                )}
              >
                {tab}
              </button>
            ))}
          </RevealWrapper>

          <RevealWrapper delay={150} className="flex flex-wrap justify-center gap-3">
            {PRICE_RANGES.map((range, i) => (
              <button
                key={range.label}
                onClick={() => setPriceRange(i)}
                className={cn(
                  'rounded-xl border px-5 py-2 text-[0.82rem] transition-all',
                  priceRange === i
                    ? 'border-rose/30 bg-rose/5 text-rose font-semibold'
                    : 'border-border bg-white text-muted hover:border-rose-pale'
                )}
              >
                {range.label}
              </button>
            ))}
          </RevealWrapper>
        </div>

        {/* Grid */}
        {error ? (
          <div className="py-20 text-center text-rose">Erro ao carregar cardápio.</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
            ) : filtered.length > 0 ? (
              filtered.map((product, i) => (
                <RevealWrapper
                  key={product.id}
                  delay={(i % 3) * 80}
                  className="group overflow-hidden rounded-[32px] border border-border-soft bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-rose-light hover:shadow-xl"
                >
                  <Link to={`/produto/${product.id}`}>
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={getProductImageUrl(product)}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {product.tag && (
                        <div className={cn('absolute left-6 top-6 rounded-full px-4 py-1.5 text-[0.7rem] font-bold shadow-md', tagConfig[product.tag].className)}>
                          {tagConfig[product.tag].label}
                        </div>
                      )}
                    </div>
                    <div className="p-8">
                      <div className="mb-2 text-[0.75rem] font-bold uppercase tracking-widest text-rose-light">
                        {product.category}
                      </div>
                      <h3 className="mb-3 font-display text-[1.4rem] font-semibold text-ink">{product.name}</h3>
                      <p className="mb-6 line-clamp-2 text-[0.9rem] leading-relaxed text-muted">{product.description}</p>
                      <div className="flex items-center justify-between border-t border-border-soft pt-6">
                        <span className="font-display text-[1.3rem] font-bold text-ink">
                          {product.price}<span className="text-[0.85rem] font-light text-muted">{product.priceNote}</span>
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose/10 text-rose transition-colors group-hover:bg-rose group-hover:text-white">
                          <i className="fas fa-arrow-right" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </RevealWrapper>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="mb-4 text-5xl opacity-20">🍰</div>
                <p className="text-muted">Nenhum doce encontrado com estes filtros.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
