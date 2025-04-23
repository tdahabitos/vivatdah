import { Outlet } from "react-router";
import Header from "./components/header";
import Footer from "./components/footer";
import type { Route } from "./+types";
import api, { globalCollectionApi } from "~/lib/api";
import type { Banner } from "~/types";
import PromoBanner from "./components/promo-banner";

export async function loader() {
  const menu = await api({
    collection: "pages",
    where: {
      status: {
        equals: "published",
      },
    },
    sort: ["order"],
    select: {
      id: true,
      title: true,
      slug: true,
      show_at_menu: true,
    },
  });

  const banner = await globalCollectionApi({
    slug: "banner",
  });

  return { menu, banner };
}

export default function WebsiteLayout({ loaderData }: Route.ComponentProps) {
  const { menu, banner } = loaderData;

  return (
    <>
      {banner.active && <PromoBanner banner={banner as Banner} />}
      <Header menu={menu} />
      <div className="px-4 md:px-8">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
