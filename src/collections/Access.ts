import type { CollectionConfig } from "payload";

export const Access: CollectionConfig = {
  slug: "access",
  labels: {
    singular: "Controle de acesso manual",
    plural: "Controle de acesso manual",
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "email",
      label: "E-mail",
      unique: true,
      type: "text",
    },
    {
      name: "allowed_categories",
      label: "Categorias permitidas",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
    },
  ],
};
