import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  // ✅ Configuração para nova estrutura
  const isNewStructure = process.env.NEW_STRUCTURE === 'true';
  
  return {
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
        // 🚀 NOVOS ALIASES - Nova arquitetura limpa
        '@new': path.resolve(__dirname, './src_new'),
        '@new/pages': path.resolve(__dirname, './src_new/pages'),
        '@new/components': path.resolve(__dirname, './src_new/components'),
        '@new/hooks': path.resolve(__dirname, './src_new/hooks'),
        '@new/services': path.resolve(__dirname, './src_new/services'),
        '@new/lib': path.resolve(__dirname, './src_new/lib'),
        '@new/styles': path.resolve(__dirname, './src_new/styles'),
        '@new/assets': path.resolve(__dirname, './src_new/assets'),
        '@new/contexts': path.resolve(__dirname, './src_new/contexts'),
        '@new/router': path.resolve(__dirname, './src_new/router'),
        '@new/utils': path.resolve(__dirname, './src_new/utils'),
        '@new/tests': path.resolve(__dirname, './src_new/tests'),

        // 🔄 ALIASES LEGADOS - Manter durante transição
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
      open: true,
      host: true,
      // ✅ Configurações de desenvolvimento mais estáveis
      hmr: {
        overlay: false // Evita overlay que pode causar travamentos
      },
      watch: {
        usePolling: false, // Melhora performance no Windows
        ignored: ['**/node_modules/**', '**/dist/**']
      }
    },
    // ✅ Otimizações para evitar travamentos
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: ['@new/utils/bundle-analyzer', '@new/tests/performance-tests']
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html')
        },
        // ✅ Otimização para chunks menores
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom']
          }
        }
      },
      // ✅ Configurações mais conservadoras
      chunkSizeWarningLimit: 1000,
      sourcemap: mode === 'development'
    },
    // ✅ Definir variáveis de ambiente
    define: {
      __NEW_STRUCTURE__: JSON.stringify(isNewStructure),
      __DEV_MODE__: JSON.stringify(mode === 'development')
    }
  };
});
