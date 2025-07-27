// Stub implementation for vendor media utilities
// This is a placeholder for UI kit compilation

export interface VendorWithMedia {
  id?: number;
  title: string;
  slug?: string;
  logo?: string | null;
}

export function getVendorLogo(vendor: VendorWithMedia): string | null {
  return vendor.logo || null;
}