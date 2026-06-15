import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTikTokEmbedUrl(url: string | undefined | null): string | null {
  if (!url) return null;
  const tikTokRegex = /(?:tiktok\.com\/@[\w.-]+\/video\/|tiktok\.com\/v\/|tiktok\.com\/embed\/v2\/)(\d+)/i;
  const match = url.match(tikTokRegex);
  if (match && match[1]) {
    return `https://www.tiktok.com/embed/v2/${match[1]}`;
  }
  return null;
}
