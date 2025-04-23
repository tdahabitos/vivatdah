import type { AxiosResponse } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uuid() {
  return crypto.randomUUID();
}

export function getApiDocs(res: AxiosResponse, unique?: boolean) {
  const docs = res?.data?.result?.docs;

  if (unique) {
    return docs[0];
  }

  return docs;
}
