import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.{test,spec,small.test,medium.test}.?(c|m)[jt]s?(x)'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    exclude: ['./tsc-cache'],
    globals: false,
  },
});
