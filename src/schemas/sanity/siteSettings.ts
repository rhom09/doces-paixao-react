export default {
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    {
      name: 'phone',
      title: 'WhatsApp/Telefone',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Endereço',
      type: 'string',
    },
    {
      name: 'email',
      title: 'E-mail de Contato',
      type: 'string',
    },
    {
      name: 'socialLinks',
      title: 'Redes Sociais',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Plataforma' },
            { name: 'url', type: 'url', title: 'Link' },
            { name: 'icon', type: 'string', title: 'Ícone (Font Awesome)' },
          ],
        },
      ],
    },
  ],
}
