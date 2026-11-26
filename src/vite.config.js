
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
    plugins: [react()],

    root: fileURLToPath(new URL(".", import.meta.url)),

    appType: "mpa",

    base: "./",

    resolve: {
        dedupe: ["react", "react-dom"]
    },

    server: {
        host: "127.0.0.1",
        port: 8080,
        strictPort: true,
        open: "/homepage/home.html"
    }
});
