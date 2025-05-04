import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  auth: {
    useAPIKey: true,
  },
  slug: 'users',
  labels: {
    singular: 'Usuário',
    plural: 'Usuários',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
    },
  ],
}
