import { getWhatsAppLink } from '@/utils/whatsapp'

const QUICK_LINKS = [
  { label: 'Início',     href: '#inicio' },
  { label: 'Sobre Nós',  href: '#sobre' },
  { label: 'Cardápio',   href: '#produtos' },
  { label: 'Galeria',    href: '#galeria' },
  { label: 'Avaliações', href: '#depoimentos' },
  { label: 'Contato',    href: '#contato' },
]

export function Footer() {
  const whatsappNumber = '11 98573-8330'

  return (
    <footer className="relative overflow-hidden bg-ink pt-[100px] text-white/60">
      {/* Elementos Decorativos de Fundo */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full bg-rose/5 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[350px] w-[350px] rounded-full bg-mint/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto max-w-[1180px] px-7">

        {/* Top Section / Grid */}
        <div className="grid gap-x-12 gap-y-16 pb-16 border-b border-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand & About */}
          <div className="lg:col-span-1">
            <a href="#" className="mb-6 inline-flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose/20 to-rose/10 p-1.5 transition-transform group-hover:scale-110">
                <img src="/icons/icon.svg" alt="Doces Paixão Logo" className="h-full w-full object-contain" />
              </div>
              <span className="font-display text-[1.6rem] font-bold text-white tracking-tight">
                Doces <span className="text-rose-light italic">Paixão</span>
              </span>
            </a>
            <p className="text-[0.92rem] leading-[1.8] text-white/40 mb-8">
              Confeitaria artesanal com alma. Transformamos ingredientes selecionados
              em experiências memoráveis para os seus momentos mais doces.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/_doces.paixao/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-white/50 border border-white/5 transition-all hover:bg-rose hover:text-white hover:border-rose hover:-translate-y-1"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-lg" />
              </a>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-white/50 border border-white/5 transition-all hover:bg-mint hover:text-white hover:border-mint hover:-translate-y-1"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="pl-0 lg:pl-10">
            <h4 className="mb-7 font-display text-[1rem] font-bold text-white tracking-wide">Explore</h4>
            <ul className="grid grid-cols-1 gap-4">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="text-[0.9rem] text-white/40 transition-colors hover:text-rose-light flex items-center gap-2 group">
                    <span className="h-1 w-1 rounded-full bg-rose/30 transition-all group-hover:w-2 group-hover:bg-rose" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-7 font-display text-[1rem] font-bold text-white tracking-wide">Fale Conosco</h4>
            <div className="space-y-6">
              <div className="flex gap-4 items-start group">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] text-rose-light border border-white/5">
                  <i className="fas fa-phone-alt text-sm" />
                </div>
                <div>
                  <span className="block text-[0.75rem] font-bold uppercase tracking-widest text-white/25 mb-1">Telefone</span>
                  <a href={`tel:5511985738330`} className="text-[0.95rem] font-medium text-white/60 hover:text-white transition-colors">
                    (11) {whatsappNumber}
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-start group">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] text-rose-light border border-white/5">
                  <i className="fas fa-map-marker-alt text-sm" />
                </div>
                <div>
                  <span className="block text-[0.75rem] font-bold uppercase tracking-widest text-white/25 mb-1">Ateliê</span>
                  <p className="text-[0.9rem] leading-relaxed text-white/45">
                    Rua Candido Fontoura, 326 <br />
                    Jd. Boa Vista — São Paulo, SP
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action / CTA */}
          <div className="rounded-[28px] bg-gradient-to-br from-white/[0.04] to-transparent p-7 border border-white/[0.06]">
            <h4 className="mb-4 font-display text-[1.1rem] font-bold text-white leading-snug">
              Encomende sua <br />
              <span className="text-rose-light italic">Próxima Paixão</span>
            </h4>
            <p className="mb-6 text-[0.82rem] leading-relaxed text-white/35">
              Bolos personalizados e docinhos finos para o seu evento.
            </p>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-rose py-3 text-[0.85rem] font-bold text-white shadow-lg transition-all hover:bg-rose-deep hover:-translate-y-0.5"
            >
              Solicitar Orçamento
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 py-10 text-center sm:flex-row sm:text-left">
          <div className="space-y-1">
            <p className="text-[0.8rem] text-white/20">
              © {new Date().getFullYear()} Doces Paixão — Confeitaria Artesanal.
            </p>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/10 font-bold">
              Cnpj: 21.018.672/0001-30
            </p>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-[0.8rem] text-white/25 flex items-center gap-2">
              Feito com <span className="text-rose animate-pulse">❤</span> em São Paulo
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}
