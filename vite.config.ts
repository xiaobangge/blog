import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
// import miniPic from "vite-plugin-minipic";
import viteImagemin from 'vite-plugin-imagemin'
import Icons from 'unplugin-icons/vite'
import path from 'path'
const pathSrc = path.resolve(__dirname, 'src')
import viteCompression from 'vite-plugin-compression'
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
    // miniPic(),
    viteImagemin({
      gifsicle: {
        interlaced: false,
        optimizationLevel: 7
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 20,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          }
        ]
      },
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver(), IconsResolver({prefix: 'Icon'})],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [ElementPlusResolver(), IconsResolver({prefix: 'Icon'})]
    }),
    // Gzip 压缩配置
    viteCompression({
      threshold: 512000, // 对大于 500KB 的文件进行压缩
      algorithm: 'gzip',   // 压缩算法（默认 gzip）
      ext: '.gz',         // 生成文件后缀
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
        target: 'http://music.163.com',
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
      input: ['src/main.ts', './index.html'],
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
        manualChunks: id => {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router']
  },
})
