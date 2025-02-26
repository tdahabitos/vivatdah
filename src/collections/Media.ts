import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Arquivo",
    plural: "Arquivos",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      label: "Título",
      type: "text",
      required: true,
    },
    {
      name: "categories",
      label: "Categorias",
      type: "relationship",
      relationTo: "categories",
      required: true,
      hasMany: true,
    },
  ],
  upload: true,
};
