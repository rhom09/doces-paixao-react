import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { RevealWrapper, LabelTag, SectionHead } from '@/components/ui/index'
import { PRODUCTS } from '@/data/produtos'
import { cn } from '@/utils/cn'

type Step = 1 | 2 | 3

const STEP_LABELS = ['Produto', 'Detalhes', 'Contato']

const CATEGORIES = ['Bolos', 'Docinhos', 'Tortas', 'Especiais']

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="mb-12 flex items-center justify-center gap-0">
      {STEP_LABELS.map((label, i) => {
        const num = (i + 1) as Step
        const done = current > num
        const active = current === num
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full text-[0.9rem] font-bold transition-colors',
                  done ? 'bg-mint-deep text-white' :
                  active ? 'bg-rose text-white shadow-[0_4px_16px_rgba(196,86,107,0.35)]' :
                  'bg-white border border-border text-muted'
                )}
              >
                {done ? <i className="fas fa-check text-[0.8rem]" /> : num}
              </div>
              <span className={cn('text-[0.78rem] font-medium', active ? 'text-rose' : done ? 'text-mint-deep' : 'text-muted')}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={cn('mx-3 mb-4 h-[2px] w-16 rounded-full transition-colors', done ? 'bg-mint-deep' : 'bg-border')} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function EncomendaPage() {
  const [step, setStep] = useState<Step>(1)
  const [category, setCategory] = useState('')
  const [productId, setProductId] = useState<number | null>(null)
  const [size, setSize] = useState('')
  const [flavor, setFlavor] = useState('')
  const [date, setDate] = useState('')
  const [qty, setQty] = useState('1')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const productsByCategory = category
    ? PRODUCTS.filter((p) => p.category === category)
    : []

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-canvas px-7 pt-28 text-center">
          <div className="text-6xl">🎉</div>
          <h1 className="font-display text-[2rem] font-bold text-ink">Encomenda Recebida!</h1>
          <p className="max-w-md text-muted">
            Obrigada! Em breve entraremos em contato pelo WhatsApp para confirmar os detalhes da sua encomenda.
          </p>
          <Link
            to="/"
            className="mt-2 rounded-2xl bg-rose px-8 py-3.5 font-medium text-white shadow-[0_4px_20px_rgba(196,86,107,0.35)] transition-all hover:-translate-y-0.5 hover:bg-rose-deep"
          >
            Voltar ao Início
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-canvas pt-28">
        <div className="container mx-auto max-w-[700px] px-7 py-16">
          <RevealWrapper>
            <SectionHead
              tag={<LabelTag>📦 Encomenda</LabelTag>}
              title={<>Faça sua <em className="italic text-rose">Encomenda</em></>}
              subtitle="Preencha o formulário em 3 passos simples"
              center
            />
          </RevealWrapper>

          <RevealWrapper delay={60}>
            <StepIndicator current={step} />

            <div className="rounded-[28px] border border-border-soft bg-white p-8 shadow-sm">

              {/* Step 1 – Produto */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="font-display text-[1.3rem] font-semibold text-ink">Escolha a Categoria</h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { setCategory(cat); setProductId(null) }}
                        className={cn(
                          'rounded-2xl border px-4 py-3 text-[0.85rem] font-medium transition-all',
                          category === cat
                            ? 'border-rose bg-rose-pale text-rose'
                            : 'border-border bg-canvas text-muted hover:border-rose-light hover:text-rose'
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {category && (
                    <>
                      <h2 className="font-display text-[1.3rem] font-semibold text-ink">Escolha o Produto</h2>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {productsByCategory.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setProductId(p.id)}
                            className={cn(
                              'flex items-center gap-3 rounded-2xl border p-3 text-left transition-all',
                              productId === p.id
                                ? 'border-rose bg-rose-pale'
                                : 'border-border bg-canvas hover:border-rose-light'
                            )}
                          >
                            <img src={p.imageUrl} alt={p.name} className="h-12 w-12 rounded-xl object-cover" />
                            <div>
                              <p className="text-[0.88rem] font-medium text-ink">{p.name}</p>
                              <p className="text-[0.78rem] text-muted">{p.price}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  <button
                    disabled={!productId}
                    onClick={() => setStep(2)}
                    className="mt-2 w-full rounded-2xl bg-rose py-3.5 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-rose-deep disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Próximo →
                  </button>
                </div>
              )}

              {/* Step 2 – Detalhes */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="font-display text-[1.3rem] font-semibold text-ink">Detalhes da Encomenda</h2>

                  <div>
                    <label className="mb-1.5 block text-[0.85rem] font-medium text-ink">Tamanho / Porção</label>
                    <input
                      type="text"
                      placeholder="Ex: 20 fatias, 30 unidades..."
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full rounded-xl border border-border px-4 py-3 text-[0.9rem] focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[0.85rem] font-medium text-ink">Sabor / Personalização</label>
                    <input
                      type="text"
                      placeholder="Ex: Chocolate belga com morango..."
                      value={flavor}
                      onChange={(e) => setFlavor(e.target.value)}
                      className="w-full rounded-xl border border-border px-4 py-3 text-[0.9rem] focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-[0.85rem] font-medium text-ink">Data de entrega</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-xl border border-border px-4 py-3 text-[0.9rem] focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/20"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[0.85rem] font-medium text-ink">Quantidade</label>
                      <input
                        type="number"
                        min="1"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="w-full rounded-xl border border-border px-4 py-3 text-[0.9rem] focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/20"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 rounded-2xl border border-border py-3.5 font-medium text-muted transition-all hover:border-rose-light hover:text-rose"
                    >
                      ← Voltar
                    </button>
                    <button
                      disabled={!size || !date}
                      onClick={() => setStep(3)}
                      className="flex-1 rounded-2xl bg-rose py-3.5 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-rose-deep disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Próximo →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 – Contato */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-display text-[1.3rem] font-semibold text-ink">Seus Dados</h2>
                  <div>
                    <label className="mb-1.5 block text-[0.85rem] font-medium text-ink">Nome completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-border px-4 py-3 text-[0.9rem] focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[0.85rem] font-medium text-ink">WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-border px-4 py-3 text-[0.9rem] focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[0.85rem] font-medium text-ink">Observações adicionais</label>
                    <textarea
                      rows={3}
                      placeholder="Alergias, tema, mensagem no bolo..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full resize-none rounded-xl border border-border px-4 py-3 text-[0.9rem] focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/20"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 rounded-2xl border border-border py-3.5 font-medium text-muted transition-all hover:border-rose-light hover:text-rose"
                    >
                      ← Voltar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-2xl bg-rose py-3.5 font-medium text-white shadow-[0_4px_20px_rgba(196,86,107,0.35)] transition-all hover:-translate-y-0.5 hover:bg-rose-deep"
                    >
                      Enviar Encomenda 🎉
                    </button>
                  </div>
                </form>
              )}
            </div>
          </RevealWrapper>
        </div>
      </main>
      <Footer />
    </>
  )
}
