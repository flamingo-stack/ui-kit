"use client";

import { Button } from "../ui/button";
import { type SSOConfigStatus } from './auth-providers-list';

interface AuthTriggerProps {
  /** Button text to display */
  buttonText?: string;
  /** Button variant */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "destructive" | "success" | "warning" | "info" | "white" | "transparent" | "search" | "submit";
  /** Button size */
  size?: "sm" | "default" | "lg" | "icon";
  /** Custom button className */
  className?: string;
  /** Enabled SSO providers */
  enabledProviders: SSOConfigStatus[];
  /** Callback when button is clicked - implement your auth trigger logic here */
  onClick: () => void;
}

export function AuthTrigger({ 
  buttonText = "Sign Up",
  variant = "primary",  
  size = "default",
  className = "",
  enabledProviders,
  onClick
}: AuthTriggerProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      className={`whitespace-nowrap ${className}`}
    >
      {buttonText}
    </Button>
  );
}