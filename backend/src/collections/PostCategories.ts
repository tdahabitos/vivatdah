import { slugValidate } from '@/utils'
import type { CollectionConfig } from 'payload'

export const PostCategories: CollectionConfig = {
  slug: 'post-categories',
  labels: {
    singular: 'Categoria (Posts)',
    plural: 'Categorias (Posts)',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
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
      validate: slugValidate,
    },
    {
      name: 'description',
      label: 'Descrição curta',
      type: 'textarea',
      maxLength: 200,
    },
  ],
}
