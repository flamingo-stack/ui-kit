"use client";

import { useState } from 'react';
import { Button } from "../ui/button";
import { AuthModal } from './auth-modal';
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
  /** Callback when provider is clicked - implement your auth logic here */
  onProviderClick: (provider: string) => Promise<void>;
  /** Optional callback when modal opens */
  onModalOpen?: () => void;
  /** Optional callback when modal closes */
  onModalClose?: () => void;
}

export function AuthTrigger({ 
  buttonText = "Sign Up",
  variant = "primary",  
  size = "default",
  className = "",
  enabledProviders,
  onProviderClick,
  onModalOpen,
  onModalClose
}: AuthTriggerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    onModalOpen?.();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onModalClose?.();
  };

  const handleProviderClick = async (provider: string) => {
    try {
      await onProviderClick(provider);
      setIsModalOpen(false);
    } catch (error) {
      console.error(`❌ Auth Trigger: Error with ${provider}:`, error);
      // Keep modal open on error so user can try again
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        variant={variant}
        size={size}
        className={`whitespace-nowrap ${className}`}
      >
        {buttonText}
      </Button>

      <AuthModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onProviderClick={handleProviderClick}
        enabledProviders={enabledProviders}
      />
    </>
  );
}