'use client';

import React from 'react';

export interface HighlightCardItem {
  category: string;
  categoryColor: string;
  highlightBg: string;
  description: string;
}

export interface HighlightCardProps {
  item: HighlightCardItem;
  className?: string;
}

export function HighlightCard({
  item,
  className = ''
}: HighlightCardProps) {
  return (
    <div className={`bg-ods-bg p-10 relative ${className}`}>
      <div className="relative">
        <div
          className="absolute rounded-md h-10 left-[95px] top-0"
          style={{
            backgroundColor: item.highlightBg,
            width: `${item.category.length * 14}px`
          }}
        />
        <h3 className="font-['Azeret_Mono'] font-semibold text-[28px] md:text-[32px] leading-[1.25] tracking-[-0.64px] text-ods-text-primary relative z-10">
          Your{' '}
          <span style={{ color: item.categoryColor }}>
            {item.category}
          </span>
          {' '}{item.description}
        </h3>
      </div>
    </div>
  );
}

export interface HighlightCardGridProps {
  items: HighlightCardItem[];
  columns?: 2 | 3;
  className?: string;
  cardClassName?: string;
}

export function HighlightCardGrid({
  items,
  columns = 2,
  className = '',
  cardClassName = 'bg-ods-card border border-ods-border rounded-lg p-0 overflow-hidden'
}: HighlightCardGridProps) {
  const gridCols = columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3';
  const itemsPerRow = columns;
  const rows = Math.ceil(items.length / itemsPerRow);

  return (
    <div className={`${cardClassName} ${className}`}>
      {Array.from({ length: rows }, (_, rowIndex) => {
        const startIndex = rowIndex * itemsPerRow;
        const rowItems = items.slice(startIndex, startIndex + itemsPerRow);
        const isLastRow = rowIndex === rows - 1;

        return (
          <div 
            key={rowIndex} 
            className={`grid ${gridCols} ${!isLastRow ? 'border-b border-ods-border' : ''}`}
          >
            {rowItems.map((item, itemIndex) => {
              const isLastInRow = itemIndex === rowItems.length - 1;
              const borderClass = !isLastInRow ? 'border-r border-ods-border' : '';

              return (
                <HighlightCard
                  key={startIndex + itemIndex}
                  item={item}
                  className={borderClass}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}