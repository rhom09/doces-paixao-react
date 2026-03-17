import { Button } from '@/components/ui/Button'
import { LabelTag, RevealWrapper } from '@/components/ui/index'

const FEATURES = [
  '100% Artesanal',
  'Ingredientes Premium',
  'Entrega Agendada',
  'Personalização Total',
  'Sem Conservantes',
  'Opções Veganas',
]

export function Sobre() {
  return (
    <section className="bg-cream py-[120px]" id="sobre">
      <div className="container mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-[80px] px-7 lg:grid-cols-2">

        {/* Imagem */}
        <RevealWrapper direction="left" className="relative pb-10 pl-5 pt-5">
          {/* Círculo decorativo */}
          <div className="absolute -left-4 -top-4 h-[110px] w-[110px] rounded-full bg-mint-light opacity-55" />

          {/* Foto principal */}
          <img
            src="https://images.unsplash.com/photo-1556217477-d325251ece38?w=700&q=85"
            alt="Confeiteira artesanal Doces Paixão"
            className="relative z-10 aspect-[4/5] w-full rounded-[28px] object-cover shadow-lg"
          />

          {/* Linha decorativa */}
          <div className="absolute -right-5 bottom-5 h-1 w-[100px] rounded-sm bg-gradient-to-r from-rose-light to-transparent" />

          {/* Badge flutuante */}
          <div className="absolute -right-3 bottom-0 z-20 flex items-center gap-3.5 rounded-[20px] border border-border-soft bg-white px-5 py-4 shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-gradient-to-br from-rose to-rose-light text-[1.1rem] text-white">
              <i className="fas fa-heart" />
            </div>
            <div>
              <strong className="block font-display text-[1.6rem] leading-none text-ink">10+ Anos</strong>
              <small className="text-[0.78rem] text-muted">de pura paixão</small>
            </div>
          </div>
        </RevealWrapper>

        {/* Texto */}
        <RevealWrapper direction="right" className="pl-2.5">
          <LabelTag className="mb-4">✦ Nossa História</LabelTag>

          <h2 className="mb-5 font-display text-[clamp(2rem,3.5vw,2.8rem)] font-semibold -tracking-[0.01em]">
            Uma Paixão que se Tornou{' '}
            <em className="italic text-rose">Arte Doce</em>
          </h2>

          <p className="mb-3.5 text-[0.97rem] leading-[1.85] text-muted">
            A Doces Paixão nasceu em 2014, de um sonho apaixonante de criar doces que encantam os
            olhos e aquecem o coração. Cada receita é desenvolvida com carinho, utilizando ingredientes
            frescos e de altíssima qualidade.
          </p>
          <p className="text-[0.97rem] leading-[1.85] text-muted">
            Nossa chef confeiteira, Maria Clara, traz mais de uma década de experiência em
            confeitaria artesanal, com especialização em cake design e técnicas francesas de pâtisserie.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-2.5">
            {FEATURES.map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 rounded-xl border border-border-soft bg-white px-3.5 py-2.5 text-[0.84rem] font-medium text-ink-soft transition-all hover:translate-x-1 hover:border-rose-light hover:bg-rose-pale"
              >
                <i className="fas fa-check text-[0.8rem] text-mint-deep" />
                {f}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button as="a" href="#contato" variant="rose" size="md">
              Fazer uma Encomenda
            </Button>
          </div>
        </RevealWrapper>

      </div>
    </section>
  )
}
