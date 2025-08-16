"use client"

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { cn } from '../../utils/cn'

export interface FigmaPrototypeSection {
  id: string
  number: string
  title: string
  description?: string
  startingNodeId: string
  mobileStartingNodeId?: string  // Optional mobile-specific node ID
}

export interface FigmaPrototypeViewerConfig {
  fileKey: string
  title: string
  sections: FigmaPrototypeSection[]
  className?: string
  iframeClassName?: string
  controlsClassName?: string
  activeControlClassName?: string
  defaultSectionId?: string
  height?: string
  onSectionChange?: (sectionId: string) => void
  showDebugPanel?: boolean
  mobileStartingPoint?: string  // Optional mobile-specific starting point for embed URL
  desktopStartingPoint?: string // Optional desktop-specific starting point for embed URL
}

interface FigmaPrototypeViewerProps {
  config: FigmaPrototypeViewerConfig
}

// Figma Embed Kit 2.0 Event Types
type FigmaEventType = 
  | 'MOUSE_PRESS_OR_RELEASE'
  | 'PRESENTED_NODE_CHANGED' 
  | 'INITIAL_LOAD'
  | 'NEW_STATE'
  | 'REQUEST_CLOSE'

interface FigmaEvent {
  type: FigmaEventType
  data?: {
    presentedNodeId?: string
    [key: string]: any
  }
}

// Figma Embed Kit 2.0 Navigation Commands
interface FigmaNavigationCommand {
  type: 'NAVIGATE_TO_FRAME_AND_CLOSE_OVERLAYS'
  data: {
    nodeId: string
  }
}

