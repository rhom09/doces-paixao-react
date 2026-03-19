import { SITE_SETTINGS_QUERY } from '@/lib/queries'
import { useSanity } from '@/hooks/useSanity'
import type { SiteSettings } from '@/types'

const QUICK_LINKS = [
  { label: 'Início',     href: '#inicio' },
  { label: 'Sobre Nós',  href: '#sobre' },
  { label: 'Cardápio',   href: '#produtos' },
  { label: 'Galeria',    href: '#galeria' },
  { label: 'Avaliações', href: '#depoimentos' },
  { label: 'Contato',    href: '#contato' },
]

const SCHEDULE = [
  { day: 'Segunda – Sexta', hours: '8h – 19h' },
  { day: 'Sábado',          hours: '9h – 16h' },
  { day: 'Domingo',         hours: 'Fechado' },
  { day: 'Feriados',        hours: 'Consultar' },
]

export function Footer() {
  const { data: settings } = useSanity<SiteSettings>(SITE_SETTINGS_QUERY)

  const socials = settings?.socialLinks || [
    { platform: 'Instagram', icon: 'fab fa-instagram', url: '#' },
    { platform: 'Facebook',  icon: 'fab fa-facebook-f', url: '#' },
    { platform: 'WhatsApp',  icon: 'fab fa-whatsapp', url: '#' },
  ]

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const btn  = form.querySelector('button') as HTMLButtonElement
    btn.innerHTML = '<i class="fas fa-check"></i>'
    btn.style.background = '#2db87b'
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-arrow-right"></i>'
      btn.style.background = ''
      form.reset()
    }, 2500)
  }

  return (
    <footer className="bg-ink pt-[72px] text-white/65">
      <div className="container mx-auto max-w-[1180px] px-7">

        {/* Grid */}
        <div className="grid gap-12 pb-14 border-b border-white/[0.08] sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr]">

          {/* About */}
          <div>
            <a href="#" className="mb-4 inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-rose/20 text-sm">
                🧁
              </span>
              <span className="font-display text-[1.65rem] font-bold text-white">
                Doces <em className="not-italic text-rose-light">Paixão</em>
              </span>
            </a>
            <p className="text-[0.875rem] leading-[1.85] text-white/45">
              Transformando momentos em memórias doces desde 2014. Confeitaria artesanal
              com paixão em cada detalhe, ingrediente e criação.
              {settings?.address && <span className="mt-2 block italic opacity-70">{settings.address}</span>}
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  aria-label={social.platform}
                  className="flex h-9.5 w-9.5 items-center justify-center rounded-[10px] bg-white/7 text-white/50 text-[0.9rem] transition-all hover:bg-rose hover:text-white"
                >
                  <i className={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-5 font-body text-[0.8rem] font-bold uppercase tracking-[0.1em] text-white/35">
              Links Rápidos
            </h4>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="text-[0.875rem] text-white/50 transition-colors hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Schedule */}
          <div>
            <h4 className="mb-5 font-body text-[0.8rem] font-bold uppercase tracking-[0.1em] text-white/35">
              Horário
            </h4>
            <div className="flex flex-col gap-2.5">
              {SCHEDULE.map(({ day, hours }) => (
                <div key={day} className="flex justify-between text-[0.83rem]">
                  <span className="text-white/45">{day}</span>
                  <span className="font-medium text-white/65">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-5 font-body text-[0.8rem] font-bold uppercase tracking-[0.1em] text-white/35">
              Newsletter
            </h4>
            <p className="mb-4 text-[0.85rem] leading-[1.65] text-white/40">
              Receba novidades, promoções exclusivas e receitas!
            </p>
            <form className="flex overflow-hidden rounded-xl border border-white/10 bg-white/7" onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                required
                className="flex-1 bg-transparent px-4 py-3 text-[0.85rem] text-white outline-none placeholder:text-white/30"
              />
              <button
                type="submit"
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center bg-rose text-white text-[0.9rem] transition-colors hover:bg-rose-deep"
              >
                <i className="fas fa-arrow-right" />
              </button>
            </form>
            <p className="mt-2.5 text-[0.76rem] text-white/30">Sem spam. Cancele quando quiser.</p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-[0.8rem] text-white/30">
            © 2024 Doces Paixão — Confeitaria Artesanal. Todos os direitos reservados.
          </p>
          <p className="text-[0.8rem] text-white/30">Feito com 🧁 e muito amor</p>
        </div>

      </div>
    </footer>
  )
}
