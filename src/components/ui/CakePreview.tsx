import { cn } from '@/utils/cn'
import { getCakeSize, getFlavorColor, getProductEmoji } from '@/utils/cakeVisuals'

interface CakePreviewProps {
  productType?: string
  quantity?: string
  flavors?: string[]
  customColor?: string
  className?: string
}

export function CakePreview({ productType, quantity, flavors, customColor, className }: CakePreviewProps) {
  const size = getCakeSize(quantity || '')
  const color = customColor || getFlavorColor(flavors?.[0])
  const emoji = getProductEmoji(productType)

  return (
    <div className={cn(
      'sticky top-24 flex flex-col items-center gap-6 rounded-[32px] border border-border-soft bg-white p-8 shadow-lg transition-all duration-500',
      className
    )}>
      <div className="text-center">
        <h3 className="font-display text-[1.4rem] font-bold text-ink">Preview do Pedido</h3>
        <p className="text-[0.8rem] text-muted uppercase tracking-widest font-bold mt-1">Visualização Ilustrativa</p>
      </div>

      <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-canvas shadow-inner">
        {/* Decorative Background */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-rose-pale opacity-50 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-mint-pale opacity-40 blur-2xl" />

        <div className="relative flex flex-col items-center gap-1 transition-all duration-700 ease-out">

          {/* Product Symbol or Cake Illustration */}
          {productType === 'Bolo' || productType === 'Torta' ? (
            <div className="flex flex-col items-center gap-1">
              {/* Topping / Frosting */}
              <div
                className={cn(
                  'rounded-t-full transition-all duration-700 shadow-sm border-b border-black/5',
                  size === 'small' && 'h-8 w-28',
                  size === 'medium' && 'h-10 w-36',
                  size === 'large' && 'h-12 w-44'
                )}
                style={{ backgroundColor: color }}
              />

              {/* Cake Body */}
              <div
                className={cn(
                  'bg-white transition-all duration-700 shadow-sm border-x border-border-soft',
                  size === 'small' && 'h-14 w-32',
                  size === 'medium' && 'h-18 w-40',
                  size === 'large' && 'h-22 w-48'
                )}
              />

              {/* Base / Cake Stand */}
              <div
                className={cn(
                  'rounded-b-xl transition-all duration-700 bg-peach-deep/20 border-t border-peach/30 shadow-md',
                  size === 'small' && 'h-3 w-36',
                  size === 'medium' && 'h-4 w-44',
                  size === 'large' && 'h-5 w-52'
                )}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center animate-in zoom-in duration-700">
              <div className="text-[6rem] drop-shadow-xl filter grayscale-[0.2]">
                {emoji}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Card */}
      <div className="w-full space-y-3 rounded-2xl bg-canvas p-5 border border-border-soft">
        <div className="flex justify-between items-center border-b border-border-soft pb-2">
          <span className="text-[0.7rem] font-bold text-muted uppercase">Tipo</span>
          <span className="text-[0.9rem] font-semibold text-ink">{productType || '—'}</span>
        </div>
        <div className="flex justify-between items-center border-b border-border-soft pb-2">
          <span className="text-[0.7rem] font-bold text-muted uppercase">Tamanho</span>
          <span className="text-[0.9rem] font-semibold text-ink">{quantity || '—'}</span>
        </div>
        <div className="space-y-1">
          <span className="text-[0.7rem] font-bold text-muted uppercase">Sabor Principal</span>
          <div className="flex items-center gap-2">
             <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
             <span className="text-[0.9rem] font-semibold text-ink">{flavors?.[0] || '—'}</span>
          </div>
        </div>
      </div>

      <p className="text-center text-[0.75rem] italic text-muted/80 leading-relaxed px-4">
        As cores e decorações no preview são automáticas para ajudar na visualização.
      </p>
    </div>
  )
}
