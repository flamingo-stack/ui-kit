"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@flamingo/ui-kit/components/ui";
import { Badge } from "@flamingo/ui-kit/components/ui";
import { VendorsIcon, CompareIcon, CommunityIcon, UserIcon, SlackIcon, IconsXIcon as XIcon } from "@flamingo/ui-kit/components/icons";
import { Activity, Layers, Network, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSlackCommunityJoinUrl } from '@/lib/utils/common';
import { useRouter } from 'next/navigation';

import { useComparison } from '@/hooks/use-comparison';
import { useAuth } from '@/components/auth/auth-provider';
import { useStackSelections } from '@/hooks/use-stack-selections';
import { shouldShowAdminMenu } from '@/lib/app-config';

interface MobileNavPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuthModal: () => void;
}

export function MobileNavPanel({ isOpen, onClose, onOpenAuthModal }: MobileNavPanelProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const { vendorCount } = useComparison();
  const { selections } = useStackSelections();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setMounted(true);
    } else {
      document.body.style.overflow = 'unset';
      // Delay unmount to allow slide-out animation
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  const handleOpenCommunity = () => {
    window.open(getSlackCommunityJoinUrl(), '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />

      {/* Navigation Panel */}
      <div
        className={cn(
          "fixed z-50 bg-ods-card shadow-xl right-0 w-full sm:w-96 sm:max-w-[calc(100vw-2rem)] md:w-[400px] md:max-w-[calc(100vw-3rem)] top-0 bottom-0 flex flex-col transform transition-transform duration-300 ease-in-out",
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 border-b border-ods-border flex-shrink-0 h-[72px]">
          <span className="font-['DM_Sans'] text-heading-5 font-bold text-ods-text-primary">Menu</span>
          <Button
            aria-label="Close menu"
            size="icon"
            variant="ghost"
            centerIcon={<XIcon className="w-5 h-5 text-ods-text-primary" />}
            onClick={onClose}
            className="hover:bg-ods-bg-hover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-2">
          <div className="flex flex-col space-y-1">
            {/* Vendors header */}
            <div className="px-4 pt-2 pb-1 text-xs font-semibold text-ods-text-secondary uppercase tracking-wide">Vendors</div>
            <div className="flex flex-col gap-1">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<VendorsIcon className="w-5 h-5 text-ods-text-secondary" />}
                className={cn(
                  "justify-start h-12 px-4 bg-transparent border-none text-ods-text-primary hover:bg-ods-bg-hover gap-3 rounded-md transition-colors",
                  pathname === '/vendors' ? 'bg-ods-bg-hover' : ''
                )}
                onClick={() => {
                  onClose();
                  router.push('/vendors');
                }}
              >
                Vendors
              </Button>

              {/* Margin Increase Header */}
              <div className="px-4 pt-4 pb-1 text-xs font-semibold text-ods-text-secondary uppercase tracking-wide">Margin Increase</div>
              <div className="flex flex-col gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<CompareIcon className="w-5 h-5 text-ods-text-secondary" />}
                  rightIcon={vendorCount > 0 ? (
                    <Badge className="bg-ods-accent hover:bg-ods-accent text-ods-text-on-accent text-xs font-bold h-5 w-5 flex items-center justify-center">
                      {vendorCount}
                    </Badge>
                  ) : undefined}
                  className={cn(
                    "justify-start h-12 px-4 bg-transparent border-none text-ods-text-primary hover:bg-ods-bg-hover gap-3 rounded-md transition-colors",
                    pathname === '/margin-increase/compare?scroll=search' ? 'bg-ods-bg-hover' : ''
                  )}
                  onClick={() => {
                    onClose();
                    router.push('/margin-increase/compare?scroll=search');
                  }}
                >
                  Compare
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Layers className="w-5 h-5 text-ods-text-secondary" />}
                  rightIcon={selections.length > 0 ? (
                    <Badge className="bg-ods-accent hover:bg-ods-accent text-ods-text-on-accent text-xs font-bold h-5 w-5 flex items-center justify-center">
                      {selections.length}
                    </Badge>
                  ) : undefined}
                  className={cn(
                    "justify-start h-12 px-4 bg-transparent border-none text-ods-text-primary hover:bg-ods-bg-hover gap-3 rounded-md transition-colors",
                    pathname === '/margin-increase/your-stack' ? 'bg-ods-bg-hover' : ''
                  )}
                  onClick={() => {
                    onClose();
                    router.push('/margin-increase/your-stack');
                  }}
                >
                  Your Stack
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Network className="w-5 h-5 text-ods-text-secondary" />}
                  className={cn(
                    "justify-start h-12 px-4 bg-transparent border-none text-ods-text-primary hover:bg-ods-bg-hover gap-3 rounded-md transition-colors",
                    pathname === '/margin-increase/stack-builder/wizard/profile' ? 'bg-ods-bg-hover' : ''
                  )}
                  onClick={() => {
                    onClose();
                    router.push('/margin-increase/stack-builder/wizard/profile');
                  }}
                >
                  Stack Builder
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Sparkles className="w-5 h-5 text-ods-text-secondary" />}
                  className={cn(
                    "justify-start h-12 px-4 bg-transparent border-none text-ods-text-primary hover:bg-ods-bg-hover gap-3 rounded-md transition-colors",
                    pathname === '/margin-increase/report' ? 'bg-ods-bg-hover' : ''
                  )}
                  onClick={() => {
                    onClose();
                    router.push('/margin-increase/report');
                  }}
                >
                  AI-powered Report
                </Button>
              </div>

              {/* Community header */}
              <div className="px-4 pt-4 pb-1 text-xs font-semibold text-ods-text-secondary uppercase tracking-wide">Community</div>
              <div className="flex flex-col gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleOpenCommunity();
                    onClose();
                  }}
                  leftIcon={<SlackIcon className="w-5 h-5" />}
                  className="justify-start h-12 px-4 bg-transparent border-none text-ods-text-primary hover:bg-ods-bg-hover gap-3 rounded-md transition-colors"
                >
                  Open Community
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<CommunityIcon className="w-5 h-5 text-ods-text-secondary" />}
                  onClick={() => {
                    onClose();
                    router.push('/blog');
                  }}
                  className={cn(
                    "justify-start h-12 px-4 bg-transparent border-none text-ods-text-primary hover:bg-ods-bg-hover gap-3 rounded-md transition-colors",
                    pathname === '/blog' ? 'bg-ods-bg-hover' : ''
                  )}
                >
                  OpenMSP Blog
                </Button>
              </div>

              {/* Admin header */}
              {shouldShowAdminMenu(user?.role) && (
                <>
                  <div className="px-4 pt-4 pb-1 text-xs font-semibold text-ods-text-secondary uppercase tracking-wide">Admin</div>
                  <div className="flex flex-col gap-1 pl-4">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Activity className="w-5 h-5 text-ods-text-secondary" />}
                      onClick={() => {
                        onClose();
                        router.push('/admin');
                      }}
                      className={cn(
                        "justify-start h-12 px-4 bg-transparent border-none text-ods-text-primary hover:bg-ods-bg-hover gap-3 rounded-md transition-colors",
                        pathname.startsWith('/admin') ? 'bg-ods-bg-hover' : ''
                      )}
                    >
                      Admin
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-ods-border p-4 flex-shrink-0">
          {!user ? (
            <Button
              className="w-full"
              variant="primary"
              onClick={() => { onOpenAuthModal(); onClose(); }}
            >
              Sign Up
            </Button>
          ) : (
            <Button
              className="w-full"
              variant="outline"
              leftIcon={<UserIcon className="w-5 h-5 text-ods-text-secondary" />}
              onClick={() => { onClose(); router.push('/profile'); }}
            >
              Profile
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
