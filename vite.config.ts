import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import { ViteAliases } from "vite-aliases";

import replace from "@rollup/plugin-replace";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,svg}"],
        navigateFallback: "index.html",
        cleanupOutdatedCaches: true,
        offlineGoogleAnalytics: false,
        mode: "development",
        swDest: "/home/rudi/repos/kasseli/dist/sw.js",
        globDirectory: "/home/rudi/repos/kasseli/dist",
      },
      manifest: {
        name: "Kasseli",
        short_name: "Kasseli",
        description: "Play pretend self checkout cash register",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
    ViteAliases(),
    replace({
      __DATE__: new Date().toISOString(),
      preventAssignment: true,
    }),
  ],
  server: {
    port: 8080,
  },
});
