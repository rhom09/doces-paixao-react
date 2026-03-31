import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'stat',
  title: 'Estatística (Stat)',
  type: 'document',
  fields: [
    defineField({
      name: 'icon',
      title: 'Ícone (Font Awesome)',
      type: 'string',
      description: 'Ex: "fas fa-users"',
    }),
    defineField({
      name: 'value',
      title: 'Valor (Estático)',
      type: 'string',
      description: 'Ex: "4.9". Deixe vazio se usar o contador animado.',
    }),
    defineField({
      name: 'counterTarget',
      title: 'Meta do Contador (Animado)',
      type: 'number',
      description: 'Ex: 1800',
    }),
    defineField({
      name: 'suffix',
      title: 'Sufixo',
      type: 'string',
      description: 'Ex: "+"',
    }),
    defineField({
      name: 'label',
      title: 'Rótulo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'colorClass',
      title: 'Classe de Cor (CSS)',
      type: 'string',
      description: 'Ex: "bg-rose-pale text-rose"',
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
