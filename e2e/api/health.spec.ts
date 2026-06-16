import { test, expect } from '@playwright/test'
import { API_BASE_URL } from '../config'

test('GET /api/health returns ok', async ({ request }) => {
  const res = await request.get(`${API_BASE_URL}/api/health`)
  expect(res.ok()).toBeTruthy()
  expect(await res.json()).toEqual({ status: 'ok' })
})
