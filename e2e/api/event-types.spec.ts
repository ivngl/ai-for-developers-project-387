import { test, expect } from '@playwright/test'
import { cleanDb } from '../helpers'
import { API_BASE_URL } from '../config'

const API = API_BASE_URL

test.beforeEach(async ({ request }) => {
  await cleanDb(request)
})

test('GET /api/event-types returns empty array initially', async ({ request }) => {
  const res = await request.get(`${API}/api/event-types`)
  expect(res.ok()).toBeTruthy()
  expect(await res.json()).toEqual([])
})

test('POST /api/event-types without auth returns 401', async ({ request }) => {
  const res = await request.post(`${API}/api/event-types`, {
    data: { title: 'Test', duration: 30 },
  })
  expect(res.status()).toBe(401)
})

test('POST /api/event-types with auth creates event type', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const res = await request.post(`${API}/api/event-types`, {
    data: { title: 'Test Meeting', description: 'A test', duration: 30 },
    headers: { Authorization: `Bearer ${token}` },
  })
  expect(res.status()).toBe(201)
  const body = await res.json()
  expect(body.title).toBe('Test Meeting')
  expect(body.description).toBe('A test')
  expect(body.duration).toBe(30)
  expect(body).toHaveProperty('id')
})

test('POST /api/event-types with missing title returns 400', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const res = await request.post(`${API}/api/event-types`, {
    data: { duration: 30 },
    headers: { Authorization: `Bearer ${token}` },
  })
  expect(res.status()).toBe(400)
  expect(await res.json()).toEqual({ error: 'Title is required' })
})

test('POST /api/event-types with invalid duration returns 400', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const res = await request.post(`${API}/api/event-types`, {
    data: { title: 'Test', duration: 0 },
    headers: { Authorization: `Bearer ${token}` },
  })
  expect(res.status()).toBe(400)
  expect(await res.json()).toEqual({ error: 'Duration must be a positive number' })
})

test('POST /api/event-types with date but no startTime returns 400', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const res = await request.post(`${API}/api/event-types`, {
    data: { title: 'Test', duration: 30, date: '2026-06-10' },
    headers: { Authorization: `Bearer ${token}` },
  })
  expect(res.status()).toBe(400)
  expect(await res.json()).toEqual({
    error: 'Both date and startTime must be provided together',
  })
})

test('POST /api/event-types with invalid date format returns 400', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const res = await request.post(`${API}/api/event-types`, {
    data: { title: 'Test', duration: 30, date: '06-10-2026', startTime: '10:00' },
    headers: { Authorization: `Bearer ${token}` },
  })
  expect(res.status()).toBe(400)
})

test('PUT /api/event-types/:id updates event type', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const create = await request.post(`${API}/api/event-types`, {
    data: { title: 'Original', duration: 30 },
    headers: { Authorization: `Bearer ${token}` },
  })
  const created = await create.json()

  const update = await request.put(`${API}/api/event-types/${created.id}`, {
    data: { title: 'Updated', duration: 60 },
    headers: { Authorization: `Bearer ${token}` },
  })
  expect(update.ok()).toBeTruthy()
  const updated = await update.json()
  expect(updated.title).toBe('Updated')
  expect(updated.duration).toBe(60)
})

test('PUT /api/event-types/:id with only title leaves other fields unchanged', async ({
  request,
}) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const create = await request.post(`${API}/api/event-types`, {
    data: { title: 'Original', description: 'Keep me', duration: 30 },
    headers: { Authorization: `Bearer ${token}` },
  })
  const created = await create.json()

  const update = await request.put(`${API}/api/event-types/${created.id}`, {
    data: { title: 'Updated Title' },
    headers: { Authorization: `Bearer ${token}` },
  })
  expect(update.ok()).toBeTruthy()
  const updated = await update.json()

  expect(updated.title).toBe('Updated Title')
  expect(updated.description).toBe('Keep me')
  expect(updated.duration).toBe(30)
})

