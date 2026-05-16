import { Hero }         from '@/components/sections/Hero'
import { Stats }        from '@/components/sections/Stats'
import { Sobre }        from '@/components/sections/Sobre'
import { Produtos }     from '@/components/sections/Produtos'
import { Diferenciais, Galeria, Depoimentos, CTABand } from '@/components/sections/Sections'
import { Contato }      from '@/components/sections/Contato'
import { SEO } from '@/components/ui/SEO'
import { SugarTrail } from '@/components/effects/SugarTrail'

export default function App() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "Doces Paixão",
    "description": "Confeitaria artesanal em São Paulo",
    "telephone": "(11) 99857-38330",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua das Flores, 142",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "openingHours": ["Mo-Fr 08:00-19:00", "Sa 09:00-16:00"],
    "servesCuisine": "Confeitaria Artesanal",
    "priceRange": "$$"
  }

  return (
    <>
      <SugarTrail />
      <SEO />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <Stats />
      <Sobre />
      <Produtos />
      <Diferenciais />
      <Galeria />
      <Depoimentos />
      <CTABand />
      <Contato />
    </>
  )
}
