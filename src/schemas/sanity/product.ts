export default {
  name: 'product',
  title: 'Produto',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome do Produto',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Bolos', value: 'Bolos' },
          { title: 'Cupcakes', value: 'Cupcakes' },
          { title: 'Docinhos', value: 'Docinhos' },
          { title: 'Tortas', value: 'Tortas' },
          { title: 'Especiais', value: 'Especiais' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Preço',
      type: 'string',
      description: 'Ex: R$ 89,90',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tag',
      title: 'Etiqueta',
      type: 'string',
      options: {
        list: [
          { title: 'Nenhum', value: '' },
          { title: 'Best-seller', value: 'bestseller' },
          { title: 'Novo', value: 'novo' },
          { title: 'Premium', value: 'premium' },
        ],
      },
    },
    {
      name: 'active',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true,
    },
  ],
}
