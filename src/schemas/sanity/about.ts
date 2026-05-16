export default {
  name: 'about',
  title: 'Nossa História (Sobre)',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Etiqueta (Eyebrow)',
      type: 'string',
      initialValue: '✦ Nossa História',
    },
    {
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      description: 'Use <em class="italic text-rose">texto</em> para destacar em rosa.',
    },
    {
      name: 'content',
      title: 'Conteúdo do Texto',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Cada item é um parágrafo.',
    },
    {
      name: 'image',
      title: 'Imagem Principal',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'badgeTitle',
      title: 'Título do Selo (Badge)',
      type: 'string',
      initialValue: 'Ingredientes Selecionados',
    },
    {
      name: 'badgeSubtitle',
      title: 'Subtítulo do Selo (Badge)',
      type: 'string',
      initialValue: 'Qualidade Premium',
    },
    {
      name: 'features',
      title: 'Diferenciais Rápidos (Checklist)',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
}
