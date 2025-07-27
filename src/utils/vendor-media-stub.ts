// Vendor media utilities for UI kit
// Real implementation copied from main project

export interface VendorMedia {
  media_type: 'logo' | 'image' | 'video';
  media_url: string;
}

export interface VendorWithMedia {
  id?: number;
  title: string;
  slug?: string;
  logo?: string | null;
  logo_url?: string; // Support direct logo_url field from lightweight API
  vendor_media?: VendorMedia[];
}

/**
 * Fix Supabase storage URLs specifically
 */
function fixSupabaseStorageUrl(url: string): string {
  if (!url) return url;
  
  const SUPABASE_STORAGE_SEGMENT = '/storage/v1/object/public/';
  
  if (url.includes(SUPABASE_STORAGE_SEGMENT)) {
    // Fix double slashes while preserving protocol
    const protocolMatch = url.match(/^(https?:\/\/)/);
    if (protocolMatch) {
      const protocol = protocolMatch[1];
      const rest = url.substring(protocol.length);
      const fixedRest = rest.replace(/\/+/g, '/');
      return protocol + fixedRest;
    }
    return url.replace(/\/+/g, '/');
  }
  
  return url;
}

/**
 * Get the logo URL from vendor_media array or direct logo_url field
 */
export function getVendorLogo(vendor: VendorWithMedia): string | null {
  // First check for direct logo_url field (from lightweight API)
  if (vendor.logo_url) {
    return fixSupabaseStorageUrl(vendor.logo_url);
  }
  
  // Check for legacy logo field
  if (vendor.logo) {
    return fixSupabaseStorageUrl(vendor.logo);
  }
  
  // Fallback to vendor_media array (from detailed API)
  const logoMedia = vendor.vendor_media?.find(m => m.media_type === 'logo');
  return logoMedia?.media_url ? fixSupabaseStorageUrl(logoMedia.media_url) : null;
}