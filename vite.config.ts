import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { ViteAliases } from "vite-aliases";
// import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ViteAliases()],
  server: {
    port: 8080,
  },
  /*
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // map '@' to './src'
    },
  },
  */
});
