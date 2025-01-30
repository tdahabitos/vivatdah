import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function uuid() {
  return crypto.randomUUID();
}

export function getVideoThumbnail({ platform, url }) {
  let thumbnail = "/fallback-thumbnail.svg";
  let id = null;

  switch (platform) {
    case "panda":
      /* TODO: add panda thumbnail */
      break;

    case "youtube":
      id = url?.split("https://www.youtube.com/watch?v=")[1];
      thumbnail = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      break;

    case "vimeo":
      /* TODO: add vimeo thumbnail */
      break;

    default:
      break;
  }

  return thumbnail;
}
