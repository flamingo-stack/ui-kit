# @flamingo/ui-kit

A shared design system package for all Flamingo platforms (OpenMSP, OpenFrame, Admin Hub, Flamingo Website, and more).

## Overview

This is a **source-only** TypeScript package that provides:
- 🎨 **UI Components** - Built on Radix UI primitives with consistent styling
- 🎯 **Platform-Aware Theming** - Automatically adapts based on `NEXT_PUBLIC_APP_TYPE`
- 🪝 **Shared Hooks** - Reusable React hooks for common functionality
- 🛠️ **Utilities** - Helper functions and utilities
- 🎭 **Icons** - Shared icon components
- 📱 **Responsive Design** - Mobile-first, accessibility-focused components
- ✅ **Zero TypeScript Errors** - Fully type-safe with comprehensive error resolution
- 🎊 **Toast System** - Reliable notifications with proper positioning and stacking
- 🔘 **Button System** - Complete button variants with proper text visibility
- 💬 **Tooltip System** - Radix-based tooltips with proper z-index management
- 🎯 **Header Z-Index** - Fixed layering for headers, sidebars, and dropdowns
- 🔄 **Configuration-Driven** - Platform-specific UI via configuration objects
- 📊 **Loading Standards** - Consistent skeleton screens and loading states
- 🎨 **BenefitCard Component** - Reusable feature/benefit display cards
- 🖼️ **OG Link Preview** - Smart fallback system for article previews with priority rendering
- 🧭 **Sticky Navigation** - Smooth scrolling section navigation with native browser APIs
- 💀 **Loading Skeletons** - Comprehensive skeleton components preventing double-loading issues
- 🔗 **Button onClick Fix** - Proper onClick support with href for dropdown menu closing
- 💰 **Investors System** - Complete CRUD with modal-based admin and Supabase integration
- 🎬 **ParallaxImageShowcase** - Advanced parallax effects with global mouse tracking and scroll animations
- 📺 **YouTubeEmbed Component** - CSP-safe YouTube video embedding with pure ODS color integration and dependency cleanup ✅
- 📦 **PageContainer Component** - Standardized layout container ensuring consistent spacing and responsive design across all sections ✅
- 🎯 **FigmaPrototypeViewer** - ✅ FULLY COMPLETED (2025-08-17):
  - **RESOLVED**: Smooth navigation without iframe reloads using Figma Embed Kit 2.0 API
  - **RESOLVED**: Event-driven loading system with no timeouts (pure React patterns)
  - **RESOLVED**: Mobile touch interaction system solving cross-origin iframe conflicts
  - **RESOLVED**: Visual polish with transparent backgrounds and clean presentation
  - **REVOLUTIONARY**: Advanced touch gesture detection for mobile devices
  - **MODERN**: 2025 web development standards with unified state management

### Scope Clarification

UI-Kit provides **reusable, platform-agnostic components**. Platform-specific business components (like `openmsp-video-stats-section.tsx`) live in the main application and use UI-Kit components and design tokens.

### Recent Updates (2025-08-17)

- **YouTube Embed Cleanup**: Complete dependency and color token migration
  - **Dependency Cleanup**: react-player removed from main package.json (kept only in UI-Kit)
  - **Color Token Migration**: All hardcoded colors (`#FF6B6B`, `#2A1F1F`, `#FFD951`) replaced with pure ODS tokens
  - **Component Consolidation**: Deleted obsolete `lib/utils/lite-youtube-embed.tsx` file
  - **Import Updates**: Updated `media-carousel.tsx` and `simple-markdown-renderer.tsx` to use UI Kit YouTubeEmbed

### Recent Updates (2025-08-14)

- **ODS Design System Compliance**: 
  - Replaced all hardcoded colors with ODS design tokens
  - Fixed hover states and accent colors throughout
  - Improved error displays with proper containment
- **Navigation Component Enhancements**:
  - Removed .md extensions from display names
  - Fixed README sorting in multi-level navigation
  - Added yellow accent ribbon for selected items
- **Jobs Dashboard Integration**:
  - Centralized job configuration with metadata
  - Dynamic job name display from metadata
  - OpenFrame Docs job properly named and positioned

