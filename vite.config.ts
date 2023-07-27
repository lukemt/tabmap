import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import webExtension from "vite-plugin-web-extension";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    webExtension({
      webExtConfig: {
        startUrl: ["https://example.com/"],
      },
    }),
  ],
});
