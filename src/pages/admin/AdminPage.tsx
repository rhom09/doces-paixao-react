import { renderStudio } from 'sanity'
import { useEffect, useRef } from 'react'
import sanityConfig from '../../../sanity.config'

export default function AdminPage() {
  const studioRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (studioRef.current) {
      renderStudio(studioRef.current, sanityConfig)
    }
  }, [])

  return (
    <div
      ref={studioRef}
      style={{ height: '100vh', width: '100vw' }}
      id="sanity"
    />
  )
}
