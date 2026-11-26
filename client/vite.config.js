import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './': dist/ chạy được dưới mọi thư mục của static server khi chấm.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
