import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink text-center text-white" id="inicio">

      {/* Ken Burns background */}
      <div
        className="absolute inset-0 animate-kenburns bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=1800&q=85')" }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/35 to-ink/25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(196,86,107,0.2),transparent_70%)]" />
      <div className="absolute inset-0 bg-grain opacity-[0.03]" />

      {/* Content */}
      <div className="relative z-10 max-w-[760px] px-6">

        {/* Eyebrow badge */}
        <div className="mb-8 inline-flex animate-fade-down items-center gap-2.5 rounded-full border border-white/18 bg-white/10 px-5 py-2 text-[0.8rem] font-medium uppercase tracking-[0.1em] text-white/90 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-rose-light" />
          Confeitaria Artesanal desde 2014
        </div>

        {/* Heading */}
        <h1
          className="mb-5 animate-fade-down font-display text-[clamp(2.8rem,7vw,5.2rem)] font-semibold -tracking-[0.02em] leading-[1.08]"
          style={{ animationDelay: '0.15s' }}
        >
          Doces Feitos com
          <br />
          <em className="not-italic text-gradient-rose">Paixão &amp; Dedicação</em>
        </h1>

        {/* Desc */}
        <p
          className="mx-auto mb-10 max-w-[520px] animate-fade-up text-[1.12rem] font-light leading-[1.75] text-white/78"
          style={{ animationDelay: '0.3s' }}
        >
          Transformamos ingredientes especiais em obras de arte comestíveis.
          Cada sabor conta uma história única, feita com o coração.
        </p>

        {/* Actions */}
        <div
          className="flex animate-fade-up flex-wrap justify-center gap-3.5"
          style={{ animationDelay: '0.45s' }}
        >
          <Button as="a" href="#produtos" variant="rose" size="md">
            🍰 Ver Cardápio
          </Button>
          <Button as="a" href="#sobre" variant="outline" size="md">
            Nossa História
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 animate-fade-up text-white/50"
        style={{ animationDelay: '0.8s' }}
      >
        <div className="h-10 w-px animate-scroll-line bg-gradient-to-b from-white/50 to-transparent" />
      </div>

      {/* Wave */}
      <div className="absolute bottom-[-2px] left-0 right-0 h-[120px] pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" fill="#fdfaf7" />
        </svg>
      </div>
    </section>
  )
}
