import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
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
  ],
};
