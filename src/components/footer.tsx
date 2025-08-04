import { Suspense } from "react"
import { OpenmspLogo, FlamingoLogo, OpenFrameLogo } from "./icons"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"
import { FooterWaitlistCard } from "./footer-waitlist-card"
import { SocialIconRow } from "./social-icon-row"
import type { PlatformName } from "../types/platform"

interface FooterLink {
  href: string
  label: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface FooterConfig {
  name: string
  legalName: string
  description: string
  sections: FooterSection[]
  customComponent?: React.ReactNode  // Inject any custom component here
}

interface FooterProps {
  platform?: PlatformName
  config?: FooterConfig
  renderLink?: (link: FooterLink) => React.ReactNode
  renderLogo?: () => React.ReactNode
}

function NavLinkSkeleton() {
  return <Skeleton className="h-5 md:h-6 w-20 md:w-24" />
}

/**
 * Platform-Aware Footer Component
 * Accepts configuration from app-config.ts
 */
export function Footer({ platform, config, renderLink, renderLogo }: FooterProps) {
  // Config is required - no hardcoded fallbacks
  if (!config) {
    console.warn('Footer: No config provided')
    return null
  }

  // Get the appropriate logo based on platform
  const logo = renderLogo ? renderLogo() : getDefaultLogo(platform)
  
  return <UniversalFooter config={config} logo={logo} renderLink={renderLink} />
}

// Helper to get default logo for platform
function getDefaultLogo(platform?: PlatformName): React.ReactNode {
  switch (platform) {
    case 'flamingo':
      return <FlamingoLogo width={32} height={32} className="flex-shrink-0 w-8 h-8" />
    case 'openframe':
      return <OpenFrameLogo width={32} height={32} className="flex-shrink-0 w-8 h-8" />
    case 'openmsp':
    default:
      return (
        <OpenmspLogo 
          width={32} 
          height={32} 
          frontBubbleColor="var(--color-text-primary)" 
          innerFrontBubbleColor="var(--color-bg)" 
          backBubbleColor="var(--color-accent-primary)" 
          className="flex-shrink-0 w-8 h-8" 
        />
      )
  }
}

/**
 * Universal Footer Component
 * Renders footer based on provided config
 */
function UniversalFooter({ config, logo, renderLink }: { config: FooterConfig; logo?: React.ReactNode; renderLink?: (link: FooterLink) => React.ReactNode }) {
  const defaultRenderLink = (link: FooterLink) => (
    <a href={link.href} className="font-body font-medium text-md md:text-md leading-[1.33] text-ods-text-primary hover:text-ods-accent-primary transition-colors">
      {link.label}
    </a>
  )
  
  const linkRenderer = renderLink || defaultRenderLink
  
  return (
    <footer className="w-full flex flex-col justify-center items-center bg-ods-card px-6 py-10 relative gap-6 md:gap-6 min-h-[auto] md:min-h-[248px] z-50">
      <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-start">
        
        {/* Column 1: Logo and description */}
        <div className="flex flex-col gap-4 md:gap-6 items-start text-left col-span-1">
          {/* Logo and name */}
          <div className="flex items-center gap-2">
            {logo && (
              <Suspense fallback={<Skeleton className="w-8 h-8" />}>
                {logo}
              </Suspense>
            )}
            <span className="font-heading text-heading-5 font-bold text-ods-text-primary whitespace-nowrap">{config.name}</span>
          </div>
          
          <p className="font-body font-medium text-sm md:text-sm leading-[1.43] text-ods-text-primary">
            {config.description}
          </p>
          
          <SocialIconRow className="pt-2" />
        </div>
        
        {/* Dynamic sections */}
        {config.sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-3 items-start text-left col-span-1">
            <h3 className="font-heading font-semibold text-sm leading-[1.43] uppercase tracking-[-0.02em] text-ods-text-muted">
              {section.title}
            </h3>
            <div className="flex flex-col gap-2">
              {section.links.map((link, linkIndex) => (
                <Suspense key={linkIndex} fallback={<NavLinkSkeleton />}>
                  {linkRenderer(link)}
                </Suspense>
              ))}
            </div>
          </div>
        ))}
        
        {/* Custom component column - inject whatever component is needed */}
        {config.customComponent && (
          <div className="flex flex-col col-span-1">
            <Suspense fallback={<Skeleton className="h-32 w-full" />}>
              {config.customComponent}
            </Suspense>
          </div>
        )}
      </div>
      
      {/* Copyright */}
      <p className="font-body font-medium text-md md:text-md leading-[1.33] text-center w-full text-ods-text-muted pt-4 md:pt-0">
        © {new Date().getFullYear()} {config.legalName}. All rights reserved.
      </p>
    </footer>
  )
}

