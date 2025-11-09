// Product Release Types
// Following the blog.ts pattern for consistency

import type { PlatformRecord } from './platform'
import type { BlogTag } from './blog'

export interface ChangelogEntry {
  title: string
  description?: string
  category?: string
  issue_number?: string
}

export interface ProductRelease {
  id: number
  title: string
  slug: string
  version: string
  summary: string | null
  content: string | null

  // Release metadata
  release_type: 'major' | 'minor' | 'patch' | 'beta' | 'alpha'
  release_status: 'alpha' | 'beta' | 'stable' | 'deprecated'
  release_date: string

  // Changelog (JSONB arrays)
  features_added: ChangelogEntry[]
  bugs_fixed: ChangelogEntry[]
  improvements: ChangelogEntry[]
  breaking_changes: ChangelogEntry[]

  // GitHub integration
  github_release_ids: string[]

  // External relationships
  knowledge_base_links: string[] // Knowledge base article slugs/URLs
  clickup_task_ids: string[] // ClickUp task IDs from roadmap (enhancements/bugs)

  // Media
  featured_image: string | null
  screenshot_urls: string[]
  demo_video_url: string | null

  // Documentation
  migration_guide_url: string | null
  documentation_url: string | null

  // SEO
  seo_title: string | null
  seo_description: string | null
  og_image_url: string | null

  // Publishing
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  author_id: string | null

  // Timestamps
  created_at: string
  updated_at: string

  // Analytics
  view_count: number
  download_count: number

  // Relations (populated by joins)
  platforms?: PlatformRecord[]
  tags?: BlogTag[]
  product_release_platforms?: Array<{
    platform_id: string
    is_featured: boolean
    featured_order: number | null
  }>
  product_release_tags?: Array<{
    tag_id: number
  }>
  blog_tags?: BlogTag[]
}

export interface CreateProductReleaseData {
  title: string
  slug: string
  version: string
  summary?: string
  content?: string
  release_type: 'major' | 'minor' | 'patch' | 'beta' | 'alpha'
  release_status: 'alpha' | 'beta' | 'stable' | 'deprecated'
  release_date: string
  features_added?: ChangelogEntry[]
  bugs_fixed?: ChangelogEntry[]
  improvements?: ChangelogEntry[]
  breaking_changes?: ChangelogEntry[]
  github_release_ids?: string[]
  knowledge_base_links?: string[] // Knowledge base article slugs/URLs
  clickup_task_ids?: string[] // ClickUp task IDs from roadmap
  featured_image?: string
  screenshot_urls?: string[]
  demo_video_url?: string
  migration_guide_url?: string
  documentation_url?: string
  seo_title?: string
  seo_description?: string
  og_image_url?: string
  status: 'draft' | 'published' | 'archived'
  published_at?: string | null
  author_id: string
  platforms: string[] // Array of platform IDs (UUIDs)
  featured_platform?: string // Platform ID for featured
  tags: number[] // Array of tag IDs
}

export type UpdateProductReleaseData = Partial<CreateProductReleaseData>

export interface ProductReleaseFilters {
  platform?: string | 'all'
  tags?: string[]
  version?: string
  release_type?: ('major' | 'minor' | 'patch' | 'beta' | 'alpha')[]
  release_status?: ('alpha' | 'beta' | 'stable' | 'deprecated')[]
  has_breaking_changes?: boolean
  search?: string
  featured?: boolean
  status?: string
  limit?: number
  offset?: number
}

export interface ProductReleaseListResponse {
  data: ProductRelease[]
  count: number
}

// GitHub Release interface (for wizard)
export interface GitHubRelease {
  id: string
  tag_name: string
  name: string
  body: string
  published_at: string
  html_url: string
  prerelease: boolean
  draft: boolean
}

// Release type options for dropdowns
export const releaseTypeOptions = [
  { value: 'major', label: 'Major Release', description: 'Breaking changes, new architecture', color: 'red' },
  { value: 'minor', label: 'Minor Release', description: 'New features, backward compatible', color: 'blue' },
  { value: 'patch', label: 'Patch Release', description: 'Bug fixes only', color: 'green' },
  { value: 'beta', label: 'Beta Release', description: 'Pre-release testing version', color: 'yellow' },
  { value: 'alpha', label: 'Alpha Release', description: 'Early testing version', color: 'orange' }
] as const

// Release status options
export const releaseStatusOptions = [
  { value: 'alpha', label: 'Alpha', description: 'Early development, unstable', color: 'orange' },
  { value: 'beta', label: 'Beta', description: 'Feature complete, testing', color: 'yellow' },
  { value: 'stable', label: 'Stable', description: 'Production ready', color: 'green' },
  { value: 'deprecated', label: 'Deprecated', description: 'No longer supported', color: 'gray' }
] as const

// Changelog category icons
export const changelogIcons = {
  features_added: '✨',
  bugs_fixed: '🐛',
  improvements: '⚡',
  breaking_changes: '🚨'
} as const

// Semantic versioning validation regex
export const SEMVER_REGEX = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/
