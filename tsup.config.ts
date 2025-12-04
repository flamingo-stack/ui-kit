import { defineConfig } from 'tsup'
import { resolve } from 'path'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'components/ui/index': 'src/components/ui/index.ts',
    'components/features/index': 'src/components/features/index.ts',
    'components/navigation/index': 'src/components/navigation/index.ts',
    'components/icons/index': 'src/components/icons/index.ts',
    'components/toast/index': 'src/components/toast/index.ts',
    'hooks/index': 'src/hooks/index.ts',
    'utils/index': 'src/utils/index.ts',
    'types/index': 'src/types/index.ts',
    'types/navigation': 'src/types/navigation.ts',
    'assets/index': 'src/assets/index.ts',
    'fonts': 'src/fonts.ts',
  },
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
    compilerOptions: {
      composite: false,
      incremental: false
    }
  },
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false, // Keep false for debugging
  external: [
    'react',
    'react-dom',
    'next',
    '@tanstack/react-query',
    // Add all peer deps
  ],
  noExternal: [
    '@flamingo-stack/ui-kit',
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"', // For Next.js App Router compatibility
    }
    // Handle self-referencing imports
    options.alias = {
      '@flamingo-stack/ui-kit/components/ui': resolve('src/components/ui'),
      '@flamingo-stack/ui-kit/components/features': resolve('src/components/features'),
      '@flamingo-stack/ui-kit/components/icons': resolve('src/components/icons'),
      '@flamingo-stack/ui-kit/components/navigation': resolve('src/components/navigation'),
      '@flamingo-stack/ui-kit/hooks': resolve('src/hooks'),
      '@flamingo-stack/ui-kit/utils': resolve('src/utils'),
      '@flamingo-stack/ui-kit/types': resolve('src/types'),
    }
  },
  onSuccess: async () => {
    console.log('✅ Build completed!')
    // Auto-push to yalc after successful build
    const { exec } = await import('child_process')
    exec('yalc push', (error, stdout) => {
      if (!error) {
        console.log('📦 Pushed to yalc store')
        console.log('🔄 Run "yalc update" in consuming apps to get latest changes')
      }
    })
  },
})