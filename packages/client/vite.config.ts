import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')
// import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8080', //这里后台的地址模拟的;应该填写你们真实的后台接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    extensions: ['.ts', '.png', '.vue', '.json', ".scss"],
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
})
