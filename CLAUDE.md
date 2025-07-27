# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

@flamingo/ui-kit is a shared design system package for all Flamingo products (OpenMSP, OpenFrame, Admin Hub, Flamingo Website, and more). It's a source-only TypeScript package that provides components, hooks, styles, and utilities for consistent UI across platforms.

## Commands

### Development
- `npm run type-check` - Run TypeScript type checking
- `npm run dev` - Shows source-only message (no build process needed)
- `npm run lint` - Placeholder for future linting setup

### Testing
No test commands are currently configured.

## Package Architecture

### Modular Export Structure
The package uses granular exports for optimal tree-shaking:

```typescript
// Main exports
import { Button, Card } from '@flamingo/ui-kit/components/ui'
import { AnnouncementBar, SSOModal } from '@flamingo/ui-kit/components/features'
import { useAnnouncements, useDebounce } from '@flamingo/ui-kit/hooks'
import { cn, getPlatformAccentColor } from '@flamingo/ui-kit/utils'

// Styles import
import '@flamingo/ui-kit/styles'
```

### Platform-Aware Design System
The UI kit automatically adapts to different platforms via:
- **Platform Types**: `openmsp | admin-hub | openframe | flamingo | flamingo-teaser`
- **Dynamic Theming**: CSS variables that adapt based on `NEXT_PUBLIC_APP_TYPE`
- **Platform-Specific Components**: Components that adjust behavior/styling per platform

### ODS (OpenFrame Design System)
Comprehensive design token system with:
- **CSS Variables**: All design tokens use CSS custom properties
- **Responsive Typography**: Fluid scaling with clamp() functions
- **Semantic Colors**: Platform-aware color schemes with full state variations
- **Component Tokens**: Predefined spacing, shadows, and sizing for common components
- **Dark Mode Support**: Platform-specific dark theme adjustments

### Key Directories

#### `/src/components/`
- **ui/**: Base components (Button, Card, Input, etc.) using Radix UI primitives
- **features/**: Complex components (AnnouncementBar, SSOModal) with platform logic

#### `/src/hooks/`
- **api/**: Data fetching hooks (useAnnouncements)
- **ui/**: UI utility hooks (useDebounce, useLocalStorage, useMediaQuery)
- **platform/**: Platform configuration hooks (usePlatformConfig)

#### `/src/styles/`
- **index.css**: Main stylesheet importing all design tokens
- **ods-*.css**: Individual design token modules (colors, typography, spacing, etc.)
- **ods-dynamic-theming.css**: Platform-specific theme variations

#### `/src/utils/`
- **cn.ts**: Class name utility using clsx + tailwind-merge
- **ods-color-utils.ts**: Platform color utilities

### TypeScript Configuration
- Strict mode enabled
- Path aliases: `@/*` maps to `./src/*`
- ES2020 target with modern module resolution
- React/Next.js optimized

### Tailwind Integration
The package provides a Tailwind config that consuming projects should extend:

```javascript
import designSystemConfig from '@flamingo/ui-kit/tailwind-config'

export default {
  ...designSystemConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './flamingo-design-system/src/**/*.{js,ts,jsx,tsx}'
  ]
}
```

### Development Workflow
Since this is a source-only package:
1. Changes are reflected immediately in consuming projects
2. No build step required during development
3. Type checking ensures API consistency
4. Test across all platforms before releasing

### Platform Integration
Components automatically detect platform context and adapt:
- Colors and theming adjust based on `NEXT_PUBLIC_APP_TYPE`
- AnnouncementBar fetches platform-specific announcements
- SSOModal adapts authentication flow per platform
- Hooks provide platform-aware data fetching

### Key Dependencies
- **React 18+**: Peer dependency for consuming projects
- **Radix UI**: Primitive components for accessibility
- **Tailwind CSS**: Styling system with custom design tokens
- **Class Variance Authority**: Component variant management
- **Lucide React**: Icon system

## Known Issues & Workarounds

### Dialog Components (RESOLVED)
**Issue**: Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription components failed to render
- **Root Cause**: Version conflicts in @radix-ui/react-dialog dependencies
  - Main project used v1.1.4, UI kit used v1.1.14, old cmdk used v1.0.0
  - Multiple Dialog implementations conflicted, causing newer versions to fail silently
- **Solution**: 
  - Updated all @radix-ui/react-dialog dependencies to v1.1.14
  - Added package.json overrides to force version consistency
  - Updated cmdk from v0.2.0 to v1.0.4 to eliminate old Dialog dependency
- **Status**: ⚠️ PARTIALLY FIXED - Version conflicts resolved but portal rendering issues remain
- **Migration**: Reverted to native modal implementations for reliability

**Current Working Pattern (UI Kit Modal)**:
```typescript
// UI Kit Modal component that works reliably
import { Modal, ModalHeader, ModalTitle, ModalFooter } from "@flamingo/ui-kit/components/ui"

