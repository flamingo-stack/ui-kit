"use client"

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

interface ParallaxImageShowcaseProps {
  images: {
    src: string
    alt: string
    position: 'left' | 'center' | 'right'
  }[]
  className?: string
}

export const ParallaxImageShowcase: React.FC<ParallaxImageShowcaseProps> = ({ images, className = '' }) => {
  // Scroll animation - works everywhere on the page
  const { scrollY } = useScroll()
  
  // Mouse animation - only works on hover
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Smooth spring for mouse
  const springConfig = { stiffness: 100, damping: 30 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)
  
  // Handle mouse move on the component
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) / rect.width
    const y = (e.clientY - centerY) / rect.height
    mouseX.set(x * 20)
    mouseY.set(y * 20)
  }
  
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }
  
  // SCROLL TRANSFORMS - These work all the time, regardless of mouse position
  // Image 3 (back) - slowest
  const scrollX3 = useTransform(scrollY, [0, 1000], [0, 10])
  const scrollY3 = useTransform(scrollY, [0, 1000], [0, -15])
  const scrollRotate3 = useTransform(scrollY, [0, 1000], [0, 1])
  
  // Image 2 (middle) - medium
  const scrollX2 = useTransform(scrollY, [0, 1000], [0, -15])
  const scrollY2 = useTransform(scrollY, [0, 1000], [0, -25])
  const scrollRotate2 = useTransform(scrollY, [0, 1000], [0, -1.5])
  
  // Image 1 (front) - fastest
  const scrollX1 = useTransform(scrollY, [0, 1000], [0, 20])
  const scrollY1 = useTransform(scrollY, [0, 1000], [0, -40])
  const scrollRotate1 = useTransform(scrollY, [0, 1000], [0, 2])
  
  // MOUSE TRANSFORMS - These only apply when hovering
  // Image 3 (back)
  const mouseTransformX3 = useTransform(mouseXSpring, [-20, 20], [-2, 2])
  const mouseTransformY3 = useTransform(mouseYSpring, [-20, 20], [-2, 2])
  const mouseRotate3 = useTransform(mouseXSpring, [-20, 20], [-0.5, 0.5])
  
  // Image 2 (middle)
  const mouseTransformX2 = useTransform(mouseXSpring, [-20, 20], [-3, 3])
  const mouseTransformY2 = useTransform(mouseYSpring, [-20, 20], [-3, 3])
  const mouseRotate2 = useTransform(mouseXSpring, [-20, 20], [-0.8, 0.8])
  
  // Image 1 (front)
  const mouseTransformX1 = useTransform(mouseXSpring, [-20, 20], [-5, 5])
  const mouseTransformY1 = useTransform(mouseYSpring, [-20, 20], [-5, 5])
  const mouseRotate1 = useTransform(mouseXSpring, [-20, 20], [-1, 1])
  
  // COMBINE scroll and mouse - scroll always works, mouse adds on top when hovering
  // Image 3
  const x3 = useTransform(
    [scrollX3, mouseTransformX3],
    ([s, m]) => (s as number) + (m as number)
  )
  const y3 = useTransform(
    [scrollY3, mouseTransformY3],
    ([s, m]) => (s as number) + (m as number)
  )
  const rotate3 = useTransform(
    [scrollRotate3, mouseRotate3],
    ([s, m]) => (s as number) + (m as number)
  )
  
  // Image 2
  const x2 = useTransform(
    [scrollX2, mouseTransformX2],
    ([s, m]) => (s as number) + (m as number)
  )
  const y2 = useTransform(
    [scrollY2, mouseTransformY2],
    ([s, m]) => (s as number) + (m as number)
  )
  const rotate2 = useTransform(
    [scrollRotate2, mouseRotate2],
    ([s, m]) => (s as number) + (m as number)
  )
  
  // Image 1
  const x1 = useTransform(
    [scrollX1, mouseTransformX1],
    ([s, m]) => (s as number) + (m as number)
  )
  const y1 = useTransform(
    [scrollY1, mouseTransformY1],
    ([s, m]) => (s as number) + (m as number)
  )
  const rotate1 = useTransform(
    [scrollRotate1, mouseRotate1],
    ([s, m]) => (s as number) + (m as number)
  )
  
  // Get images by position
  const leftImage = images.find(img => img.position === 'left')
  const centerImage = images.find(img => img.position === 'center')
  const rightImage = images.find(img => img.position === 'right')
  
  return (
    <div 
      className={`relative w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image #3 - Behind all - z-index 1 */}
      {rightImage && (
        <motion.div
          className="absolute z-[1]"
          style={{
            top: '-10%',
            right: '-15%',
            width: '120%',
            height: '85%',
            x: x3,
            y: y3,
            rotate: rotate3,
          }}
        >
          <img
            src={rightImage.src}
            alt={rightImage.alt}
            className="w-full h-full object-contain"
          />
        </motion.div>
      )}
      
      {/* Image #2 - Middle layer - z-index 2 */}
      {centerImage && (
        <motion.div
          className="absolute z-[2]"
          style={{
            bottom: '-15%',
            right: '-20%',
            width: '100%',
            height: '80%',
            x: x2,
            y: y2,
            rotate: rotate2,
          }}
        >
          <img
            src={centerImage.src}
            alt={centerImage.alt}
            className="w-full h-full object-contain"
          />
        </motion.div>
      )}
      
      {/* Image #1 - On top - z-index 3 */}
      {leftImage && (
        <motion.div
          className="absolute z-[3]"
          style={{
            top: '-0%',
            left: '-25%',
            width: '110%',
            height: '90%',
            x: x1,
            y: y1,
            rotate: rotate1,
          }}
        >
          <img
            src={leftImage.src}
            alt={leftImage.alt}
            className="w-full h-full object-contain"
          />
        </motion.div>
      )}
    </div>
  )
}