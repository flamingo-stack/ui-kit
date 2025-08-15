"use client"

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../../utils/cn'

export interface FigmaPrototypeSection {
  id: string
  number: string
  title: string
  description?: string
  startingNodeId: string
}

export interface FigmaPrototypeViewerConfig {
  fileKey: string
  title: string
  sections: FigmaPrototypeSection[]
  pageId?: string // Add page-id configuration
  hideUI?: boolean
  scaling?: 'min' | 'width' | 'contain'
  contentScaling?: 'fixed' | 'responsive'
  embedHost?: string
  className?: string
  iframeClassName?: string
  controlsClassName?: string
  activeControlClassName?: string
  defaultSectionId?: string
  aspectRatio?: string // e.g., "16/9", "4/3", etc.
  height?: string // for fixed height
  onSectionChange?: (sectionId: string) => void
}

interface FigmaPrototypeViewerProps {
  config: FigmaPrototypeViewerConfig
}

export const FigmaPrototypeViewer: React.FC<FigmaPrototypeViewerProps> = ({ config }) => {
  const {
    fileKey,
    title,
    sections,
    pageId = '345:10087', // Default page-id from your embed code
    hideUI = true,
    scaling = 'contain',
    contentScaling = 'responsive',
    embedHost = 'share',
    className,
    iframeClassName,
    controlsClassName,
    activeControlClassName,
    defaultSectionId,
    aspectRatio = '16/9',
    height,
    onSectionChange
  } = config

  const [activeSection, setActiveSection] = useState<string>(
    defaultSectionId || sections[0]?.id || ''
  )
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Find the active section data
  const activeSectionData = sections.find(s => s.id === activeSection)

  // Build the Figma embed URL
  const buildEmbedUrl = (startingNodeId: string) => {
    // Use the correct embed.figma.com domain with proto path
    // This is the format that Figma's official embed code uses
    const params = new URLSearchParams({
      'content-scaling': 'responsive', // Changed back to responsive for better fit
      'kind': 'proto',
      'node-id': startingNodeId.replace(':', '-'), // Convert colon to dash format
      'page-id': pageId,
      'scaling': 'width', // Changed to width to fill the entire width
      'starting-point-node-id': startingNodeId,
      'show-proto-sidebar': '0', // Hide sidebar
      'embed-host': 'share',
      'hide-ui': '1', // Hide all Figma UI controls
      'hotspot-hints': '0', // Hide hotspot hints
      'toolbar-hidden': '1', // Hide toolbar
      'faux-device-disabled': '1', // Disable any faux device frame
      'minimal-ui': '1' // Enable minimal UI mode
    })
    
    return `https://embed.figma.com/proto/${fileKey}/Flamingo-Website?${params.toString()}`
  }

  // Handle section change
  const handleSectionChange = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId)
    if (!section) return

    setIsLoading(true)
    setHasError(false)
    setActiveSection(sectionId)
    
    if (iframeRef.current) {
      iframeRef.current.src = buildEmbedUrl(section.startingNodeId)
    }

    onSectionChange?.(sectionId)
  }

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false)
    setHasError(false)
    
    // Try to inject CSS to hide Figma controls and background (may be blocked by CORS)
    try {
      const iframe = iframeRef.current
      if (iframe?.contentWindow) {
        const style = document.createElement('style')
        style.textContent = `
          /* Hide Figma UI elements and remove background */
          [class*="toolbar"], 
          [class*="bottom_bar"],
          [class*="fullscreen"],
          [class*="navigation"],
          [class*="prototype_controls"],
          [class*="device_frame"],
          [class*="background_color"] {
            display: none !important;
          }
          
          /* Remove black background */
          body, html {
            background: transparent !important;
            background-color: transparent !important;
          }
          
          /* Remove padding and margins */
          [class*="prototype_container"],
          [class*="canvas"],
          [class*="prototype_wrapper"] {
            padding: 0 !important;
            margin: 0 !important;
            background: transparent !important;
          }
        `
        iframe.contentDocument?.head?.appendChild(style)
      }
    } catch (e) {
      // Cross-origin restrictions will prevent this, but we try anyway
      console.log('Cannot inject styles into Figma iframe due to cross-origin restrictions')
    }
  }

  // Handle iframe error
  const handleIframeError = () => {
    console.error('Failed to load Figma prototype. Make sure the prototype is publicly shared.')
    setIsLoading(false)
    setHasError(true)
  }

  // Initial load
  useEffect(() => {
    if (activeSectionData && iframeRef.current) {
      iframeRef.current.src = buildEmbedUrl(activeSectionData.startingNodeId)
    }
  }, []) // Only run on mount


  // Calculate container styles - make it more flexible
  const containerStyles: React.CSSProperties = height
    ? { height, width: '100%' }
    : { minHeight: '600px', width: '100%' }

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-[296px_1fr] gap-10', className)}>
      {/* Left Column - Controls */}
      <div className={cn(
        'flex flex-col gap-2',
        controlsClassName
      )}>
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => handleSectionChange(section.id)}
            className={cn(
              'bg-ods-card border rounded-md p-6 flex gap-2 items-start',
              'shadow-ods-card transition-all duration-200',
              'hover:bg-ods-card-hover cursor-pointer text-left',
              'min-h-[96px]',
              activeSection === section.id
                ? cn('border-[var(--ods-open-yellow-base)]', activeControlClassName)
                : 'border-ods-border'
            )}
          >
            <span className="font-['DM_Sans'] font-bold text-[var(--ods-open-yellow-base)] text-lg tracking-[-0.36px] leading-[24px] shrink-0">
              {section.number}
            </span>
            <div className="flex-1">
              <p className="font-['DM_Sans'] font-medium text-ods-text-primary text-lg leading-[24px]">
                {section.title}
              </p>
              {section.description && (
                <p className="font-['DM_Sans'] text-ods-text-secondary text-sm mt-1 hidden xl:block">
                  {section.description}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Right Column - Figma Embed Container (seamless integration) */}
      <div 
        className={cn(
          'relative bg-transparent',
          // Add smooth scrolling for mobile
          'overflow-y-auto overflow-x-hidden',
          // iOS smooth scrolling
          'scrolling-touch',
          iframeClassName
        )}
        style={{
          ...containerStyles,
          WebkitOverflowScrolling: 'touch', // iOS smooth scrolling
          overscrollBehavior: 'contain', // Prevent scroll chaining
        }}
      >
        {/* Loading State */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-ods-bg z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-ods-border border-t-[var(--ods-open-yellow-base)] rounded-full animate-spin" />
              <p className="font-['DM_Sans'] text-ods-text-secondary">
                Loading prototype...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-ods-bg z-10">
            <div className="flex flex-col items-center gap-4 max-w-md text-center px-4">
              <div className="w-16 h-16 rounded-full bg-ods-error/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-ods-error" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-['DM_Sans'] font-semibold text-ods-text-primary text-lg mb-2">
                  Unable to Load Prototype
                </h3>
                <p className="font-['DM_Sans'] text-ods-text-secondary text-sm">
                  The Figma prototype cannot be displayed. This usually happens when:
                </p>
                <ul className="font-['DM_Sans'] text-ods-text-secondary text-sm mt-3 text-left list-disc list-inside">
                  <li>The prototype isn't publicly shared</li>
                  <li>The file key or node IDs are incorrect</li>
                  <li>Network connectivity issues</li>
                </ul>
                <p className="font-['DM_Sans'] text-ods-text-secondary text-xs mt-4">
                  To fix: In Figma, click Share → "Anyone with the link can view"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Figma iframe - no crop to show all content, with mobile scroll support */}
        <div 
          className="relative w-full bg-transparent" 
          style={{ 
            height: height || '100vh', 
            minHeight: '600px',
            overflow: 'visible', // Let parent handle scrolling
            position: 'relative'
          }}
        >
          <iframe
            ref={iframeRef}
            className="border-0 bg-transparent"
            style={{ 
              display: hasError ? 'none' : 'block',
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
              colorScheme: 'normal',
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'auto'
            }}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allowFullScreen
            scrolling="no" // Disable iframe's own scrolling
            title={`${title} - ${activeSectionData?.title || 'Prototype'}`}
          />
        </div>
      </div>
    </div>
  )
}

export default FigmaPrototypeViewer