<Modal isOpen={!!deleteItem} onClose={() => setDeleteItem(null)}>
  <ModalHeader>
    <ModalTitle>Confirm action?</ModalTitle>
    <p className="text-ods-text-secondary text-sm mt-1">
      Description of the action to be taken.
    </p>
  </ModalHeader>
  <ModalFooter>
    <Button variant="outline" onClick={() => setDeleteItem(null)}>Cancel</Button>
    <Button onClick={handleAction}>Confirm</Button>
  </ModalFooter>
</Modal>
```

**Current Implementation Status**:
- ✅ AnnouncementManagementDashboard - UI Kit Modal (reliable)
- ✅ UsersDashboard - UI Kit Modal (reliable)
- ✅ ContactManagementDashboard - UI Kit Modal (reliable)  
- ✅ BlogPostsDashboard - UI Kit Modal (reliable)

### Working Components
- ✅ Button, Toaster, useToast hook (with fixed positioning and width issues)
- ✅ Modal, ModalHeader, ModalTitle, ModalFooter (custom implementation)
- ✅ All styling and theme utilities
- ✅ Platform-aware color system
- ✅ TypeScript compilation (zero errors achieved)
- ✅ Toast system (fixed z-index, positioning, stacking, and width issues)
- ✅ Button variants (fixed secondary variant text visibility)

### Modal Component Features
- ✅ **Reliable rendering** - Always shows when isOpen is true
- ✅ **Escape key support** - Closes on Escape key press
- ✅ **Click outside to close** - Click overlay to close
- ✅ **Scroll blocking** - Background scroll is blocked when modal is open
- ✅ **Proper z-index** - Always appears above other content (z-[1300])
- ✅ **ODS theming** - Uses design system colors and spacing
- ✅ **Accessibility** - Proper ARIA attributes and focus management

## Recent Fixes & Improvements

### TypeScript Compilation (RESOLVED ✅)
- **Issue**: Multiple TypeScript compilation errors throughout the UI kit
- **Root Causes**: 
  - Missing module exports and import path mismatches
  - Duplicate exports causing conflicts
  - Missing dependencies and stub implementations
  - Type mismatches in components and hooks
- **Solution**: 
  - Fixed missing platform-utils and asset exports
  - Corrected import paths for UI components (`../../utils/cn` vs `../utils/cn`)
  - Created comprehensive stub implementations for missing dependencies
  - Resolved duplicate exports and type conflicts
- **Status**: ✅ FULLY RESOLVED - Zero TypeScript errors achieved

### Toast System (RESOLVED ✅)
- **Issue**: Toast notifications had multiple problems:
  - `visible` attribute error causing React warnings
  - Poor positioning (appearing behind overlays)
  - Incorrect stacking behavior (single row instead of column)
  - Taking full width instead of content-based sizing
- **Root Cause**: Duplicate legacy toast implementations conflicting with modern Radix UI implementation
- **Solution**:
  - Removed duplicate legacy toast files
  - Fixed prop filtering in Toaster component
  - Updated z-index from `z-[100]` to `z-[9999]`
  - Changed positioning to consistent bottom-right
  - Fixed stacking with `flex-col gap-2`
  - Changed width from `w-full` to `w-auto` for content-based sizing
- **Status**: ✅ FULLY RESOLVED - Toast system working perfectly

### Button Component (RESOLVED ✅)
- **Issue**: Secondary button variant had white text on white background ("Join Community" button)
- **Root Cause**: Using `text-ods-text-inverted` which could be unreliable
- **Solution**: Changed secondary variant to use `text-black` for guaranteed visibility
- **Status**: ✅ FULLY RESOLVED - All button variants working correctly

### Future Investigation Needed
1. **Dialog Portal Setup**: Check if Dialog components need portal container
2. **CSS Conflicts**: Investigate z-index or visibility CSS issues
3. **Provider Requirements**: Verify if Dialog components need additional providers
4. **Package Export Issues**: Confirm Dialog components are properly exported
5. **Duplicate Components**: Address remaining duplicate files between main project and UI kit