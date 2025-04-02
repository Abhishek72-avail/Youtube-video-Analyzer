import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractVideoId(url: string): string | null {
  const urlObj = new URL(url);
  
  // Standard YouTube URL
  if (urlObj.hostname.includes('youtube.com') && urlObj.pathname === '/watch') {
    return urlObj.searchParams.get('v');
  }

  // YouTube short URL (youtu.be)
  if (urlObj.hostname === 'youtu.be') {
    return urlObj.pathname.substring(1);
  }

  return null;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function getElapsedTime(publishedAt: string): string {
  const publishedDate = new Date(publishedAt);
  const now = new Date();
  
  const diffInMs = now.getTime() - publishedDate.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  
  if (diffInDays < 1) {
    return 'today';
  } else if (diffInDays < 2) {
    return 'yesterday';
  } else if (diffInDays < 7) {
    return `${Math.floor(diffInDays)} days ago`;
  } else if (diffInDays < 30) {
    return `${Math.floor(diffInDays / 7)} weeks ago`;
  } else if (diffInDays < 365) {
    return `${Math.floor(diffInDays / 30)} months ago`;
  } else {
    return `${Math.floor(diffInDays / 365)} years ago`;
  }
}
