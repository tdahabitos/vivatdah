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
      name: "title",
      label: "Título",
      type: "text",
    },
  ],
};
