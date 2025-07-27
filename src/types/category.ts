export interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    icon_url?: string;
    iconUrls: string[];
    subcategory_count?: number;
    categoryCount?: number;
    productCount?: number;
  };
  vendorCount?: number;
  subcategoryCount?: number;
  index?: number;
  className?: string;
}

export interface RealCategoryCardProps {
  category: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    icon_url?: string;
  };
  vendorCount?: number;
  subcategoryCount?: number;
  className?: string;
}

export interface CategoryData {
  data: any[];
  isLoading: boolean;
  error: any;
  vendors: any[];
  loading: boolean;
}