import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/kduia-shopping-app/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
