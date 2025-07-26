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

## Installation

```bash
npm install @flamingo/ui-kit
```

## Usage

### Components

```tsx
import { Button, Card, Input } from '@flamingo/ui-kit/components/ui'
import { SSOModal, ErrorBoundary } from '@flamingo/ui-kit/components/features'
import { FlamingoLogo, OpenMSPLogo } from '@flamingo/ui-kit/components/icons'

function MyComponent() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
      <Input placeholder="Enter text..." />
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

- **OpenMSP** (`openmsp`) - Blue accent colors, MSP-focused components
- **Admin Hub** (`admin-hub`) - Professional admin interface styling
- **OpenFrame** (`openframe`) - Framework-focused design system
- **Flamingo** (`flamingo`) - Brand-focused web presence
- **Flamingo Teaser** (`flamingo-teaser`) - Marketing/landing page styling

Platform detection is automatic based on the `NEXT_PUBLIC_APP_TYPE` environment variable.

## Development

This is a source-only package, so no build step is required. Changes are reflected immediately in consuming projects.

```bash
# Type checking
npm run type-check

# Linting (when configured)
npm run lint
```

## Architecture

### Components
- `ui/` - Base components using Radix UI primitives
- `features/` - Complex, platform-aware components
- `icons/` - Shared icon components

### Hooks
- `ui/` - UI utility hooks (debounce, media queries, etc.)
- `platform/` - Platform configuration and detection
- `api/` - Data fetching hooks (future)

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
3. Add proper TypeScript types
4. Test across all supported platforms
5. Update exports in relevant `index.ts` files

## License

Private package for Flamingo CX projects.