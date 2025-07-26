# Usage Examples

## Migration Guide

### Before (Current)
```tsx
// Old imports
import { Button } from '@/components/ui/button'
import { useDebounce } from '@/hooks/use-debounce'
import { getPlatformAccentColor } from '@/lib/utils/ods-color-utils'
import '@/styles/globals.css'
```

### After (Design System)
```tsx
// New imports
import { Button } from '@flamingo/ui-kit/components/ui'
import { useDebounce } from '@flamingo/ui-kit/hooks/ui'
import { getPlatformAccentColor } from '@flamingo/ui-kit/utils'
import '@flamingo/ui-kit/styles'
```

## Component Examples

### Announcement Bar
```tsx
import { AnnouncementBar } from '@flamingo/ui-kit/components/features'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <AnnouncementBar 
          apiUrl={process.env.NEXT_PUBLIC_API_URL}
          platform={process.env.NEXT_PUBLIC_APP_TYPE}
          renderIcon={(iconName, props) => {
            // Your custom icon renderer
            return <MyIcon name={iconName} {...props} />
          }}
        />
        {children}
      </body>
    </html>
  )
}
```

### Button Usage
```tsx
import { Button } from '@flamingo/ui-kit/components/ui'

export function MyComponent() {
  return (
    <div>
      <Button variant="primary" size="default">
        Primary Action
      </Button>
      
      <Button variant="outline" leftIcon={<PlusIcon />}>
        Add Item
      </Button>
      
      <Button variant="ghost" centerIcon={<MenuIcon />} size="icon" />
    </div>
  )
}
```

### Auth Modal
```tsx
import { SSOModal } from '@flamingo/ui-kit/components/features'
import { ProviderButton } from '@/components/auth/provider-button' // Your custom provider button

export function AuthExample() {
  const [showModal, setShowModal] = useState(false)
  
  const handleAuth = async (provider: string) => {
    // Your auth logic
  }
  
  return (
    <SSOModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      onProviderClick={handleAuth}
      ProviderButton={ProviderButton}
    />
  )
}
```

### Platform-Aware Hooks
```tsx
import { usePlatformConfig } from '@flamingo/ui-kit/hooks/platform'
import { useAnnouncements } from '@flamingo/ui-kit/hooks/api'

export function PlatformAwareComponent() {
  const config = usePlatformConfig()
  const { announcements } = useAnnouncements({
    apiUrl: '/api',
    platform: config.platform
  })
  
  return (
    <div style={{ color: config.accentColor }}>
      <h1>{config.brandName}</h1>
      {announcements?.map(announcement => (
        <div key={announcement.id}>{announcement.title}</div>
      ))}
    </div>
  )
}
```

## OpenFrame Frontend Usage

```tsx
// In your future OpenFrame project
import { 
  Button, 
  Card, 
  AnnouncementBar 
} from '@flamingo/ui-kit'
import '@flamingo/ui-kit/styles'

export default function OpenFrameDashboard() {
  return (
    <div data-app-type="openframe">
      <AnnouncementBar 
        apiUrl="https://api.openframe.dev"
        platform="openframe"
      />
      
      <Card>
        <h2>Deploy Your App</h2>
        <Button variant="primary">
          Deploy to OpenFrame
        </Button>
      </Card>
    </div>
  )
}