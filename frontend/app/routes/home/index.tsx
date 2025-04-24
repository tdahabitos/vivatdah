import Hero from "./components/hero";
import Stats from "./components/stats";
import Cta from "./components/cta";
import Testimonial from "./components/testimonial";
import Blog from "./components/blog";
import Newsletter from "./components/newsletter";
import CookieConsent from "./components/cookie-consent";
import type { Route } from "./+types";
import Plans from "~/components/plans";
import api from "~/lib/api";
import { getPageMeta } from "~/utils";

export const meta = () => getPageMeta({ pageTitle: "Home" });

export async function loader() {
  const posts = await api({
    collection: "posts",
  });
  const plans = await api({
    collection: "plans",
  });

  return {
    posts,
    plans,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts, plans } = loaderData;

  return (
    <div className="space-y-24">
      <Hero />
      <Stats />
      <Cta />
      <Testimonial />
      <Blog posts={posts} />
      <Plans plans={plans} />
      <Newsletter />
      <CookieConsent />
    </div>
  );
}
