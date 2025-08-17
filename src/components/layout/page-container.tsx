import React from 'react';
import { cn } from '../../utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Whether to apply full-width background to the entire section */
  fullWidthBackground?: boolean;
  /** Custom background style/className for the section wrapper */
  backgroundClassName?: string;
  /** Custom background style object */
  backgroundStyle?: React.CSSProperties;
  /** Custom padding for the content container (overrides default responsive padding) */
  contentPadding?: string;
  /** Custom max-width for the content container (default: max-w-[1920px]) */
  maxWidth?: string;
  /** HTML element type for the container */
  as?: 'section' | 'div' | 'main' | 'article';
  /** HTML id for the container */
  id?: string;
}

/**
 * Standardized Page Container Component
 * 
 * Provides consistent container layout across all Flamingo website sections.
 * Uses the "PublicationsSection" pattern as the standard:
 * - Full-width section with background
 * - Centered content with max-width and responsive padding
 * 
 * Usage Examples:
 * 
 * // Basic usage (most common)
 * <PageContainer>
 *   <h1>Your Content</h1>
 * </PageContainer>
 * 
 * // With custom background
 * <PageContainer backgroundClassName="bg-gradient-to-b from-gray-900 to-gray-800">
 *   <h1>Your Content</h1>
 * </PageContainer>
 * 
 * // With custom padding
 * <PageContainer contentPadding="px-4 md:px-8 py-8 md:py-12">
 *   <h1>Your Content</h1>
 * </PageContainer>
 */
export function PageContainer({
  children,
  className = '',
  fullWidthBackground = true,
  backgroundClassName = 'bg-ods-bg',
  backgroundStyle,
  contentPadding = 'px-6 md:px-20 py-6 md:py-10',
  maxWidth = 'max-w-[1920px]',
  as: Component = 'section',
  id
}: PageContainerProps) {
  const content = (
    <div className={cn(maxWidth, contentPadding, 'mx-auto', className)}>
      {children}
    </div>
  );

  if (fullWidthBackground) {
    return (
      <Component 
        className={cn('w-full', backgroundClassName)} 
        style={backgroundStyle}
        id={id}
      >
        {content}
      </Component>
    );
  }

  // If fullWidthBackground is false, apply background to content container only
  return (
    <Component className="w-full" id={id}>
      <div className={cn(maxWidth, contentPadding, 'mx-auto', backgroundClassName, className)} style={backgroundStyle}>
        {children}
      </div>
    </Component>
  );
}

export default PageContainer;