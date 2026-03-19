import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'

interface SanityState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useSanity<T>(query: string, params: Record<string, any> = {}) {
  const [state, setState] = useState<SanityState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        setState(prev => ({ ...prev, loading: true }))
        const result = await client.fetch<T>(query, params)
        if (isMounted) {
          setState({ data: result, loading: false, error: null })
        }
      } catch (err) {
        if (isMounted) {
          setState({ data: null, loading: false, error: err as Error })
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, JSON.stringify(params)])

  return state
}
