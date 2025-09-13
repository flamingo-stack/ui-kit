import React from 'react';
import { FlamingoLogo } from './flamingo-logo';

interface MadeWithLoveProps {
  /** Custom class name for the container */
  className?: string;
  /** Size variant for the component */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show on mobile (responsive) */
  showOnMobile?: boolean;
}

export function MadeWithLove({
  className = '',
  size = 'md',
  showOnMobile = true
}: MadeWithLoveProps) {
  const sizeConfig = {
    sm: {
      fontSize: 'text-xs sm:text-sm',
      logoSize: 14, // Slightly larger than text for visual balance
      fontSizePx: '0.75rem', // 12px
      spacing: 'gap-1'
    },
    md: {
      fontSize: 'text-sm sm:text-base',
      logoSize: 16, // Matches base text size (16px)
      fontSizePx: '0.875rem', // 14px
      spacing: 'gap-1'
    },
    lg: {
      fontSize: 'text-base sm:text-lg',
      logoSize: 20, // Slightly larger than text for visual balance
      fontSizePx: '1rem', // 16px
      spacing: 'gap-1.5'
    }
  };

  const config = sizeConfig[size];
  const mobileVisibility = showOnMobile ? 'block' : 'hidden sm:block';

  return (
    <div
      className={`${mobileVisibility} flex inline-block items-center ${config.spacing} ${className}`}
    >
      Made with love by{' '}
      <FlamingoLogo
        size={config.logoSize}
        color="var(--ods-flamingo-pink-base)"
      />
      <span
        style={{
          fontFamily: '"Azeret Mono", monospace',
          marginLeft: 5,
          fontWeight: 600,
          fontSize: config.fontSizePx,
        }}
      >
        Flamingo
      </span>
    </div>
  );
}