### Recent Updates (2025-08-13)

- **Investors Management Feature**: Complete investor management system with admin interface
  - Modal-based admin following blog-posts pattern with InvestorFormModal component
  - File upload integration for logo management with Supabase storage
  - Funding rounds selector component with visual icons
  - Public display section with Figma-compliant design
- **Button Component Enhancement**: Fixed onClick prop support when href is provided
- **Header Dropdown Fix**: Dropdown menus now close properly on navigation
- **Component Cleanup**: Removed unified button components (TryOpenFrameButton, StartWithOpenFrameButton, GithubRepoButton)

## Installation

```bash
npm install @flamingo/ui-kit
```

## Usage

### Components

```tsx
import { Button, Card, Input, Modal, ModalHeader, ModalTitle, ModalFooter, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@flamingo/ui-kit/components/ui'
import { SSOModal, ErrorBoundary, YouTubeEmbed } from '@flamingo/ui-kit/components/features'
import { GitHubIcon, XLogo, OpenFrameLogo } from '@flamingo/ui-kit/components/icons'
import { FlamingoLogo, OpenMSPLogo } from '@flamingo/ui-kit/components' // Legacy individual imports
import { useToast } from '@flamingo/ui-kit/hooks'
import { Info } from 'lucide-react'

function MyComponent() {
  const { toast } = useToast()
  
  return (
    <TooltipProvider>
      <Card>
        <Button 
          variant="primary" 
          onClick={() => toast({ title: "Success!", description: "Action completed" })}
        >
          Click me
        </Button>
        <Input placeholder="Enter text..." />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-ods-text-secondary" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Helpful information about this feature</p>
          </TooltipContent>
        </Tooltip>
        
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <ModalHeader>
            <ModalTitle>Reliable Modal</ModalTitle>
          </ModalHeader>
          <ModalFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleAction}>Confirm</Button>
          </ModalFooter>
        </Modal>
        
        {/* YouTube embed with customizable controls */}
        <YouTubeEmbed 
          videoId="TqrBjLXMkgc"
          title="OpenMSP Community Overview"
          showTitle={false}
          showMeta={false}
          minimalControls={true}
          className="rounded-md"
        />
      </Card>
    </TooltipProvider>
  )
}
```

### Loading Skeletons

```tsx
import { 
  Skeleton, 
  SkeletonText, 
  SkeletonHeading,
  SkeletonCard,
  SkeletonGrid,
  SkeletonButton,
  SkeletonList,
  SkeletonNavigation
} from '@flamingo/ui-kit/components/ui'

function LoadingPage() {
  return (
    <div className="p-6">
      {/* Heading skeleton */}
      <SkeletonHeading level={1} className="mb-6" />
      
      {/* Text skeleton with 3 lines */}
      <SkeletonText lines={3} className="mb-8" />
      
      {/* Grid of 6 skeleton cards in 3 columns */}
      <SkeletonGrid columns={3} items={6} className="mb-8" />
      
      {/* Button skeleton */}
      <SkeletonButton size="lg" />
      
      {/* List with 5 items */}
      <SkeletonList items={5} />
    </div>
  )
}
```

### ParallaxImageShowcase

```tsx
import { ParallaxImageShowcase } from '@flamingo/ui-kit/components/features'

function HeroSection() {
  return (
    <section className="overflow-x-hidden">
      <ParallaxImageShowcase
        images={[
          {
            src: '/assets/dashboard-1.png',
            alt: 'Dashboard Screenshot 1',
            position: 'left'  // z-index 3 (on top)
          },
          {
            src: '/assets/dashboard-2.png', 
            alt: 'Dashboard Screenshot 2',
            position: 'center'  // z-index 2 (middle)
          },
          {
            src: '/assets/dashboard-3.png',
            alt: 'Dashboard Screenshot 3',
            position: 'right'  // z-index 1 (behind)
          }
        ]}
        className="lg:ml-10"
      />
    </section>
  )
}
```

