import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'

// Load environment variables
dotenv.config({ path: './frontend/environments/.env.development' })

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          // You can add variables to inject into your HTML template here
        }
      },
      template: path.resolve(__dirname, './templates/home.html'),
    }),
    {
      // Custom plugin to write files to Django's static directory during dev
      name: 'write-to-disk',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const originalWrite = res.write
          const originalEnd = res.end
          const chunks = []

          res.write = (chunk) => {
            chunks.push(chunk)
            return originalWrite.apply(res, arguments)
          }

          res.end = (chunk) => {
            if (chunk) chunks.push(chunk)
            const url = req.originalUrl
            // Only handle JS/CSS files
            if (url.match(/\.(js|css)(\?.*)?$/)) {
              const path = require('path')
              const filePath = path.join(__dirname, './static', url.split('?')[0])
              fs.mkdirSync(path.dirname(filePath), { recursive: true })
              fs.writeFileSync(filePath, Buffer.concat(chunks))
            }
            return originalEnd.apply(res, arguments)
          }

          next()
        })
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'images': path.resolve(__dirname, './frontend/src/images'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  build: {
    outDir: path.resolve(__dirname, './static'), // Output to Django's static directory
    emptyOutDir: true, // Empty the output directory before build
    manifest: true, // Generate manifest.json for Django integration
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './frontend/index.tsx'),
      },
      output: {
        entryFileNames: 'index-bundle.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.match(/\.(jpe?g|png|gif|svg)$/i)) {
            return 'icons/[name][extname]'
          }
          return '[name][extname]'
        }
      }
    },
    sourcemap: true, // Generate source maps for development
  },
  server: {
    // Configure dev server if needed
    hmr: true,
    watch: {
      // Ensure Vite watches your source files
      usePolling: true,
      interval: 100
    }
  },
  define: {
    'process.env': JSON.stringify(process.env),
  },
})