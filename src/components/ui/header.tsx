"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { SSOModal } from "@/components/auth/sso-modal";
import { CommunityIcon, OpenmspLogo, SlackIcon, UserIcon, VendorsIcon, HamburgerIcon, FlamingoLogo } from "@flamingo/ui-kit/components/icons";
import { Button } from "@flamingo/ui-kit/components/ui";
import { SocialIconRow } from '../social-icon-row';
import { useComparison } from "@/hooks/use-comparison";
import { useStackSelections } from '@/hooks/use-stack-selections';
import { cn } from '@/lib/utils';
import { getSlackCommunityJoinUrl } from '@/lib/utils/common';
import { shouldShowAdminMenu, shouldShowComponent, getAppConfig, getCurrentAppType } from '@/lib/app-config';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DollarSignIcon, Activity, NewspaperIcon, Layers, Network, Sparkles, Menu } from 'lucide-react';
import Link from "next/link";
import { Badge } from "@flamingo/ui-kit/components/ui";
import { CompareIcon } from "@flamingo/ui-kit/components/icons";
import { MobileNavPanel } from './mobile-nav-panel';

// Clean responsive hook - no complex measurements needed
function useCleanResponsiveHeader() {
  const [isMounted, setIsMounted] = useState(false);
  const { vendorCount } = useComparison();
  const { selections, pullSelectionsFromServer } = useStackSelections();

  useEffect(() => {
    setIsMounted(true);
    pullSelectionsFromServer();
  }, [pullSelectionsFromServer]);

  return {
    isMounted,
    vendorsCount: vendorCount,
    stackCount: selections.length,
  };
}

