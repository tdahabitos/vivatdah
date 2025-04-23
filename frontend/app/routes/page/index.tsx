import axios from "axios";
import type { Route } from "./+types";
import { getApiDocs } from "~/utils";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Categories from "~/components/categories";
import Plans from "~/components/plans";
import api from "~/lib/api";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const page = await api({
    collection: "pages",
    where: {
      status: {
        equals: "published",
      },
      slug: {
        equals: params.slug,
      },
    },
  }).then((res) => res[0]);

  const plans = await api({
    collection: "plans",
    where: {
      status: {
        equals: "published",
      },
    },
  });

  const categories = await api({
    collection: "categories",
  });

  return {
    page,
    plans,
    categories,
  };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { page, plans, categories } = loaderData;
  const { title, content, shortcode } = page;
  let specialPageBlock = null;

  switch (shortcode) {
    case "[block:trilhas]":
      specialPageBlock = <Categories categories={categories} />;
      break;

    case "[block:assinatura]":
      specialPageBlock = <Plans plans={plans} />;
      break;

    default:
      break;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <RichText data={content} className="mb-12" />

      {specialPageBlock}
    </div>
  );
}
