import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './': dist/ chạy được dưới mọi thư mục của static server khi chấm.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  // Front end chỉ gọi /api tương đối; mock (PA#3) và Express (PA#4) cùng nghe cổng 3001.
  server: { proxy: { '/api': 'http://localhost:3001' } },
  preview: { proxy: { '/api': 'http://localhost:3001' } },
})
