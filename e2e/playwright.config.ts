import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './',
  globalSetup: './global-setup',
  workers: 1,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
})
