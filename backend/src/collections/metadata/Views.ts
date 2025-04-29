import type { CollectionConfig } from 'payload'

export const Views: CollectionConfig = {
  slug: 'views',
  labels: {
    singular: 'View',
    plural: 'Views',
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
      unique: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'views',
      label: 'Views',
      type: 'number',
      defaultValue: 0,
      required: true,
    },
  ],
}
