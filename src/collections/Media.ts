import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Arquivo",
    plural: "Arquivos",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      label: "Alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
