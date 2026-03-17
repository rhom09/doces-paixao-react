import { useState } from 'react'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { label: 'Início',     href: '#inicio' },
  { label: 'Sobre',      href: '#sobre' },
  { label: 'Cardápio',   href: '#produtos' },
  { label: 'Galeria',    href: '#galeria' },
  { label: 'Avaliações', href: '#depoimentos' },
]

export function Header() {
  const scrollY   = useScrollPosition()
  const scrolled  = scrollY > 60
  const [open, setOpen] = useState(false)

  function closeMenu() { setOpen(false) }

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-[900] transition-all duration-500',
        scrolled
          ? 'bg-cream/96 py-3.5 shadow-[0_1px_0_theme(colors.border.DEFAULT),theme(boxShadow.sm)] backdrop-blur-xl'
          : 'py-[22px]'
      )}
    >
      <div className="container mx-auto max-w-[1180px] px-7">
        <nav className="flex items-center justify-between gap-8">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <span
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-[10px] text-sm backdrop-blur-sm transition-all',
                scrolled ? 'bg-rose-pale' : 'bg-white/18'
              )}
            >
              🧁
            </span>
            <span
              className={cn(
                'font-display text-[1.65rem] font-bold -tracking-[0.01em] transition-colors',
                scrolled ? 'text-ink' : 'text-white'
              )}
            >
              Doces{' '}
              <em className={cn('not-italic', scrolled ? 'text-rose' : 'text-rose-light')}>
                Paixão
              </em>
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={cn(
                    'relative text-[0.88rem] font-medium tracking-[0.02em] transition-colors',
                    'after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0',
                    'after:rounded-sm after:bg-rose after:transition-all after:duration-300',
                    'hover:after:w-full',
                    scrolled ? 'text-muted hover:text-rose' : 'text-white/85 hover:text-white'
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <Button as="a" href="#contato" size="sm">
                Encomendar
              </Button>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="flex flex-col gap-1.5 p-1 md:hidden"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  'block h-0.5 w-6.5 rounded-sm transition-all',
                  scrolled ? 'bg-ink' : 'bg-white'
                )}
              />
            ))}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 rounded-b-3xl bg-cream/97 px-7 py-6 shadow-md backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block text-base font-medium text-ink transition-colors hover:text-rose"
                  onClick={closeMenu}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button as="a" href="#contato" size="sm" className="w-full justify-center" onClick={closeMenu}>
                Encomendar
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