**Features**:
- Global mouse tracking that works across entire page
- Scroll-based animations that work everywhere
- Responsive layout for mobile and desktop (lg: breakpoint)
- Configurable animation intensity via INTENSITY variable
- Framer Motion-powered smooth animations
- Three-layer depth perception with proper z-indexing

### YouTubeEmbed Component

```tsx
import { YouTubeEmbed } from '@flamingo/ui-kit/components/features'

function VideoSection() {
  return (
    <div className="space-y-8">
      {/* Minimal video for product showcases */}
      <YouTubeEmbed 
        videoId="TqrBjLXMkgc"
        title="OpenMSP: Transforming MSP Communities"
        showTitle={false}
        showMeta={false}
        minimalControls={true}
        className="rounded-md"
      />
      
      {/* Full video for blog posts */}
      <YouTubeEmbed 
        videoId="someVideoId"
        title="Tutorial: Getting Started"
        showTitle={true}
        showMeta={true}
        minimalControls={false}
      />
    </div>
  )
}
```

**Features**:
- CSP-safe iframe implementation (no script loading violations)
- Configurable UI controls: title, meta info, minimal controls
- Strips "more videos" suggestions when minimalControls=true
- Responsive design with pure ODS theming (no hardcoded colors)
- Cross-platform compatibility (OpenMSP, Flamingo, Admin-Hub, OpenFrame)
- Blog shortcode integration: `{{youtube:VIDEO_ID}}`
- Clean dependency management (react-player kept only in UI-Kit)

### Sticky Navigation

```tsx
import { StickySectionNav, useSectionNavigation } from '@flamingo/ui-kit/components/navigation'

function DocumentationPage() {
  const sections = [
    { id: 'introduction', title: 'Introduction', ref: useRef<HTMLElement>(null) },
    { id: 'installation', title: 'Installation', ref: useRef<HTMLElement>(null) },
    { id: 'configuration', title: 'Configuration', ref: useRef<HTMLElement>(null) }
  ]
  
  const { activeSection, handleSectionClick } = useSectionNavigation(sections, {
    offset: 100 // Offset from top when scrolling
  })
  
  return (
    <div className="flex">
      <main>
        {sections.map(section => (
          <section key={section.id} id={section.id} ref={section.ref}>
            {/* Section content */}
          </section>
        ))}
      </main>
      
      <StickySectionNav
        sections={sections}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />
    </div>
  )
}
```

**Features**:
- Native browser scroll API for smooth, reliable scrolling
- Flag-based system prevents scroll detection conflicts
- Customizable scroll offset for fixed headers
- Automatic active section highlighting
- Mobile-responsive with proper breakpoints

### Hooks

```tsx
import { useDebounce, useMediaQuery, usePlatformConfig } from '@flamingo/ui-kit/hooks'

function MyComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const platformConfig = usePlatformConfig()
  const debouncedValue = useDebounce(searchTerm, 300)
  
  // Your component logic
}
```

### Utilities

```tsx
import { cn, getPlatformAccentColor, formatDate } from '@flamingo/ui-kit/utils'

function MyComponent({ className }) {
  return (
    <div className={cn('base-styles', className)}>
      <span style={{ color: getPlatformAccentColor() }}>
        {formatDate(new Date())}
      </span>
    </div>
  )
}
```

### Styles

```tsx
// Import in your main layout or _app.tsx
import '@flamingo/ui-kit/styles'
```

## Platform Support

The UI kit automatically adapts to different platforms:

