import type { CollectionConfig } from "payload";

export const Plans: CollectionConfig = {
  slug: "plans",
  labels: {
    singular: "Plano",
    plural: "Planos",
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
    {
      name: "description",
      label: "Descrição",
      type: "textarea",
    },
    {
      name: "price",
      label: "Preço",
      type: "number",
    },
    {
      name: "features",
      label:
        "Destaques deste plano (lista separada por vírgulas (,) - Exemplo: a, b, c...)",
      type: "textarea",
    },
    {
      name: "recomended",
      label: "Recomendado",
      type: "checkbox",
    },
  ],
};
