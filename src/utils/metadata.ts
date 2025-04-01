import type { Metadata } from "next";

export default function getMetadata({
  title,
  description,
}: { title: string; description: string }) {
  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: "/",
      title,
      description,
      images: [
        {
          url: "/og-image.jpg",
          width: 800,
          height: 600,
          alt: "VivaTDAH",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: "/og-image.jpg",
          width: 800,
          height: 600,
          alt: "VivaTDAH",
        },
      ],
    },
  } as Metadata;
}
