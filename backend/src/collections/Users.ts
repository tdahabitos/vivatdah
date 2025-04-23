import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  auth: {
    useAPIKey: true,
  },
  slug: "users",
  labels: {
    singular: "Usuário",
    plural: "Usuários",
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "avatar",
      label: "Avatar",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "name",
      label: "Nome",
      type: "text",
    },
    {
      name: "role",
      label: "Cargo",
      type: "text",
    },
    {
      name: "bio",
      label: "Biografia",
      type: "textarea",
    },
  ],
};
