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
        // Calculate scroll position relative to viewport
        const scrollProgress = window.scrollY * 0.02 // Gentle scroll effect
        setScrollY(scrollProgress)
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
      className={`relative w-full h-full overflow-visible ${className}`}
    >
      {/* Image #1 - Bottom Left - z-index 1 */}
      {leftImage && (
        <Tilt
          className="absolute z-[1]"
          style={{
            bottom: '-20%',
            left: '-25%',
            width: '110%',
            height: '90%',
            transform: `translateY(${-scrollY * 0.3}px) translateX(${scrollY * 0.1}px)`,
            transition: 'transform 0.1s ease-out',
          }}
          tiltMaxAngleX={4}
          tiltMaxAngleY={4}
          scale={1}
          transitionSpeed={2500}
          gyroscope={true}
          trackOnWindow={true}
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

      {/* Image #2 - Bottom Right - z-index 2 */}
      {centerImage && (
        <Tilt
          className="absolute z-[2]"
          style={{
            bottom: '-15%',
            right: '-20%',
            width: '100%',
            height: '80%',
            transform: `translateY(${-scrollY * 0.5}px) translateX(${-scrollY * 0.15}px)`,
            transition: 'transform 0.1s ease-out',
          }}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          scale={1}
          transitionSpeed={2000}
          gyroscope={true}
          trackOnWindow={true}
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

      {/* Image #3 - Top Right - z-index 3 */}
      {rightImage && (
        <Tilt
          className="absolute z-[3]"
          style={{
            top: '-10%',
            right: '-15%',
            width: '120%',
            height: '85%',
            transform: `translateY(${-scrollY * 0.2}px) translateX(${-scrollY * 0.05}px)`,
            transition: 'transform 0.1s ease-out',
          }}
          tiltMaxAngleX={3}
          tiltMaxAngleY={3}
          scale={1}
          transitionSpeed={3000}
          gyroscope={true}
          trackOnWindow={true}
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
    </div>
  )
}