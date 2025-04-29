import type { CollectionConfig } from 'payload'

export const Saved: CollectionConfig = {
  slug: 'saved',
  labels: {
    singular: 'Salvo',
    plural: 'Salvos',
  },
  access: {
    read: () => true,
    create: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'video_id',
    hidden: true,
  },
  fields: [
    {
      name: 'video_id',
      label: 'Id do vídeo',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'user_id',
      label: 'Id de usuário',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
