'use client';

import React from 'react';
import { Card } from './card';

export interface FeatureCardItem {
  icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
  iconColor: string;
  title: string;
  badge?: {
    text: string;
    color: string;
  };
  content: React.ReactNode; // Allow any content to be injected
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

  const getBorderClasses = (isLastRow: boolean, isLastInRow: boolean) => {
    if (!showBorders) return '';
    
    let classes = '';
    
    // Right border - not on last item in row
    if (!isLastInRow) {
      classes += ' border-r border-ods-border';
    }
    
    // Bottom border - not on last row
    if (!isLastRow) {
      classes += ' border-b border-ods-border';
    }
    
    return classes;
  };

  return (
    <Card className={`${cardClassName} ${className}`}>
      {Array.from({ length: rows }, (_, rowIndex) => {
        const startIndex = rowIndex * itemsPerRow;
        const rowItems = items.slice(startIndex, startIndex + itemsPerRow);
        const isLastRow = rowIndex === rows - 1;

        return (
          <div key={rowIndex} className={`grid ${gridCols}`}>
            {rowItems.map((item, itemIndex) => {
              const isLastInRow = itemIndex === rowItems.length - 1;
              const borderClasses = getBorderClasses(isLastRow, isLastInRow);

              return (
                <div
                  key={startIndex + itemIndex}
                  className={`${itemClassName}${borderClasses} relative`}
                >
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <item.icon size={64} color={item.iconColor} />
                      {item.badge && (
                        <div className={`px-2 py-1 rounded text-sm font-['Azeret_Mono'] font-medium uppercase tracking-wide ${item.badge.color}`}>
                          {item.badge.text}
                        </div>
                      )}
                    </div>
                    
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