/**
 * cn — combina classes CSS condicionalmente (similar ao clsx/cva)
 * Uso: cn('base', condition && 'extra', { active: isActive })
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
