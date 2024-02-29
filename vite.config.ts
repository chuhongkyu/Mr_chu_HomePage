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
          if (id.includes('node_modules/three')) {
            return;
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
        // manualChunks: (id) => {
        //   if (id.includes("node_modules")) {
        //     const moduleName = id.split("node_modules/")?.pop()?.split("/")[0];
        //     return `vendor/${moduleName}`;
        //   }
        // },
      },
    },
  }
})