export function Header() {
  // Auth state and app configuration
  const { user, isLoading, signInWithSSO, isSuperAdmin } = useAuth();
  const pathname = usePathname();

  // Get app configuration and current app type
  const appConfig = getAppConfig();
  const currentAppType = getCurrentAppType();
  const isAdminApp = currentAppType === 'admin-hub';

  // Debug logging for auth state changes
  useEffect(() => {
    console.log('🎯 Header auth state change:', {
      hasUser: !!user,
      userEmail: user?.email,
      isLoading,
      isSuperAdmin,
    });
  }, [user, isLoading, isSuperAdmin]);

  // No loading state blocking - show header immediately
  const { isMounted, vendorsCount, stackCount } = useCleanResponsiveHeader();

  // Auto-hide header state - start visible
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Mobile navigation toggle state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Desktop dropdown open states
  const [isMarginDropdownOpen, setIsMarginDropdownOpen] = useState(false);
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);

  // Close dropdowns when route changes
  useEffect(() => {
    setIsMarginDropdownOpen(false);
    setIsCommunityDropdownOpen(false);
  }, [pathname]);

  // Close mobile menu automatically when navigating to a new route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open (simple lock)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Auth modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  // Mobile nav auth modal state (separate from desktop)
  const [isMobileAuthModalOpen, setIsMobileAuthModalOpen] = useState(false);

  // Optimized scroll handling with useCallback
  const handleScroll = useCallback(() => {
    // Check if scroll handling is temporarily disabled by navigation or menu is open
    if ((window as any).__blockHeaderAutoHide || isMenuOpen) return;

    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;

    // Skip small scroll movements
    if (Math.abs(scrollDelta) < 2) return;

    // Always show header when at top of page
    if (currentScrollY <= 10) {
      setIsVisible(true);
    }
    // Hide when scrolling down, show when scrolling up
    else if (scrollDelta > 0 && currentScrollY > 20) {
      // Scrolling down - hide header
      setIsVisible(false);
    } else if (scrollDelta < 0) {
      // Scrolling up - show header
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY, isMenuOpen]);

  // Scroll event listener with throttling
  useEffect(() => {
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Helper function to determine if a path is active
  const isActivePath = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Header */}
      <header
        className={cn(
          'sticky z-50 w-full flex items-center justify-between border-b border-ods-border bg-ods-card transition-[top] duration-300 ease-in-out px-6 py-3',
          isVisible ? 'top-0' : '-top-20',
          isMenuOpen ? 'z-40' : 'z-50' // Lower z-index when menu is open
        )}
      >
        {/* Left Section */}
        <div className="flex items-center justify-start flex-shrink-0">
          {isAdminApp && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('toggleAdminSidebar'));
              }}
              className="text-ods-text-primary hover:bg-ods-bg-hover p-2 mr-4"
              aria-label="Toggle admin menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          <Link
            href={appConfig.navigation.logo.href}
            className={cn('transition-opacity duration-200 hover:opacity-80', isAdminApp ? 'flex items-center gap-3' : '')}
          >
            {isAdminApp ? (
              <>
                <FlamingoLogo className="h-8 w-8 text-ods-accent" />
                <div className="flex flex-col">
                  <h1 className="font-['Azeret_Mono'] text-[16px] font-semibold text-ods-text-primary leading-tight">
                    {appConfig.navigation.logo.text}
                  </h1>
                  <span className="text-body-xs text-ods-text-secondary tracking-wide font-medium">
                    Content Management
                  </span>
                </div>
              </>
            ) : (
              <span className="flex items-center gap-2">
                <OpenmspLogo
                  className="w-6 h-6 text-ods-accent"
                  frontBubbleColor="var(--color-text-primary)"
                  innerFrontBubbleColor="var(--color-bg)"
                  backBubbleColor="var(--color-accent-primary)"
                />
                <span className="font-['DM_Sans'] text-heading-5 font-bold text-ods-text-primary">
                  {appConfig.navigation.logo.text}
                </span>
              </span>
            )}
          </Link>
        </div>

        {/* Center Navigation */}
        {shouldShowComponent('platformNav') && (
          <nav
            className="hidden min-[1430px]:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Vendors */}
            <Link href="/vendors" className="focus:outline-none">
              <Button
                variant="ghost"
                className={cn(
                  'h-10 px-3 py-2 gap-2 rounded-[6px] bg-transparent border-none shadow-none font-[\'DM_Sans\'] font-bold text-[16px] leading-none tracking-[-0.32px] hover:bg-ods-bg-hover focus:bg-ods-bg-hover focus:ring-0 focus:outline-none transition-colors duration-200 ease-in-out whitespace-nowrap min-w-fit',
                  isActivePath('/vendors') ? 'text-ods-text-primary' : 'text-ods-text-secondary'
                )}
                asChild
              >
                <span className="flex items-center gap-2">
                  <VendorsIcon
                    width={20}
                    height={20}
                    className={cn(isActivePath('/vendors') ? 'text-ods-text-primary' : 'text-ods-text-secondary')}
                  />
                  Vendors
                </span>
              </Button>
            </Link>
            {/* Additional dropdowns and links - omitted for brevity */}
          </nav>
        )}

        {/* Right Actions and Mobile Hamburger (unchanged code omitted for brevity) */}

        {shouldShowComponent('mobileNav') && (
          isMenuOpen ? (
            <div className="min-[1430px]:hidden w-10 h-10" />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="min-[1430px]:hidden"
              onClick={toggleMenu}
              aria-label="Open menu"
            >
              <HamburgerIcon className="w-6 h-6 text-ods-text-primary" />
            </Button>
          )
        )}
      </header>

      {/* SSO Modals */}
      <SSOModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onProviderClick={async (provider) => {
          try {
            await signInWithSSO(provider);
            setIsAuthModalOpen(false);
          } catch (error) {
            console.error(`SSO error with ${provider}:`, error);
            setIsAuthModalOpen(false);
          }
        }}
      />
      <SSOModal
        isOpen={isMobileAuthModalOpen}
        onClose={() => setIsMobileAuthModalOpen(false)}
        onProviderClick={async (provider) => {
          try {
            await signInWithSSO(provider);
            setIsMobileAuthModalOpen(false);
          } catch (error) {
            console.error(`Mobile SSO error with ${provider}:`, error);
            setIsMobileAuthModalOpen(false);
          }
        }}
      />

      {shouldShowComponent('mobileNav') && (
        <MobileNavPanel
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onOpenAuthModal={() => setIsMobileAuthModalOpen(true)}
        />
      )}
    </>
  );
}
