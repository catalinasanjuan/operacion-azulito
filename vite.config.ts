import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // Keep the shared React runtime cacheable as new teaching content grows.
        manualChunks(id) {
          if (id.includes('/node_modules/')) return 'vendor';
        },
      },
    },
  },
});
