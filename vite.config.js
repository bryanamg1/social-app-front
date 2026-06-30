import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const getVendorChunkName = (id) => {
  const normalizedId = id.replaceAll('\\', '/')

  if (!normalizedId.includes('/node_modules/')) {
    return undefined
  }

  if (
    normalizedId.includes('/react/') ||
    normalizedId.includes('/react-dom/') ||
    normalizedId.includes('/react-router/') ||
    normalizedId.includes('/react-router-dom/')
  ) {
    return 'react-vendor'
  }

  if (
    normalizedId.includes('/@mui/') ||
    normalizedId.includes('/@emotion/')
  ) {
    return 'mui-vendor'
  }

  if (
    normalizedId.includes('/axios/') ||
    normalizedId.includes('/socket.io-client/')
  ) {
    return 'network-vendor'
  }

  return 'app-vendor'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          return getVendorChunkName(id)
        },
      },
    },
  },
})
