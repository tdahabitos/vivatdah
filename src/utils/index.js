import axios from "axios";
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
      id = url?.split("v=")[1];
      thumbnail = `https://b-vz-0ab54fe1-7b5.tv.pandavideo.com.br/${id}/thumbnail.jpg`;
      break;

    case "youtube":
      id = url?.split("v=")[1];
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
