import React from 'react';
import { Button, ButtonProps } from '../ui/button';
import { OpenFrameLogo } from '../icons';

interface TryOpenFrameButtonProps extends Omit<ButtonProps, 'children' | 'leftIcon'> {
  children?: React.ReactNode;
}

export function TryOpenFrameButton({ 
  children = 'Try OpenFrame',
  size = 'lg',
  href = 'https://openframe.so',
  className = '',
  ...props 
}: TryOpenFrameButtonProps) {
  return (
    <Button
      size={size}
      href={href}
      leftIcon={<OpenFrameLogo className="w-6 h-6" lowerPathColor="white" upperPathColor="currentColor" />}
      className={`w-full sm:w-auto ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}