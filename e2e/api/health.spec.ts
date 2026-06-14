import { test, expect } from '@playwright/test'

test('GET /api/health returns ok', async ({ request }) => {
  const res = await request.get('http://127.0.0.1:3001/api/health')
  expect(res.ok()).toBeTruthy()
  expect(await res.json()).toEqual({ status: 'ok' })
})
