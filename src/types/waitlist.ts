export interface WaitlistEntry {
  id: string;
  email: string;
  name?: string;
  company?: string;
  user_id?: string | null;
  platform_id: string;
  referral_source?: string;
  help_category?: string;
  message?: string;
  // Tracking fields
  ip_address?: string;
  user_agent?: string;
  referrer_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  created_at: string;
  updated_at: string;
  // HubSpot integration metadata (may be undefined if not yet synced)
  hubspot_contact_id?: string | null;
  hubspot_company_id?: string | null;
  hubspot_sync_status?: 'success' | 'error' | 'missing' | null;
  hubspot_contact_url?: string | null;
  // Platform relationship data (populated via join)
  platforms?: {
    id: string;
    name: string;
    display_name: string;
  };
}

export interface CreateWaitlistEntry {
  email: string;
  name?: string;
  company?: string;
  user_id?: string | null;
  platform_id: string;
  referral_source?: string;
  help_category?: string;
  message?: string;
  // Tracking fields
  ip_address?: string;
  user_agent?: string;
  referrer_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export interface WaitlistResponse {
  success: boolean;
  data?: WaitlistEntry;
  error?: string;
} 