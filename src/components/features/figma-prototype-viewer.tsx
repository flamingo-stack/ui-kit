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
  className?: string
  iframeClassName?: string
  controlsClassName?: string
  activeControlClassName?: string
  defaultSectionId?: string
  height?: string
  onSectionChange?: (sectionId: string) => void
  showDebugPanel?: boolean
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
    showDebugPanel = false
  } = config

  // Initialize state with the first section, not the last
  const initialSectionId = defaultSectionId || sections[0]?.id || ''
  const [activeSection, setActiveSection] = useState<string>(initialSectionId)
  const [isLoading, setIsLoading] = useState(true)
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null)
  
  // Refs
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const isManualNavigationRef = useRef(false)
  const hasLoadedOnceRef = useRef(false)
  const expectedNodeRef = useRef<string | null>(null)
  const nodeChangeCountRef = useRef(0)
  
  // Debug state
  const [eventHistory, setEventHistory] = useState<Array<{ 
    time: number
    type: string
    data?: any 
  }>>([])

  // Build embed URL
  const buildEmbedUrl = useCallback((nodeId: string) => {
    const params = new URLSearchParams({
      'node-id': nodeId.replace(':', '-'),
      'embed-host': 'flamingo',
      'client-id': 'UTQPwZHR9OZp68TTGPFFi5',
      'hide-ui': '1',
      'hotspot-hints': '0',
      'scaling': 'scale-down'
    })
    
    return `https://embed.figma.com/proto/${fileKey}?${params.toString()}`
  }, [fileKey])

  // Store the iframe src separately to prevent reloading
  const [iframeSrc, setIframeSrc] = useState<string>('')
  
  // Initialize iframe src on mount
  useEffect(() => {
    const section = sections.find(s => s.id === activeSection)
    if (section && !iframeSrc) {
      setIframeSrc(buildEmbedUrl(section.startingNodeId))
    }
  }, [activeSection, sections, buildEmbedUrl, iframeSrc])

  // Handle section button click
  const handleSectionClick = useCallback((sectionId: string) => {
    if (sectionId === activeSection) return

    const section = sections.find(s => s.id === sectionId)
    if (!section) return

    if (showDebugPanel) {
      console.log('[Manual] Switching to:', sectionId, 'node:', section.startingNodeId)
    }

    // Set manual navigation flag
    isManualNavigationRef.current = true
    nodeChangeCountRef.current = 0
    expectedNodeRef.current = section.startingNodeId
    
    // Update iframe src to navigate to new section
    setIframeSrc(buildEmbedUrl(section.startingNodeId))
    
    // Update state
    setActiveSection(sectionId)
    setIsLoading(true)
    onSectionChange?.(sectionId)
  }, [sections, activeSection, onSectionChange, showDebugPanel, buildEmbedUrl])

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
            hasLoadedOnceRef.current = true
            if (showDebugPanel) {
              console.log('[Loaded] Prototype ready, sending restart command')
            }
            // Send restart command to ensure we start at the beginning
            if (iframeRef.current?.contentWindow) {
              iframeRef.current.contentWindow.postMessage(
                { type: 'restart' },
                'https://www.figma.com'
              )
            }
            break

          case 'PRESENTED_NODE_CHANGED':
            if (figmaEvent.data?.presentedNodeId) {
              const nodeId = figmaEvent.data.presentedNodeId
              setCurrentNodeId(nodeId)
              
              // Count node changes
              nodeChangeCountRef.current++
              
              // On first node change after load, check if it's the expected node
              // If not, it's likely Figma auto-navigating, so ignore it
              if (nodeChangeCountRef.current === 1 && expectedNodeRef.current) {
                if (nodeId !== expectedNodeRef.current) {
                  if (showDebugPanel) {
                    console.log('[Ignored] Auto-navigation away from expected node:', nodeId, 'expected:', expectedNodeRef.current)
                  }
                  setIsLoading(false)
                  return
                }
              }
              
              // After a few node changes, allow syncing with sections
              // This gives time for Figma's auto-navigation to finish
              if (nodeChangeCountRef.current > 3) {
                // Only auto-sync if:
                // 1. We've loaded at least once
                // 2. User isn't manually navigating
                // 3. Node matches a different section
                if (hasLoadedOnceRef.current && !isManualNavigationRef.current) {
                  const matchingSection = sections.find(s => {
                    const normalized = s.startingNodeId.replace(':', '-')
                    return normalized === nodeId || s.startingNodeId === nodeId
                  })
                  
                  if (matchingSection && matchingSection.id !== activeSection) {
                    if (showDebugPanel) {
                      console.log('[Auto-sync] Detected section:', matchingSection.id)
                    }
                    setActiveSection(matchingSection.id)
                    onSectionChange?.(matchingSection.id)
                  }
                }
              }
            }
            
            // Clear manual navigation flag after any node change
            if (isManualNavigationRef.current) {
              isManualNavigationRef.current = false
            }
            
            setIsLoading(false)
            break

          case 'NEW_STATE':
            setIsLoading(false)
            break
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [sections, activeSection, onSectionChange, showDebugPanel])

  // Handle iframe load
  const handleIframeLoad = useCallback(() => {
    if (showDebugPanel) {
      console.log('[Iframe] Loaded')
    }
  }, [showDebugPanel])

  // Navigation commands for debug panel
  const sendCommand = useCallback((command: string) => {
    if (!iframeRef.current?.contentWindow) return

    const commandMap: Record<string, string> = {
      'NAVIGATE_FORWARD': 'next-page',
      'NAVIGATE_BACKWARD': 'previous-page',
      'RESTART': 'restart'
    }

    const figmaCommand = commandMap[command]
    if (figmaCommand) {
      iframeRef.current.contentWindow.postMessage(
        { type: figmaCommand },
        'https://www.figma.com'
      )

      if (showDebugPanel) {
        setEventHistory(prev => [...prev.slice(-9), {
          time: Date.now(),
          type: 'COMMAND',
          data: { command: figmaCommand }
        }])
      }
    }
  }, [showDebugPanel])

  return (
    <>
      <div className={cn('grid grid-cols-1 lg:grid-cols-[296px_1fr] gap-10', className)}>
        {/* Section Controls */}
        <div className={cn('flex flex-col gap-2', controlsClassName)}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
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

        {/* Figma Prototype - WHITE BACKGROUND */}
        <div 
          className={cn('relative w-full bg-white', iframeClassName)}
          style={{ height }}
        >
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="flex flex-col items-center gap-2 p-4 bg-ods-bg rounded-lg shadow-lg">
                <div className="w-8 h-8 border-2 border-ods-text-secondary border-t-transparent rounded-full animate-spin" />
                <span className="text-ods-text-secondary text-sm">Loading...</span>
              </div>
            </div>
          )}

          {/* Figma iframe - WHITE BACKGROUND */}
          {iframeSrc && (
            <iframe
              ref={iframeRef}
              src={iframeSrc}
              className="w-full h-full border-0 bg-white"
              style={{ background: 'white' }}
              onLoad={handleIframeLoad}
              allowFullScreen
              title={config.title}
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
          
          {/* Status */}
          <div className="mb-3 grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-ods-text-secondary">Loading:</span>{' '}
              <span className={isLoading ? "text-yellow-500" : "text-green-500"}>
                {isLoading ? 'Yes' : 'No'}
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
                    event.type === 'COMMAND' && "text-cyan-400",
                    !['INITIAL_LOAD', 'PRESENTED_NODE_CHANGED', 'NEW_STATE', 'COMMAND'].includes(event.type) && "text-gray-400"
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