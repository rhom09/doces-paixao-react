import { useEffect, useRef, useState } from 'react'

interface UseCounterOptions {
  duration?: number // ms
}

/**
 * useCounter — anima um número de 0 até `target` quando o elemento
 * entra na viewport. Retorna o valor atual e uma ref para o container.
 */
export function useCounter<T extends HTMLElement = HTMLDivElement>(
  target: number,
  options: UseCounterOptions = {}
) {
  const { duration = 1400 } = options
  const [value, setValue] = useState(0)
  const ref = useRef<T>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true

        const step = target / (duration / 16)
        let current = 0

        const timer = setInterval(() => {
          current += step
          if (current >= target) {
            setValue(target)
            clearInterval(timer)
          } else {
            setValue(Math.floor(current))
          }
        }, 16)
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { value, ref }
}
