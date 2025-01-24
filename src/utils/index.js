import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getVideoId(url) {
  return url?.split("https://www.youtube.com/watch?v=")[1];
}

export function getVideoThumbnail({ url }) {
  const id = getVideoId(url);
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export function uuid() {
  return crypto.randomUUID();
}

/* export function getVideoThumbnail({
  platform,
  url,
}: { platform: string; url: string }) {
  let thumbnail = null;

  if (platform === "youtube") {
    const id = getVideoId(url);
    thumbnail = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }

  if (platform === "vimeo") {
    const id = url?.split("https://player.vimeo.com/video/")[1];
    thumbnail = `https://i.vimeocdn.com/video/${id}_640.jpg`;
  }

  return thumbnail;
} */
