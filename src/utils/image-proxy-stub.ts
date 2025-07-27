// Image proxy utilities for UI kit
// Real implementation copied from main project

/**
 * Get proxied image URL for external images
 * If it's an external HTTP/HTTPS URL, proxy it through our API
 * Otherwise, return the original URL
 */
export function getProxiedImageUrl(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  
  // If it's an external HTTP/HTTPS URL, determine if we should proxy it
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    // Skip if it's already our own proxy URL
    if (imageUrl.includes('/api/image-proxy')) {
      return imageUrl;
    }
    
    // Skip proxying for OpenMSP-owned domains (e.g., app.openmsp.ai, cdn.openmsp.ai, etc.)
    if (imageUrl.includes('openmsp.ai')) {
      return imageUrl;
    }
    
    return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
  }
  
  // Return local/relative images as-is
  return imageUrl;
}