import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['tests/setup.ts'],
    coverage: {
      provider: 'v8',
      exclude: [
        'src/server/errors',
        'src/server/middlewares/g*',
        'src/server/helpers/json*',
      ],
    },
  },
});