test('PUT /api/event-types/:id without auth returns 401', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const create = await request.post(`${API}/api/event-types`, {
    data: { title: 'Test', duration: 30 },
    headers: { Authorization: `Bearer ${token}` },
  })
  const created = await create.json()

  const res = await request.put(`${API}/api/event-types/${created.id}`, {
    data: { title: 'Hack' },
  })
  expect(res.status()).toBe(401)
})

test('PUT /api/event-types/:id with non-existent id returns 404', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const res = await request.put(`${API}/api/event-types/99999`, {
    data: { title: 'Nope' },
    headers: { Authorization: `Bearer ${token}` },
  })
  expect(res.status()).toBe(404)
  expect(await res.json()).toEqual({ error: 'Event type not found' })
})

test('DELETE /api/event-types/:id deletes event type', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const create = await request.post(`${API}/api/event-types`, {
    data: { title: 'To Delete', duration: 30 },
    headers: { Authorization: `Bearer ${token}` },
  })
  const created = await create.json()

  const del = await request.delete(`${API}/api/event-types/${created.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  expect(del.ok()).toBeTruthy()
  expect(await del.json()).toEqual({ status: 'ok' })

  const list = await request.get(`${API}/api/event-types`)
  const types = await list.json()
  expect(types).toHaveLength(0)
})

test('DELETE /api/event-types/:id without auth returns 401', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const create = await request.post(`${API}/api/event-types`, {
    data: { title: 'Test', duration: 30 },
    headers: { Authorization: `Bearer ${token}` },
  })
  const created = await create.json()

  const res = await request.delete(`${API}/api/event-types/${created.id}`)
  expect(res.status()).toBe(401)
})

test('DELETE /api/event-types/:id with non-existent id returns 404', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const res = await request.delete(`${API}/api/event-types/99999`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  expect(res.status()).toBe(404)
  expect(await res.json()).toEqual({ error: 'Event type not found' })
})

test('GET /api/event-types returns created event types', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  await request.post(`${API}/api/event-types`, {
    data: { title: 'Meeting A', duration: 30 },
    headers: { Authorization: `Bearer ${token}` },
  })
  await request.post(`${API}/api/event-types`, {
    data: { title: 'Meeting B', duration: 60 },
    headers: { Authorization: `Bearer ${token}` },
  })

  const list = await request.get(`${API}/api/event-types`)
  const types = await list.json()
  expect(types).toHaveLength(2)
  expect(types.map((t: { title: string }) => t.title)).toContain('Meeting A')
  expect(types.map((t: { title: string }) => t.title)).toContain('Meeting B')
})

test('POST /api/event-types with past date returns 400', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const res = await request.post(`${API}/api/event-types`, {
    data: { title: 'Past', duration: 30, date: '2020-01-01', startTime: '10:00' },
    headers: { Authorization: `Bearer ${token}` },
  })
  expect(res.status()).toBe(400)
  expect(await res.json()).toEqual({ error: 'Date cannot be in the past' })
})

test('POST /api/event-types with past date+time returns 400', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const res = await request.post(`${API}/api/event-types`, {
    data: { title: 'Past Time', duration: 30, date: '2020-01-01', startTime: '01:00' },
    headers: { Authorization: `Bearer ${token}` },
  })
  expect(res.status()).toBe(400)
})

test('PUT /api/event-types/:id updating to past date returns 400', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const create = await request.post(`${API}/api/event-types`, {
    data: { title: 'Changeable', duration: 30 },
    headers: { Authorization: `Bearer ${token}` },
  })
  const created = await create.json()

  const res = await request.put(`${API}/api/event-types/${created.id}`, {
    data: { date: '2020-01-01', startTime: '10:00' },
    headers: { Authorization: `Bearer ${token}` },
  })
  expect(res.status()).toBe(400)
  expect(await res.json()).toEqual({ error: 'Date cannot be in the past' })
})
