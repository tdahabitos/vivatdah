import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: "Post",
    plural: "Posts",
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "status",
      label: "Status",
      defaultValue: "published",
      type: "select",
      options: [
        {
          label: "Rascunho",
          value: "draft",
        },
        {
          label: "Publicado",
          value: "published",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "cover",
      label: "Cover",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "title",
      label: "Título",
      type: "text",
    },
    {
      name: "slug",
      label: "Slug",
      unique: true,
      type: "text",
    },
    {
      name: "description",
      label: "Descrição curta",
      type: "textarea",
      maxLength: 200,
    },
    {
      name: "content",
      label: "Conteúdo",
      type: "richText",
    },
  ],
};
