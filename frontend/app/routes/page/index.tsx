import type { Route } from "./+types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Categories from "~/components/categories";
import Plans from "~/components/plans";
import { apiFetcher } from "~/lib/api";
import type { Page } from "~/types";
import { getPageMeta } from "~/utils";

export const meta = ({ data }: Route.MetaArgs) =>
  getPageMeta({ pageTitle: data.page.title });

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const page = await apiFetcher(`/pages/${params.slug}`);
  const plans = await apiFetcher("/plans");
  const categories = await apiFetcher("/categories");

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
