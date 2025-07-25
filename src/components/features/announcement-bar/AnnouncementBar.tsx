"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../ui/button';
import { useAnnouncements } from '../../../hooks/api/useAnnouncements';

interface AnnouncementBarProps {
  apiUrl: string;
  platform: string;
  renderIcon?: (iconName: string, props?: any) => React.ReactNode;
}

export function AnnouncementBar({ apiUrl, platform, renderIcon }: AnnouncementBarProps) {
  console.log('AnnouncementBar rendered with:', { apiUrl, platform });
  
  // Don't render if platform is invalid
  if (!platform || platform === 'undefined') {
    console.warn('AnnouncementBar: Invalid platform, not rendering');
    return null;
  }
  
  const { announcements, isLoading } = useAnnouncements({ apiUrl, platform });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const activeAnnouncement = announcements?.[0];

  // Helper to determine dismissal key for localStorage
  const getDismissKey = (id: string) => `announcement-${id}-dismissed`;

  useEffect(() => {
    if (activeAnnouncement) {
      const isDismissed = localStorage.getItem(getDismissKey(activeAnnouncement.id));
      setIsVisible(!isDismissed);
    } else {
      setIsVisible(false);
    }
  }, [activeAnnouncement]);

  const handleDismiss = () => {
    if (!activeAnnouncement) return;
    localStorage.setItem(getDismissKey(activeAnnouncement.id), 'true');
    setIsVisible(false);
  };

  const handleCtaClick = () => {
    if (!activeAnnouncement?.cta_url) return;
    activeAnnouncement.cta_target === '_blank'
      ? window.open(activeAnnouncement.cta_url, '_blank', 'noopener,noreferrer')
      : (window.location.href = activeAnnouncement.cta_url);
  };

  const renderAnnouncementIcon = () => {
    if (!activeAnnouncement) return null;

    if (activeAnnouncement.icon_type === 'png' && activeAnnouncement.icon_png_url) {
      return (
        <img
          src={activeAnnouncement.icon_png_url}
          alt="Announcement icon"
          className="relative shrink-0 w-6 h-6 md:w-8 md:h-8"
          aria-hidden
        />
      );
    }

    if (renderIcon) {
      return renderIcon(
        activeAnnouncement.icon_svg_name || 'openframe-logo',
        activeAnnouncement.icon_svg_props
      );
    }

    return null;
  };

  // If loading, no announcement, or dismissed => render nothing
  if (isLoading || !activeAnnouncement || !isVisible) return null;

  return (
    <div
      className="relative w-full"
      style={{ backgroundColor: activeAnnouncement.background_color }}
    >
      <div className="flex items-center relative w-full">
        <div className="flex flex-row gap-4 md:gap-6 items-center pl-4 md:pl-6 pr-8 md:pr-10 py-1.5 md:py-2 w-full">
          {renderAnnouncementIcon()}

          <div className="flex-1 min-w-0">
            <p className="font-body font-bold text-[14px] md:text-[18px] leading-tight tracking-tight mb-0 text-[#1A1A1A]">
              {activeAnnouncement.title}
            </p>
            <p className="font-body text-[12px] md:text-[18px] leading-tight hidden sm:block text-[#1A1A1A]">
              {activeAnnouncement.description}
            </p>
          </div>

          {activeAnnouncement.cta_enabled && activeAnnouncement.cta_text && activeAnnouncement.cta_url && (
            <div className="flex-shrink-0 hidden sm:block">
              <Button
                onClick={handleCtaClick}
                variant="outline"
                size="sm"
                leftIcon={
                  activeAnnouncement.cta_show_icon && activeAnnouncement.cta_icon && renderIcon
                    ? renderIcon(activeAnnouncement.cta_icon, activeAnnouncement.cta_icon_props)
                    : undefined
                }
                className="transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: activeAnnouncement.cta_button_background_color || undefined,
                  color: activeAnnouncement.cta_button_text_color || undefined,
                  borderColor: activeAnnouncement.cta_button_background_color || undefined,
                }}
              >
                {activeAnnouncement.cta_text}
              </Button>
            </div>
          )}
        </div>

        <button
          onClick={handleDismiss}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center hover:bg-[#1A1A1A]/10 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
          aria-label="Dismiss announcement"
          type="button"
        >
          <X className="w-4 h-4 text-[#1A1A1A]" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}