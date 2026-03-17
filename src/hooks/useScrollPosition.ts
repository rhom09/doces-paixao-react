import { useEffect, useState } from 'react'

/**
 * useScrollPosition — retorna a posição Y atual do scroll.
 * Útil para controlar a aparência do header e do botão voltar ao topo.
 */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)

    // Valor inicial
    setScrollY(window.scrollY)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}
