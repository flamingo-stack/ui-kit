export type Platform = 'openmsp' | 'admin-hub' | 'openframe' | 'flamingo' | 'flamingo-teaser';

export interface PlatformConfig {
  platform: Platform;
  name: string;
  accentColor: string;
  isDarkTheme: boolean;
  isLightTheme: boolean;
}

export interface ApiConfig {
  baseUrl: string;
  endpoints: {
    announcements: string;
    vendors: string;
    auth: string;
  };
}