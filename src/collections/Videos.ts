import type { CollectionConfig } from "payload";

export const Videos: CollectionConfig = {
  slug: "videos",
  labels: {
    singular: "Vídeo",
    plural: "Vídeos",
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
      type: "select",
      options: [
        {
          label: "Publicado",
          value: "published",
        },
        {
          label: "Live",
          value: "live",
        },
        {
          label: "Em breve",
          value: "soon",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "platform",
      type: "select",
      options: [
        {
          label: "Panda",
          value: "panda",
        },
        {
          label: "Youtube",
          value: "youtube",
        },
        {
          label: "Vimeo",
          value: "vimeo",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "creator",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "url",
      type: "text",
    },
    {
      name: "title",
      type: "text",
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      required: true,
      hasMany: true,
    },
    {
      name: "files",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
    },
  ],
};
