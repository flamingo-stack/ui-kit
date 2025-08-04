import * as React from 'react';
import { Button, type ButtonProps } from "../ui/button";
import { OpenFrameLogo } from "../icons";

export interface StartWithOpenFrameButtonProps extends Omit<ButtonProps, 'variant' | 'size' | 'leftIcon'> {
  children?: React.ReactNode;
}

/**
 * "Start with OpenFrame" button for Flamingo header
 * – Uses flamingo-secondary variant (dark background with light text and border)
 * – Shows OpenFrame icon on the left
 * – Same pattern as OpenFrame Github button in hero section
 */
export const StartWithOpenFrameButton = React.forwardRef<
  HTMLButtonElement,
  StartWithOpenFrameButtonProps
>(({ children = 'Start with OpenFrame', ...props }, ref) => {
  return (
    <Button
      ref={ref}
      {...props}
      variant="flamingo-secondary"
      size="default"
      leftIcon={<OpenFrameLogo className="w-6 h-6" 
        lowerPathColor="var(--ods-open-yellow-base)" 
        upperPathColor="var(--ods-system-greys-white)" />}
    >
      {children}
    </Button>
  );
});
StartWithOpenFrameButton.displayName = 'StartWithOpenFrameButton'; 