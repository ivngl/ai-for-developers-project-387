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

test('POST /api/admin/login with wrong password returns 401', async ({ request }) => {
  const res = await request.post(`${API_BASE_URL}/api/admin/login`, {
    data: { password: 'wrong-password' },
  })
  expect(res.status()).toBe(401)
  expect(await res.json()).toEqual({ error: 'Invalid password' })
})

test('POST /api/admin/login with empty body returns 401', async ({ request }) => {
  const res = await request.post(`${API_BASE_URL}/api/admin/login`, {
    data: {},
  })
  expect(res.status()).toBe(401)
  expect(await res.json()).toEqual({ error: 'Invalid password' })
})
