"use client";

import React from 'react';
import { Button } from '../ui/button';
import { Globe } from 'lucide-react';
import { FlamingoLogo } from '../icons/flamingo-logo';
import { OpenFrameLogo } from '../icons/openframe-logo';
import { OpenmspLogo } from '../icons/openmsp-logo';
import type { PlatformConfig } from '../../types/platform';

// Small platform icons for buttons with white colors
const smallPlatformIcons = {
  openframe: <OpenFrameLogo className="h-4 w-4 flex-shrink-0" lowerPathColor="#FFC008" upperPathColor="#ffffff" />,
  openmsp: <OpenmspLogo className="h-4 w-4 flex-shrink-0" frontBubbleColor="#f1f1f1" innerFrontBubbleColor="#000000" backBubbleColor="#FFC008" />,
  flamingo: <FlamingoLogo className="h-4 w-4 flex-shrink-0 text-white" />,
  'flamingo-teaser': <FlamingoLogo className="h-4 w-4 flex-shrink-0 text-white" />,
  universal: <Globe className="h-4 w-4 flex-shrink-0" />
};

export interface PlatformFilterComponentProps {
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  platforms: PlatformConfig[];
  className?: string;
  showIcons?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

export function PlatformFilterComponent({
  selectedPlatform,
  onPlatformChange,
  platforms = [],
  className = '',
  showIcons = true,
  size = 'sm'
}: PlatformFilterComponentProps) {
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      <Button
        type="button"
        variant={selectedPlatform === 'all' ? "primary" : "outline"}
        size={size}
        onClick={() => onPlatformChange('all')}
        className="font-['DM_Sans'] text-[16px] md:text-[18px] font-bold"
      >
        All Platforms
      </Button>
      {platforms.map((platform) => (
        <Button
          key={platform.value}
          type="button"
          variant={selectedPlatform === platform.value ? "primary" : "outline"}
          size={size}
          onClick={() => onPlatformChange(platform.value)}
          leftIcon={showIcons ? (smallPlatformIcons[platform.value as keyof typeof smallPlatformIcons] || <Globe className="h-4 w-4 flex-shrink-0" />) : undefined}
          className="font-['DM_Sans'] text-[16px] md:text-[18px] font-bold"
        >
          {platform.label}
        </Button>
      ))}
    </div>
  );
}