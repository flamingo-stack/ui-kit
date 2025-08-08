
import * as React from 'react';
import { Button, type ButtonProps } from "../ui/button";
import { OpenFrameLogo } from "../icons";
import { cn } from "../../utils";

export interface StartWithOpenFrameButtonProps extends Omit<ButtonProps, 'variant' | 'size' | 'leftIcon'> {
  children?: React.ReactNode;
  mode?: 'outline' | 'yellow';
}

/**
 * "Start with OpenFrame" button for Flamingo header
 * – Two modes: 'outline' (default) and 'yellow'
 * – Shows OpenFrame icon on the left
 * – Same pattern as OpenFrame Github button in hero section
 */
export const StartWithOpenFrameButton = React.forwardRef<
  HTMLButtonElement,
  StartWithOpenFrameButtonProps
>(({ children = 'Start Free Trial', mode = 'outline', className, ...props }, ref) => {
  const isYellow = mode === 'yellow';
  
  return (
    <Button
      ref={ref}
      {...props}
      variant={isYellow ? 'primary' : 'outline'}
      className={cn(
        isYellow && 'bg-[var(--ods-open-yellow-base)] hover:bg-[var(--ods-open-yellow-hover)] text-black border-[var(--ods-open-yellow-base)]',
        className
      )}
      leftIcon={<OpenFrameLogo className="w-6 h-6" 
        lowerPathColor={isYellow ? "#ffffff" : "var(--ods-open-yellow-base)"} 
        upperPathColor={isYellow ? "#000000" : "var(--ods-system-greys-white)"} />}
    >
      {children}
    </Button>
  );
});
StartWithOpenFrameButton.displayName = 'StartWithOpenFrameButton'; 