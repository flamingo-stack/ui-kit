'use client';

import React from 'react';
import { Card } from './card';

export interface FeatureCardItem {
  icon?: React.ComponentType<{ size?: number; color?: string; className?: string }>;
  iconColor?: string;
  title: string;
  badge?: {
    text: string;
    color: string;
  };
  content: React.ReactNode; // Allow any content to be injected
  // Card-level customization props
  removeAllBorders?: boolean;  // Remove all borders for this card
  noBackground?: boolean;      // Remove default background
  customBackground?: string;   // Custom background color/class
}

export interface FeatureCardGridProps {
  items: FeatureCardItem[];
  columns?: 2 | 3;
  className?: string;
  cardClassName?: string;
  itemClassName?: string;
  showBorders?: boolean;
}

export function FeatureCardGrid({
  items,
  columns = 3,
  className = '',
  cardClassName = 'bg-ods-card border border-ods-border rounded-lg p-0 overflow-hidden',
  itemClassName = 'bg-ods-bg p-10',
  showBorders = true
}: FeatureCardGridProps) {
  const gridCols = columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3';
  const itemsPerRow = columns;
  const rows = Math.ceil(items.length / itemsPerRow);

  const getBorderClasses = (isLastRow: boolean, isLastInRow: boolean, globalIndex: number) => {
    if (!showBorders) return '';
    
    let classes = '';
    
    // Right border - responsive logic
    if (!isLastInRow) {
      // On mobile (1 column), never show right border
      // On desktop (2/3 columns), show right border except for last in row
      classes += ' md:border-r border-ods-border';
    }
    
    // Bottom border logic
    const isLastItem = globalIndex === items.length - 1;
    
    // Mobile: bottom border for all except last item
    if (!isLastItem) {
      classes += ' border-b border-ods-border';
    }
    
    // Desktop: override mobile border, show bottom border for all rows except last
    if (!isLastRow) {
      classes += ' md:border-b border-ods-border';
    } else {
      // Last row on desktop - remove bottom border
      classes += ' md:border-b-0';
    }
    
    return classes;
  };

  // Check if all cards have noBackground to modify card container
  const allCardsHaveNoBackground = items.every(item => item.noBackground);
  const allCardsHaveNoBorders = items.every(item => item.removeAllBorders);

  let finalCardClassName = cardClassName;
  if (allCardsHaveNoBackground) {
    finalCardClassName = finalCardClassName.replace('bg-ods-card', 'bg-transparent');
  }
  if (allCardsHaveNoBorders) {
    finalCardClassName = finalCardClassName.replace(/border\s+border-ods-border/g, '').replace(/border-ods-border/g, '').replace(/border/g, '').replace('rounded-lg', '').trim();
  }

  return (
    <Card className={`${finalCardClassName} ${className}`}>
      {Array.from({ length: rows }, (_, rowIndex) => {
        const startIndex = rowIndex * itemsPerRow;
        const rowItems = items.slice(startIndex, startIndex + itemsPerRow);
        const isLastRow = rowIndex === rows - 1;

        return (
          <div key={rowIndex} className={`grid ${gridCols}`}>
            {rowItems.map((item, itemIndex) => {
              const globalIndex = startIndex + itemIndex;
              const isLastInRow = itemIndex === rowItems.length - 1;
              const borderClasses = getBorderClasses(isLastRow, isLastInRow, globalIndex);

              // Apply card-level customizations
              let finalItemClassName = itemClassName;
              let finalBorderClasses = borderClasses;

              // Handle background customization
              if (item.noBackground) {
                finalItemClassName = finalItemClassName.replace('bg-ods-bg', 'bg-transparent');
              } else if (item.customBackground) {
                finalItemClassName = finalItemClassName.replace('bg-ods-bg', item.customBackground);
              }

              // Handle border removal
              if (item.removeAllBorders) {
                finalBorderClasses = '';
              }

              return (
                <div
                  key={globalIndex}
                  className={`${finalItemClassName}${finalBorderClasses} relative`}
                >
                  <div className="space-y-6">
                    {item.icon && (
                      <div className="flex items-start justify-between">
                        <item.icon size={80} color={item.iconColor} />
                        {item.badge && (
                          <div className={`px-2 py-1 rounded text-sm font-['Azeret_Mono'] font-medium uppercase tracking-wide ${item.badge.color}`}>
                            {item.badge.text}
                          </div>
                        )}
                      </div>
                    )}

                    {!item.icon && item.badge && (
                      <div className="flex items-start justify-end">
                        <div className={`px-2 py-1 rounded text-sm font-['Azeret_Mono'] font-medium uppercase tracking-wide ${item.badge.color}`}>
                          {item.badge.text}
                        </div>
                      </div>
                    )}

                    <h3 className="font-['Azeret_Mono'] font-semibold text-[28px] md:text-[32px] leading-[1.25] tracking-[-0.64px] text-ods-text-primary whitespace-pre-line">
                      {item.title}
                    </h3>

                    {item.content}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </Card>
  );
}