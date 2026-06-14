import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './',
  globalSetup: './global-setup',
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'on-first-retry',
  },
})
