import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SEO } from '@/components/ui/SEO'
import { InstallBanner } from '@/components/ui/InstallBanner'
import { BottomNav } from '@/components/layout/BottomNav'
import { cn } from '@/utils/cn'

function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/5511999999999?text=Olá%20Doces%20Paixão!%20Gostaria%20de%20fazer%20uma%20encomenda%20🧁"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale pelo WhatsApp"
      className="animate-wpp-pulse fixed bottom-7 right-7 z-[800] hidden md:flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#25d366] text-[1.5rem] text-white transition-transform hover:scale-[1.08]"
    >
      <i className="fab fa-whatsapp" />
    </a>
  )
}

function ScrollTopButton() {
  const scrollY = useScrollPosition()
  const show = scrollY > 500

  return (
    <button
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed bottom-7 right-24 z-[800] items-center justify-center rounded-[12px]',
        'bg-rose text-white text-[0.9rem] shadow-[0_4px_16px_rgba(196,86,107,0.3)] h-11 w-11',
        'transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-deep',
        show ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-2.5',
        'hidden md:flex'
      )}
    >
      <i className="fas fa-chevron-up" />
    </button>
  )
}

export function MainLayout() {
  const { pathname } = useLocation()

  // Sincronizar scroll ao mudar de página interna (se não for âncora)
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <SEO />
      <Header />
      
      <main className="flex-grow pb-20 md:pb-0">
        <Outlet />
      </main>

      <Footer />

      <WhatsAppFAB />
      <ScrollTopButton />
      <InstallBanner />
      <BottomNav />
    </div>
  )
}
