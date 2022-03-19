import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')
// import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ],
  server: {
    host: '0.0.0.0'
  },
  resolve: {
    extensions: ['.ts', '.png', '.vue', '.json', ".scss"],
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  }
})
