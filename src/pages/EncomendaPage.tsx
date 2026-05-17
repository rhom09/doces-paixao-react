import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RevealWrapper, LabelTag, SectionHead } from '@/components/ui/index'
import { CakePreview } from '@/components/ui/CakePreview'
import { getWhatsAppLink, getOrderWhatsAppLink } from '@/utils/whatsapp'
import { cn } from '@/utils/cn'
import { usePhoneMask } from '@/hooks/usePhoneMask'
import { useSanity } from '@/hooks/useSanity'
import { ALL_PRODUCT_TYPES_QUERY, ALL_FLAVORS_QUERY } from '@/lib/queries'
import { sendOrderForm } from '@/services/emailService'
import { SanityProductType, SanityFlavor } from '@/types'
import {
  RESTRICTION_ICONS,
  getFlavorColor,
} from '@/utils/cakeVisuals'
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

const SABORES_BOLO = [
  'Chocolate Belga',
  'Ninho com Morango',
  'Doce de Leite',
  'Red Velvet',
  'Pistache',
  'Limão Siciliano'
]
const SABORES_DOCINHOS = [
  'Brigadeiro',
  'Bicho de Pé',
  'Beijinho',
  'Ninho com Nutella',
  'Coco Queimado',
  'Paçoca'
]
const RESTRICTIONS = Object.keys(RESTRICTION_ICONS)
const STORAGE_KEY = 'doces_paixao_encomenda_data'

