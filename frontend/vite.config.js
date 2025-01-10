import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // This enables fallback for SPA
    proxy: {
      '/': 'https://mindrix.vercel.app/',
      '/api': {
        target: 'https://mind-matrix.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
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
