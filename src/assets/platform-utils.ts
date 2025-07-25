/**
 * Platform-specific asset path utilities
 * Actual assets are served from /public/assets/ in the main application
 */

export type PlatformType = 'admin-hub' | 'flamingo-teaser' | 'flamingo' | 'openframe' | 'openmsp'

export interface PlatformAssets {
  favicon: string
  faviconSvg?: string
  appleTouchIcon: string
  ogImage: string
  twitterImage?: string
  manifest: string
}

/**
 * Get asset paths for a specific platform
 * @param platform - Platform identifier
 * @returns Asset paths object with relative URLs
 */
export function getPlatformAssets(platform: PlatformType): PlatformAssets {
  const basePath = `/assets/${platform}`
  
  return {
    favicon: `${basePath}/favicon.ico`,
    faviconSvg: `${basePath}/favicon.svg`,
    appleTouchIcon: `${basePath}/apple-touch-icon.png`,
    ogImage: `${basePath}/og-image.png`,
    twitterImage: `${basePath}/twitter-image.png`,
    manifest: `${basePath}/site.webmanifest`
  }
}

/**
 * Available platforms
 */
export const PLATFORMS: PlatformType[] = [
  'admin-hub',
  'flamingo-teaser', 
  'flamingo',
  'openframe',
  'openmsp'
]