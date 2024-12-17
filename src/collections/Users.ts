import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "name",
      type: "text",
    },
  ],
};
