import { test, expect } from '@playwright/test'
import { cleanDb, localDateStr } from '../helpers'

const API = 'http://localhost:3001'
const dateStr = localDateStr()

test.beforeEach(async () => {
  await cleanDb()
})

test('POST /api/bookings creates a booking', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const et = await request.post(`${API}/api/event-types`, {
    data: { title: 'Test Meeting', duration: 60 },
    headers: { Authorization: `Bearer ${token}` },
  })
  const eventType = await et.json()

  const startTime = new Date(`${dateStr}T10:00:00.000Z`).toISOString()
  const endTime = new Date(`${dateStr}T11:00:00.000Z`).toISOString()

  const res = await request.post(`${API}/api/bookings`, {
    data: {
      eventTypeId: eventType.id,
      startTime,
      endTime,
      guestName: 'Alice',
      guestEmail: 'alice@example.com',
    },
  })
  expect(res.status()).toBe(201)
  const body = await res.json()
  expect(body.eventTypeId).toBe(eventType.id)
  expect(body.guestName).toBe('Alice')
  expect(body.guestEmail).toBe('alice@example.com')
  expect(body).toHaveProperty('id')
})

test('POST /api/bookings with missing eventTypeId returns 400', async ({ request }) => {
  const res = await request.post(`${API}/api/bookings`, {
    data: { startTime: '2026-06-10T10:00:00Z', endTime: '2026-06-10T11:00:00Z' },
  })
  expect(res.status()).toBe(400)
  expect(await res.json()).toEqual({ error: 'eventTypeId is required' })
})

test('POST /api/bookings with non-existent event type returns 404', async ({
  request,
}) => {
  const res = await request.post(`${API}/api/bookings`, {
    data: {
      eventTypeId: 99999,
      startTime: '2026-06-10T10:00:00Z',
      endTime: '2026-06-10T11:00:00Z',
    },
  })
  expect(res.status()).toBe(404)
  expect(await res.json()).toEqual({ error: 'Event type not found' })
})

test('POST /api/bookings with wrong duration returns 400', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const et = await request.post(`${API}/api/event-types`, {
    data: { title: '30 min Meeting', duration: 30 },
    headers: { Authorization: `Bearer ${token}` },
  })
  const eventType = await et.json()

  const startTime = new Date(`${dateStr}T10:00:00.000Z`).toISOString()
  const endTime = new Date(`${dateStr}T11:00:00.000Z`).toISOString()

  const res = await request.post(`${API}/api/bookings`, {
    data: { eventTypeId: eventType.id, startTime, endTime },
  })
  expect(res.status()).toBe(400)
  expect(await res.json()).toEqual({
    error: 'Booking duration must be exactly 30 minutes',
  })
})

test('POST /api/bookings with conflicting time returns 409', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const et = await request.post(`${API}/api/event-types`, {
    data: { title: 'Test', duration: 60 },
    headers: { Authorization: `Bearer ${token}` },
  })
  const eventType = await et.json()

  const startTime = new Date(`${dateStr}T10:00:00.000Z`).toISOString()
  const endTime = new Date(`${dateStr}T11:00:00.000Z`).toISOString()

  // First booking
  const b1 = await request.post(`${API}/api/bookings`, {
    data: { eventTypeId: eventType.id, startTime, endTime },
  })
  expect(b1.status()).toBe(201)

  // Conflicting booking (same time)
  const b2 = await request.post(`${API}/api/bookings`, {
    data: { eventTypeId: eventType.id, startTime, endTime },
  })
  expect(b2.status()).toBe(409)
  expect(await b2.json()).toEqual({ error: 'This time slot is already booked' })
})

test('POST /api/bookings with startTime >= endTime returns 400', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const et = await request.post(`${API}/api/event-types`, {
    data: { title: 'Test', duration: 30 },
    headers: { Authorization: `Bearer ${token}` },
  })
  const eventType = await et.json()

  const startTime = new Date(`${dateStr}T11:00:00.000Z`).toISOString()
  const endTime = new Date(`${dateStr}T10:00:00.000Z`).toISOString()

  const res = await request.post(`${API}/api/bookings`, {
    data: { eventTypeId: eventType.id, startTime, endTime },
  })
  expect(res.status()).toBe(400)
  expect(await res.json()).toEqual({ error: 'startTime must be before endTime' })
})

test('GET /api/bookings without auth returns 401', async ({ request }) => {
  const res = await request.get(`${API}/api/bookings`)
  expect(res.status()).toBe(401)
})

test('GET /api/bookings with auth returns bookings list', async ({ request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const et = await request.post(`${API}/api/event-types`, {
    data: { title: 'Test', duration: 60 },
    headers: { Authorization: `Bearer ${token}` },
  })
  const eventType = await et.json()

  const startTime = new Date(`${dateStr}T14:00:00.000Z`).toISOString()
  const endTime = new Date(`${dateStr}T15:00:00.000Z`).toISOString()

  await request.post(`${API}/api/bookings`, {
    data: {
      eventTypeId: eventType.id,
      startTime,
      endTime,
      guestName: 'Bob',
      guestEmail: 'bob@example.com',
    },
  })

  const res = await request.get(`${API}/api/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(body).toHaveLength(1)
  expect(body[0].guestName).toBe('Bob')
  expect(body[0].eventType).toBeDefined()
  expect(body[0].eventType.title).toBe('Test')
})

test('POST /api/bookings without guestName and guestEmail creates booking with nulls', async ({
  request,
}) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const et = await request.post(`${API}/api/event-types`, {
    data: { title: 'No Contact', duration: 30 },
    headers: { Authorization: `Bearer ${token}` },
  })
  const eventType = await et.json()

  const startTime = new Date(`${dateStr}T10:00:00.000Z`).toISOString()
  const endTime = new Date(`${dateStr}T10:30:00.000Z`).toISOString()

  const res = await request.post(`${API}/api/bookings`, {
    data: { eventTypeId: eventType.id, startTime, endTime },
  })
  expect(res.status()).toBe(201)
  const body = await res.json()
  expect(body.guestName).toBeNull()
  expect(body.guestEmail).toBeNull()
})

test('GET /api/bookings with invalid JWT returns 401', async ({ request }) => {
  const res = await request.get(`${API}/api/bookings`, {
    headers: { Authorization: 'Bearer invalid-token' },
  })
  expect(res.status()).toBe(401)
  expect(await res.json()).toEqual({ error: 'Invalid or expired token' })
})
