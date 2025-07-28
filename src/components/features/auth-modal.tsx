"use client";

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { type SSOConfigStatus } from './auth-providers-list';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProviderClick: (provider: string) => Promise<void>;
  enabledProviders: SSOConfigStatus[];
}

const PROVIDER_CONFIG = {
  microsoft: {
    displayName: 'Continue with Microsoft',
    iconPath: '/icons/microsoft-logo.svg',
  },
  google: {
    displayName: 'Continue with Google',
    iconPath: '/icons/google-logo.svg',
  },
  slack: {
    displayName: 'Continue with Slack',
    iconPath: '/icons/slack-logo.svg',
  },
  github: {
    displayName: 'Continue with GitHub',
    iconPath: '/icons/github-logo.svg',
  },
};

export function AuthModal({ isOpen, onClose, onProviderClick, enabledProviders }: AuthModalProps) {
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

  const handleProviderClick = async (provider: string) => {
    try {
      setError(null);
      setLoadingProvider(provider);
      await onProviderClick(provider);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
      console.error(`❌ Auth Modal Error with ${provider}:`, error);
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

  const getProviderIcon = (providerName: string) => {
    switch (providerName.toLowerCase()) {
      case 'google':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        );
      case 'microsoft':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#00BCF2" d="M0 0h11.377v11.372H0z"/>
            <path fill="#0078D4" d="M12.623 0H24v11.372H12.623z"/>
            <path fill="#00BCF2" d="M0 12.623h11.377V24H0z"/>
            <path fill="#40E0D0" d="M12.623 12.623H24V24H12.623z"/>
          </svg>
        );
      case 'github':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      default:
        return (
          <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center text-xs text-white font-bold">
            {providerName.charAt(0).toUpperCase()}
          </div>
        );
    }
  };

  const getProviderDisplayName = (providerName: string) => {
    const config = PROVIDER_CONFIG[providerName.toLowerCase() as keyof typeof PROVIDER_CONFIG];
    return config?.displayName || `Continue with ${providerName.charAt(0).toUpperCase() + providerName.slice(1)}`;
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
          className="w-full max-w-[400px] md:max-w-[600px] bg-ods-card border border-ods-border rounded-2xl p-6 md:p-10 shadow-2xl grid gap-6 md:gap-10 animate-in fade-in-0 zoom-in-95 duration-200"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          
          {/* Header Section */}
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
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Provider Buttons */}
          <div className="flex flex-col gap-4 md:gap-6">
            {enabledProviders.map((provider) => (
              <Button
                key={provider.provider}
                type="button" 
                onClick={() => handleProviderClick(provider.provider)}
                disabled={loadingProvider !== null}
                variant="outline"
                size="lg"
                className="w-full h-[56px] !text-[16px] !font-bold !leading-tight"
              >
                {loadingProvider === provider.provider ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-ods-text-primary border-t-transparent" />
                ) : (
                  getProviderIcon(provider.provider)
                )}
                {loadingProvider === provider.provider ? 'Signing in...' : getProviderDisplayName(provider.provider)}
              </Button>
            ))}
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