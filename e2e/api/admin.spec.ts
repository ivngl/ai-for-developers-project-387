import { test, expect } from '@playwright/test'
import { API_BASE_URL } from '../config'

test('POST /api/admin/login with correct password returns token', async ({ request }) => {
  const res = await request.post(`${API_BASE_URL}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(body).toHaveProperty('token')
  expect(typeof body.token).toBe('string')
})


