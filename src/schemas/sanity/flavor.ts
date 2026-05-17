export default {
  name: 'flavor',
  title: 'Sabor (Encomenda)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome do Sabor',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'color',
      title: 'Cor (Hex)',
      type: 'string',
      description: 'Ex: #8B4513',
      validation: (Rule: any) => Rule.required().regex(/^#[0-9A-Fa-f]{6}$/),
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Bolo', value: 'bolo' },
          { title: 'Docinhos', value: 'docinhos' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'active',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true,
    },
  ],
}
