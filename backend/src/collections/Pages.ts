import type { CollectionConfig } from 'payload'
import { slugValidate } from '../utils'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Página',
    plural: 'Páginas',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'status',
      label: 'Status',
      defaultValue: 'published',
      type: 'select',
      options: [
        {
          label: 'Rascunho',
          value: 'draft',
        },
        {
          label: 'Publicado',
          value: 'published',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      label: 'Ordem de exibição',
      type: 'number',
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'show_at_menu',
      label: 'Mostrar no menu principal',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'shortcode',
      label: 'Shortcode',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'content',
      label: 'Conteúdo',
      type: 'richText',
    },
  ],
}
