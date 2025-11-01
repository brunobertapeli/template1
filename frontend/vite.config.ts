import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BeeSwarm automatically updates the port for multi-project support
// Base port: 5174 (will be updated to 5174, 5175, 5176, etc.)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: false
  }
})
