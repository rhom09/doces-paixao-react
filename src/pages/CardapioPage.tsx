import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ALL_PRODUCTS_QUERY } from '@/lib/queries'
import { useSanity } from '@/hooks/useSanity'
import { LabelTag, SectionHead, RevealWrapper } from '@/components/ui/index'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { cn } from '@/utils/cn'
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
  const [activeTab, setActiveTab] = useState<ProductTab>('Todos')
  const [search, setSearch] = useState('')
  const [priceIdx, setPriceIdx] = useState(0)

  const { data: products, loading } = useSanity<Product[]>(ALL_PRODUCTS_QUERY)

  const range = PRICE_RANGES[priceIdx]

  const filtered = (products || []).filter((p) => {
    const matchTab = activeTab === 'Todos' || p.category === activeTab
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const price = parsePrice(p.price)
    const matchPrice = price >= range.min && price <= range.max
    return matchTab && matchSearch && matchPrice
  })

  return (
    <>
      <Header />
      <main className="min-h-screen bg-canvas pt-28">
        <div className="container mx-auto max-w-[1180px] px-7 py-16">

          <RevealWrapper>
            <SectionHead
              tag={<LabelTag>🍰 Cardápio Completo</LabelTag>}
              title={<>Nossas <em className="italic text-rose">Delícias</em></>}
              subtitle="Encontre o doce perfeito para cada ocasião"
              center
            />
          </RevealWrapper>

          {/* Filters */}
          <RevealWrapper delay={60} className="mb-10 flex flex-col items-center gap-5">
            {/* Search */}
            <div className="relative w-full max-w-sm">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-[0.85rem] text-muted" />
              <input
                type="text"
                placeholder="Buscar produto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-border bg-white py-3 pl-10 pr-4 text-[0.9rem] text-ink placeholder:text-muted focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/20"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2">
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
            </div>

            {/* Price filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {PRICE_RANGES.map((r, i) => (
                <button
                  key={r.label}
                  onClick={() => setPriceIdx(i)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-[0.8rem] font-medium transition-all',
                    priceIdx === i
                      ? 'border-mint-deep bg-mint-deep text-white'
                      : 'border-border bg-white text-muted hover:border-mint hover:text-mint-deep'
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </RevealWrapper>

          {/* Results count */}
          <p className="mb-8 text-center text-[0.85rem] text-muted">
            {filtered.length} produto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Grid */}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <span className="text-5xl">🔍</span>
              <p className="text-[1rem] text-muted">Nenhum produto encontrado com esses filtros.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product, i) => {
                const tag = product.tag ? tagConfig[product.tag] : null
                return (
                  <RevealWrapper
                    key={product.id}
                    delay={(i % 3) * 80}
                    className="group overflow-hidden rounded-[28px] border border-border-soft bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-rose-light hover:shadow-lg"
                  >
                    <Link to={`/produto/${product.id}`} className="block">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={product.imageAlt}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                        />
                        {tag && (
                          <span className={cn('absolute left-3.5 top-3.5 rounded-full px-3 py-1 text-[0.72rem] font-semibold tracking-[0.06em]', tag.className)}>
                            {tag.label}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-mint-deep">
                          {product.category}
                        </div>
                        <h3 className="mb-2 font-display text-[1.2rem] text-ink">{product.name}</h3>
                        <p className="mb-4 text-[0.85rem] leading-[1.65] text-muted line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="font-display text-[1.4rem] font-bold text-rose-deep">
                            {product.price}
                            {product.priceNote && (
                              <small className="font-body text-[0.75rem] font-normal text-muted"> {product.priceNote}</small>
                            )}
                          </div>
                          <span className="rounded-xl bg-rose-pale px-3 py-1.5 text-[0.8rem] font-medium text-rose">
                            Ver detalhes →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </RevealWrapper>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
