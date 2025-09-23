import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Nipo School - Sistema Oriental de Ensino Musical',
        short_name: 'Nipo School',
        description: 'Sistema completo para ensino musical com metodologia oriental',
        theme_color: '#dc2626',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        orientation: 'portrait-primary',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/app': path.resolve(__dirname, './src/app'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/styles': path.resolve(__dirname, './src/styles'),
      '@/components': path.resolve(__dirname, './src/shared/components'),
      '@/services': path.resolve(__dirname, './src/shared/services'),
      '@/contexts': path.resolve(__dirname, './src/shared/contexts'),
      '@/hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@/utils': path.resolve(__dirname, './src/shared/utils')
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
