import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@react-spring')) {
            return 'react-spring';
          }
          if (id.includes('node_modules/three')) {
            return 'three';
          }
          if(id.includes('node_modules/date-fns')){
            return 'date-fns'
          }
        }
      },
    },
  }
})
