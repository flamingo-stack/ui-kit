import { useQuery } from '@tanstack/react-query';
import type { PlatformConfig, PlatformOption } from '../../types/platform';

export interface UsePlatformConfigResult {
  platforms: PlatformConfig[];
  platformOptions: PlatformOption[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Custom hook to fetch platform configurations from API
 * Provides both full platform configs and simplified options for dropdowns
 * Heavily cached to prevent excessive API calls - should only call once per session
 */
export function usePlatformConfig(): UsePlatformConfigResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ['platform-config'],
    queryFn: async () => {
      console.log('🔧 Fetching platform configurations from API (should only happen once)');
      
      const response = await fetch('/api/config/platforms');
      if (!response.ok) {
        throw new Error(`Failed to fetch platform config: ${response.statusText}`);
      }
      const platforms = await response.json();
      
      console.log('✅ Platform configurations loaded:', platforms.length, 'platforms');
      return { platforms };
    },
    staleTime: Infinity, // Never consider stale - platforms rarely change
    gcTime: Infinity, // Never garbage collect - keep forever in session
    refetchOnWindowFocus: false, // Never refetch on window focus
    refetchOnReconnect: false, // Never refetch on network reconnect
    refetchOnMount: false, // Don't refetch when component mounts if data exists
    retry: 1, // Only retry once on failure
  });

  const platforms = data?.platforms || [];
  
  // Create options for dropdowns with "All Platforms" option
  const platformOptions: PlatformOption[] = [
    { value: 'all', label: 'All Platforms' },
    ...platforms.map((platform: PlatformConfig) => ({
      value: platform.value,
      label: platform.label
    }))
  ];

  return {
    platforms,
    platformOptions,
    isLoading,
    error: error as Error | null
  };
}

/**
 * Get platform configuration by value
 */
export function usePlatformByValue(value: string): PlatformConfig | undefined {
  const { platforms } = usePlatformConfig();
  return platforms.find(platform => platform.value === value);
}

/**
 * Check if a platform value is valid
 */
export function useValidatePlatform(value: string): boolean {
  const { platforms } = usePlatformConfig();
  return platforms.some(platform => platform.value === value);
} 