- **OpenMSP** (`openmsp`) - Yellow accent colors (#FFC008), MSP-focused components
- **Admin Hub** (`admin-hub`) - Pink accent colors (#F357BB), professional admin interface
- **OpenFrame** (`openframe`) - Cyan accent colors (#5EFAF0), framework-focused design
- **Flamingo** (`flamingo`) - Pink accent with light theme, brand-focused web presence
- **Flamingo Teaser** (`flamingo-teaser`) - Marketing/landing page styling

Platform detection is automatic based on the `NEXT_PUBLIC_APP_TYPE` environment variable. All components include hover, focus, active, and disabled states with proper accessibility support.

## Icons System

### Icon Organization
The UI Kit provides icons in two patterns:

**Centralized Icons** (recommended for new icons):
```tsx
import { GitHubIcon, XLogo, OpenFrameLogo, RedditIcon } from '@flamingo/ui-kit/components/icons'

// Usage with customizable props
<OpenFrameLogo className="h-8 w-8" />
<GitHubIcon size={24} />
<XLogo color="#1DA1F2" />
```

**Individual Icon Components** (legacy pattern):
```tsx
import { FlamingoLogo } from '@flamingo/ui-kit/components/flamingo-logo'
import { UserIcon } from '@flamingo/ui-kit/components/user-icon'
import { VendorIcon } from '@flamingo/ui-kit/components/vendor-icon'
```

### Available Icons
- **Social/Platform**: GitHubIcon, XLogo, RedditIcon, SlackIcon, HubspotIcon
- **Branding**: OpenFrameLogo, FlamingoLogo, OpenMSPLogo, ElestioLogo
- **UI Elements**: HamburgerIcon, MenuIcon, SendIcon, UserIcon, VendorIcon
- **Actions**: CheckCircleIcon, PlusCircleIcon, MinusCircleIcon, EditProfileIcon
- **Custom**: CustomStarIcon, CustomForkIcon, CustomLicenseIcon, CustomTimeIcon

### Migration Status
- ✅ **Centralized Export**: `/src/components/icons/index.ts` established
- 🔄 **Gradual Migration**: Individual icons being moved to centralized structure
- ✅ **TypeScript Support**: Full type safety with proper prop interfaces
- ✅ **Platform Theming**: Icons adapt to platform color schemes automatically

## Development

This is a source-only package, so no build step is required. Changes are reflected immediately in consuming projects.

```bash
# Type checking (zero errors achieved!)
npm run type-check

# Linting (when configured)
npm run lint
```

### Recent Major Improvements ✅

**TypeScript & Build Pipeline**:
- **Zero TypeScript Errors**: All compilation errors resolved across the entire UI kit
- **Import/Export Chain**: Fixed missing exports causing "Pagination is not exported" and "Slider is not exported" errors
- **Tailwind Integration**: Simplified fontSize configuration for TypeScript compatibility

**Core UI Components**:
- **Toast System**: Fixed positioning, z-index, stacking, and width issues for reliable notifications
- **Button Components**: Resolved text visibility issues, all variants working correctly with proper icon support
- **Modal System**: Reliable modal implementation with proper accessibility and theming
- **Comment Card**: Full MSP display functionality with avatar overlays and responsive layouts

**Authentication & Context**:
- **Auth Integration**: Real authentication context forwarding from main app to ui-kit components
- **Comment Deletion**: Working deletion logic in both profile and vendor contexts
- **User Summary**: Complete MSP badge overlay system with proper image processing

**Vendor & Media Processing**:
- **Vendor Icons**: Complete vendor logo processing with Supabase URL fixing and image proxy support
- **Vendor Tags**: Working vendor category display with proper media handling
- **Image Processing**: Enhanced image proxy utilities with OpenMSP domain detection

**Platform Integration**:
- **Join Waitlist Button**: OpenFrame icon integration across all platforms and footer components
- **OpenFrame Logo**: Full SVG component with customizable colors for branding consistency
- **Deployment Integration**: Smart URL detection for production vs staging environments
- **Form Integration**: Enhanced form modal components with proper API data binding

## Architecture

### Components
- `ui/` - Base components using Radix UI primitives (Button, Modal, Input, etc.)
- `features/` - Complex, platform-aware components (SSOModal, AnnouncementBar)
- `icons/` - Centralized icon components (GitHubIcon, XLogo, OpenFrameLogo, RedditIcon)
- Individual icon files - Legacy pattern being migrated to centralized structure

### Hooks
- `ui/` - UI utility hooks (useDebounce, useMediaQuery, useToast)
- `platform/` - Platform configuration and detection (usePlatformConfig)
- `api/` - Data fetching hooks (useAnnouncements)

### Working Components ✅
- **Button**: All variants with proper text visibility and icon support (leftIcon, rightIcon)
- **Modal**: Reliable modal system with accessibility and escape key handling
- **Toast**: Complete notification system with proper positioning, z-index, and stacking
- **Tooltip**: Radix-based tooltips with z-index 2147483647 for proper layering
- **Header**: Navigation header with configurable auto-hide behavior on scroll (z-[50])
- **Sliding Sidebar**: Mobile navigation with proper z-index management (z-[40]/z-[45])
- **Comment Card**: Full MSP display with avatar overlays and deletion functionality
- **User Summary**: Complete user display with MSP badges and responsive layouts
- **Join Waitlist Button**: OpenFrame icon integration with customizable colors
- **Vendor Display**: VendorIcon and VendorTag with full media processing
- **Input/Form Elements**: Full form component suite with API integration
- **Theme System**: Platform-aware ODS design tokens with full state variations
- **Skeleton Components**: Comprehensive loading skeletons (Text, Card, Grid, Button, Heading, List, Navigation)
- **ParallaxImageShowcase**: Interactive image showcase with parallax effects for hero sections

### Client-Side Only
This package contains **only client-side code**:
- ✅ React components and hooks
- ✅ Browser utilities and helpers
- ✅ CSS and styling
- ❌ No server-side code
- ❌ No API routes or server utilities
- ❌ No database connections

## Component Achievements

### FigmaPrototypeViewer ✅ FULLY FUNCTIONAL

The `FigmaPrototypeViewer` component (`src/components/features/figma-prototype-viewer.tsx`) is now a fully working, production-ready component:

**✅ What It Successfully Does:**
- Embeds and displays Figma prototypes with smooth navigation between sections
- Implements event-driven loading system using Figma's `NEW_STATE` event
- Provides responsive sizing with automatic device detection (desktop/mobile/touch)
- Handles complex mobile touch interactions solving cross-origin iframe limitations
- Offers unified state management with modern React patterns
- Supports multiple prototype configurations with platform-specific starting points

**🎯 Revolutionary Mobile Solution:**
- **Cross-Origin Challenge Solved**: Implemented intelligent touch overlay system
- **Gesture Detection**: Distinguishes between scroll intent and click intent
- **Natural UX**: Both page scrolling AND iframe interaction work seamlessly
- **Technical Innovation**: 500ms interaction window for natural human behavior

**🏗️ Technical Architecture (2025 Standards):**
- **Event-Driven**: No setTimeout usage, pure React event handling
- **Unified State**: Single state interface managing all component states  
- **PostMessage API**: Direct communication with Figma using `NAVIGATE_TO_FRAME_AND_CLOSE_OVERLAYS`
- **Performance**: Optimized with `useMemo`, `useCallback`, proper dependency arrays
- **Accessibility**: Proper ARIA labels, keyboard navigation, focus management

**🎨 Visual Polish:**
- Transparent iframe backgrounds for clean presentation
- Proper ODS theming throughout
- Loading skeletons with seamless transitions
- Mobile-first responsive design

**📱 Device Support:**
- **Desktop**: Full prototype experience with section navigation
- **Mobile**: Optimized layout with touch-friendly interactions  
- **Touch Devices**: Revolutionary touch handling for iframe interaction

## Contributing

When adding new components or utilities:

1. Keep everything client-side only
2. Follow the existing patterns and naming conventions
3. Add proper TypeScript types (zero errors policy)
4. Test across all supported platforms
5. Update exports in relevant `index.ts` files
6. Ensure components follow ODS design system
7. Include proper accessibility attributes
8. Test toast notifications and modal interactions
9. Verify button variants work across all themes
10. Test form integrations and API data binding
11. Validate component behavior in production and staging environments

## License

Private package for Flamingo CX projects.

## Version History

### v1.5.0 (Latest)
- Added BenefitCard component with light/dark variants
- Improved loading skeleton standards
- Enhanced filter UI components
- Updated documentation with best practices

### v1.4.0 
- Configuration-driven Header and Footer components
- Fixed z-index hierarchy across all components
- Added tooltip system with Radix UI
- Improved button variants and accessibility

### v1.3.0
- Zero TypeScript errors achieved
- Complete toast system overhaul
- Modal system implementation
- Authentication component integration