export const FigmaPrototypeViewer: React.FC<FigmaPrototypeViewerProps> = ({ config }) => {
  const {
    fileKey,
    sections,
    className,
    iframeClassName,
    controlsClassName,
    activeControlClassName,
    defaultSectionId,
    height = '800px',
    onSectionChange,
    showDebugPanel = false,
    mobileStartingPoint,
    desktopStartingPoint
  } = config

  // Detect if we're on mobile
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // State
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '')
  const [isLoading, setIsLoading] = useState(true)
  const [isNavigating, setIsNavigating] = useState(false)
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [showIframe, setShowIframe] = useState(false)
  
  // Refs
  const iframeRef = useRef<HTMLIFrameElement>(null)
  
  // Debug state
  const [eventHistory, setEventHistory] = useState<Array<{ 
    time: number
    type: string
    data?: any 
  }>>([])

  // Get client ID from environment
  const clientId = process.env.NEXT_PUBLIC_FIGMA_CLIENT_ID || 'UTQPwZHR9OZp68TTGPFFi5'

  // Build embed URL with embed_origin for postMessage communication
  const embedUrl = useMemo(() => {
    const firstSection = sections[0]
    if (!firstSection) return ''
    
    // Use device-specific starting point if provided
    let startingNodeId = firstSection.startingNodeId
    
    if (isMobile) {
      // Use mobile starting point if provided, or mobile node ID from first section
      startingNodeId = mobileStartingPoint || firstSection.mobileStartingNodeId || firstSection.startingNodeId
    } else {
      // Use desktop starting point if provided
      startingNodeId = desktopStartingPoint || firstSection.startingNodeId
    }
    
    const params = new URLSearchParams({
      'node-id': startingNodeId.replace(':', '-'),
      'embed-host': 'flamingo',
      'embed_origin': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
      'client-id': clientId,
      'hide-ui': '1',
      'hotspot-hints': '0',
      'scaling': 'scale-down-width',
      'starting-point-node-id': startingNodeId.replace(':', '-'),
      'mode': 'prototype',
      'enable-prototype-interactions': '1',
      'chrome': 'DOCUMENTATION',
      'allow-fullscreen': '1'
    })
    
    return `https://embed.figma.com/proto/${fileKey}?${params.toString()}`
  }, [fileKey, clientId, sections, isMobile, mobileStartingPoint, desktopStartingPoint])

  // Navigate using Figma Embed Kit 2.0 postMessage API (no iframe reload)
  const navigateToSection = useCallback((sectionId: string) => {
    const section = sections.find(s => s.id === sectionId)
    if (!section || !iframeRef.current?.contentWindow || !isInitialized) return

    // Use mobile node ID if on mobile and available, otherwise use desktop node ID
    const nodeId = isMobile && section.mobileStartingNodeId ? section.mobileStartingNodeId : section.startingNodeId

    if (showDebugPanel) {
      console.log('[Navigate] To section:', sectionId, 'node:', nodeId, 'mobile:', isMobile)
    }

    setIsNavigating(true)
    setActiveSection(sectionId)
    onSectionChange?.(sectionId)

    // Use Figma Embed Kit 2.0 postMessage API for smooth navigation
    const command: FigmaNavigationCommand = {
      type: 'NAVIGATE_TO_FRAME_AND_CLOSE_OVERLAYS',
      data: {
        nodeId: nodeId
      }
    }
    
    // Send navigation command to Figma iframe
    iframeRef.current.contentWindow.postMessage(command, 'https://www.figma.com')
    
    if (showDebugPanel) {
      setEventHistory(prev => [...prev.slice(-9), {
        time: Date.now(),
        type: 'POSTMESSAGE_NAVIGATE',
        data: { sectionId, nodeId, command, mobile: isMobile }
      }])
    }

    // Clear navigation flag immediately (no iframe reload)
    setIsNavigating(false)
  }, [sections, onSectionChange, showDebugPanel, isInitialized, isMobile])

  // Handle section button click
  const handleSectionClick = useCallback((sectionId: string) => {
    if (sectionId === activeSection || isNavigating) return
    navigateToSection(sectionId)
    
    // On mobile, scroll to the Figma viewer when manually clicking sections
    if (isMobile && iframeRef.current) {
      // Small delay to ensure navigation starts before scrolling
      setTimeout(() => {
        iframeRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        })
      }, 100)
    }
  }, [activeSection, isNavigating, navigateToSection, isMobile])

  // Handle Figma events
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.figma.com') return

      const validEvents: FigmaEventType[] = [
        'MOUSE_PRESS_OR_RELEASE',
        'PRESENTED_NODE_CHANGED',
        'INITIAL_LOAD',
        'NEW_STATE',
        'REQUEST_CLOSE'
      ]

      if (event.data?.type && validEvents.includes(event.data.type)) {
        const figmaEvent = event.data as FigmaEvent
        
        // Debug logging
        if (showDebugPanel) {
          console.log('[Event]', figmaEvent.type, figmaEvent.data)
          setEventHistory(prev => [...prev.slice(-9), {
            time: Date.now(),
            type: figmaEvent.type,
            data: figmaEvent.data
          }])
        }

        switch (figmaEvent.type) {
          case 'INITIAL_LOAD':
            setIsLoading(false)
            setIsInitialized(true)
            if (showDebugPanel) {
              console.log('[Initial Load] Prototype loaded, waiting for first render...')
            }
            break

          case 'NEW_STATE':
            // Wait for first NEW_STATE to ensure Figma is fully rendered
            setShowIframe(true)
            if (showDebugPanel) {
              console.log('[New State] Figma fully rendered, showing iframe')
            }
            break

          case 'PRESENTED_NODE_CHANGED':
            if (figmaEvent.data?.presentedNodeId) {
              const nodeId = figmaEvent.data.presentedNodeId
              setCurrentNodeId(nodeId)
              
              // Auto-sync sections if not manually navigating
              if (!isNavigating) {
                const matchingSection = sections.find(s => {
                  // Check both desktop and mobile node IDs
                  const desktopNormalized = s.startingNodeId.replace(':', '-')
                  const mobileNormalized = s.mobileStartingNodeId?.replace(':', '-')
                  
                  return desktopNormalized === nodeId || 
                         s.startingNodeId === nodeId ||
                         mobileNormalized === nodeId ||
                         s.mobileStartingNodeId === nodeId
                })
                
                if (matchingSection && matchingSection.id !== activeSection) {
                  if (showDebugPanel) {
                    console.log('[Auto-sync] Section:', matchingSection.id, 'from node:', nodeId)
                  }
                  setActiveSection(matchingSection.id)
                  onSectionChange?.(matchingSection.id)
                }
              }
            }
            break
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [sections, activeSection, onSectionChange, showDebugPanel, isNavigating])

  // Debug panel commands using URL navigation
  const sendCommand = useCallback((command: string) => {
    if (!iframeRef.current) return

    if (showDebugPanel) {
      setEventHistory(prev => [...prev.slice(-9), {
        time: Date.now(),
        type: 'COMMAND',
        data: { command }
      }])
    }

    switch (command) {
      case 'RESTART':
        if (sections[0]) {
          navigateToSection(sections[0].id)
        }
        break
      case 'NAVIGATE_FORWARD':
        // Find next section
        const currentIndex = sections.findIndex(s => s.id === activeSection)
        const nextSection = sections[currentIndex + 1]
        if (nextSection) {
          navigateToSection(nextSection.id)
        }
        break
      case 'NAVIGATE_BACKWARD':
        // Find previous section
        const currentIdx = sections.findIndex(s => s.id === activeSection)
        const prevSection = sections[currentIdx - 1]
        if (prevSection) {
          navigateToSection(prevSection.id)
        }
        break
    }
  }, [showDebugPanel, sections, activeSection, navigateToSection])

  return (
    <>
      <div className={cn('grid grid-cols-1 lg:grid-cols-[296px_1fr] gap-10', className)}>
        {/* Section Controls */}
        <div className={cn('flex flex-col gap-2', controlsClassName)}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              disabled={isNavigating}
              className={cn(
                'bg-ods-card border rounded-md p-6 flex gap-2 items-start',
                'shadow-ods-card transition-all duration-200',
                'hover:bg-ods-card-hover cursor-pointer text-left',
                'min-h-[96px]',
                'disabled:opacity-50 disabled:cursor-not-allowed',
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

        {/* Figma Prototype Container - NO BACKGROUND STYLING */}
        <div 
          className={cn('relative w-full overflow-hidden rounded-lg border border-ods-border', iframeClassName)}
          style={{ height }}
        >
          {/* Layer 2: Full colored background (ODS colors) */}
          {!showIframe && (
            <div className="absolute inset-0 w-full h-full bg-ods-bg z-10" />
          )}

          {/* Layer 1: Loading skeleton with border (ODS colors, highest z-index) */}
          {!showIframe && (
            <div className="absolute inset-0 w-full h-full border-2 border-ods-border rounded-lg bg-ods-bg-secondary animate-pulse z-20" />
          )}

          {/* Figma iframe - Always render but visually hide until ready */}
          {embedUrl && (
            <iframe
              ref={iframeRef}
              src={embedUrl}
              className="w-full h-full border-0"
              style={{ 
                minHeight: height,
                width: 'calc(100% + 40px)',
                height: 'calc(100% + 40px)',
                marginLeft: '-20px',
                marginTop: '-20px',
                background: 'transparent',
                opacity: showIframe ? 1 : 0,
                pointerEvents: showIframe ? 'auto' : 'none'
              }}
              allowFullScreen
              title={config.title}
              loading="lazy"
            />
          )}
        </div>
      </div>
      
      {/* Debug Panel */}
      {showDebugPanel && (
        <div className="mt-6 p-4 bg-ods-card border border-ods-border rounded-md">
          <h3 className="font-semibold text-ods-text-primary mb-3">
            🔍 Debug Panel
          </h3>
          
          {/* Device Mode */}
          <div className="mb-3 p-2 bg-ods-bg rounded text-sm">
            <span className="text-ods-text-secondary">Device Mode:</span>{' '}
            <span className={isMobile ? "text-blue-500 font-semibold" : "text-green-500 font-semibold"}>
              {isMobile ? '📱 Mobile' : '🖥️ Desktop'}
            </span>
            {' '}
            <span className="text-ods-text-secondary text-xs">
              (viewport: {typeof window !== 'undefined' ? window.innerWidth : 0}px)
            </span>
          </div>
          
          {/* Status */}
          <div className="mb-3 grid grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-ods-text-secondary">Loading:</span>{' '}
              <span className={isLoading ? "text-yellow-500" : "text-green-500"}>
                {isLoading ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <span className="text-ods-text-secondary">Navigating:</span>{' '}
              <span className={isNavigating ? "text-orange-500" : "text-gray-500"}>
                {isNavigating ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <span className="text-ods-text-secondary">Section:</span>{' '}
              <span className="text-ods-text-primary">{activeSection}</span>
            </div>
            <div>
              <span className="text-ods-text-secondary">Node:</span>{' '}
              <span className="text-ods-text-primary text-xs">{currentNodeId || 'unknown'}</span>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="mb-3 flex gap-2">
            <button
              onClick={() => sendCommand('NAVIGATE_BACKWARD')}
              className="px-3 py-1 rounded text-sm bg-blue-500 text-white hover:bg-blue-600"
            >
              ← Back
            </button>
            <button
              onClick={() => sendCommand('RESTART')}
              className="px-3 py-1 rounded text-sm bg-purple-500 text-white hover:bg-purple-600"
            >
              Restart
            </button>
            <button
              onClick={() => sendCommand('NAVIGATE_FORWARD')}
              className="px-3 py-1 rounded text-sm bg-blue-500 text-white hover:bg-blue-600"
            >
              Next →
            </button>
          </div>
          
          {/* Events */}
          <div className="max-h-24 overflow-y-auto p-2 bg-ods-bg rounded text-xs space-y-1">
            {eventHistory.length === 0 ? (
              <div className="text-ods-text-secondary">No events yet...</div>
            ) : (
              eventHistory.slice().reverse().map((event, i) => (
                <div key={`${event.time}-${i}`} className="flex gap-2">
                  <span className="text-ods-text-secondary">
                    {new Date(event.time).toLocaleTimeString()}
                  </span>
                  <span className={cn(
                    "font-medium",
                    event.type === 'INITIAL_LOAD' && "text-green-400",
                    event.type === 'PRESENTED_NODE_CHANGED' && "text-blue-400",
                    event.type === 'NEW_STATE' && "text-purple-400",
                    event.type === 'POSTMESSAGE_NAVIGATE' && "text-cyan-400",
                    event.type === 'COMMAND' && "text-orange-400",
                    !['INITIAL_LOAD', 'PRESENTED_NODE_CHANGED', 'NEW_STATE', 'POSTMESSAGE_NAVIGATE', 'COMMAND'].includes(event.type) && "text-gray-400"
                  )}>
                    {event.type}
                  </span>
                  {event.data && (
                    <span className="text-ods-text-secondary truncate flex-1">
                      {JSON.stringify(event.data)}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default FigmaPrototypeViewer