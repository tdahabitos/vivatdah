import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: "Categoria",
    plural: "Categorias",
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Título",
      type: "text",
    },
    {
      name: "description",
      label: "Descrição",
      type: "textarea",
    },
    {
      name: "cover",
      label: "Capa",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "included_plans",
      label: "Planos inclusos",
      type: "relationship",
      relationTo: "plans",
      hasMany: true,
    },
  ],
};
