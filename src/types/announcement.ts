// Stub announcement types
export interface Announcement {
  id: string;
  title: string;
  message: string;
  description?: string;
  type: 'info' | 'warning' | 'error' | 'success';
  priority: 'low' | 'medium' | 'high';
  platform: string;
  isActive: boolean;
  createdAt: string;
  expiresAt?: string;
  iconUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
  
  // Additional properties used in announcement-bar
  cta_url?: string;
  cta_target?: string;
  cta_enabled?: boolean;
  cta_text?: string;
  cta_show_icon?: boolean;
  cta_icon?: string;
  cta_icon_props?: any;
  cta_button_background_color?: string;
  cta_button_text_color?: string;
  icon_type?: string;
  icon_png_url?: string;
  icon_svg_name?: string;
  icon_svg_props?: any;
  background_color?: string;
}