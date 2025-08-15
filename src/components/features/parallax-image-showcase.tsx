"use client"

import React, { useEffect, useRef, useState } from 'react'
import Tilt from 'react-parallax-tilt'

interface ParallaxImageShowcaseProps {
  images: {
    src: string
    alt: string
    position: 'left' | 'center' | 'right'
  }[]
  className?: string
}

export const ParallaxImageShowcase: React.FC<ParallaxImageShowcaseProps> = ({ images, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Check if element is in viewport
      const inView = rect.top < windowHeight && rect.bottom > 0
      setIsInView(inView)
      
      if (inView) {
        // Calculate scroll position relative to element position in viewport
        // This creates a parallax effect that responds to actual scrolling
        const elementCenter = rect.top + rect.height / 2
        const viewportCenter = windowHeight / 2
        const offset = (viewportCenter - elementCenter) / windowHeight
        
        // Use offset for more dynamic scroll-based animation
        setScrollY(offset * 20) // Amplify for visible effect
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get image by position
  const leftImage = images.find(img => img.position === 'left')
  const centerImage = images.find(img => img.position === 'center')
  const rightImage = images.find(img => img.position === 'right')

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
    >
      {/* Image #3 - Behind all - z-index 1 - Subtle but visible */}
      {rightImage && (
        <Tilt
          className="absolute z-[1]"
          style={{
            top: '-10%',
            right: '-15%',
            width: '120%',
            height: '85%',
            transform: `translateY(${scrollY * 0.5}px) translateX(${scrollY * 0.3}px) rotateX(${scrollY * 0.08}deg) rotateY(${scrollY * 0.05}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
          tiltMaxAngleX={2.5}
          tiltMaxAngleY={3}
          scale={1}
          transitionSpeed={2800}
          gyroscope={false}
          trackOnWindow={true}
          perspective={1300}
        >
          <img
            src={rightImage.src}
            alt={rightImage.alt}
            className="w-full h-full object-contain"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
        </Tilt>
      )}

      {/* Image #2 - Middle layer - z-index 2 - Medium gentle rotation */}
      {centerImage && (
        <Tilt
          className="absolute z-[2]"
          style={{
            bottom: '-15%',
            right: '-20%',
            width: '100%',
            height: '80%',
            transform: `translateY(${scrollY * 0.8}px) translateX(${scrollY * -0.4}px) rotateX(${scrollY * 0.12}deg) rotateY(${scrollY * -0.08}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
          tiltMaxAngleX={2}
          tiltMaxAngleY={2.5}
          scale={1}
          transitionSpeed={2500}
          gyroscope={false}
          trackOnWindow={true}
          perspective={1200}
        >
          <img
            src={centerImage.src}
            alt={centerImage.alt}
            className="w-full h-full object-contain"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
        </Tilt>
      )}

      {/* Image #1 - On top - z-index 3 - Slightly more movement but still gentle */}
      {leftImage && (
        <Tilt
          className="absolute z-[3]"
          style={{
            top: '-0%',
            left: '-25%',
            width: '110%',
            height: '90%',
            transform: `translateY(${scrollY * 1.2}px) translateX(${scrollY * 0.6}px) rotateX(${scrollY * -0.15}deg) rotateY(${scrollY * 0.12}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
          tiltMaxAngleX={3}
          tiltMaxAngleY={3.5}
          scale={1}
          transitionSpeed={2000}
          gyroscope={false}
          trackOnWindow={true}
          perspective={1000}
        >
          <img
            src={leftImage.src}
            alt={leftImage.alt}
            className="w-full h-full object-contain"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
        </Tilt>
      )}
    </div>
  )
}