export default function EncomendaPage() {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const phoneMask = usePhoneMask()

  const { data: sanProductTypes } = useSanity<SanityProductType[]>(ALL_PRODUCT_TYPES_QUERY)
  const { data: sanFlavors } = useSanity<SanityFlavor[]>(ALL_FLAVORS_QUERY)

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

  const productTypes = sanProductTypes && sanProductTypes.length > 0
    ? sanProductTypes
    : [
        { id: '1', name: 'Bolo', emoji: '🎂', quickQuantities: ['1kg', '1,5kg', '2kg', '3kg'] },
        { id: '2', name: 'Docinhos', emoji: '🍫', quickQuantities: ['50 un', '1 cento', '2 centos'] }
      ]

  const flavors = sanFlavors && sanFlavors.length > 0
    ? sanFlavors
    : [
        ...SABORES_BOLO.map((name, i) => ({ id: `b-${i}`, name, category: 'bolo' as const, color: getFlavorColor(name) })),
        ...SABORES_DOCINHOS.map((name, i) => ({ id: `d-${i}`, name, category: 'docinhos' as const, color: getFlavorColor(name) }))
      ]

  const activeFlavors = flavors.filter((f: SanityFlavor) =>
    formData.productType === 'Docinhos' ? f.category === 'docinhos' : f.category === 'bolo'
  )

  const quickQuantities = productTypes.find((p: SanityProductType) => p.name === formData.productType)?.quickQuantities || []

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
                              STEPS[step - 1].id === 2 ? ['productType', 'quantity', 'eventDate'] :
                              STEPS[step - 1].id === 3 ? ['flavors', 'restrictions', 'message'] :
                              ['termsAccepted']

    const isValid = await trigger(currentStepFields as any)
    if (isValid) setStep((s) => Math.min(s + 1, 4))
  }

  const prevStep = () => setStep((s) => Math.max(s - 1, 1))

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('Imagem muito grande. Máximo 5MB.')
      return
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Apenas JPG, PNG ou WEBP são aceitos.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
      setValue('image', reader.result as string) // Save base64 to form
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = async (data: EncomendaFormData) => {
    setStatus('loading')
    try {
      await sendOrderForm(data)

      // Open WhatsApp after email is successfully sent
      const whatsappLink = getOrderWhatsAppLink(data)
      window.open(whatsappLink, '_blank')

      setStatus('success')
      sessionStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
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
    )
  }

  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 2)
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
    <div className="min-h-screen bg-canvas pt-28">
      <div className="container mx-auto max-w-[1180px] px-6 py-12">
          <RevealWrapper>
            <SectionHead
              tag={<LabelTag>📦 Nova Encomenda</LabelTag>}
              title={<>Crie seu <em className="italic text-rose">Momento Doces</em></>}
              subtitle="Preencha as informações abaixo para iniciarmos seu pedido personalizado."
              center
            />
          </RevealWrapper>

          {/* Progress Bar */}
          <div className="mx-auto mb-12 mt-10 max-w-[800px]">
            <div className="flex justify-between relative before:absolute before:top-5 before:left-0 before:h-[2px] before:w-full before:bg-border before:-z-10">
              {STEPS.map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-2 group">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 border-2',
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

          <div className="grid gap-8 lg:grid-cols-[1fr_350px] items-start">
            <RevealWrapper className="rounded-[32px] border border-border-soft bg-white p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <form onSubmit={handleSubmit(onSubmit)}>

                {/* Step 1: Seus Dados */}
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="font-display text-2xl text-ink mb-6">Informações de Contato</h3>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-[0.85rem] font-bold text-ink uppercase tracking-tighter">Nome completo</label>
                        <input
                          {...register('name')}
                          placeholder="Ex: Maria Silva"
                          className={cn('w-full rounded-2xl border border-border bg-canvas px-5 py-3.5 outline-none transition-all focus:border-rose focus:ring-4 focus:ring-rose/5', errors.name && 'border-rose-light bg-rose-pale/30')}
                        />
                        {errors.name && <p className="text-[0.75rem] font-medium text-rose">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.85rem] font-bold text-ink uppercase tracking-tighter">Telefone / WhatsApp</label>
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
                      <label className="text-[0.85rem] font-bold text-ink uppercase tracking-tighter">E-mail</label>
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
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <label className="text-[0.85rem] font-bold text-ink uppercase tracking-tighter mb-4 block">O que você deseja encomendar?</label>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 max-w-[500px]">
                        {productTypes.map((type: SanityProductType) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => {
                              setValue('productType', type.name as any, { shouldValidate: true })
                              setValue('flavors', [], { shouldValidate: false })
                            }}
                            className={cn(
                              'flex flex-col items-center gap-3 rounded-3xl border-2 p-5 transition-all duration-300',
                              'hover:scale-105 hover:shadow-md',
                              formData.productType === type.name
                                ? 'border-rose bg-rose-pale/30 shadow-[0_0_15px_rgba(196,86,107,0.2)]'
                                : 'border-border bg-canvas hover:border-rose-light'
                            )}
                          >
                            <div className="text-4xl filter drop-shadow-sm">{type.emoji}</div>
                            <span className="font-display text-lg font-semibold text-ink">{type.name}</span>
                          </button>
                        ))}
                      </div>
                      {errors.productType && <p className="mt-2 text-[0.75rem] font-medium text-rose">{errors.productType.message}</p>}
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2">
                      <div className="space-y-3">
                        <label className="text-[0.85rem] font-bold text-ink uppercase tracking-tighter">Quantidade</label>
                        {quickQuantities.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {quickQuantities.map((qty: string) => (
                              <button
                                key={qty}
                                type="button"
                                onClick={() => setValue('quantity', qty, { shouldValidate: true })}
                                className={cn(
                                  'rounded-full border px-3 py-1.5 text-[0.75rem] font-bold transition-all',
                                  formData.quantity === qty
                                    ? 'border-rose bg-rose text-white'
                                    : 'border-border bg-white text-muted hover:border-rose-light hover:text-rose'
                                )}
                              >
                                {qty}
                              </button>
                            ))}
                          </div>
                        )}
                        <input
                          type="text"
                          {...register('quantity')}
                          placeholder={getQuantityPlaceholder()}
                          className={cn('w-full rounded-2xl border border-border bg-canvas px-5 py-3.5 outline-none transition-all focus:border-rose focus:ring-4 focus:ring-rose/5', errors.quantity && 'border-rose-light bg-rose-pale/30')}
                        />
                        {errors.quantity && <p className="text-[0.75rem] font-medium text-rose">{errors.quantity.message}</p>}
                      </div>

                      <div className="space-y-3">
                        <label className="text-[0.85rem] font-bold text-ink uppercase tracking-tighter">Data do Evento</label>
                        <input
                          type="date"
                          min={minDateStr}
                          {...register('eventDate')}
                          className={cn('w-full rounded-2xl border border-border bg-canvas px-5 py-3.5 outline-none transition-all focus:border-rose focus:ring-4 focus:ring-rose/5', errors.eventDate && 'border-rose-light bg-rose-pale/30')}
                        />
                        {errors.eventDate && <p className="text-[0.75rem] font-medium text-rose">{errors.eventDate.message}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Personalização */}
                {step === 3 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-4">
                      <label className="text-[0.85rem] font-bold text-ink uppercase tracking-tighter">Escolha os Sabores</label>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {activeFlavors.map((flavor: SanityFlavor) => (
                          <label
                            key={flavor.id}
                            className={cn(
                              'flex flex-col items-center gap-3 rounded-2xl border-2 p-4 cursor-pointer transition-all duration-300',
                              'hover:scale-105',
                              formData.flavors?.includes(flavor.name)
                                ? 'border-rose bg-rose-pale/30 shadow-md'
                                : 'border-border bg-canvas hover:border-rose-light'
                            )}
                          >
                            <div
                              className="h-10 w-10 rounded-full shadow-inner border border-black/5"
                              style={{ backgroundColor: flavor.color }}
                            />
                            <span className="text-[0.82rem] font-bold text-ink text-center leading-tight">{flavor.name}</span>
                            <input type="checkbox" value={flavor.name} {...register('flavors')} className="hidden" />
                          </label>
                        ))}
                      </div>
                      {errors.flavors && <p className="text-[0.75rem] font-medium text-rose">{errors.flavors.message}</p>}
                    </div>

                    <div className="space-y-4">
                      <label className="text-[0.85rem] font-bold text-ink uppercase tracking-tighter">Restrições Alimentares</label>
                      <div className="flex flex-wrap gap-3">
                        {RESTRICTIONS.map(r => (
                          <label
                            key={r}
                            className={cn(
                              'flex cursor-pointer items-center gap-3 rounded-full border-2 px-5 py-2.5 transition-all duration-300',
                              'hover:border-mint-soft',
                              formData.restrictions?.includes(r)
                                ? 'border-mint-deep bg-mint-pale shadow-sm'
                                : 'border-border bg-canvas'
                            )}
                          >
                            <span className="text-xl">{RESTRICTION_ICONS[r]}</span>
                            <span className="text-[0.82rem] font-bold text-ink-soft uppercase tracking-tighter">{r}</span>
                            <input
                              type="checkbox"
                              value={r}
                              checked={formData.restrictions?.includes(r)}
                              onChange={() => handleRestrictionChange(r)}
                              className="hidden"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[0.85rem] font-bold text-ink uppercase tracking-tighter">Mensagem na embalagem (Máx. 100 chars)</label>
                      <textarea
                        {...register('message')}
                        placeholder="Deixe uma mensagem carinhosa..."
                        className="w-full h-24 resize-none rounded-2xl border border-border bg-canvas px-5 py-3.5 outline-none transition-all focus:border-rose focus:ring-4 focus:ring-rose/5"
                      />
                      {errors.message && <p className="text-[0.75rem] font-medium text-rose">{errors.message.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[0.85rem] font-bold text-ink uppercase tracking-tighter">Imagem de Referência (Opcional)</label>
                      <div className="rounded-2xl border-2 border-dashed border-border p-6 text-center transition-colors hover:bg-canvas relative overflow-hidden">
                        <input type="file" className="hidden" id="file-upload" accept="image/*" onChange={handleImageChange} />
                        {!imagePreview ? (
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <i className="fas fa-cloud-upload-alt text-2xl text-rose mb-2 block" />
                            <span className="text-sm font-medium text-muted block">Clique para enviar uma foto de inspiração</span>
                            <small className="text-[0.7rem] text-muted/60 uppercase font-bold mt-1 block">JPG, PNG até 5MB</small>
                          </label>
                        ) : (
                          <div className="space-y-4">
                            <img src={imagePreview} alt="Referência" className="mx-auto max-h-40 rounded-xl shadow-md" />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null)
                                setValue('image', undefined)
                              }}
                              className="text-xs font-bold text-rose uppercase tracking-widest hover:underline"
                            >
                              Remover Imagem
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Revisão */}
                {step === 4 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="font-display text-2xl text-ink">Quase lá! Revise seu pedido</h3>
                    <div className="rounded-2xl bg-canvas p-6 space-y-5 border border-border">
                      <div className="grid gap-6 sm:grid-cols-2 text-[0.88rem]">
                        <div className="space-y-4">
                          <div>
                            <p className="text-muted text-[0.7rem] uppercase font-bold tracking-widest mb-1">Contato</p>
                            <p className="text-ink font-bold text-lg">{formData.name}</p>
                            <p className="text-ink-soft">{formData.phone}</p>
                            <p className="text-ink-soft">{formData.email}</p>
                          </div>
                          <div>
                            <p className="text-muted text-[0.7rem] uppercase font-bold tracking-widest mb-1">Data e Ocasião</p>
                            <p className="text-ink font-semibold">{formData.eventDate ? new Date(formData.eventDate).toLocaleDateString('pt-BR') : '—'}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-muted text-[0.7rem] uppercase font-bold tracking-widest mb-1">Pedido Principal</p>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{productTypes.find((p: SanityProductType) => p.name === formData.productType)?.emoji || '🎂'}</span>
                              <p className="text-ink font-bold text-lg">{formData.productType}</p>
                            </div>
                            <p className="text-ink-soft">Quantidade: <span className="font-semibold">{formData.quantity}</span></p>
                          </div>
                          <div>
                            <p className="text-muted text-[0.7rem] uppercase font-bold tracking-widest mb-1">Personalização</p>
                            <p className="text-ink-soft">
                              <span className="font-medium text-ink">Sabores:</span> {formData.flavors?.join(', ') || 'A combinar'}
                            </p>
                            {(formData.restrictions?.length ?? 0) > 0 && (
                              <p className="text-ink-soft mt-1">
                                <span className="font-medium text-ink">Restrições:</span> {formData.restrictions?.join(', ')}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <label className="flex cursor-pointer items-start gap-4 p-4 rounded-2xl bg-rose-pale/20 border border-rose-pale transition-all hover:bg-rose-pale/40">
                      <input type="checkbox" {...register('termsAccepted')} className="mt-1.5 h-5 w-5 rounded border-border accent-rose" />
                      <span className="text-[0.85rem] leading-relaxed text-muted">
                        Entendo que esta é uma <strong>solicitação de orçamento</strong>. Minha encomenda só será confirmada após o contato da equipe via WhatsApp e validação da disponibilidade para a data.
                      </span>
                    </label>
                    {errors.termsAccepted && <p className="text-[0.75rem] font-medium text-rose">{errors.termsAccepted.message}</p>}

                    {status === 'error' && (
                      <div className="rounded-xl bg-rose-pale p-4 text-center text-[0.85rem] text-rose font-medium">
                        <i className="fas fa-exclamation-circle mr-2" /> Erro ao processar envio. Tente novamente ou entre em contato pelo Instagram.
                      </div>
                    )}
                  </div>
                )}

                {/* Step Buttons */}
                <div className="mt-10 flex gap-4 pt-8 border-t border-border-soft">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 rounded-2xl border-2 border-border py-4 font-bold text-muted transition-all hover:bg-canvas hover:text-ink active:scale-95"
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
                        <>Finalizar Solicitação 🎉</>
                      )}
                    </button>
                  )}
                </div>

              </form>
            </RevealWrapper>

            {/* Sidebar Preview */}
            <aside className="hidden lg:block">
              <CakePreview
                productType={formData.productType}
                quantity={formData.quantity}
                flavors={formData.flavors}
                customColor={flavors.find((f: SanityFlavor) => f.name === formData.flavors?.[0])?.color}
              />
            </aside>

            {/* Mobile Preview Area */}
            <div className="lg:hidden">
              <CakePreview
                productType={formData.productType}
                quantity={formData.quantity}
                flavors={formData.flavors}
                customColor={flavors.find((f: SanityFlavor) => f.name === formData.flavors?.[0])?.color}
                className="static top-0"
              />
            </div>
          </div>

          <p className="mt-12 text-center text-[0.85rem] text-muted">
            Deseja um projeto exclusivo? <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="font-bold text-rose hover:underline underline-offset-4">Fale diretamente com nossa Cake Designer</a>
          </p>
        </div>
      </div>
    )
}
