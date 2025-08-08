import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link"

import { cn } from "../../utils/cn"

const buttonVariants = cva(
  // Base styles following ButtonFull specifications with Figma-accurate typography
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] font-['DM_Sans'] font-bold text-lg leading-tight transition-colors duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: { 
        // Primary variant for main CTAs (ButtonFull primary)
        primary: "bg-ods-accent text-ods-text-on-accent hover:bg-ods-accent-hover active:bg-ods-accent-active focus-visible:ring-2 focus-visible:ring-ods-focus disabled:bg-ods-disabled disabled:text-ods-text-disabled",
        // White background variant for secondary actions (ButtonFull secondary)
        white: "bg-white text-black hover:bg-ods-text-secondary hover:text-black active:bg-ods-text-muted active:text-black focus-visible:ring-2 focus-visible:ring-ods-focus disabled:bg-ods-disabled disabled:text-ods-text-disabled",
        // Secondary variant for alternative actions (ButtonFull secondary)
        secondary: "bg-ods-text-primary text-black hover:bg-ods-text-secondary hover:text-black active:bg-ods-text-muted active:text-black focus-visible:ring-2 focus-visible:ring-ods-focus disabled:bg-ods-disabled disabled:text-ods-text-disabled",
        // Outline variant for Submit Product buttons and secondary actions
        outline: "border border-ods-border bg-transparent text-ods-text-primary hover:bg-ods-bg-hover active:bg-ods-bg-active focus-visible:ring-2 focus-visible:ring-ods-focus disabled:border-ods-disabled disabled:text-ods-text-disabled",
        // Transparent variant for ghost-like actions (ButtonFull transparent)
        transparent: "bg-transparent text-ods-text-primary hover:bg-ods-bg-hover active:bg-ods-bg-active focus-visible:ring-2 focus-visible:ring-ods-focus disabled:text-ods-text-disabled",
        // Ghost variant for subtle interactions
        ghost: "bg-transparent text-ods-text-primary hover:bg-ods-bg-hover active:bg-ods-bg-active focus-visible:ring-2 focus-visible:ring-ods-focus disabled:text-ods-text-disabled",
        // Ghost navigation variant - left-aligned for navigation menus
        "ghost-nav": "bg-transparent text-ods-text-primary hover:bg-ods-bg-hover active:bg-ods-bg-active focus-visible:ring-2 focus-visible:ring-ods-focus disabled:text-ods-text-disabled justify-start",
        // Link variant for text-like buttons
        link: "bg-transparent text-ods-link underline-offset-4 hover:underline hover:text-ods-link-hover focus-visible:ring-2 focus-visible:ring-ods-focus disabled:text-ods-text-disabled",
        // Search variant for search containers
        search: "bg-ods-card border border-ods-border text-ods-text-primary hover:bg-ods-bg-hover hover:border-ods-border focus-visible:ring-2 focus-visible:ring-ods-focus disabled:bg-ods-disabled disabled:text-ods-text-disabled",
        // Special variant for submit product buttons (header usage)
        submit: "border border-ods-border bg-transparent text-ods-text-primary hover:bg-ods-bg-hover focus:bg-ods-bg-hover focus-visible:ring-2 focus-visible:ring-ods-focus disabled:border-ods-disabled disabled:text-ods-text-disabled",
        // Destructive variant for dangerous actions
        destructive: "bg-ods-error text-ods-text-on-dark hover:bg-ods-error-hover active:bg-ods-error-active focus-visible:ring-2 focus-visible:ring-ods-focus disabled:bg-ods-disabled disabled:text-ods-text-disabled",
        // Success variant for positive actions
        success: "bg-ods-success text-ods-text-on-dark hover:bg-ods-success-hover active:bg-ods-success-active focus-visible:ring-2 focus-visible:ring-ods-focus disabled:bg-ods-disabled disabled:text-ods-text-disabled",
        // Warning variant for cautionary actions
        warning: "bg-ods-warning text-ods-text-on-accent hover:bg-ods-warning-hover active:bg-ods-warning-active focus-visible:ring-2 focus-visible:ring-ods-focus disabled:bg-ods-disabled disabled:text-ods-text-disabled",
        // Info variant for informational actions
        info: "bg-ods-info text-ods-text-on-dark hover:bg-ods-info-hover active:bg-ods-info-active focus-visible:ring-2 focus-visible:ring-ods-focus disabled:bg-ods-disabled disabled:text-ods-text-disabled",
        // Flamingo primary variant - pink background with black text
        "flamingo-primary": "bg-[var(--ods-flamingo-pink-base)] text-[var(--ods-system-greys-black)] hover:bg-[var(--ods-flamingo-pink-hover)] active:bg-[var(--ods-flamingo-pink-active)] focus-visible:ring-2 focus-visible:ring-ods-focus disabled:bg-ods-disabled disabled:text-ods-text-disabled",
        // Flamingo secondary variant - dark background with border
        "flamingo-secondary": "bg-[var(--ods-system-greys-black)] border border-[var(--ods-system-greys-soft-grey)] text-[var(--ods-system-greys-white)] hover:border-[var(--ods-system-greys-grey)] hover:bg-[var(--ods-system-greys-dark-grey)] active:bg-[var(--ods-system-greys-grey)] focus-visible:ring-2 focus-visible:ring-ods-focus disabled:bg-ods-disabled disabled:text-ods-text-disabled",
        // Footer link variant - minimal spacing, left-aligned, no gap
        "footer-link": "!gap-0 !p-0 !h-auto bg-transparent text-ods-text-primary hover:text-ods-accent-primary transition-colors justify-start font-body font-medium !text-md md:!text-md leading-[1.33] mb-1",
      },
      size: {
        // Small size for secondary actions
        sm: "h-10 px-6 py-2 text-sm", 
        // Default size for most buttons (ButtonFull default)
        default: "h-12 px-8 py-3 text-base",
        // Large size for prominent CTAs (ButtonFull lg) - adjusted for better text/icon fit
        lg: "min-h-[48px] px-8 py-3 text-base",
        // Icon-only buttons
        icon: "h-10 w-10 p-0",
        // Icon-only large buttons (like hamburger menu)
        iconLg: "h-12 w-12 p-0",
        // Touch-friendly mobile sizing
        touch: "min-h-[44px] px-6 py-3 text-base",
        // Search button specific sizing
        searchMobile: "min-h-[56px] px-4 py-3 text-lg",
        searchDesktop: "min-h-[52px] px-4 py-3 text-lg",
        // No size - used for footer links
        none: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
  /**
   * Open the link in a new tab when href is provided
   */
  openInNewTab?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  /**
   * Render an icon perfectly centered inside the button. Useful for icon-only
   * actions (e.g. close, hamburger) where the default `gap-2` from the base
   * styles would otherwise shift the icon slightly to the left.
   */
  centerIcon?: React.ReactNode
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, openInNewTab = false, leftIcon, rightIcon, centerIcon, loading, children, disabled, onClick, ...props }, ref) => {
    const isDisabled = disabled || loading
    
    const isCenterIconOnly = !!centerIcon && !children && !leftIcon && !rightIcon
    const isFooterLink = variant === "footer-link"
    const composedClassName = cn(
      buttonVariants({ variant, size, className }),
      // Remove the default gap when we have a single centered icon so the icon
      // sits exactly in the middle.
      isCenterIconOnly && "gap-0",
      // Also remove gap for footer links
      isFooterLink && "gap-0"
    )
    
    // Content to render inside the button/link
    const renderContent = () => {
      // Center icon takes priority and renders by itself
      if (isCenterIconOnly && !loading) {
        return (
          <span className="flex items-center justify-center">{centerIcon}</span>
        )
      }

      // Standard left icon / children / right icon flow
      if (!isCenterIconOnly) {
        return (
          <>
            {leftIcon && !loading && <span className="flex items-center justify-center">{leftIcon}</span>}
            {loading && (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {children && (
              <span className={cn(loading && "opacity-70")}>{children}</span>
            )}
            {rightIcon && !loading && <span className="flex items-center justify-center">{rightIcon}</span>}
          </>
        )
      }
    }
    
    // When asChild is true, let the child element handle its own content structure
    if (asChild) {
      return (
        <Slot
          className={composedClassName}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }
    
    // When href is provided, render as Next.js Link for client-side navigation
    if (href) {
      return (
        <Link
          href={href}
          className={composedClassName}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : undefined}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
          onClick={onClick}
        >
          {renderContent()}
        </Link>
      )
    }
    
    // Default button rendering
    return (
      <button
        className={composedClassName}
        ref={ref}
        disabled={isDisabled}
        onClick={onClick}
        {...props}
      >
        {renderContent()}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
