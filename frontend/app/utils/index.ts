import type { AxiosResponse } from 'axios'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function uuid() {
  return crypto.randomUUID()
}

export function getPageMeta({ pageTitle }: { pageTitle?: string }) {
  return [
    { title: pageTitle ? `VivaTDAH - ${pageTitle}` : 'VivaTDAH' },
    {
      name: 'description',
      content: 'Entenda seu ritmo e aprenda de forma leve',
    },
  ]
}

export function removeExtension(filename: string) {
  return filename.replace(/\.[^/.]+$/, '')
}
