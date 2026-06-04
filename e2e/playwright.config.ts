import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './',
  globalSetup: './global-setup',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'npx tsx src/index.ts',
      port: 3001,
      cwd: './server',
      env: { DATABASE_URL: 'file:./test.db' },
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npx vite',
      port: 5173,
      cwd: './client',
      reuseExistingServer: !process.env.CI,
    },
  ],
})
