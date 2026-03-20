import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

// ─────────────────────────────────────────────────────────────
// LabelTag
// ─────────────────────────────────────────────────────────────
interface LabelTagProps {
  children: ReactNode
  variant?: 'rose' | 'mint'
  className?: string
}

export function LabelTag({ children, variant = 'rose', className }: LabelTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5',
        'font-body text-xs font-semibold uppercase tracking-widest',
        variant === 'rose'
          ? 'border-rose-light bg-rose-pale text-rose'
          : 'border-mint-light bg-mint-pale text-mint-deep',
        className
      )}
    >
      {children}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────
// SectionHead
// ─────────────────────────────────────────────────────────────
interface SectionHeadProps {
  tag?: ReactNode
  title: ReactNode
  subtitle?: string
  center?: boolean
  dark?: boolean
  className?: string
}

export function SectionHead({
  tag,
  title,
  subtitle,
  center = false,
  dark = false,
  className,
}: SectionHeadProps) {
  return (
    <div
      className={cn(
        'mb-16',
        center && 'text-center',
        className
      )}
    >
      {tag && <div className="mb-4">{tag}</div>}
      <h2
        className={cn(
          'font-display text-[clamp(2rem,4vw,3rem)] font-semibold -tracking-[0.01em]',
          dark ? 'text-white' : 'text-ink'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-3.5 max-w-[520px] text-[1.05rem]',
            dark ? 'text-white/50' : 'text-muted',
            center && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// RevealWrapper — aplica classe CSS de animação via Intersection Observer
// ─────────────────────────────────────────────────────────────
import { useScrollReveal } from '@/hooks/useScrollReveal'

type RevealDirection = 'up' | 'left' | 'right'

interface RevealWrapperProps {
  children: ReactNode
  direction?: RevealDirection
  delay?: number // ms (0, 80, 160, 240, 320, 400, 480)
  className?: string
  as?: keyof JSX.IntrinsicElements
}

const directionClass: Record<RevealDirection, string> = {
  up:    'reveal',
  left:  'reveal-left',
  right: 'reveal-right',
}

export function RevealWrapper({
  children,
  direction = 'up',
  delay = 0,
  className,
  as: Tag = 'div',
}: RevealWrapperProps) {
  const scrollRef = useScrollReveal()
  const ref = scrollRef as any
  const Component = Tag as any

  return (
    <Component
      ref={ref}
      className={cn(directionClass[direction], className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  )
}

// ─────────────────────────────────────────────────────────────
// Stars — exibe estrelas cheias, meia e vazia
// ─────────────────────────────────────────────────────────────
interface StarsProps {
  rating: number // ex: 4.5
}

export function Stars({ rating }: StarsProps) {
  return (
    <div className="mb-3.5 flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const full = i <= Math.floor(rating)
        const half = !full && i === Math.ceil(rating) && rating % 1 !== 0
        return (
          <i
            key={i}
            className={cn(
              'text-[0.85rem] text-[#f5c518]',
              full ? 'fas fa-star' : half ? 'fas fa-star-half-alt' : 'far fa-star'
            )}
          />
        )
      })}
    </div>
  )
}
