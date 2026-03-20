import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { RevealWrapper, LabelTag, SectionHead } from '@/components/ui/index'
import { cn } from '@/utils/cn'
import { usePhoneMask } from '@/hooks/usePhoneMask'
import { sendOrderForm } from '@/services/emailService'
import {
  encomendaSchema,
  EncomendaFormData,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
} from '@/schemas/encomendaSchema'

const STEPS = [
  { id: 1, label: 'Seus Dados', schema: step1Schema },
  { id: 2, label: 'Seu Pedido', schema: step2Schema },
  { id: 3, label: 'Personalização', schema: step3Schema },
  { id: 4, label: 'Confirmação', schema: step4Schema },
]

const FLAVORS = ['Chocolate Belga', 'Ninho com Morango', 'Doce de Leite', 'Red Velvet', 'Pistache', 'Limão Siciliano']
const RESTRICTIONS = ['Sem restrição', 'Sem Glúten', 'Vegano', 'Sem Lactose']
const STORAGE_KEY = 'doces_paixao_encomenda_data'

export default function EncomendaPage() {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const phoneMask = usePhoneMask()

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<EncomendaFormData>({
    resolver: zodResolver(encomendaSchema),
    mode: 'onBlur',
    defaultValues: JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}'),
  })

  const formData = useWatch({ control })

  // Persistence
  useEffect(() => {
    if (control._names.mount.size > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    }
    return () => {}
  }, [formData, control])

  // Initial phone mask sync
  useEffect(() => {
    const savedData = sessionStorage.getItem(STORAGE_KEY)
    if (savedData) {
      const parsed = JSON.parse(savedData)
      if (parsed.phone) phoneMask.onChange({ target: { value: parsed.phone } } as any)
    }
  }, [])

  // Update form field when mask changes
  useEffect(() => {
    setValue('phone', phoneMask.value, { shouldValidate: true })
  }, [phoneMask.value, setValue])

  const nextStep = async () => {
    const currentStepFields = STEPS[step - 1].id === 1 ? ['name', 'email', 'phone'] :
                              STEPS[step - 1].id === 2 ? ['productType', 'quantity', 'eventDate', 'theme'] :
                              STEPS[step - 1].id === 3 ? ['flavors', 'restrictions', 'message'] :
                              ['termsAccepted']
    
    const isValid = await trigger(currentStepFields as any)
    if (isValid) setStep((s) => Math.min(s + 1, 4))
  }

  const prevStep = () => setStep((s) => Math.max(s - 1, 1))

  const onSubmit = async (data: EncomendaFormData) => {
    setStatus('loading')
    try {
      await sendOrderForm(data)
      setStatus('success')
      sessionStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-canvas px-7 pt-28 text-center">
          <div className="text-6xl animate-bounce">🎉</div>
          <h1 className="font-display text-[2.4rem] font-bold text-ink">Encomenda Recebida!</h1>
          <p className="max-w-md text-muted leading-relaxed">
            Obrigada por escolher a <strong>Doces Paixão</strong>! Em breve entraremos em contato pelo WhatsApp para confirmar os detalhes e combinar a entrega.
          </p>
          <Link
            to="/"
            className="mt-4 rounded-2xl bg-rose px-10 py-4 font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-rose-deep"
          >
            Voltar ao Início
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 2) // Changed from 7 to 2
  const minDateStr = minDate.toISOString().split('T')[0]

  const getQuantityPlaceholder = () => {
    const type = formData.productType
    if (type === 'Bolo') return 'Ex: 1kg, 2kg, 1,5kg'
    if (type === 'Docinhos') return 'Ex: 1 cento, 2 centos, 50 unidades'
    if (type === 'Cupcakes' || type === 'Torta' || type === 'Especial') return 'Ex: 2 unidades'
    return 'Ex: 1kg, 1 cento...'
  }

  const handleRestrictionChange = (r: string) => {
    const current = getValues('restrictions') || []
    if (r === 'Sem restrição') {
      setValue('restrictions', ['Sem restrição'], { shouldValidate: true })
    } else {
      const next = current.includes(r)
        ? current.filter((x) => x !== r)
        : [...current.filter((x) => x !== 'Sem restrição'), r]
      setValue('restrictions', next, { shouldValidate: true })
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-canvas pt-28">
        <div className="container mx-auto max-w-[800px] px-7 py-16">
          <RevealWrapper>
            <SectionHead
              tag={<LabelTag>📦 Nova Encomenda</LabelTag>}
              title={<>Crie seu <em className="italic text-rose">Momento Doces</em></>}
              subtitle="Preencha as informações abaixo para iniciarmos seu pedido personalizado."
              center
            />
          </RevealWrapper>

          {/* Progress Bar */}
          <div className="mb-12 mt-10">
            <div className="flex justify-between relative before:absolute before:top-5 before:left-0 before:h-[2px] before:w-full before:bg-border before:-z-10">
              {STEPS.map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-2 group">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 bg-white border-2',
                      step === s.id ? 'border-rose bg-rose text-white shadow-[0_0_15px_rgba(196,86,107,0.4)]' :
                      step > s.id ? 'border-mint-deep bg-mint-deep text-white' : 'border-border text-muted'
                    )}
                  >
                    {step > s.id ? <i className="fas fa-check" /> : s.id}
                  </div>
                  <span className={cn('text-[0.7rem] font-bold uppercase tracking-widest transition-colors', step >= s.id ? 'text-ink' : 'text-muted')}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-border-soft">
              <div 
                className="h-full bg-rose transition-all duration-700 ease-out shadow-[0_0_10px_rgba(196,86,107,0.3)]" 
                style={{ width: `${((step - 1) / 3) * 100}%` }} 
              />
            </div>
          </div>

          <RevealWrapper className="rounded-[32px] border border-border-soft bg-white p-6 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <form onSubmit={handleSubmit(onSubmit)}>
              
              {/* Step 1: Seus Dados */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[0.85rem] font-bold text-ink">Nome completo</label>
                      <input 
                        {...register('name')}
                        placeholder="Ex: Maria Silva" 
                        className={cn('w-full rounded-2xl border border-border bg-canvas px-5 py-3.5 outline-none transition-all focus:border-rose focus:ring-4 focus:ring-rose/5', errors.name && 'border-rose-light bg-rose-pale/30')}
                      />
                      {errors.name && <p className="text-[0.75rem] font-medium text-rose">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[0.85rem] font-bold text-ink">Telefone / WhatsApp</label>
                      <input 
                        placeholder="(00) 00000-0000"
                        value={phoneMask.value}
                        onChange={phoneMask.onChange}
                        className={cn('w-full rounded-2xl border border-border bg-canvas px-5 py-3.5 outline-none transition-all focus:border-rose focus:ring-4 focus:ring-rose/5', errors.phone && 'border-rose-light bg-rose-pale/30')}
                      />
                      {errors.phone && <p className="text-[0.75rem] font-medium text-rose">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.85rem] font-bold text-ink">E-mail</label>
                    <input 
                      {...register('email')}
                      placeholder="seu@email.com" 
                      className={cn('w-full rounded-2xl border border-border bg-canvas px-5 py-3.5 outline-none transition-all focus:border-rose focus:ring-4 focus:ring-rose/5', errors.email && 'border-rose-light bg-rose-pale/30')}
                    />
                    {errors.email && <p className="text-[0.75rem] font-medium text-rose">{errors.email.message}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Seu Pedido */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[0.85rem] font-bold text-ink">Tipo de Produto</label>
                      <select 
                        {...register('productType')}
                        className={cn('w-full appearance-none rounded-2xl border border-border bg-canvas px-5 py-3.5 outline-none transition-all focus:border-rose focus:ring-4 focus:ring-rose/5', errors.productType && 'border-rose-light bg-rose-pale/30')}
                      >
                        <option value="">Selecione...</option>
                        {['Bolo', 'Cupcakes', 'Docinhos', 'Torta', 'Especial'].map(o => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                      {errors.productType && <p className="text-[0.75rem] font-medium text-rose">{errors.productType.message}</p>}
                    </div>
                    <div className="space-y-2">
                    <label className="text-[0.85rem] font-bold text-ink">Quantidade</label>
                      <input 
                        type="text"
                        {...register('quantity')}
                        placeholder={getQuantityPlaceholder()}
                        className={cn('w-full rounded-2xl border border-border bg-canvas px-5 py-3.5 outline-none transition-all focus:border-rose focus:ring-4 focus:ring-rose/5', errors.quantity && 'border-rose-light bg-rose-pale/30')}
                      />
                      {errors.quantity && <p className="text-[0.75rem] font-medium text-rose">{errors.quantity.message}</p>}
                    </div>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[0.85rem] font-bold text-ink">Data do Evento (Mín. 2 dias)</label>
                      <input 
                        type="date"
                        min={minDateStr}
                        {...register('eventDate')}
                        className={cn('w-full rounded-2xl border border-border bg-canvas px-5 py-3.5 outline-none transition-all focus:border-rose focus:ring-4 focus:ring-rose/5', errors.eventDate && 'border-rose-light bg-rose-pale/30')}
                      />
                      {errors.eventDate && <p className="text-[0.75rem] font-medium text-rose">{errors.eventDate.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[0.85rem] font-bold text-ink">Tema / Ocasião</label>
                      <input 
                        {...register('theme')}
                        placeholder="Ex: Aniversário 1 ano, Casamento..." 
                        className={cn('w-full rounded-2xl border border-border bg-canvas px-5 py-3.5 outline-none transition-all focus:border-rose focus:ring-4 focus:ring-rose/5', errors.theme && 'border-rose-light bg-rose-pale/30')}
                      />
                      {errors.theme && <p className="text-[0.75rem] font-medium text-rose">{errors.theme.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Personalização */}
              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-3">
                    <label className="text-[0.85rem] font-bold text-ink">Sabores Preferidos</label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {FLAVORS.map(flavor => (
                        <label key={flavor} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-canvas px-4 py-3 transition-all hover:border-rose-light has-[:checked]:border-rose has-[:checked]:bg-rose-pale/30">
                          <input type="checkbox" value={flavor} {...register('flavors')} className="h-4 w-4 rounded accent-rose" />
                          <span className="text-[0.82rem] font-medium text-ink-soft">{flavor}</span>
                        </label>
                      ))}
                    </div>
                    {errors.flavors && <p className="text-[0.75rem] font-medium text-rose">{errors.flavors.message}</p>}
                  </div>

                  <div className="space-y-3">
                    <label className="text-[0.85rem] font-bold text-ink">Restrições Alimentares</label>
                    <div className="flex flex-wrap gap-3">
                      {RESTRICTIONS.map(r => (
                        <label key={r} className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-canvas px-4 py-2 transition-all hover:border-mint-soft has-[:checked]:border-mint-deep has-[:checked]:bg-mint-pale">
                          <input 
                            type="checkbox" 
                            value={r} 
                            checked={formData.restrictions?.includes(r)}
                            onChange={() => handleRestrictionChange(r)}
                            className="h-4 w-4 rounded accent-mint-deep" 
                          />
                          <span className="text-[0.82rem] font-medium text-ink-soft">{r}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[0.85rem] font-bold text-ink">Mensagem na embalagem (Máx. 100 chars)</label>
                    <textarea 
                      {...register('message')}
                      placeholder="Deixe uma mensagem carinhosa..."
                      className="w-full resize-none rounded-2xl border border-border bg-canvas px-5 py-3.5 outline-none transition-all focus:border-rose focus:ring-4 focus:ring-rose/5"
                    />
                    {errors.message && <p className="text-[0.75rem] font-medium text-rose">{errors.message.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[0.85rem] font-bold text-ink">Imagem de Referência (Opcional)</label>
                    <input type="file" className="w-full text-sm text-muted block file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-pale file:text-rose hover:file:bg-rose-pale/80" />
                  </div>
                </div>
              )}

              {/* Step 4: Revisão */}
              {step === 4 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="rounded-2xl bg-canvas p-6 space-y-4 border border-border">
                    <h3 className="font-bold text-ink uppercase tracking-wider text-[0.75rem]">Resumo do Pedido</h3>
                    <div className="grid gap-4 sm:grid-cols-2 text-[0.88rem]">
                      <div>
                        <p className="text-muted text-[0.7rem] uppercase font-bold">Contato</p>
                        <p className="text-ink font-medium">{formData.name}</p>
                        <p className="text-ink-soft">{formData.phone} • {formData.email}</p>
                      </div>
                      <div>
                        <p className="text-muted text-[0.7rem] uppercase font-bold">Produto</p>
                        <p className="text-ink font-medium">{formData.productType} ({formData.quantity}x)</p>
                        <p className="text-ink-soft">{formData.theme} • {formData.eventDate}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-muted text-[0.7rem] uppercase font-bold">Personalização</p>
                        <p className="text-ink-soft">
                          <span className="font-medium text-ink">Sabores:</span> {formData.flavors?.join(', ') || 'Nenhum'}
                        </p>
                        {(formData.restrictions?.length ?? 0) > 0 && (
                          <p className="text-ink-soft">
                            <span className="font-medium text-ink">Restrições:</span> {formData.restrictions?.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <label className="flex cursor-pointer items-start gap-4">
                    <input type="checkbox" {...register('termsAccepted')} className="mt-1 h-5 w-5 rounded border-border accent-rose" />
                    <span className="text-[0.85rem] leading-relaxed text-muted">
                      Aceito que a encomenda está sujeita a confirmação via WhatsApp e que a data solicitada pode ser alterada conforme disponibilidade.
                    </span>
                  </label>
                  {errors.termsAccepted && <p className="text-[0.75rem] font-medium text-rose">{errors.termsAccepted.message}</p>}

                  {status === 'error' && (
                    <div className="rounded-xl bg-rose-pale p-4 text-center text-[0.85rem] text-rose font-medium">
                      <i className="fas fa-exclamation-circle mr-2" /> Erro ao processar envio. Tente novamente ou entre em contato pelo IG/WhatsApp.
                    </div>
                  )}
                </div>
              )}

              {/* Step Buttons */}
              <div className="mt-10 flex gap-4 pt-6 border-t border-border-soft">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 rounded-2xl border border-border py-4 font-bold text-muted transition-all hover:bg-canvas hover:text-ink active:scale-95"
                  >
                    ← Voltar
                  </button>
                )}
                
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-[2] rounded-2xl bg-rose py-4 font-bold text-white shadow-md transition-all hover:-translate-y-1 hover:bg-rose-deep active:scale-95"
                  >
                    Próxima Etapa →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex-[2] rounded-2xl bg-mint-deep py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-mint-deep/90 disabled:opacity-50 active:scale-95"
                  >
                    {status === 'loading' ? (
                      <><i className="fas fa-spinner animate-spin mr-2" /> Enviando...</>
                    ) : (
                      <>Confirmar Encomenda 🎉</>
                    )}
                  </button>
                )}
              </div>

            </form>
          </RevealWrapper>

          <p className="mt-8 text-center text-[0.8rem] text-muted">
            Dúvidas? <a href="#" className="font-bold text-rose underline underline-offset-4">Fale conosco pelo WhatsApp</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
