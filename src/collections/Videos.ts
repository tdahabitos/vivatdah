import type { CollectionConfig } from "payload";

export const Videos: CollectionConfig = {
  slug: "videos",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "platform",
      type: "select",
      options: [
        {
          label: "Youtube",
          value: "youtube",
        },
        {
          label: "Vimeo",
          value: "vimeo",
        },
      ],
    },
    {
      name: "url",
      type: "text",
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      required: true,
      hasMany: true,
    },
    {
      name: "creator",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "files",
      type: "relationship",
      relationTo: "media",
      hasMany: true,
    },
  ],
};
