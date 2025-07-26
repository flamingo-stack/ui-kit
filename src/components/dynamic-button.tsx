"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button, type ButtonProps } from './button';
import { useDynamicThemeContext } from '@/components/providers/dynamic-theme-provider';
import { cn } from '@/lib/utils';

interface DynamicButtonProps extends ButtonProps {
  /**
   * Enable dynamic color animations on interaction
   */
  enableDynamicColors?: boolean;
  
  /**
   * Intensity of the dynamic effects
   */
  effectIntensity?: 'subtle' | 'normal' | 'strong';
  
  /**
   * Context for automatic color application
   */
  context?: 'success' | 'warning' | 'error' | 'info';
  
  /**
   * Enable accessibility enhancements
   */
  enhanceAccessibility?: boolean;
  
  /**
   * Custom animation on click
   */
  clickAnimation?: 'pulse' | 'bounce' | 'ripple' | 'glow';
  
  /**
   * Enable platform-aware personality animations
   */
  enablePersonality?: boolean;
}

export function DynamicButton({
  children,
  className,
  variant = 'primary',
  size = 'default',
  enableDynamicColors = true,
  effectIntensity = 'normal',
  context,
  enhanceAccessibility = true,
  clickAnimation = 'ripple',
  enablePersonality = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}: DynamicButtonProps) {
  const {
    themeState,
    applyContextualColor,
    animateAccentColor,
    generateThemeGradient,
    getOptimalTextColor
  } = useDynamicThemeContext();

  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  // Apply contextual colors
  const contextualStyle = React.useMemo(() => {
    if (!context || !enableDynamicColors) return {};

    const contextColor = applyContextualColor(context, effectIntensity);
    const textColor = getOptimalTextColor(contextColor);

    return {
      backgroundColor: contextColor,
      color: textColor,
      borderColor: contextColor
    };
  }, [context, enableDynamicColors, effectIntensity, applyContextualColor, getOptimalTextColor]);

  // Handle click animation
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(true);
    
    // Create ripple effect
    if (clickAnimation === 'ripple' && buttonRef.current && rippleRef.current) {
      const button = buttonRef.current;
      const ripple = rippleRef.current;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.remove('animate');
      ripple.classList.add('animate');
    }

    // Platform-specific animations
    if (enablePersonality && enableDynamicColors) {
      const accentColor = themeState.accentColor;
      animateAccentColor(accentColor, 800);
    }

    setTimeout(() => setIsPressed(false), 150);

    if (onClick) {
      onClick(event);
    }
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    
    if (onMouseEnter) {
      onMouseEnter(event);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  };

  // Dynamic classes based on theme state and interactions
  const dynamicClasses = cn(
    'ods-interactive',
    enablePersonality && 'ods-accent-element',
    enhanceAccessibility && themeState.isHighContrast && 'high-contrast-button',
    isPressed && clickAnimation === 'pulse' && 'animate-pulse',
    isPressed && clickAnimation === 'bounce' && 'animate-bounce',
    isHovered && enableDynamicColors && 'theme-validation-pass',
    themeState.isTransitioning && 'theme-transitioning'
  );

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      size={size}
      className={cn(dynamicClasses, className)}
      style={contextualStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      
      {/* Ripple effect overlay */}
      {clickAnimation === 'ripple' && (
        <div 
          ref={rippleRef}
          className="absolute rounded-full bg-white/20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0"
          style={{
            transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
          }}
        />
      )}
      
      {/* Glow effect */}
      {clickAnimation === 'glow' && isPressed && (
        <div 
          className="absolute inset-0 rounded-inherit bg-current opacity-25 animate-ping pointer-events-none"
        />
      )}
    </Button>
  );
}

/**
 * Enhanced button specifically for platform switching
 */
export function PlatformSwitchButton({
  targetPlatform,
  children,
  showPreview = true,
  ...props
}: DynamicButtonProps & {
  targetPlatform: 'openmsp' | 'admin-hub' | 'openframe' | 'flamingo';
  showPreview?: boolean;
}) {
  const { transitionToPlatform, themeState } = useDynamicThemeContext();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePlatformSwitch = async () => {
    if (targetPlatform === themeState.platform || isTransitioning) return;
    
    setIsTransitioning(true);
    await transitionToPlatform(targetPlatform, true);
    setIsTransitioning(false);
  };

  const platformColors = {
    'openmsp': '#FFC008',
    'admin-hub': '#FF6B9D',
    'openframe': '#00D4AA',
    'flamingo': '#FF6B9D'
  };

  const isActive = themeState.platform === targetPlatform;

  return (
    <DynamicButton
      variant={isActive ? 'primary' : 'outline'}
      enableDynamicColors={true}
      enablePersonality={true}
      clickAnimation="ripple"
      enhanceAccessibility={true}
      onClick={handlePlatformSwitch}
      disabled={isTransitioning}
      className={cn(
        'relative overflow-hidden',
        isActive && 'ring-2 ring-current',
        isTransitioning && 'animate-pulse'
      )}
      style={showPreview ? {
        '--preview-color': platformColors[targetPlatform]
      } as React.CSSProperties : undefined}
      {...props}
    >
      {showPreview && (
        <div 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full"
          style={{ backgroundColor: platformColors[targetPlatform] }}
        />
      )}
      <span className={showPreview ? 'ml-5' : ''}>
        {children}
      </span>
      {isTransitioning && (
        <div className="absolute inset-0 bg-current opacity-10 animate-pulse" />
      )}
    </DynamicButton>
  );
}

/**
 * Accessibility-enhanced button with automatic contrast optimization
 */
export function AccessibleDynamicButton({
  children,
  autoOptimizeContrast = true,
  ...props
}: DynamicButtonProps & {
  autoOptimizeContrast?: boolean;
}) {
  const { themeState, getOptimalTextColor } = useDynamicThemeContext();
  
  // Automatically optimize for high contrast mode
  const enhancedProps: DynamicButtonProps = {
    ...props,
    enhanceAccessibility: true,
    effectIntensity: themeState.isHighContrast ? 'strong' : props.effectIntensity || 'normal',
    className: cn(
      props.className,
      themeState.isHighContrast && 'focus:ring-4 focus:ring-yellow-400',
      autoOptimizeContrast && 'auto-contrast'
    )
  };

  return (
    <DynamicButton {...enhancedProps}>
      {children}
    </DynamicButton>
  );
}