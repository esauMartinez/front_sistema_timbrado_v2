import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3100,
    proxy: {
      '/timbrado': {
        target: 'http://172.28.255.194:3000/api/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/timbrado/, '')
      },
    }
  },
})
