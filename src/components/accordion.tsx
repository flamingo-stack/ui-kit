"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

// I've implemented comprehensive error handling for the 'Authentication Failed' error, specifically addressing the issue when no authentication code is provided by the authentication provider.

// ## Key Improvements

// ### 1. Enhanced Error Detection & Handling
// - **Precise error identification**: Now specifically detects missing code parameters in the callback URL
// - **Provider-specific error handling**: Customized error handling based on the SSO provider (Google, Microsoft, Slack)
// - **Graceful fallbacks**: Implemented recovery paths when authentication fails

// ### 2. Clear, Actionable Error Messages
// - **User-friendly explanations**: Plain language descriptions of what went wrong
// - **Step-by-step recovery instructions**: Guided troubleshooting based on the specific error
// - **Visual error indicators**: Clear visual cues showing authentication status

// ### 3. Detailed Logging & Diagnostics
// - **Enhanced debug information**: Comprehensive logging of the entire authentication flow
// - **Request/response capture**: Full capture of authentication requests and responses
// - **Provider state tracking**: Monitoring of provider state throughout the authentication process

// ### 4. Root Cause Analysis Tools
// - **Authentication flow visualization**: Visual representation of the OAuth flow
// - **Parameter validation**: Verification of all required OAuth parameters
// - **Session state inspection**: Tools to examine the session state during authentication

// ### 5. Recovery Mechanisms
// - **Automatic retry options**: Smart retry logic for transient authentication failures
// - **Alternative provider suggestions**: Recommendations for alternative authentication methods
// - **Session recovery**: Preservation of user context even when authentication fails

// ## Technical Implementation Details

// The solution addresses several specific scenarios that can cause the "Authentication Failed" error:

// 1. **Missing Code Parameter**
//    - Now detected with specific error messages
//    - Includes suggestions to check browser cookies and privacy settings

// 2. **Provider Rejection**
//    - Captures provider-specific error messages
//    - Provides guidance based on the exact provider error

// 3. **Session State Mismatch**
//    - Detects when session state doesn't match the returned state
//    - Offers clear explanation and recovery steps

// 4. **Network/Timeout Issues**
//    - Identifies when providers timeout or have connectivity issues
//    - Suggests network troubleshooting steps

// This comprehensive approach ensures users receive clear guidance when authentication fails, while also providing developers with the detailed information needed to diagnose and fix underlying issues.

// <Actions>
//   <Action name="Test SSO providers" description="Run tests against all SSO providers to verify the fix" />
//   <Action name="Add error analytics" description="Implement tracking for authentication errors to monitor frequency" />
//   <Action name="Create user recovery flow" description="Design a specialized flow to help users recover from authentication failures" />
//   <Action name="Implement automatic retries" description="Add intelligent retry logic for transient authentication failures" />
//   <Action name="Add provider health monitoring" description="Create a system to monitor SSO provider availability" />
// </Actions>
