import { useCounter } from '@/hooks/useCounter'
import { RevealWrapper } from '@/components/ui/index'
import { STATS } from '@/data/stats'
import type { Stat } from '@/types'
import { cn } from '@/utils/cn'

// ── StatItem ─────────────────────────────────────────────────
function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const { value, ref } = useCounter<HTMLDivElement>(stat.counterTarget ?? 0)
  const display = stat.counterTarget != null
    ? value.toLocaleString('pt-BR') + (stat.suffix ?? '')
    : stat.value

  return (
    <RevealWrapper
      delay={index * 80}
      className={cn(
        'group border-r border-border-soft px-7 py-9 text-center last:border-r-0',
        'transition-colors hover:bg-rose-pale'
      )}
    >
      <div
        className={cn(
          'mx-auto mb-3.5 flex h-10 w-10 items-center justify-center rounded-[10px] text-[0.95rem]',
          stat.colorClass
        )}
      >
        <i className={stat.icon} />
      </div>
      <div
        ref={stat.counterTarget != null ? ref : undefined}
        className="mb-1.5 font-display text-[2.8rem] font-bold -tracking-[0.02em] leading-none text-ink"
      >
        {display}
      </div>
      <div className="text-[0.8rem] font-medium tracking-[0.05em] text-muted">
        {stat.label}
      </div>
    </RevealWrapper>
  )
}

export function Stats() {
  return (
    <div className="relative z-10 border-b border-border-soft bg-white">
      <div className="mx-auto grid max-w-[1180px] grid-cols-2 px-7 lg:grid-cols-4">
        {STATS.map((stat, i) => <StatItem key={stat.id} stat={stat} index={i} />)}
      </div>
    </div>
  )
}
