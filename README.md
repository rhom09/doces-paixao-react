# 🧁 Doces Paixão — React + Vite + TypeScript + Tailwind

Landing page profissional da confeitaria **Doces Paixão**, construída com a stack moderna do mercado.

---

## ⚡ Stack

| Tecnologia | Versão | Papel |
|---|---|---|
| **React** | 18 | UI declarativa com componentes |
| **Vite** | 5 | Build ultrarrápido (HMR instantâneo) |
| **TypeScript** | 5 | Tipagem estática, menos bugs em runtime |
| **Tailwind CSS** | 3 | Utility-first, sem CSS solto |
| **ESLint + Prettier** | — | Qualidade e formatação de código |

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx       ← Navbar fixa com scroll e menu mobile
│   │   └── Footer.tsx       ← Rodapé completo com newsletter
│   │
│   ├── sections/
│   │   ├── Hero.tsx         ← Seção hero com Ken Burns
│   │   ├── Stats.tsx        ← Barra de estatísticas animadas
│   │   ├── Sobre.tsx        ← Seção sobre nós
│   │   ├── Produtos.tsx     ← Cards + filtro por tab
│   │   ├── Sections.tsx     ← Diferenciais, Galeria, Depoimentos, CTA
│   │   └── Contato.tsx      ← Formulário de contato
│   │
│   └── ui/
│       ├── Button.tsx       ← Botão polimórfico (<button> ou <a>)
│       └── index.tsx        ← LabelTag, SectionHead, RevealWrapper, Stars
│
├── data/
│   ├── produtos.ts          ← Array de produtos tipado
│   ├── depoimentos.ts       ← Dados dos depoimentos
│   ├── diferenciais.ts      ← Cards de diferenciais
│   └── stats.ts             ← Stats e itens da galeria
│
├── hooks/
│   ├── useScrollPosition.ts ← Posição Y do scroll (header, scroll-top)
│   ├── useScrollReveal.ts   ← IntersectionObserver para animações
│   ├── useCounter.ts        ← Animação numérica de 0 → N
│   └── usePhoneMask.ts      ← Máscara de telefone brasileiro
│
├── types/
│   └── index.ts             ← Todos os tipos TypeScript do projeto
│
├── utils/
│   └── cn.ts                ← Helper para combinar classes Tailwind
│
├── App.tsx                  ← Componente raiz
├── main.tsx                 ← Entry point do React
└── index.css                ← Tailwind directives + utilitários globais
```

---

## 🚀 Como Rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar em desenvolvimento
```bash
npm run dev
# Abre automaticamente em http://localhost:3000
```

### 3. Build para produção
```bash
npm run build
npm run preview  # Pré-visualiza o build
```

### 4. Lint e formatação
```bash
npm run lint        # Verifica problemas
npm run lint:fix    # Corrige automaticamente
npm run format      # Prettier em todo src/
```

---

## 🎨 Personalização

### Cores
Edite `tailwind.config.ts` → seção `colors`:
```ts
rose: {
  DEFAULT: '#c4566b',  // ← troque aqui
  deep:    '#a8395a',
  ...
}
```

### Conteúdo
Cada seção tem seu arquivo de dados em `src/data/`:
- Adicionar/remover produtos → `produtos.ts`
- Editar depoimentos → `depoimentos.ts`
- Mudar diferenciais → `diferenciais.ts`

### Fontes
Troque as fontes em `index.html` (Google Fonts) e `tailwind.config.ts`:
```ts
fontFamily: {
  display: ['"Nova Fonte"', 'serif'],
  body:    ['"Outra Fonte"', 'sans-serif'],
}
```

---

## 🧩 Padrões usados no projeto

| Padrão | Onde |
|---|---|
| Custom Hooks | `useScrollReveal`, `useCounter`, `usePhoneMask` |
| Componente Polimórfico | `Button` (renderiza `<button>` ou `<a>`) |
| Dados separados da UI | `src/data/` com tipagem em `src/types/` |
| Path aliases | `@/` → `src/` (sem `../../..`) |
| Utility helper | `cn()` para classes condicionais |

---

## 📦 Dependências Externas (CDN no index.html)

| Recurso | Motivo |
|---|---|
| Google Fonts | Cormorant Garamond + DM Sans |
| Font Awesome 6 | Ícones |

Nenhum runtime extra além do React. ✔️

---

## 🚀 Deploy (Vercel)

Este projeto está configurado para um deploy profissional na **Vercel**.

### 1. Variáveis de Ambiente
Configure as seguintes variáveis no painel da Vercel (`Settings > Environment Variables`):

| Variável | Descrição |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | ID do serviço do EmailJS |
| `VITE_EMAILJS_TEMPLATE_ID` | ID do template do EmailJS |
| `VITE_EMAILJS_PUBLIC_KEY` | Chave pública do EmailJS |
| `VITE_SANITY_PROJECT_ID` | ID do seu projeto no Sanity.io |
| `VITE_SANITY_DATASET` | Nome do dataset (ex: `production`) |

### 2. Configuração de CORS no Sanity
Para que o site consiga buscar os dados, você deve autorizar o domínio do seu deploy:
1. Acesse o [Painel do Sanity](https://www.sanity.io/manage)
2. Vá em **API > CORS Origins**
3. Adicione o domínio da Vercel (ex: `https://doces-paixao.vercel.app`)
4. Marque a opção **Allow credentials**

### 3. Build & Caching
O arquivo `vercel.json` já configura:
- **SPA Rewrites**: Garante que o React Router funcione corretamente.
- **Headers de Segurança**: Proteção contra Clickjacking e Sniffing.
- **Smart Caching**: Cache de 1 ano para assets estáticos e 0 segundos para o `index.html`.

---

*Desenvolvido com ❤️ e muito 🧁*
