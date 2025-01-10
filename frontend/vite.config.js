import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/go': {
        target: 'https://mind-matrix.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/go/, ''),
      },
    },
  },
  //   build: {
  //     sourcemap: true,
  //   },
  //   css: {
  //     devSourcemap: true,
  //   },
  //   logLevel: 'warn'
});
