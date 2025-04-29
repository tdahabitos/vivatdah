import type { CollectionConfig } from 'payload'

export const Feedback: CollectionConfig = {
  slug: 'feedback',
  labels: {
    singular: 'Feedback',
    plural: 'Feedback',
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
    {
      name: 'type',
      label: 'Tipo',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Positivo',
          value: 'positive',
        },
        {
          label: 'Negativo',
          value: 'negative',
        },
      ],
    },
  ],
}
