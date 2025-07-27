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

### Dialog Components (CRITICAL)
**Issue**: Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription components fail to render
- **Symptoms**: Components import successfully but don't display in DOM
- **Affected Components**: All modal/dialog implementations
- **Current Workaround**: Native modal implementations using fixed positioning
- **Status**: Under investigation - likely portal/provider or CSS visibility issues

**Example Workaround Pattern**:
```typescript
// Instead of UI kit Dialog
// import { Dialog, DialogContent } from "@flamingo/ui-kit/components/ui"

// Use native modal implementation
if (!isOpen) return null;

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
    <div className="relative z-10 w-full max-w-lg mx-4 bg-ods-card border border-ods-border rounded-lg shadow-xl">
      {/* Modal content */}
    </div>
  </div>
);
```

### Working Components
- ✅ Button, Toaster, useToast hook
- ✅ All styling and theme utilities
- ✅ Platform-aware color system

### Future Investigation Needed
1. **Dialog Portal Setup**: Check if Dialog components need portal container
2. **CSS Conflicts**: Investigate z-index or visibility CSS issues
3. **Provider Requirements**: Verify if Dialog components need additional providers
4. **Package Export Issues**: Confirm Dialog components are properly exported