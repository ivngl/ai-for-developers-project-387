import { test, expect } from '@playwright/test'
import { cleanDb, localDateStr, futureDateStr } from '../helpers'

const API = 'http://localhost:3001'
const dateStr = futureDateStr(2)
const tomorrowStr = futureDateStr(3)

async function createEventType(
  request: import('@playwright/test').APIRequestContext,
  overrides: Record<string, unknown> = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const res = await request.post(`${API}/api/event-types`, {
    data: { title: 'Test Meeting', duration: 30, ...overrides },
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

test.beforeEach(async ({ request }) => {
  await cleanDb(request)
})

test('GET /api/slots without eventTypeId returns 400', async ({ request }) => {
  const res = await request.get(`${API}/api/slots?date=${dateStr}`)
  expect(res.status()).toBe(400)
})

test('GET /api/slots without date returns 400', async ({ request }) => {
  const res = await request.get(`${API}/api/slots?eventTypeId=1`)
  expect(res.status()).toBe(400)
})

test('GET /api/slots with non-existent event type returns 404', async ({ request }) => {
  const res = await request.get(`${API}/api/slots?eventTypeId=99999&date=${dateStr}`)
  expect(res.status()).toBe(404)
})

test('GET /api/slots with past date returns 400', async ({ request }) => {
  const eventType = await createEventType(request)
  const res = await request.get(
    `${API}/api/slots?eventTypeId=${eventType.id}&date=2020-01-01`,
  )
  expect(res.status()).toBe(400)
  expect(await res.json()).toEqual({ error: 'Date cannot be in the past' })
})

test('GET /api/slots with date beyond 14 days returns 400', async ({ request }) => {
  const eventType = await createEventType(request)
  const farDate = new Date()
  farDate.setDate(farDate.getDate() + 20)
  const farStr = localDateStr(farDate)

  const res = await request.get(
    `${API}/api/slots?eventTypeId=${eventType.id}&date=${farStr}`,
  )
  expect(res.status()).toBe(400)
  expect(await res.json()).toEqual({ error: 'Date must be within the next 14 days' })
})

test('GET /api/slots returns slots across work hours for template event type', async ({
  request,
}) => {
  const eventType = await createEventType(request, { duration: 60 })

  const res = await request.get(
    `${API}/api/slots?eventTypeId=${eventType.id}&date=${dateStr}`,
  )
  expect(res.ok()).toBeTruthy()
  const body = await res.json()

  // 9:00 to 18:00 with 60min slots = 9 slots
  expect(body).toHaveLength(9)

  // First slot starts at 9:00
  const firstStart = new Date(body[0].startTime)
  expect(firstStart.getUTCHours()).toBe(9)
  expect(firstStart.getUTCMinutes()).toBe(0)

  // Last slot ends at 18:00
  const lastEnd = new Date(body[8].endTime)
  expect(lastEnd.getUTCHours()).toBe(18)
  expect(lastEnd.getUTCMinutes()).toBe(0)

  // All slots available
  for (const slot of body) {
    expect(slot.available).toBe(true)
  }
})

test('GET /api/slots returns correct slot for single-slot event type', async ({
  request,
}) => {
  const eventType = await createEventType(request, {
    duration: 45,
    date: dateStr,
    startTime: '14:30',
  })

  const res = await request.get(
    `${API}/api/slots?eventTypeId=${eventType.id}&date=${dateStr}`,
  )
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(body).toHaveLength(1)

  const slotStart = new Date(body[0].startTime)
  expect(slotStart.getUTCHours()).toBe(14)
  expect(slotStart.getUTCMinutes()).toBe(30)

  const slotEnd = new Date(body[0].endTime)
  expect(slotEnd.getUTCMinutes()).toBe(15) // 14:30 + 45 min = 15:15 UTC
})

test('GET /api/slots returns empty for single-slot event type on non-matching date', async ({
  request,
}) => {
  const nextWeek = localDateStr(new Date(Date.now() + 7 * 86400000))
  const eventType = await createEventType(request, {
    duration: 30,
    date: nextWeek,
    startTime: '10:00',
  })

  const res = await request.get(
    `${API}/api/slots?eventTypeId=${eventType.id}&date=${dateStr}`,
  )
  expect(res.ok()).toBeTruthy()
  expect(await res.json()).toEqual([])
})

test('GET /api/slots marks booked slots as unavailable', async ({ request }) => {
  const eventType = await createEventType(request, { duration: 60 })

  // Get slots first
  const slotsRes = await request.get(
    `${API}/api/slots?eventTypeId=${eventType.id}&date=${dateStr}`,
  )
  const slots = await slotsRes.json()
  const firstSlot = slots[0]

  // Book the first slot
  const bookRes = await request.post(`${API}/api/bookings`, {
    data: {
      eventTypeId: eventType.id,
      startTime: firstSlot.startTime,
      endTime: firstSlot.endTime,
      guestName: 'Test User',
      guestEmail: 'test@example.com',
    },
  })
  expect(bookRes.status()).toBe(201)

  // Get slots again - first should be unavailable
  const slotsRes2 = await request.get(
    `${API}/api/slots?eventTypeId=${eventType.id}&date=${dateStr}`,
  )
  const slots2 = await slotsRes2.json()

  expect(slots2[0].available).toBe(false)
  for (let i = 1; i < slots2.length; i++) {
    expect(slots2[i].available).toBe(true)
  }
})
