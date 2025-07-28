# UI Kit Styling Migration Guide

## Overview
This document outlines the completed migration of all styling from individual project folders to the centralized @flamingo/ui-kit package. This ensures consistent design system implementation across all platforms.

## What Was Migrated

### From Main Project (`/styles/`) to UI Kit (`/ui-kit/src/styles/`)
- **ODS Design System Files**: All `ods-*.css` files containing color tokens, typography, spacing, and theming
- **Global Styles**: Application-wide styles including React Easy Crop, platform-specific theming, and utility classes
- **Component-Specific Styles**: Vendor logos, scrollbar utilities, mobile optimizations

### Files Removed
- `/styles/` - Entire directory deleted after migration
- Individual ODS CSS files that were duplicated between main project and ui-kit

## Migration Outcome

### Before Migration
```
multi-platform-hub/
├── styles/
│   ├── globals.css
│   ├── ods-colors.css
│   ├── ods-dynamic-theming.css
│   └── ...other duplicated files
└── ui-kit/src/styles/
    ├── index.css
    ├── ods-colors.css (duplicate)
    ├── ods-dynamic-theming.css (duplicate)
    └── ...same files duplicated
```

### After Migration
```
multi-platform-hub/
└── ui-kit/src/styles/
    ├── index.css (imports all ODS design tokens)
    ├── globals.css (app-specific global styles)
    ├── ods-colors.css
    ├── ods-dynamic-theming.css
    └── ...all design system files centralized
```

## Implementation Details

### UI Kit Package Exports
The ui-kit now exports both the main design system styles and application globals:

```json
{
  "exports": {
    "./styles": "./src/styles/index.css",
    "./styles/globals": "./src/styles/globals.css"
  }
}
```

### Main Application Import
The main application now imports from the centralized location:

```css
/* app/globals.css */
@import "@flamingo/ui-kit/styles/globals";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

## For Other Projects: How to Consume UI Kit Styles

### 1. Install the UI Kit Package
```bash
npm install @flamingo/ui-kit
```

### 2. Import Styles in Your Main CSS File
Replace your existing style imports with the centralized ui-kit imports:

```css
/* Before: Individual imports */
@import './styles/ods-colors.css';
@import './styles/ods-typography.css';
/* ...many more imports */

/* After: Single ui-kit import */
@import "@flamingo/ui-kit/styles";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. For Next.js Projects with App-Specific Globals
If your project needs the full globals (including React Easy Crop, platform theming, etc.):

```css
/* app/globals.css or src/styles/globals.css */
@import "@flamingo/ui-kit/styles/globals";

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add any project-specific styles below */
```

### 4. Remove Duplicate Style Files
After importing from ui-kit, remove duplicate ODS files from your project:
- Delete `/styles/ods-*.css` files
- Remove individual style imports
- Keep only true project-specific styles

### 5. Update Tailwind Config (Optional)
For advanced Tailwind integration, extend the ui-kit config:

```javascript
// tailwind.config.js
import designSystemConfig from '@flamingo/ui-kit/tailwind-config'

export default {
  ...designSystemConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './ui-kit/src/**/*.{js,ts,jsx,tsx}' // Include ui-kit content
  ]
}
```

## Benefits of This Migration

### 1. Single Source of Truth
- All design tokens managed in one location
- Consistent styling across all platforms
- Easier maintenance and updates

### 2. Reduced Duplication
- Eliminated duplicate CSS files
- Smaller bundle sizes
- No more style inconsistencies between projects

### 3. Centralized Theme Management
- Platform-specific theming handled by ui-kit
- Automatic color scheme adaptation
- Consistent component styling

### 4. Developer Experience
- Simple import structure
- Clear dependency chain
- Easy to onboard new projects

## Platform-Specific Behavior

The ui-kit styles automatically adapt based on `NEXT_PUBLIC_APP_TYPE`:

- **OpenMSP**: Yellow accent, dark theme
- **Admin Hub**: Pink accent, dark theme  
- **Flamingo**: Pink accent, light theme
- **OpenFrame**: Cyan accent, dark theme
- **Flamingo Teaser**: Yellow accent, dark theme

## Troubleshooting

### Issue: Styles Not Loading
**Solution**: Ensure you're importing the correct path:
```css
@import "@flamingo/ui-kit/styles"; /* Correct */
@import "@flamingo/ui-kit/styles/index.css"; /* Also works */
```

### Issue: Platform Theming Not Working
**Solution**: Verify `NEXT_PUBLIC_APP_TYPE` is set correctly in your environment variables.

### Issue: Missing Design Tokens
**Solution**: Make sure your project is using the ui-kit styles and not importing individual ODS files.

## Migration Checklist for New Projects

- [ ] Install @flamingo/ui-kit package
- [ ] Replace style imports with `@import "@flamingo/ui-kit/styles"`
- [ ] Remove duplicate ODS CSS files from project
- [ ] Set correct `NEXT_PUBLIC_APP_TYPE` environment variable
- [ ] Test platform-specific theming works correctly
- [ ] Verify all components render with correct styles
- [ ] Clean up any unused style files

## Future Considerations

### Adding New Design Tokens
All new design system changes should be made in `/ui-kit/src/styles/` and will automatically propagate to all consuming projects.

### Project-Specific Styles
Keep truly project-specific styles in your main application. Only use ui-kit for shared design system elements.

### Version Management
When updating ui-kit styles, test across all platforms to ensure no breaking changes.