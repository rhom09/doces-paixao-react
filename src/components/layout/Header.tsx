import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { label: 'Início',     href: '/',         exact: true },
  { label: 'Cardápio',   href: '/cardapio', exact: false },
  { label: 'Sobre',      href: '/sobre',    exact: false },
]

export function Header() {
  const scrollY  = useScrollPosition()
  const scrolled = scrollY > 60
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  function closeMenu() { setOpen(false) }

  const textColor = scrolled || !isHome
    ? 'text-muted hover:text-rose'
    : 'text-white/85 hover:text-white'

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
          <Link to="/" className="flex items-center gap-2.5">
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
                scrolled || !isHome ? 'text-ink' : 'text-white'
              )}
            >
              Doces{' '}
              <em className={cn('not-italic', scrolled ? 'text-rose' : isHome ? 'text-rose-light' : 'text-rose')}>
                Paixão
              </em>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map(({ label, href, exact }) => (
              <li key={href}>
                <NavLink
                  to={href}
                  end={exact}
                  className={({ isActive }) =>
                    cn(
                      'relative text-[0.88rem] font-medium tracking-[0.02em] transition-colors',
                      'after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0',
                      'after:rounded-sm after:bg-rose after:transition-all after:duration-300',
                      'hover:after:w-full',
                      isActive ? 'after:!w-full text-rose' : textColor
                    )
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/encomenda"
                className="inline-flex items-center rounded-2xl bg-rose px-5 py-2.5 text-[0.85rem] font-semibold text-white shadow-[0_4px_16px_rgba(196,86,107,0.3)] transition-all hover:-translate-y-0.5 hover:bg-rose-deep"
              >
                Encomendar
              </Link>
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
                  scrolled || !isHome ? 'bg-ink' : 'bg-white'
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
            {NAV_LINKS.map(({ label, href, exact }) => (
              <li key={href}>
                <NavLink
                  to={href}
                  end={exact}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    cn(
                      'block text-base font-medium transition-colors',
                      isActive ? 'text-rose' : 'text-ink hover:text-rose'
                    )
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/encomenda"
                onClick={closeMenu}
                className="block w-full rounded-2xl bg-rose py-3 text-center font-semibold text-white shadow-[0_4px_16px_rgba(196,86,107,0.3)] transition-all hover:bg-rose-deep"
              >
                Encomendar
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
