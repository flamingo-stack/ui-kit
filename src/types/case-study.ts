// Case Study Types
// Following the blog.ts pattern for consistency

import type { PlatformRecord } from './platform'
import type { BlogTag } from './blog'
import type { MSP } from './stack'
import type { UserProfile } from './user'

export interface CaseStudy {
  id: number
  title: string
  slug: string
  summary: string | null
  content: string | null
  featured_image: string | null

  // OpenMSP user (MSP info comes through user.msp_id)
  user_id: string | null // OpenMSP user who owns this case study
  industry: string | null
  company_size: 'small' | 'midmarket' | 'enterprise' | 'enterprise_1000+' | null
  company_location: string | null

  // Story structure
  challenge: string | null
  solution: string | null
  results: string | null
  results_metrics: Record<string, any>

  // Testimonial
  testimonial_quote: string | null
  testimonial_author: string | null
  testimonial_role: string | null
  testimonial_video_url: string | null

  // Media
  screenshot_urls: string[]

  // SEO
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
  og_image_url: string | null

  // Publishing
  status: 'draft' | 'published' | 'scheduled' | 'archived'
  published_at: string | null
  author_id: string | null

  // Timestamps
  created_at: string
  updated_at: string

  // Analytics
  view_count: number

  // Relations (populated by joins)
  platforms?: PlatformRecord[]
  tags?: BlogTag[]
  user?: UserProfile // Populated user data (includes msp_id)
  msp?: MSP // Populated MSP data via user.msp_id
  case_study_platforms?: Array<{
    platform_id: string
    is_featured: boolean
    featured_order: number | null
  }>
  case_study_tags?: Array<{
    tag_id: number
  }>
  blog_tags?: BlogTag[]
}

export interface CreateCaseStudyData {
  title: string
  slug: string
  summary?: string
  content?: string
  featured_image?: string
  user_id?: string // OpenMSP user ID (UUID) - MSP comes through user.msp_id
  industry?: string
  company_size?: 'small' | 'midmarket' | 'enterprise' | 'enterprise_1000+'
  company_location?: string
  challenge?: string
  solution?: string
  results?: string
  results_metrics?: Record<string, any>
  testimonial_quote?: string
  testimonial_author?: string
  testimonial_role?: string
  testimonial_video_url?: string
  screenshot_urls?: string[]
  seo_title?: string
  seo_description?: string
  seo_keywords?: string
  og_image_url?: string
  status: 'draft' | 'published' | 'scheduled' | 'archived'
  published_at?: string | null
  author_id: string
  platforms: string[] // Array of platform IDs (UUIDs)
  featured_platform?: string // Platform ID for featured
  tags: number[] // Array of tag IDs
}

export type UpdateCaseStudyData = Partial<CreateCaseStudyData>

export interface CaseStudyFilters {
  platform?: string | 'all'
  tags?: string[]
  industry?: string
  company_size?: string
  search?: string
  featured?: boolean
  status?: string
  limit?: number
  offset?: number
}

export interface CaseStudyListResponse {
  data: CaseStudy[]
  count: number
}

// Company size options for dropdowns
export const companySizeOptions = [
  { value: 'small', label: 'Small Business (1-50 employees)' },
  { value: 'midmarket', label: 'Mid-Market (51-500 employees)' },
  { value: 'enterprise', label: 'Enterprise (501-1000 employees)' },
  { value: 'enterprise_1000+', label: 'Large Enterprise (1000+ employees)' }
] as const

// Industry options (can be expanded)
export const industryOptions = [
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Financial Services' },
  { value: 'legal', label: 'Legal / Professional Services' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail / E-commerce' },
  { value: 'technology', label: 'Technology' },
  { value: 'nonprofit', label: 'Non-Profit' },
  { value: 'government', label: 'Government' },
  { value: 'other', label: 'Other' }
] as const
