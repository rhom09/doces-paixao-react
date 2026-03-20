import { useState, useEffect } from 'react'
import { cn } from '@/utils/cn'

export function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Verificar se já foi fechado antes
    const isDismissed = localStorage.getItem('pwa-banner-dismissed')
    if (isDismissed) return

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      
      // Mostrar após 30 segundos (conforme pedido)
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 30000)

      return () => clearTimeout(timer)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setIsVisible(false)
      setDeferredPrompt(null)
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('pwa-banner-dismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <div 
      className={cn(
        "fixed bottom-6 left-1/2 z-[1000] -translate-x-1/2 w-[calc(100%-2rem)] max-w-[400px]",
        "flex items-center justify-between gap-4 p-4 rounded-2xl",
        "bg-white shadow-[0_8px_32px_rgba(196,86,107,0.15)] border border-rose-pale",
        "animate-in fade-in slide-in-from-bottom-4 duration-500"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-pale text-rose text-xl">
          🧁
        </div>
        <div>
          <p className="text-[0.9rem] font-semibold text-ink leading-tight">Instale o app!</p>
          <p className="text-[0.75rem] text-ink-soft">Doces Paixão no seu celular</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleInstall}
          className="rounded-lg bg-rose px-4 py-2 text-[0.85rem] font-bold text-white transition-colors hover:bg-rose-deep"
        >
          Instalar
        </button>
        <button
          onClick={handleDismiss}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft hover:bg-ink-faint transition-colors"
          aria-label="Fechar"
        >
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  )
}
