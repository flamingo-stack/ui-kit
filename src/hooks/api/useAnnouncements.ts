import { useState, useEffect } from 'react';

interface UseAnnouncementsProps {
  apiUrl: string;
  platform: string;
}

interface Announcement {
  id: string;
  title: string;
  description: string;
  background_color: string;
  icon_type: 'svg' | 'png';
  icon_svg_name?: string;
  icon_svg_props?: any;
  icon_png_url?: string;
  cta_enabled: boolean;
  cta_text?: string;
  cta_url?: string;
  cta_target?: '_blank' | '_self';
  cta_show_icon: boolean;
  cta_icon?: string;
  cta_icon_props?: any;
  cta_button_background_color?: string;
  cta_button_text_color?: string;
}

export function useAnnouncements({ apiUrl, platform }: UseAnnouncementsProps) {
  const [announcements, setAnnouncements] = useState<Announcement[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Ensure platform is valid
      if (!platform || platform === 'undefined') {
        console.warn('useAnnouncements: Invalid platform provided:', platform);
        setAnnouncements([]);
        return;
      }
      
      const url = apiUrl 
        ? `${apiUrl}/api/announcements/active/${platform}`
        : `/api/announcements/active/${platform}`;
      
      console.log('useAnnouncements fetching:', url);
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        if (data.announcement) {
          setAnnouncements([data.announcement]);
        } else {
          setAnnouncements([]);
        }
      } else {
        setError(`Error fetching announcements: ${response.status}`);
        setAnnouncements([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setAnnouncements([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!platform) return;
    
    fetchAnnouncements();

    // Refresh every 60 seconds
    const interval = setInterval(fetchAnnouncements, 60_000);
    return () => clearInterval(interval);
  }, [apiUrl, platform]);

  return {
    announcements,
    isLoading,
    error,
    refetch: fetchAnnouncements
  };
}