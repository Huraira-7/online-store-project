import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': { VITE_APP_INTERNAL_API_PATH: 'localhost:5173'},
  },
  resolve: {  
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
