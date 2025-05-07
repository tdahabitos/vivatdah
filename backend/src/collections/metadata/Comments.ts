import type { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comments',
  labels: {
    singular: 'Comentário',
    plural: 'Comentários',
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
      name: 'comment',
      label: 'Comentário',
      type: 'textarea',
      required: true,
    },
    {
      name: 'user',
      label: 'Usuário',
      type: 'json',
      required: true,
    },
  ],
}
