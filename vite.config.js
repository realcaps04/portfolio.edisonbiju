import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['logo.png', 'fav_icon.png', 'pwa-192.png', 'pwa-512.png', 'admin-manifest.webmanifest', 'fonts/gropled.woff2'],
      manifest: {
        id: '/',
        name: 'Edison Biju',
        short_name: 'Edison',
        description: 'Edison Biju is a freelance web developer in Idukki, Kerala. React, MERN, and custom websites and apps.',
        theme_color: '#000000',
        background_color: '#050505',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        lang: 'en',
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,woff,jpg,webp,webmanifest}'],
        navigateFallback: '/index.html',
        navigateFallbackAllowlist: [/^\/(?!api).*/],
        navigateFallbackDenylist: [/^\/api/, /convex\.cloud/],
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallbackAllowlist: [/^\/$/, /^\/admin/, /^\/about/, /^\/projects/, /^\/builds/, /^\/pricing/],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
