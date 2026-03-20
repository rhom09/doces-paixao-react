import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/utils/cn'

const NAV_ITEMS = [
  { id: 'inicio', label: 'Início', href: '#inicio', icon: 'fas fa-home' },
  { id: 'produtos', label: 'Cardápio', href: '#produtos', icon: 'fas fa-birthday-cake' },
  { id: 'encomenda', label: 'Encomendar', href: '/encomenda', icon: 'fas fa-shopping-bag', highlight: true },
  { id: 'galeria', label: 'Galeria', href: '#galeria', icon: 'fas fa-images' },
  { id: 'contato', label: 'Contato', href: '#contato', icon: 'fas fa-phone' },
]

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('inicio')
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) {
      setActiveSection('')
      return
    }

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    NAV_ITEMS.forEach((item) => {
      if (item.href.startsWith('#')) {
        const element = document.getElementById(item.id)
        if (element) observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [isHome])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      if (!isHome) {
        navigate('/' + href)
      } else {
        const element = document.querySelector(href)
        element?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 z-[900] w-full border-t border-rose-pale bg-white pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.05)] md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id
          
          if (item.highlight) {
            const highlightHref = isHome ? '/encomenda' : '/'
            const highlightLabel = isHome ? 'Pedir' : 'Voltar'
            const highlightIcon = isHome ? 'fas fa-shopping-bag' : 'fas fa-arrow-left'

            return (
              <button
                key={item.id}
                onClick={() => navigate(highlightHref)}
                className="relative -top-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose text-white shadow-[0_4px_12px_rgba(196,86,107,0.4)] transition-transform active:scale-95"
              >
                <div className="flex flex-col items-center">
                  <i className={cn(highlightIcon, "text-xl")} />
                  <span className="mt-0.5 text-[0.65rem] font-bold">{highlightLabel}</span>
                </div>
              </button>
            )
          }

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors duration-200",
                isActive ? "text-rose" : "text-ink-soft hover:text-rose-pale"
              )}
            >
              <i className={cn(item.icon, "text-lg")} />
              <span className={cn(
                "text-[0.65rem] font-medium transition-all",
                isActive ? "opacity-100" : "opacity-80"
              )}>
                {item.label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
