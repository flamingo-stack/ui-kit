import React from 'react';
import { Button, ButtonProps } from '../ui/button';
import { GitHubIcon } from '../icons';

interface GithubRepoButtonProps extends Omit<ButtonProps, 'children' | 'leftIcon' | 'variant' | 'size'> {
  children?: React.ReactNode;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function GithubRepoButton({ 
  children = 'Get Started',
  size = 'lg',
  href = 'https://github.com/Flamingo-CX/openframe',
  className = '',
  ...props 
}: GithubRepoButtonProps) {
  return (
    <Button
      variant="outline"
      className={`w-full sm:w-auto ${className}`}
      size={size}
      href={href}
      leftIcon={<GitHubIcon className="w-6 h-6" />}
      {...props}
    >
      {children}
    </Button>
  );
}