export default {
  name: 'testimonial',
  title: 'Depoimento',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Texto do Depoimento',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'authorName',
      title: 'Nome do Autor',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'authorRole',
      title: 'Cargo/Relacionamento',
      type: 'string',
      placeholder: 'Ex: Noiva feliz 💍',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'avatar',
      title: 'Foto do Autor',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'rating',
      title: 'Avaliação (0-5)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0).max(5),
    },
  ],
}
