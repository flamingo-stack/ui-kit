import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { CategoryCardProps, RealCategoryCardProps } from '@/types/categories';
import { useVendors, useSubcategoryCountByCategory } from '@/hooks/api-hooks';
import { getVendorLogo } from '@/lib/utils/vendor-media';
import { getProxiedImageUrl } from '@/lib/utils/image-proxy';

// Legacy component for backward compatibility
export function CategoriesCart({ category, className = '' }: CategoryCardProps) {
  return (
    <Link
      href="/vendors"
      className={`block bg-ods-card border border-ods-border rounded-lg p-3 md:p-4 pb-4 md:pb-6 hover:border-[#FFC008] transition-colors group relative ${className}`}
    >
      <div className="flex flex-col gap-4 md:gap-6">
        {/* Vendor Icons Grid */}
        <div className="relative w-full h-8 md:h-10 overflow-hidden">
          <div className="flex gap-2 md:gap-3 w-full">
            {category.iconUrls.map((iconUrl, index) => (
              <div
                key={index}
                className="w-8 h-8 md:w-10 md:h-10 bg-[#161616] rounded flex items-center justify-center flex-shrink-0 overflow-hidden p-1 relative"
              >
                <Image
                  src={iconUrl}
                  alt={`Vendor ${index + 1}`}
                  width={20}
                  height={20}
                  className="w-full h-full object-contain filter grayscale opacity-60"
                />
                <div className="absolute inset-0 bg-[#424242] opacity-20 rounded pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Gradient overlays for fade effect */}
          <div className="absolute inset-y-0 left-0 w-4 md:w-6 bg-gradient-to-r from-[#212121] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-4 md:w-6 bg-gradient-to-l from-[#212121] to-transparent pointer-events-none" />
        </div>

        {/* Category Information */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl md:text-2xl font-bold text-ods-text-primary group-hover:text-ods-accent transition-colors leading-[1.33] font-body">
              {category.name}
            </h3>
            <p className="text-sm md:text-base font-medium text-ods-text-secondary leading-[1.43] font-body">
              {category.categoryCount} Categories • {category.productCount} Products
            </p>
          </div>

          <div className="flex items-start md:items-end justify-between gap-4 md:gap-6">
            <p className="font-['DM_Sans'] font-medium text-lg leading-[1.33] text-ods-text-primary flex-1">
              {category.description}
            </p>

            {/* Arrow Button */}
            <div
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-transparent border border-ods-border rounded-md group-hover:bg-[#FFC008] transition-colors flex-shrink-0"
              aria-label={`View ${category.name} category`}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// New component that fetches real vendor data
export function RealCategoriesCart({ category, className = '' }: RealCategoryCardProps) {
  const { data: vendorsData, isLoading } = useVendors({filtering: ["category=="+category.slug], pageSize: 14, lightweight: true});
  const vendorCount = vendorsData?.total || 0;
  const vendors = vendorsData?.vendors || [];
  const { data: subcategoryCount, isLoading: isLoadingSubcategoryCount } = useSubcategoryCountByCategory(category.slug);

  return (
    <Link
      href={`/vendors?category=${category.slug}`}
      className={`block bg-ods-card border border-ods-border rounded-lg p-3 md:p-4 pb-4 md:pb-6 hover:border-[#FFC008] transition-colors group relative ${className}`}
    >
      <div className="flex flex-col gap-4 md:gap-6">
        {/* Vendor Icons Grid */}
        <div className="relative w-full h-8 md:h-10 overflow-hidden">
          <div className="flex gap-2 md:gap-3 w-full">
            {isLoading ? (
              // Skeleton loading for vendor icons
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="w-8 h-8 md:w-10 md:h-10 bg-ods-border rounded animate-pulse flex-shrink-0"
                />
              ))
            ) : vendors && vendors.length > 0 ? (
              vendors.map((vendor: any, index: number) => (
                <div
                  key={vendor.id}
                  className="w-8 h-8 md:w-10 md:h-10 bg-[#161616] rounded flex items-center justify-center flex-shrink-0 overflow-hidden p-1 relative"
                >
                  {getVendorLogo(vendor) ? (
                    <Image
                      src={getProxiedImageUrl(getVendorLogo(vendor)!) || getVendorLogo(vendor)!}
                      alt={vendor.title}
                      width={20}
                      height={20}
                      className="w-full h-full object-contain filter grayscale opacity-60"
                    />
                  ) : (
                    // Fallback for vendors without logos
                    <div className="w-full h-full bg-ods-border rounded flex items-center justify-center">
                      <span className="text-xs md:text-sm font-bold text-ods-text-secondary">
                        {vendor.title?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[#424242] opacity-20 rounded pointer-events-none" />
                </div>
              ))
            ) : (
              // No vendors found - show placeholder icons
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="w-8 h-8 md:w-10 md:h-10 bg-ods-border rounded flex items-center justify-center opacity-30 flex-shrink-0"
                >
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-[#888888] rounded-sm" />
                </div>
              ))
            )}
          </div>

          {/* Gradient overlays for fade effect */}
          <div className="absolute inset-y-0 left-0 w-4 md:w-6 bg-gradient-to-r from-[#212121] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-4 md:w-6 bg-gradient-to-l from-[#212121] to-transparent pointer-events-none" />
        </div>

        {/* Category Information - Updated to use real data */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl md:text-2xl font-bold text-ods-text-primary group-hover:text-ods-accent transition-colors leading-[1.33] font-body">
              {category.name}
            </h3>
            <p className="text-sm md:text-base font-medium text-ods-text-secondary leading-[1.43] font-body">
              {isLoadingSubcategoryCount ? '...' : (subcategoryCount || 0)} Subcategories • {isLoading ? '...' : (vendorCount || 0)} Products
            </p>
          </div>

          <div className="flex items-start md:items-end justify-between gap-4 md:gap-6">
            <p className="font-['DM_Sans'] font-medium text-lg leading-[1.33] text-ods-text-primary flex-1">
              {category.description}
            </p>

            {/* Arrow Button */}
            <div
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-transparent border border-ods-border rounded-md group-hover:bg-[#FFC008] transition-colors flex-shrink-0"
              aria-label={`View ${category.name} category`}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

