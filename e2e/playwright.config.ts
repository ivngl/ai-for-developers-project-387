import { defineConfig } from '@playwright/test'
import { API_BASE_URL } from './config'

export default defineConfig({
  testDir: './',
  globalSetup: './global-setup',
  workers: 1,
  use: {
    baseURL: API_BASE_URL,
    trace: 'on-first-retry',
  },
})
