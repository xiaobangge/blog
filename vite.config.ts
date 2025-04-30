import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import path from 'path'
const pathSrc = path.resolve(__dirname, 'src')
// https://github.com/antfu/unplugin-auto-import
// https://github.com/antfu/unplugin-vue-components
// https://github.com/antfu/vite-plugin-windicss
// https://github.com/vitejs/vite/tree/main/packages/plugin-vue
// https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx
// https://github.com/vitejs/vite/tree/main/packages/plugin-legacy

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(), tailwindcss(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver(), IconsResolver({prefix: 'Icon'})],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [ElementPlusResolver(), IconsResolver({prefix: 'Icon'})]
    }),

    Icons({
      autoInstall: true,
    }),

  ],
  base: './',
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/file': {
        target: 'http://localhost:7777/file',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/file/, '')
      },
      '/api': {
        target: 'http://localhost:7777/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/music': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/music/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: '/src/main.ts'
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router']
  },
})
