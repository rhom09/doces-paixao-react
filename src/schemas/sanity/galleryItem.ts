import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Item da Galeria',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Legenda',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Texto Alternativo (SEO)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'span',
      title: 'Espaçamento (Grid)',
      type: 'string',
      options: {
        list: [
          { title: 'Normal', value: 'none' },
          { title: 'Coluna (Doble)', value: 'col' },
          { title: 'Ambos (Destaque)', value: 'both' },
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
