import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'rose' | 'outline' | 'ghost' | 'white'
type Size    = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  rose:
    'bg-rose text-white shadow-[0_4px_20px_rgba(196,86,107,0.28)] hover:bg-rose-deep hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(196,86,107,0.36)]',
  outline:
    'bg-transparent text-white border border-white/55 backdrop-blur-sm hover:bg-white/15 hover:border-white/85',
  ghost:
    'bg-white text-rose border border-border hover:bg-rose-pale hover:border-rose-light',
  white:
    'bg-white text-rose-deep font-semibold shadow-[0_8px_32px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.22)]',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-8 py-3 text-[0.95rem]',
  lg: 'px-10 py-4 text-base',
}

interface BaseProps {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>  & { as: 'a' }

type Props = ButtonProps | AnchorProps

/**
 * Button — componente de botão polimórfico (renderiza <button> ou <a>).
 *
 * @example
 * <Button variant="rose" size="md" as="a" href="#contato">Encomendar</Button>
 * <Button variant="ghost" onClick={handleClick}>Cancelar</Button>
 */
export function Button({ variant = 'rose', size = 'md', children, className, as, ...rest }: Props) {
  const base = cn(
    'inline-flex items-center gap-2 rounded-full font-body font-medium',
    'transition-all duration-300 cursor-pointer select-none',
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  if (as === 'a') {
    return (
      <a className={base} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button className={base} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
