import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: { target: 'es2020' },
  define: { 'process.env': '{}', 'process.argv': '[]', 'process.platform': '""', 'process.stdout': '{}', 'process.stderr': '{}', 'process.versions': '{ node: "0" }' },
})
