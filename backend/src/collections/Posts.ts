import { slugValidate } from '@/utils'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'Posts',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'show_at_home',
      label: 'Mostrar na página inicial',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
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
      name: 'categories',
      label: {
        singular: 'Categoria',
        plural: 'Categorias',
      },
      type: 'relationship',
      relationTo: 'post-categories',
      hasMany: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'cover',
      label: 'Capa',
      type: 'upload',
      relationTo: 'media',
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
      name: 'description',
      label: 'Descrição curta',
      type: 'textarea',
      required: true,
      maxLength: 200,
    },
    {
      name: 'content',
      label: 'Conteúdo',
      type: 'richText',
    },
  ],
}
