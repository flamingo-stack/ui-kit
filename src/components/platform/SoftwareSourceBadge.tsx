/**
 * SoftwareSourceBadge Component
 *
 * Displays a badge for software source types from Fleet MDM.
 * Supports all osquery software source types with appropriate styling.
 *
 * Fleet MDM Software Sources:
 * - apps: macOS Applications
 * - chrome_extensions: Chrome Browser Extensions
 * - firefox_addons: Firefox Browser Extensions
 * - safari_extensions: Safari Browser Extensions
 * - ie_extensions: Internet Explorer Extensions
 * - vscode_extensions: VS Code Extensions
 * - atom_packages: Atom Packages
 * - homebrew_packages: Homebrew Packages (macOS)
 * - npm_packages: NPM Packages
 * - python_packages: Python Packages
 * - apt_sources: APT Packages (Debian/Ubuntu)
 * - deb_packages: DEB Packages
 * - rpm_packages: RPM Packages (Red Hat/CentOS)
 * - yum_sources: YUM Packages
 * - portage_packages: Portage Packages (Gentoo)
 * - chocolatey_packages: Chocolatey Packages (Windows)
 * - programs: Windows Programs
 * - pkg_packages: PKG Packages
 *
 * @example
 * ```tsx
 * <SoftwareSourceBadge source="apps" />
 * <SoftwareSourceBadge source="chrome_extensions" />
 * <SoftwareSourceBadge source="python_packages" />
 * ```
 */

import React from 'react'
import { Badge } from '../ui/badge'
import { cn } from '../../utils/cn'

export type SoftwareSource =
  | 'apps'
  | 'chrome_extensions'
  | 'firefox_addons'
  | 'safari_extensions'
  | 'ie_extensions'
  | 'vscode_extensions'
  | 'atom_packages'
  | 'homebrew_packages'
  | 'npm_packages'
  | 'python_packages'
  | 'apt_sources'
  | 'deb_packages'
  | 'rpm_packages'
  | 'yum_sources'
  | 'portage_packages'
  | 'chocolatey_packages'
  | 'programs'
  | 'pkg_packages'

export interface SoftwareSourceBadgeProps {
  /** Software source type from Fleet MDM */
  source: SoftwareSource
  /** Additional CSS classes */
  className?: string
}

/**
 * Maps source types to human-readable labels
 */
const sourceLabels: Record<SoftwareSource, string> = {
  apps: 'App',
  chrome_extensions: 'Chrome',
  firefox_addons: 'Firefox',
  safari_extensions: 'Safari',
  ie_extensions: 'IE',
  vscode_extensions: 'VS Code',
  atom_packages: 'Atom',
  homebrew_packages: 'Homebrew',
  npm_packages: 'NPM',
  python_packages: 'Python',
  apt_sources: 'APT',
  deb_packages: 'DEB',
  rpm_packages: 'RPM',
  yum_sources: 'YUM',
  portage_packages: 'Portage',
  chocolatey_packages: 'Chocolatey',
  programs: 'Windows',
  pkg_packages: 'PKG'
}

/**
 * Maps source types to badge variants for visual distinction
 */
const sourceVariants: Record<SoftwareSource, 'default' | 'secondary' | 'outline'> = {
  apps: 'default',
  chrome_extensions: 'secondary',
  firefox_addons: 'secondary',
  safari_extensions: 'secondary',
  ie_extensions: 'secondary',
  vscode_extensions: 'secondary',
  atom_packages: 'outline',
  homebrew_packages: 'default',
  npm_packages: 'outline',
  python_packages: 'outline',
  apt_sources: 'default',
  deb_packages: 'default',
  rpm_packages: 'default',
  yum_sources: 'default',
  portage_packages: 'default',
  chocolatey_packages: 'default',
  programs: 'default',
  pkg_packages: 'default'
}

export const SoftwareSourceBadge: React.FC<SoftwareSourceBadgeProps> = ({
  source,
  className
}) => {
  const label = sourceLabels[source] || source
  const variant = sourceVariants[source] || 'default'

  return (
    <Badge
      variant={variant}
      className={cn(
        'font-[\'DM_Sans\'] font-normal text-[12px] leading-[16px] px-2 py-1',
        className
      )}
    >
      {label}
    </Badge>
  )
}

SoftwareSourceBadge.displayName = 'SoftwareSourceBadge'
