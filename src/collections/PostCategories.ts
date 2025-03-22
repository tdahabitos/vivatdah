import type { CollectionConfig } from "payload";

export const PostCategories: CollectionConfig = {
  slug: "post-categories",
  labels: {
    singular: "Categoria de post",
    plural: "Categorias de post",
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
      required: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      unique: true,
      required: true,
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.slug) {
              return data.slug.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');;
            }
          },
        ],
      },
    },
    {
      name: "description",
      label: "Descrição curta",
      type: "textarea",
      maxLength: 200,
    },
  ],
};
