import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import * as esbuild from "esbuild";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    nodePolyfills(),
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

function nodePolyfills() {
  return {
    name: 'node-polyfills',
    setup(build: esbuild.PluginBuild) {
      // Add polyfills for Node.js core modules here
      build.onResolve({ filter: /^node:/ }, (args: esbuild.OnResolveArgs): esbuild.OnResolveResult => {
      return { path: args.path.replace(/^node:/, '') };
      });
    }
  };
}

