import type { CollectionConfig } from "payload";

export const Videos: CollectionConfig = {
  slug: "videos",
  labels: {
    singular: "Vídeo",
    plural: "Vídeos",
  },
  access: {
    read: () => true,
    create: () => true,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "status",
      defaultValue: "published",
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
      label: "Plataforma",
      defaultValue: "panda",
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
      label: "URL",
      type: "text",
    },
    {
      name: "title",
      label: "Título",
      type: "text",
    },
    {
      name: "description",
      label: "Descrição",
      type: "richText",
    },
    {
      name: "categories",
      label: "Categorias",
      type: "relationship",
      relationTo: "categories",
      required: true,
      hasMany: true,
    },
    {
      name: "files",
      label: "Arquivos anexados",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
    },
  ],
};
