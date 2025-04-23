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
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "is_public",
      label: "Arquivo público (visível na plataforma)?",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
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
      hasMany: true,
    },
  ],
  upload: true,
};
