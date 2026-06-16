import { defineConfig } from '@playwright/test'

const PORT = process.env.PORT || '3001'

export default defineConfig({
  testDir: './',
  globalSetup: './global-setup',
  workers: 1,
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
})
