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

## Installation

```bash
npm install @flamingo/ui-kit
```

## Usage

### Components

```tsx
import { Button, Card, Input, Modal, ModalHeader, ModalTitle, ModalFooter } from '@flamingo/ui-kit/components/ui'
import { SSOModal, ErrorBoundary } from '@flamingo/ui-kit/components/features'
import { FlamingoLogo, OpenMSPLogo } from '@flamingo/ui-kit/components/icons'
import { useToast } from '@flamingo/ui-kit/hooks'

function MyComponent() {
  const { toast } = useToast()
  
  return (
    <Card>
      <Button 
        variant="primary" 
        onClick={() => toast({ title: "Success!", description: "Action completed" })}
      >
        Click me
      </Button>
      <Input placeholder="Enter text..." />
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalHeader>
          <ModalTitle>Reliable Modal</ModalTitle>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={handleAction}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </Card>
  )
}
```

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
- `icons/` - Shared icon components

### Hooks
- `ui/` - UI utility hooks (useDebounce, useMediaQuery, useToast)
- `platform/` - Platform configuration and detection (usePlatformConfig)
- `api/` - Data fetching hooks (useAnnouncements)

### Working Components ✅
- **Button**: All variants with proper text visibility and icon support (leftIcon, rightIcon)
- **Modal**: Reliable modal system with accessibility and escape key handling
- **Toast**: Complete notification system with proper positioning, z-index, and stacking
- **Comment Card**: Full MSP display with avatar overlays and deletion functionality
- **User Summary**: Complete user display with MSP badges and responsive layouts
- **Join Waitlist Button**: OpenFrame icon integration with customizable colors
- **Vendor Display**: VendorIcon and VendorTag with full media processing
- **Input/Form Elements**: Full form component suite with API integration
- **Theme System**: Platform-aware ODS design tokens with full state variations

### Client-Side Only
This package contains **only client-side code**:
- ✅ React components and hooks
- ✅ Browser utilities and helpers
- ✅ CSS and styling
- ❌ No server-side code
- ❌ No API routes or server utilities
- ❌ No database connections

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