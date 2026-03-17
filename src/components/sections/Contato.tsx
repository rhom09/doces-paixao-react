import { type FormEvent, useState } from 'react'
import { LabelTag, RevealWrapper } from '@/components/ui/index'
import { usePhoneMask } from '@/hooks/usePhoneMask'
import { cn } from '@/utils/cn'

const INFO_ITEMS = [
  {
    icon: 'fas fa-map-marker-alt',
    label: 'Endereço',
    value: 'Rua das Flores, 142 — Jardim Primavera\nSão Paulo, SP',
    colorClass: 'bg-rose-pale text-rose',
  },
  {
    icon: 'fas fa-phone-alt',
    label: 'Telefone / WhatsApp',
    value: '(11) 99999-9999',
    colorClass: 'bg-mint-pale text-mint-deep',
  },
  {
    icon: 'fas fa-clock',
    label: 'Horário de Atendimento',
    value: 'Seg–Sex: 8h–19h  |  Sáb: 9h–16h',
    colorClass: 'bg-[#fff8ec] text-peach-deep',
  },
  {
    icon: 'fas fa-envelope',
    label: 'E-mail',
    value: 'contato@docespaixao.com.br',
    colorClass: 'bg-rose-pale text-rose-deep',
  },
]

const SOCIALS = [
  { label: 'Instagram', icon: 'fab fa-instagram', hover: 'hover:bg-[#e1306c] hover:text-white hover:border-[#e1306c]' },
  { label: 'Facebook',  icon: 'fab fa-facebook-f', hover: 'hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2]' },
  { label: 'WhatsApp',  icon: 'fab fa-whatsapp', hover: 'hover:bg-[#25d366] hover:text-white hover:border-[#25d366]' },
  { label: 'TikTok',    icon: 'fab fa-tiktok', hover: 'hover:bg-black hover:text-white hover:border-black' },
  { label: 'Pinterest', icon: 'fab fa-pinterest-p', hover: 'hover:bg-[#e60023] hover:text-white hover:border-[#e60023]' },
]

const inputBase =
  'w-full rounded-xl border border-border bg-canvas px-4 py-3 font-body text-[0.9rem] text-ink outline-none transition-all focus:border-rose focus:bg-white focus:shadow-[0_0_0_3px_rgba(196,86,107,0.1)]'

export function Contato() {
  const phone = usePhoneMask()
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('success')
    setTimeout(() => {
      setStatus('idle')
      ;(e.target as HTMLFormElement).reset()
    }, 3200)
  }

  return (
    <section className="bg-cream py-[120px]" id="contato">
      <div className="container mx-auto max-w-[1180px] px-7">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-start">

          {/* Info */}
          <RevealWrapper direction="left">
            <LabelTag className="mb-4">📍 Contato</LabelTag>
            <h3 className="mb-4 font-display text-[clamp(1.6rem,3vw,2.2rem)]">
              Vamos Criar<br />
              Algo <em className="italic text-rose">Incrível</em> Juntos
            </h3>
            <p className="mb-9 text-[0.95rem] leading-[1.8] text-muted">
              Atendemos encomendas para aniversários, casamentos, eventos corporativos e qualquer
              ocasião que mereça algo especial.
            </p>

            <div className="flex flex-col gap-4">
              {INFO_ITEMS.map(({ icon, label, value, colorClass }) => (
                <div key={label} className="flex items-start gap-3.5">
                  <div className={cn('flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px] text-[0.9rem]', colorClass)}>
                    <i className={icon} />
                  </div>
                  <div>
                    <h4 className="mb-0.5 font-body text-[0.88rem] font-semibold text-ink">{label}</h4>
                    <span className="whitespace-pre-line text-[0.83rem] leading-[1.5] text-muted">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex gap-2.5">
              {SOCIALS.map(({ label, icon, hover }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={cn(
                    'flex h-[42px] w-[42px] items-center justify-center rounded-[11px] border border-border bg-white text-muted text-[0.95rem] transition-all hover:-translate-y-0.5',
                    hover
                  )}
                >
                  <i className={icon} />
                </a>
              ))}
            </div>
          </RevealWrapper>

          {/* Form */}
          <RevealWrapper
            direction="right"
            className="rounded-[28px] border border-border-soft bg-white p-11 shadow-md"
          >
            <h4 className="mb-1.5 font-display text-[1.4rem] text-ink">Faça sua Encomenda</h4>
            <p className="mb-7 text-[0.85rem] text-muted">Preencha o formulário e responderemos em até 2 horas 🧁</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.8rem] font-semibold tracking-[0.03em] text-ink-soft">Nome completo</label>
                  <input type="text" placeholder="Seu nome" required className={inputBase} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.8rem] font-semibold tracking-[0.03em] text-ink-soft">Telefone</label>
                  <input type="tel" placeholder="(00) 00000-0000" required className={inputBase} value={phone.value} onChange={phone.onChange} />
                </div>
              </div>

              <div className="mb-4 flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold tracking-[0.03em] text-ink-soft">E-mail</label>
                <input type="email" placeholder="seu@email.com" required className={inputBase} />
              </div>

              <div className="mb-4 flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold tracking-[0.03em] text-ink-soft">Tipo de encomenda</label>
                <select required className={inputBase}>
                  <option value="">Selecione uma opção</option>
                  {['Bolo Personalizado','Doces para Festa','Cupcakes','Casamento','Corporativo','Outro'].map(o => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6 flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold tracking-[0.03em] text-ink-soft">Mensagem</label>
                <textarea
                  placeholder="Conte sobre sua encomenda: data do evento, quantidade, tema..."
                  required
                  className={cn(inputBase, 'min-h-[120px] resize-y')}
                />
              </div>

              <button
                type="submit"
                className={cn(
                  'flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-body text-[0.95rem] font-semibold text-white transition-all duration-300',
                  status === 'success'
                    ? 'cursor-default bg-[#2db87b]'
                    : 'bg-rose shadow-[0_4px_20px_rgba(196,86,107,0.3)] hover:-translate-y-0.5 hover:bg-rose-deep hover:shadow-[0_8px_28px_rgba(196,86,107,0.4)]'
                )}
              >
                {status === 'success' ? (
                  <><i className="fas fa-check" /> Mensagem enviada!</>
                ) : (
                  <><i className="fas fa-paper-plane" /> Enviar Mensagem</>
                )}
              </button>
            </form>
          </RevealWrapper>

        </div>
      </div>
    </section>
  )
}
