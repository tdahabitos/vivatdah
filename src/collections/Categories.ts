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
  ],
};
