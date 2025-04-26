import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Categoria',
    plural: 'Categorias',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'cover',
      label: 'Capa',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'free_content',
      label: 'Conteúdo livre',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'panda_folder_id',
      label: 'ID da pasta no Panda',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      label: 'Título',
      required: true,
      type: 'text',
    },
    {
      name: 'description',
      label: 'Descrição',
      required: true,
      type: 'textarea',
    },
    {
      name: 'included_plans',
      label: 'Planos inclusos',
      type: 'relationship',
      relationTo: 'plans',
      hasMany: true,
    },
  ],
}
