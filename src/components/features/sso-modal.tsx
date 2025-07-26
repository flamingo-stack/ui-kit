"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProviderButton } from './provider-button';

interface SSOModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProviderClick: (provider: 'microsoft' | 'google' | 'slack') => Promise<void>;
}

export function SSOModal({ isOpen, onClose, onProviderClick }: SSOModalProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Handle ESC key press for accessibility
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setLoadingProvider(null);
    }
  }, [isOpen]);

  const handleProviderClick = async (provider: 'microsoft' | 'google' | 'slack') => {
    try {
      setError(null);
      setLoadingProvider(provider);
      await onProviderClick(provider);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
      console.error(`❌ SSO Modal Error with ${provider}:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if the click was directly on the backdrop elements, not on child elements
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div 
          className="w-full max-w-[400px] md:max-w-[600px] bg-[#161616] border-none rounded-2xl p-6 md:p-10 shadow-2xl grid gap-6 md:gap-10 animate-in fade-in-0 zoom-in-95 duration-200"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          
          {/* Header Section - NO CLOSE BUTTON */}
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <h1 className="font-['Azeret_Mono'] font-semibold text-[24px] md:text-[32px] leading-[1.3333333333333333] md:leading-[1.25] tracking-[-0.02em] text-ods-text-primary text-center">
              Authorization
            </h1>
            <p className="font-['DM_Sans'] font-medium text-[14px] md:text-[18px] leading-[1.4285714285714286] md:leading-[1.3333333333333333] text-ods-text-primary text-center">
              Choose your preferred authorization method
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-[#2A1F1F] border border-[#6B2C2C] rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#FF6B6B]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-[#FF6B6B] text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Provider Buttons */}
          <div className="flex flex-col gap-4 md:gap-6">
            <ProviderButton
              provider="microsoft"
              onClick={() => handleProviderClick('microsoft')}
              disabled={loadingProvider !== null}
              loading={loadingProvider === 'microsoft'}
            />
            <ProviderButton
              provider="google"
              onClick={() => handleProviderClick('google')}
              disabled={loadingProvider !== null}
              loading={loadingProvider === 'google'}
            />
            <ProviderButton
              provider="slack"
              onClick={() => handleProviderClick('slack')}
              disabled={loadingProvider !== null}
              loading={loadingProvider === 'slack'}
            />
          </div>

          {/* Legal Text */}
          <p className="font-['DM_Sans'] font-medium text-[14px] md:text-[18px] leading-[1.4285714285714286] md:leading-[1.3333333333333333] text-ods-text-primary text-center max-w-[320px] mx-auto">
            By signing in, you agree to our{' '}
            <a
              href="/terms-of-service"
              className="text-ods-accent hover:text-ods-accent/80 underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="/privacy-policy"
              className="text-ods-accent hover:text-ods-accent/80 underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 