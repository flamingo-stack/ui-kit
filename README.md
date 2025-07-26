# @flamingo/ui-kit

The shared design system for all Flamingo products including OpenMSP, OpenFrame, Admin Hub, Flamingo Website, and more.

## Features

- 🎨 **ODS Design Tokens** - Comprehensive design token system with platform-specific theming
- 🧩 **Reusable Components** - Battle-tested UI components and feature components
- 🎯 **Platform-Aware** - Automatically adapts to different product contexts
- 📱 **Mobile-First** - Responsive design with touch-friendly interactions
- ⚡ **Performance Optimized** - Lightweight and fast-loading
- 🔧 **TypeScript First** - Full type safety and excellent DX

## Installation

```bash
# Clone the design system alongside your project
git clone https://github.com/your-org/flamingo-design-system.git
```

## Usage

### Import Styles

```tsx
// Import the complete design system styles
import '@flamingo/ui-kit/styles'
```

### Import Components

```tsx
// UI Components
import { Button, Card } from '@flamingo/ui-kit/components/ui'

// Feature Components  
import { AnnouncementBar, SSOModal } from '@flamingo/ui-kit/components/features'

// Hooks
import { useAnnouncements, useDebounce } from '@flamingo/ui-kit/hooks'

// Utils
import { cn, getPlatformAccentColor } from '@flamingo/ui-kit/utils'
```

### Platform Configuration

The design system automatically detects the platform from `NEXT_PUBLIC_APP_TYPE`:

```tsx
// Announcement bar adapts to your platform
<AnnouncementBar 
  apiUrl={process.env.NEXT_PUBLIC_API_URL}
  platform={process.env.NEXT_PUBLIC_APP_TYPE}
/>
```

### Tailwind Configuration

Extend your Tailwind config with the design system:

```js
import designSystemConfig from '@flamingo/ui-kit/tailwind-config'

export default {
  ...designSystemConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './flamingo-design-system/src/**/*.{js,ts,jsx,tsx}'
  ]
}
```

## Components

### UI Components
- `Button` - Comprehensive button component with multiple variants
- `Card` - Flexible card layouts including horizontal cards
- More components being migrated...

### Feature Components
- `AnnouncementBar` - Platform-aware announcement system
- `SSOModal` - Authentication modal with provider support
- More features being migrated...

## Design Tokens

The ODS (OpenFrame Design System) provides:

- **Colors** - Platform-specific color schemes
- **Typography** - Fluid typography with responsive scaling  
- **Spacing** - Consistent spacing scale
- **Shadows** - Layered shadow system
- **Animations** - Smooth interaction states

## Development

This is a source-only package during development. Changes are reflected immediately in consuming projects.

## Platform Support

- **OpenMSP** - MSP knowledge hub
- **OpenFrame** - Self-hosted application platform
- **Admin Hub** - Administrative interface
- **Flamingo** - Web development services
- **Flamingo Teaser** - Landing page system

## Contributing

1. Make changes to components/styles in this repo
2. Test across all platforms
3. Update documentation
4. Create PR for review

## License

MIT