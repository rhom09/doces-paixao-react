import { Link } from 'react-router-dom'
import { RevealWrapper, LabelTag, SectionHead } from '@/components/ui/index'

const TEAM = [
  {
    name: 'Maria Clara',
    role: 'Chef Confeiteira & Fundadora',
    bio: 'Com mais de 10 anos na confeitaria artesanal, Maria Clara se especializou em cake design e pâtisserie francesa. Sua paixão por doces começou na cozinha da avó e nunca mais parou.',
    emoji: '👩‍🍳',
  },
  {
    name: 'Carla Mendes',
    role: 'Confeiteira Artística',
    bio: 'Carla é a artista por trás dos decorados exclusivos. Especializada em açúcar artistico e modelagem, ela transforma cada bolo em uma obra de arte comestível.',
    emoji: '🎨',
  },
  {
    name: 'Ana Souza',
    role: 'Atendimento & Logística',
    bio: 'Responsável por garantir que cada encomenda chegue perfeita e no prazo. Ana cuida do relacionamento com clientes com carinho e atenção aos detalhes.',
    emoji: '💌',
  },
]

const VALUES = [
  { icon: '🌿', title: 'Ingredientes Frescos', text: 'Utilizamos apenas insumos frescos e de origem confiável, sem conservantes artificiais.' },
  { icon: '❤️', title: 'Feito com Amor', text: 'Cada produto é preparado manualmente, com atenção total e muito carinho em cada etapa.' },
  { icon: '🎁', title: 'Personalização Total', text: 'Criamos doces únicos para cada ocasião, do aniversário ao casamento dos sonhos.' },
  { icon: '🚀', title: 'Entrega Pontual', text: 'Comprometemos com horários e prazos, porque sabemos o quanto cada celebração importa.' },
]

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-canvas pt-28">

      {/* Hero */}
      <section className="bg-cream py-20">
        <div className="container mx-auto max-w-[1180px] px-7">
          <RevealWrapper className="text-center">
            <LabelTag className="mb-4 inline-block">✦ Nossa História</LabelTag>
            <h1 className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-bold text-ink">
              Uma Paixão que se Tornou{' '}
              <em className="italic text-rose">Arte Doce</em>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-[1.85] text-muted">
              A Doces Paixão nasceu em 2014, de um sonho apaixonante de criar doces que encantam os olhos
              e aquecem o coração. O que começou como uma paixão pessoal cresceu e se transformou numa
              confeitaria artesanal reconhecida pelo carinho e qualidade.
            </p>
          </RevealWrapper>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto max-w-[1180px] px-7">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <RevealWrapper direction="left">
              <img
                src="https://images.unsplash.com/photo-1556217477-d325251ece38?w=700&q=85"
                alt="Confeiteira artesanal Doces Paixão"
                className="w-full rounded-[28px] shadow-md"
              />
            </RevealWrapper>
            <RevealWrapper direction="right" className="space-y-5">
              <h2 className="font-display text-[clamp(1.6rem,2.5vw,2.2rem)] font-semibold text-ink">
                Como Tudo Começou
              </h2>
              <p className="text-[0.97rem] leading-[1.85] text-muted">
                Tudo começou na cozinha da avó de Maria Clara, onde as receitas de família eram passadas
                de geração em geração com muito amor. Aos 20 anos, Maria Clara decidiu transformar essa
                herança em profissão.
              </p>
              <p className="text-[0.97rem] leading-[1.85] text-muted">
                Formou-se em gastronomia, especializou-se em confeitaria francesa em São Paulo, e em 2014
                abriu a Doces Paixão — primeiro para amigos e família, depois expandindo para toda a cidade.
                Hoje, mais de 3.000 clientes já provaram nossas criações.
              </p>
              <p className="text-[0.97rem] leading-[1.85] text-muted">
                A missão continua a mesma: criar doces que contem histórias e criem memórias afetivas
                inesquecíveis.
              </p>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream py-20">
        <div className="container mx-auto max-w-[1180px] px-7">
          <RevealWrapper>
            <SectionHead
              tag={<LabelTag>🌟 Nossos Valores</LabelTag>}
              title={<>O que nos <em className="italic text-rose">Move</em></>}
              subtitle="Os princípios que guiam cada doce que preparamos"
              center
            />
          </RevealWrapper>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <RevealWrapper key={v.title} delay={i * 80}>
                <div className="rounded-[24px] border border-border-soft bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-4 text-4xl">{v.icon}</div>
                  <h3 className="mb-2 font-display text-[1.05rem] font-semibold text-ink">{v.title}</h3>
                  <p className="text-[0.85rem] leading-relaxed text-muted">{v.text}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto max-w-[1180px] px-7">
          <RevealWrapper>
            <SectionHead
              tag={<LabelTag>👩‍🍳 Nossa Equipe</LabelTag>}
              title={<>As <em className="italic text-rose">Pessoas</em> por trás dos doces</>}
              center
            />
          </RevealWrapper>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {TEAM.map((member, i) => (
              <RevealWrapper key={member.name} delay={i * 100}>
                <div className="rounded-[24px] border border-border-soft bg-white p-7 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-4 text-5xl">{member.emoji}</div>
                  <h3 className="font-display text-[1.1rem] font-semibold text-ink">{member.name}</h3>
                  <p className="mb-3 text-[0.8rem] font-medium text-rose">{member.role}</p>
                  <p className="text-[0.85rem] leading-relaxed text-muted">{member.bio}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-rose to-rose-deep py-20 text-center text-white">
        <RevealWrapper>
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-bold">
            Pronta para adoçar a sua ocasião?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/80">
            Faça uma encomenda personalizada e deixe a gente criar uma experiência inesquecível para você.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/encomenda"
              className="rounded-2xl bg-white px-8 py-3.5 font-semibold text-rose shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Fazer Encomenda
            </Link>
            <Link
              to="/cardapio"
              className="rounded-2xl border-2 border-white/50 px-8 py-3.5 font-medium text-white transition-all hover:border-white hover:bg-white/10"
            >
              Ver Cardápio
            </Link>
          </div>
        </RevealWrapper>
      </section>

    </div>
  )
}
