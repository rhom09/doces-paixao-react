import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-canvas px-7 text-center">
      <div className="text-[5rem] leading-none">🧁</div>
      <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold text-ink">
        Página não encontrada
      </h1>
      <p className="max-w-md text-[1rem] leading-relaxed text-muted">
        Parece que essa receita não existe no nosso cardápio.
        Que tal voltar para a página inicial e descobrir nossas delícias?
      </p>
      <Link
        to="/"
        className="mt-2 rounded-2xl bg-rose px-8 py-3.5 font-medium text-white shadow-[0_4px_20px_rgba(196,86,107,0.35)] transition-all hover:-translate-y-0.5 hover:bg-rose-deep hover:shadow-[0_8px_24px_rgba(196,86,107,0.4)]"
      >
        Voltar ao Início
      </Link>
    </div>
  )
}
