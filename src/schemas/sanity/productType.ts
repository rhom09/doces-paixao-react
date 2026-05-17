export default {
  name: 'productType',
  title: 'Tipo de Produto (Encomenda)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      description: 'Ex: 🎂, 🍫',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'quickQuantities',
      title: 'Sugestões Rápidas de Quantidade',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ex: ["1kg", "2kg", "3kg"]',
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
