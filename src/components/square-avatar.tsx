"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { getProxiedImageUrl } from '@/lib/utils/image-proxy';

interface SquareAvatarProps {
  /** Image URL (if null/undefined, renders initials fallback) */
  src?: string | null;
  /** Fallback name used to derive initials when no image */
  fallbackName?: string;
  /** Size in px (applied to width & height). Defaults to 56 (Tailwind w-14 h-14). */
  size?: number;
  className?: string;
}

/**
 * Square avatar with rounded edges used across cards / dashboards.
 * Automatically shows image (via proxied URL) or initials fallback.
 */
export function SquareAvatar({ src, fallbackName = '', size = 56, className }: SquareAvatarProps) {
  const initials = React.useMemo(() => {
    if (!fallbackName) return '';
    return fallbackName
      .split(' ')
      .map((n) => n.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }, [fallbackName]);

  const style: React.CSSProperties = { width: size, height: size };

  return (
    <div
      className={cn(
        'rounded-lg border border-ods-border flex items-center justify-center overflow-hidden flex-shrink-0 bg-[#161616]',
        className,
      )}
      style={style}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={getProxiedImageUrl(src) || src} alt="Avatar" className="object-cover w-full h-full" />
      ) : (
        <span className="font-['DM_Sans'] text-ods-text-primary text-lg font-bold">{initials}</span>
      )}
    </div>
  );
} 