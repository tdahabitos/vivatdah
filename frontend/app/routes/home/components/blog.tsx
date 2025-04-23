import { Button, Image } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { Link } from "react-router";
import type { Post } from "~/types";

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <section>
      <div className="mb-10 md:mb-12">
        <h2 className="mb-2 text-center text-2xl font-bold lg:text-3xl">
          Explore nosso blog
        </h2>

        <p className="mx-auto max-w-screen-md text-center  md:text-lg">
          Desbloqueie o seu próximo nível de conhecimento e seja um aprendiz da
          vida com TDAH
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            target="_blank"
            to={`${import.meta.env.VITE_BLOG_URL}/post/${post.slug}`}
            className="group relative flex h-48 flex-col overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-64 xl:h-96"
          >
            <Image
              src={`${import.meta.env.VITE_STORAGE_URL}/${post.cover.url}`}
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent md:via-transparent" />

            <div className="relative mt-auto p-4">
              <h2 className="mb-4 text-xl font-semibold text-white transition duration-100">
                {post.title}
              </h2>

              <Button
                size="compact-sm"
                rightSection={<IconExternalLink size={16} />}
              >
                Ver mais
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
