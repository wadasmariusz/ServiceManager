import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from '@honkhonk/vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: {
        typescript: true,
      },
    }),
    react(),
    tsconfigPaths(),
  ],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
})
