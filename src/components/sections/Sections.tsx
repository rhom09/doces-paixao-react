import { ALL_TESTIMONIALS_QUERY, ALL_DIFERENCIAIS_QUERY, ALL_GALLERY_ITEMS_QUERY } from '@/lib/queries'
import { useSanity } from '@/hooks/useSanity'
import { urlFor } from '@/lib/sanity'
import { Skeleton } from '@/components/ui/SkeletonCard'
import { LabelTag, SectionHead, RevealWrapper, Stars } from '@/components/ui/index'
import { Button } from '@/components/ui/Button'
import { DIFERENCIAIS } from '@/data/diferenciais'
import { GALLERY_ITEMS } from '@/data/stats'
import { cn } from '@/utils/cn'
import type { Testimonial, Diferencial, GalleryItem } from '@/types'

// ── Diferenciais ──────────────────────────────────────────────
const iconColors = [
  'bg-rose/20 text-rose-light',
  'bg-mint/20 text-mint-light',
  'bg-peach/15 text-peach',
  'bg-rose/15 text-rose-light',
]

export function Diferenciais() {
  const { data: sanData, loading } = useSanity<Diferencial[]>(ALL_DIFERENCIAIS_QUERY)
  const data = sanData && sanData.length > 0 ? sanData : DIFERENCIAIS

  return (
    <section className="relative overflow-hidden bg-ink py-[120px] text-white">
      {/* Blobs */}
      <div className="pointer-events-none absolute -right-36 -top-36 h-[500px] w-[500px] rounded-full bg-rose/12 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-mint/10 blur-[80px]" />

      <div className="container mx-auto max-w-[1180px] px-7">
        <RevealWrapper>
          <SectionHead
            tag={
              <LabelTag className="border-rose/30 bg-rose/15 text-rose-light">
                ✦ Por que nos escolher
              </LabelTag>
            }
            title={<>O que nos <em className="italic text-rose-light">Diferencia</em></>}
            subtitle="Mais do que doces — entregamos experiências memoráveis"
            center
            dark
            className="mb-14"
          />
        </RevealWrapper>

        <div className="grid overflow-hidden rounded-[28px] border border-white/6 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border border-white/6 bg-white/[0.04] p-11">
                <Skeleton className="mb-5 h-14 w-14 rounded-[14px] bg-white/10" />
                <Skeleton className="mb-3 h-6 w-3/4 bg-white/10" />
                <Skeleton className="h-4 w-full bg-white/10" />
                <Skeleton className="mt-2 h-4 w-5/6 bg-white/10" />
              </div>
            ))
          ) : data.map((d, i) => (
            <RevealWrapper
              key={d.id}
              delay={i * 80}
              className="group relative overflow-hidden border border-white/6 bg-white/[0.04] p-11 transition-colors hover:bg-white/7"
            >
              <div className="pointer-events-none absolute right-7 top-6 select-none font-display text-[4rem] font-bold leading-none text-white/[0.04]">
                {d.number}
              </div>
              <div className={cn('mb-5 flex h-14 w-14 items-center justify-center rounded-[14px] text-[1.3rem]', iconColors[i])}>
                <i className={d.icon} />
              </div>
              <h3 className="mb-3 font-display text-[1.2rem] text-white">{d.title}</h3>
              <p className="text-[0.87rem] leading-[1.75] text-white/50">{d.description}</p>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Galeria ───────────────────────────────────────────────────
export function Galeria() {
  const { data: sanData, loading } = useSanity<GalleryItem[]>(ALL_GALLERY_ITEMS_QUERY)
  const data = sanData && sanData.length > 0 ? sanData : GALLERY_ITEMS

  return (
    <section className="bg-cream py-[120px]" id="galeria">
      <div className="container mx-auto max-w-[1180px] px-7">
        <RevealWrapper>
          <SectionHead
            tag={<LabelTag variant="mint">📸 Galeria</LabelTag>}
            title={<>Nossas <em className="italic text-rose">Criações</em></>}
            subtitle="Um olhar sobre os momentos doces que ajudamos a criar"
            center
            className="mb-12"
          />
        </RevealWrapper>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:[grid-template-rows:200px_200px]">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className={cn('rounded-[20px] min-h-[180px]', i === 0 && 'md:col-span-2 md:row-span-2')} />
            ))
          ) : data.map((item, i) => (
            <RevealWrapper
              key={item.id}
              delay={i * 80}
              className={cn(
                'group relative cursor-pointer overflow-hidden rounded-[20px]',
                item.span === 'both' && 'md:col-span-2 md:row-span-2',
                item.span === 'col'  && 'md:col-span-2'
              )}
            >
              <img
                src={item.imageUrl}
                alt={item.alt}
                className="h-full min-h-[180px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/55 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-[0.82rem] font-medium text-white">{item.caption}</span>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Depoimentos ───────────────────────────────────────────────
const topBarColors = [
  'bg-gradient-to-r from-rose to-rose-light',
  'bg-gradient-to-r from-mint to-mint-light',
  'bg-gradient-to-r from-peach-deep to-peach',
]

export function Depoimentos() {
  const { data: testimonials, loading } = useSanity<Testimonial[]>(ALL_TESTIMONIALS_QUERY)

  return (
    <section className="bg-canvas py-[120px]" id="depoimentos">
      <div className="container mx-auto max-w-[1180px] px-7">
        <RevealWrapper>
          <SectionHead
            tag={<LabelTag>💬 Depoimentos</LabelTag>}
            title={<>O que Dizem <em className="italic text-rose">Nossos Clientes</em></>}
            subtitle="Mais de 1.800 famílias já confiaram os seus momentos especiais a nós"
            center
          />
        </RevealWrapper>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="rounded-[28px] border border-border-soft bg-white p-8 shadow-sm">
                <Skeleton className="mb-4 h-12 w-12" />
                <Skeleton className="mb-4 h-4 w-3/4" />
                <Skeleton className="mb-6 h-20 w-full" />
                <div className="flex items-center gap-3 border-t border-border-soft pt-5">
                  <Skeleton className="h-11 w-11 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              </div>
            ))
          ) : (testimonials || []).map((t, i) => (
            <RevealWrapper
              key={t.id}
              delay={i * 80}
              className="group relative overflow-hidden rounded-[28px] border border-border-soft bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              {/* Top color bar */}
              <div className={cn('absolute left-0 right-0 top-0 h-[3px]', topBarColors[i])} />

              <div className="mb-4 select-none font-display text-[4rem] leading-[0.7] text-rose-light">"</div>
              <Stars rating={t.rating} />
              <p className="mb-6 text-[0.92rem] italic leading-[1.85] text-ink-soft">{t.text}</p>
              <div className="flex items-center gap-3 border-t border-border-soft pt-5">
                <img
                  src={t.avatar ? urlFor(t.avatar).url() : t.avatarUrl}
                  alt={t.authorName}
                  className="h-11 w-11 rounded-full border-[2.5px] border-rose-light object-cover"
                />
                <div>
                  <strong className="block font-body text-[0.9rem] font-semibold text-ink">{t.authorName}</strong>
                  <span className="text-[0.78rem] text-muted">{t.authorRole}</span>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA Band ──────────────────────────────────────────────────
export function CTABand() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-rose-deep via-rose to-[#d4708a] py-[100px] text-center text-white">
      <div className="absolute inset-0 bg-crosshatch" />
      <div className="container relative z-10 mx-auto max-w-[1180px] px-7">
        <RevealWrapper>
          <h2 className="mb-3.5 font-display text-[clamp(2rem,4vw,3rem)]">
            Pronta para Adoçar<br />o Seu Momento Especial?
          </h2>
          <p className="mx-auto mb-9 max-w-[480px] text-[1.05rem] font-light opacity-85">
            Entre em contato agora e vamos criar algo incrível juntos. Sua encomenda merece o melhor.
          </p>
          <Button as="a" href="#contato" variant="white" size="lg">
            <i className="fab fa-whatsapp" /> Solicitar Orçamento
          </Button>
        </RevealWrapper>
      </div>
    </div>
  )
}
