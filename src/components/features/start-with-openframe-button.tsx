import * as React from 'react';
import { Button, type ButtonProps } from "../ui/button";
import { OpenFrameLogo } from "../icons";

export interface StartWithOpenFrameButtonProps
  extends Omit<ButtonProps, 'variant' | 'size' | 'leftIcon' | 'rightIcon'> {
  loading?: boolean;
  lowerPathColor?: string;
  upperPathColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
}

/**
 * "Start with OpenFrame" button for Flamingo header
 * – Dark background with light text
 * – Shows OpenFrame icon on the left when not loading
 * – Hover state changes to accent color
 */
export const StartWithOpenFrameButton = React.forwardRef<
  HTMLButtonElement,
  StartWithOpenFrameButtonProps
>(({ loading = false, className, children = 'Start with OpenFrame', lowerPathColor, upperPathColor, buttonBackgroundColor, buttonTextColor, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="secondary"
      size="sm"
      loading={loading}
      leftIcon={!loading ? <OpenFrameLogo className="w-5 h-5" lowerPathColor={lowerPathColor ?? "var(--ods-open-yellow-base)"} upperPathColor={upperPathColor ?? "var(--ods-system-greys-white)"} /> : undefined}
      className={`border border-[var(--ods-system-greys-soft-grey)] ${className || ''}`}
      style={{ 
        backgroundColor: buttonBackgroundColor ?? 'var(--ods-system-greys-black)', 
        color: buttonTextColor ?? 'var(--ods-system-greys-white)'
      }}
      {...props}
    >
      {children}
    </Button>
  );
});
StartWithOpenFrameButton.displayName = 'StartWithOpenFrameButton'; 