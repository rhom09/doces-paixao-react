import { LabelTag, RevealWrapper } from '@/components/ui/index'
import { cn } from '@/utils/cn'

const SOCIALS = [
  { label: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/_doces.paixao/', hover: 'hover:bg-[#e1306c] hover:text-white hover:border-[#e1306c]' },
  { label: 'WhatsApp',  icon: 'fab fa-whatsapp', url: 'https://wa.me/55119985738330', hover: 'hover:bg-[#25d366] hover:text-white hover:border-[#25d366]' },
]

export function Contato() {
  const addressUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Rua Candido Fontoura, 326, Jardim Boa Vista, São Paulo, SP')}`

  return (
    <section className="relative bg-cream py-[120px]" id="contato">
      {/* Elementos Decorativos de Fundo */}
      <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-rose-pale/40 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-mint-pale/30 blur-[120px]" />

      <div className="container relative z-10 mx-auto max-w-[1000px] px-7">
        <div className="text-center">
          <RevealWrapper>
            <LabelTag className="mb-5">📍 Localização & Contato</LabelTag>
            <h2 className="mb-6 font-display text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.1] text-ink">
              Venha nos Visitar ou <br />
              <em className="italic text-rose">Peça em Casa</em>
            </h2>
            <p className="mx-auto mb-14 max-w-[600px] text-[1.1rem] leading-[1.8] text-muted">
              Estamos localizados no coração do Jd. Boa Vista, prontos para adoçar o seu dia.
              Prefere comodidade? Atendemos encomendas via WhatsApp com entrega agendada.
            </p>
          </RevealWrapper>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          {/* Card de Informações */}
          <RevealWrapper direction="left" className="flex flex-col gap-6">
            <div className="group rounded-[32px] border border-border-soft bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-pale text-rose text-[1.4rem]">
                <i className="fas fa-map-marked-alt" />
              </div>
              <h3 className="mb-3 font-display text-[1.5rem] text-ink">Nosso Endereço</h3>
              <p className="mb-6 text-[1.05rem] leading-relaxed text-muted">
                Rua Candido Fontoura, 326 <br />
                Jardim Boa Vista — São Paulo, SP
              </p>
              <a
                href={addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-[0.9rem] font-bold uppercase tracking-wider text-rose transition-colors hover:text-rose-deep"
              >
                Ver no Google Maps <i className="fas fa-external-link-alt text-[0.7rem]" />
              </a>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex flex-col items-center justify-center rounded-[28px] border border-border-soft bg-white p-8 text-center transition-all hover:-translate-y-1 hover:shadow-md",
                    social.label === 'WhatsApp' ? 'hover:border-mint-light' : 'hover:border-rose-light'
                  )}
                >
                  <div className={cn(
                    "mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-[1.3rem]",
                    social.label === 'WhatsApp' ? "bg-mint-pale text-mint-deep" : "bg-rose-pale text-rose"
                  )}>
                    <i className={social.icon} />
                  </div>
                  <span className="font-display text-[1.1rem] font-semibold text-ink">{social.label}</span>
                  <small className="mt-1 text-muted opacity-70">Toque para abrir</small>
                </a>
              ))}
            </div>
          </RevealWrapper>

          {/* Visual / Mapa Placeholder */}
          <RevealWrapper direction="right" className="relative min-h-[400px] overflow-hidden rounded-[32px] border border-border-soft bg-canvas shadow-inner">
            {/* Aqui simulamos um mapa visualmente agradável que combina com o site */}
            <div className="absolute inset-0 opacity-40 grayscale-[0.5] contrast-[1.1]">
               <img
                 src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80"
                 alt="Localização"
                 className="h-full w-full object-cover"
               />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-rose-deep/20 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
              <div className="rounded-3xl bg-white/90 p-8 shadow-xl backdrop-blur-md">
                <div className="mx-auto mb-4 flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-rose text-[1.8rem] text-white shadow-lg">
                  <i className="fas fa-map-pin" />
                </div>
                <h4 className="font-display text-[1.3rem] text-ink">Esperamos por você!</h4>
                <p className="mt-2 text-[0.85rem] text-muted">Aberto para retiradas e visitas <br/> de Segunda a Sábado.</p>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
