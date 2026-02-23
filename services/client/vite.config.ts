import path from "path";

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const envKeys = [
  "NODE_ENV",
  "BE_URL",
  "FE_URL",
  "SENTRY_DSN",
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "FIREBASE_MESSAGE_SENDER_ID",
  "FIREBASE_APP_ID",
  "FIREBASE_MEASUREMENT_ID",
  "GOOGLE_STORAGE_BUCKET_AVATARS",
  "GOOGLE_STORAGE_BUCKET_SHOWROOMS",
  "GOOGLE_STORAGE_BUCKET_MERCHANTS",
  "GOOGLE_STORAGE_BUCKET_ASSETS",
  "GOOGLE_STORAGE_BUCKET_ARTWORKS",
  "GOOGLE_STORAGE_BUCKET_DOCUMENTS",
  "GOOGLE_STORAGE_BUCKET_AGREEMENTS",
  "GOOGLE_STORAGE_BUCKET_STATIC",
  "TYPESENSE_HOST",
  "TYPESENSE_PORT",
  "TYPESENSE_PROTOCOL",
  "TYPESENSE_API_KEY",
];

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  const define = Object.fromEntries(
    envKeys.map((k) => [`process.env.${k}`, JSON.stringify(env[k] ?? "")])
  );
  define["process.env.NODE_ENV"] = JSON.stringify(mode === "production" ? "production" : "development");

  return {
    root: ".",
    publicDir: "static",
    build: {
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: true,
      commonjsOptions: {
        include: [/node_modules/, /packages\/constants/, /packages\/types/, /packages\/mui-form/],
        transformMixedEsModules: true,
      },
      rollupOptions: {
        output: {
          // IMPORTANT: use hashed filenames (nginx caches .js/.css as immutable for 1y)
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/chunks/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
    },
    resolve: {
      alias: {
        path: "path-browserify",
        crypto: "crypto-browserify",
        "process/browser": "process/browser",
        "@framework/constants": path.resolve(__dirname, "../../packages/constants/src"),
        "@framework/types": path.resolve(__dirname, "../../packages/types/src"),
        "@framework/mui-form": path.resolve(__dirname, "../../packages/form/src"),
      },
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    define: {
      ...define,
      global: "globalThis",
    },
    plugins: [
      react(),
      svgr({ include: "**/*.svg" }),
    ],
    server: {
      port: 3000,
      open: true,
    },
    optimizeDeps: {
      include: ["process", "buffer", "path-browserify", "crypto-browserify"],
    },
  };
});
