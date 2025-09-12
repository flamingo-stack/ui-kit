'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from './button';

export interface BrandAssociationItem {
  icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
  title: string;
  description: string;
  buttonText: string;
  link: string;
}

export interface BrandAssociationCardProps {
  item: BrandAssociationItem;
  className?: string;
}

export function BrandAssociationCard({
  item,
  className = ''
}: BrandAssociationCardProps) {
  return (
    <div className={`bg-ods-bg p-10 relative ${className}`}>
      <div className="space-y-6">
        {/* Icon */}
        <item.icon size={64} color="currentColor" />
        
        {/* Title */}
        <h3 className="font-['Azeret_Mono'] font-semibold text-[28px] md:text-[32px] leading-[1.25] tracking-[-0.64px] text-ods-text-primary">
          {item.title}
        </h3>
        
        {/* Description */}
        <p className="font-['DM_Sans'] font-normal text-[16px] leading-[1.5] text-ods-text-secondary">
          {item.description}
        </p>
        
        {/* Browse Button */}
        <Button 
          variant="outline"
          size="sm"
          href={item.link}
          openInNewTab
          rightIcon={<ExternalLink  className="h-4 w-4" />}
        >
          Browse {item.buttonText}
        </Button>
      </div>
    </div>
  );
}