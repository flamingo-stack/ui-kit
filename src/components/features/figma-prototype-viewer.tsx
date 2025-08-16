"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
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
  pageId?: string
  hideUI?: boolean
  scaling?: 'min' | 'width' | 'contain'
  contentScaling?: 'fixed' | 'responsive'
  embedHost?: string
  className?: string
  iframeClassName?: string
  controlsClassName?: string
  activeControlClassName?: string
  defaultSectionId?: string
  aspectRatio?: string
  height?: string
  onSectionChange?: (sectionId: string) => void
  showDebugPanel?: boolean
}

interface FigmaPrototypeViewerProps {
  config: FigmaPrototypeViewerConfig
}

// Figma Embed Kit 2.0 Event Types (based on the official example)
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

export const FigmaPrototypeViewer: React.FC<FigmaPrototypeViewerProps> = ({ config }) => {
  const {
    fileKey,
    title,
    sections,
    pageId = '345:10087',
    className,
    iframeClassName,
    controlsClassName,
    activeControlClassName,
    defaultSectionId,
    height,
    onSectionChange,
    showDebugPanel = false
  } = config

  const [activeSection, setActiveSection] = useState<string>(
    defaultSectionId || sections[0]?.id || ''
  )
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [hasError, setHasError] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null)
  const [canNavigateBack, setCanNavigateBack] = useState(false)
  const [canNavigateForward, setCanNavigateForward] = useState(true)
  const [eventHistory, setEventHistory] = useState<Array<{ time: number; type: string; data?: any }>>([])

  // Find the active section data
  const activeSectionData = sections.find(s => s.id === activeSection)

  // Build the Figma embed URL with client-id for event support
  const buildEmbedUrl = useCallback((startingNodeId: string) => {
    const params = new URLSearchParams({
      'node-id': startingNodeId.replace(':', '-'),
      'embed-host': 'flamingo',
      'client-id': 'UTQPwZHR9OZp68TTGPFFi5' // Registered Figma app client ID
    })
    
    return `https://embed.figma.com/proto/${fileKey}?${params.toString()}`
  }, [fileKey])

  // Send commands to Figma prototype (Embed Kit 2.0 format)
  const sendCommand = useCallback((type: 'NAVIGATE_FORWARD' | 'NAVIGATE_BACKWARD' | 'RESTART') => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type },
        'https://www.figma.com'
      )
      
      // Log command for debugging
      if (showDebugPanel) {
        setEventHistory(prev => [...prev, {
          time: Date.now(),
          type: 'COMMAND_SENT',
          data: { command: type }
        }])
      }
    }
  }, [showDebugPanel])

  // Handle messages from Figma (Embed Kit 2.0 events - works with registered client-id)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only process messages from Figma
      if (event.origin !== 'https://www.figma.com') {
        return
      }

      const prototypeEvents: FigmaEventType[] = [
        'MOUSE_PRESS_OR_RELEASE',
        'PRESENTED_NODE_CHANGED',
        'INITIAL_LOAD',
        'NEW_STATE',
        'REQUEST_CLOSE'
      ]

      // Check if this is a valid Figma event
      if (event.data?.type && prototypeEvents.includes(event.data.type)) {
        const figmaEvent = event.data as FigmaEvent
        
        // Always log events when debug panel is shown
        if (showDebugPanel) {
          console.log('[FIGMA EVENT]', figmaEvent.type, figmaEvent.data)
          setEventHistory(prev => [...prev.slice(-19), {
            time: Date.now(),
            type: figmaEvent.type,
            data: figmaEvent.data
          }])
        }

        // Handle specific event types
        switch (figmaEvent.type) {
          case 'INITIAL_LOAD':
            // Prototype is ready - enable controls
            setIsReady(true)
            setShowSkeleton(false)
            setCanNavigateForward(true)
            setCanNavigateBack(false) // Can't go back at start
            
            if (showDebugPanel) {
              console.log('✅ Figma Embed API Ready! Events are working!')
            }
            break

          case 'PRESENTED_NODE_CHANGED':
            // Node/screen changed in the prototype
            if (figmaEvent.data?.presentedNodeId) {
              const nodeId = figmaEvent.data.presentedNodeId
              setCurrentNodeId(nodeId)
              
              // Check if this is a starting node for any section
              const matchingSection = sections.find(s => {
                const normalizedStartNode = s.startingNodeId.replace(':', '-')
                return s.startingNodeId === nodeId || normalizedStartNode === nodeId
              })
              
              // Update active section if we navigated to a section start
              if (matchingSection && matchingSection.id !== activeSection) {
                setActiveSection(matchingSection.id)
                onSectionChange?.(matchingSection.id)
              }
              
              // Update navigation buttons based on node
              const isFirstNode = sections.some(s => {
                const normalizedStartNode = s.startingNodeId.replace(':', '-')
                return s.startingNodeId === nodeId || normalizedStartNode === nodeId
              })
              setCanNavigateBack(!isFirstNode)
              
              // For now, always allow forward navigation unless we know it's the last node
              // You can add specific logic here based on your prototype structure
              setCanNavigateForward(true)
            }
            setShowSkeleton(false) // Hide skeleton when content changes
            break

          case 'NEW_STATE':
            // Prototype state changed
            setShowSkeleton(false)
            setIsReady(true) // Ensure ready state
            break

          case 'MOUSE_PRESS_OR_RELEASE':
            // User interaction detected
            // This event doesn't provide much useful data, but we log it
            break

          case 'REQUEST_CLOSE':
            // Prototype requested to be closed
            // You could handle this by showing a confirmation or navigating away
            if (showDebugPanel) {
              console.log('Prototype requested close')
            }
            break
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [sections, showDebugPanel, activeSection, onSectionChange])

  // Handle section change
  const handleSectionChange = useCallback((sectionId: string) => {
    const section = sections.find(s => s.id === sectionId)
    if (!section) return

    // Show skeleton briefly when changing sections
    if (activeSection !== sectionId) {
      setShowSkeleton(true)
      setIsReady(false)
      setCurrentNodeId(null)
      
      // Update iframe src
      if (iframeRef.current) {
        const newUrl = buildEmbedUrl(section.startingNodeId)
        iframeRef.current.src = newUrl
      }
    }
    
    setActiveSection(sectionId)
    onSectionChange?.(sectionId)
  }, [sections, buildEmbedUrl, onSectionChange, activeSection])

  // Handle iframe load event
  const handleIframeLoad = useCallback(() => {
    // Iframe loaded successfully
    setHasError(false)
    // Hide skeleton after a short delay since Figma doesn't send INITIAL_LOAD for prototypes
    setTimeout(() => {
      setShowSkeleton(false)
      setIsReady(true)
    }, 1500)
  }, [])

  // Handle iframe error
  const handleIframeError = useCallback(() => {
    console.error('[FIGMA] Failed to load prototype')
    setShowSkeleton(false)
    setHasError(true)
  }, [])

  // Initial src
  const initialSrc = activeSectionData ? buildEmbedUrl(activeSectionData.startingNodeId) : ''

  // Calculate container styles
  const containerStyles: React.CSSProperties = height
    ? { height, width: '100%' }
    : { minHeight: '600px', width: '100%' }

  return (
    <>
      <div className={cn('grid grid-cols-1 lg:grid-cols-[296px_1fr] gap-10', className)}>
        {/* Left Column - Controls */}
        <div className={cn('flex flex-col gap-2', controlsClassName)}>
          {sections.map((section) => (
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

        {/* Right Column - Figma Embed */}
        <div 
          className={cn(
            'relative bg-transparent overflow-y-auto overflow-x-hidden scrolling-touch',
            iframeClassName
          )}
          style={{
            ...containerStyles,
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
          }}
        >
          {/* Error State */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-ods-bg z-40">
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
                    Please ensure the Figma prototype is publicly shared.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Figma iframe container */}
          <div 
            className="relative w-full bg-ods-bg rounded-lg overflow-hidden" 
            style={{ 
              height: height || '100vh', 
              minHeight: '600px',
              position: 'relative'
            }}
          >
            {/* Skeleton - show while loading */}
            {showSkeleton && !hasError && (
              <div className="absolute inset-0 bg-ods-bg z-30 pointer-events-none">
                <div className="w-full h-full flex flex-col bg-ods-bg">
                  {/* Top bar skeleton */}
                  <div className="h-16 bg-ods-card border-b border-ods-border flex items-center px-6">
                    <div className="h-8 w-32 bg-ods-bg-secondary rounded animate-pulse" />
                  </div>
                  
                  {/* Main content area skeleton */}
                  <div className="flex-1 p-6 bg-ods-bg">
                    <div className="max-w-3xl mx-auto space-y-6">
                      <div className="h-10 w-3/4 bg-ods-bg-secondary rounded animate-pulse" />
                      <div className="h-6 w-full bg-ods-bg-secondary rounded animate-pulse" />
                      <div className="h-12 w-full bg-ods-card border border-ods-border rounded-md animate-pulse" />
                      
                      <div className="flex gap-3 flex-wrap">
                        <div className="h-10 w-32 bg-ods-card border border-ods-border rounded-md animate-pulse" />
                        <div className="h-10 w-40 bg-ods-card border border-ods-border rounded-md animate-pulse" />
                        <div className="h-10 w-36 bg-ods-card border border-ods-border rounded-md animate-pulse" />
                      </div>
                      
                      <div className="flex justify-end mt-8">
                        <div className="h-12 w-12 bg-[var(--ods-open-yellow-base)] rounded animate-pulse opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Figma iframe */}
            <iframe
              ref={iframeRef}
              src={initialSrc}
              className="border-0"
              style={{ 
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 20,
                display: hasError ? 'none' : 'block'
              }}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              allowFullScreen
              scrolling="no"
              title={`${title} - ${activeSectionData?.title || 'Prototype'}`}
            />
          </div>
        </div>
      </div>
      
      {/* Debug Panel for Event Tracking */}
      {showDebugPanel && (
        <div className="mt-6 p-4 bg-ods-card border border-ods-border rounded-md">
          <h3 className="font-['DM_Sans'] font-semibold text-ods-text-primary text-lg mb-3">
            🔍 Figma Embed Kit 2.0 Event Tracker
          </h3>
          
          {/* Current State */}
          <div className="mb-4 p-3 bg-ods-bg-secondary rounded">
            <p className="font-['DM_Sans'] text-sm text-ods-text-secondary mb-1">Current State:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-ods-text-secondary">Active Section:</span>{' '}
                <span className="text-ods-text-primary font-medium">
                  {sections.find(s => s.id === activeSection)?.title || activeSection}
                </span>
              </div>
              <div>
                <span className="text-ods-text-secondary">Current Node ID:</span>{' '}
                <span className="text-ods-text-primary font-medium">{currentNodeId || 'unknown'}</span>
              </div>
              <div>
                <span className="text-ods-text-secondary">Prototype Ready:</span>{' '}
                <span className={cn("font-medium", isReady ? "text-green-500" : "text-yellow-500")}>
                  {isReady ? 'Yes' : 'No'}
                </span>
              </div>
              <div>
                <span className="text-ods-text-secondary">Loading:</span>{' '}
                <span className={cn("font-medium", showSkeleton ? "text-yellow-500" : "text-green-500")}>
                  {showSkeleton ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Control Buttons (for testing) */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => sendCommand('NAVIGATE_BACKWARD')}
              disabled={!isReady || !canNavigateBack}
              className={cn(
                "px-3 py-1 rounded text-sm font-medium",
                isReady && canNavigateBack 
                  ? "bg-blue-500 text-white hover:bg-blue-600" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              )}
            >
              ← Previous
            </button>
            <button
              onClick={() => sendCommand('RESTART')}
              disabled={!isReady}
              className={cn(
                "px-3 py-1 rounded text-sm font-medium",
                isReady 
                  ? "bg-purple-500 text-white hover:bg-purple-600" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              )}
            >
              Restart
            </button>
            <button
              onClick={() => sendCommand('NAVIGATE_FORWARD')}
              disabled={!isReady || !canNavigateForward}
              className={cn(
                "px-3 py-1 rounded text-sm font-medium",
                isReady && canNavigateForward 
                  ? "bg-blue-500 text-white hover:bg-blue-600" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              )}
            >
              Next →
            </button>
          </div>
          
          {/* Event History */}
          <div>
            <p className="font-['DM_Sans'] text-sm text-ods-text-secondary mb-2">
              Event History (last 20):
            </p>
            <div className="max-h-40 overflow-y-auto p-2 bg-ods-bg rounded border border-ods-border">
              {eventHistory.length === 0 ? (
                <p className="text-xs text-ods-text-secondary">No events captured yet. Interact with the prototype!</p>
              ) : (
                <div className="space-y-1">
                  {eventHistory.slice(-20).reverse().map((event, index) => (
                    <div key={eventHistory.length - index} className="flex items-start gap-2 text-xs">
                      <span className="text-ods-text-secondary whitespace-nowrap">
                        {new Date(event.time).toLocaleTimeString()}
                      </span>
                      <span className={cn(
                        "px-2 py-0.5 rounded font-medium whitespace-nowrap",
                        event.type === 'INITIAL_LOAD' && "bg-green-500/20 text-green-400",
                        event.type === 'PRESENTED_NODE_CHANGED' && "bg-blue-500/20 text-blue-400",
                        event.type === 'NEW_STATE' && "bg-purple-500/20 text-purple-400",
                        event.type === 'MOUSE_PRESS_OR_RELEASE' && "bg-orange-500/20 text-orange-400",
                        event.type === 'REQUEST_CLOSE' && "bg-red-500/20 text-red-400",
                        event.type === 'COMMAND_SENT' && "bg-cyan-500/20 text-cyan-400",
                        !['INITIAL_LOAD', 'PRESENTED_NODE_CHANGED', 'NEW_STATE', 'MOUSE_PRESS_OR_RELEASE', 'REQUEST_CLOSE', 'COMMAND_SENT'].includes(event.type) && "bg-gray-500/20 text-gray-400"
                      )}>
                        {event.type}
                      </span>
                      {event.data && (
                        <span className="text-ods-text-primary text-xs truncate flex-1">
                          {JSON.stringify(event.data)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Event Types Legend */}
          <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded">
            <p className="text-xs text-blue-400 font-medium mb-1">Available Figma Events:</p>
            <ul className="text-xs text-blue-400 space-y-0.5">
              <li>• <strong>INITIAL_LOAD</strong>: Prototype finished loading</li>
              <li>• <strong>PRESENTED_NODE_CHANGED</strong>: User navigated to different screen (includes node ID)</li>
              <li>• <strong>NEW_STATE</strong>: Prototype state changed</li>
              <li>• <strong>MOUSE_PRESS_OR_RELEASE</strong>: User clicked (no position data)</li>
              <li>• <strong>REQUEST_CLOSE</strong>: User wants to close prototype</li>
            </ul>
            {isReady ? (
              <p className="text-xs text-green-400 mt-2">
                ✅ Figma Embed API is connected and working! Client ID: UTQPwZHR9OZp68TTGPFFi5
              </p>
            ) : (
              <p className="text-xs text-orange-400 mt-2">
                ⚠️ Waiting for Figma Embed API connection... Make sure http://localhost:3000 is in allowed origins.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default FigmaPrototypeViewer