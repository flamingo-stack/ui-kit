// Stub category types
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  parentId?: number;
  subcategories?: Category[];
}

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  description?: string;
}