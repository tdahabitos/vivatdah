import type { CollectionConfig } from "payload";

export const Administration: CollectionConfig = {
  slug: "administration",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "maintenance_mode",
  },
  fields: [
    {
      name: "maintenance_mode",
      label: "Modo de manutenção",
      type: "checkbox",
    },
  ],
};
