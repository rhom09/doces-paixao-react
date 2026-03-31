import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'diferencial',
  title: 'Diferencial',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Número',
      type: 'string',
      description: 'Ex: "01", "02"',
    }),
    defineField({
      name: 'icon',
      title: 'Ícone (Font Awesome)',
      type: 'string',
      description: 'Ex: "fas fa-leaf"',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
