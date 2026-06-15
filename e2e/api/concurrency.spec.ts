import { test, expect } from '@playwright/test'
import { cleanDb, futureDateStr } from '../helpers'

const API = 'http://localhost:3001'
const dateStr = futureDateStr(2)

test.beforeEach(async ({ request }) => {
  await cleanDb(request)
})

test('concurrent booking requests — one succeeds, one gets 409', async ({
  request,
}) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const et = await request.post(`${API}/api/event-types`, {
    data: { title: 'Race Test', duration: 60 },
    headers: { Authorization: `Bearer ${token}` },
  })
  const eventType = await et.json()

  const startTime = new Date(`${dateStr}T10:00:00.000Z`).toISOString()
  const endTime = new Date(`${dateStr}T11:00:00.000Z`).toISOString()

  const payload = {
    eventTypeId: eventType.id,
    startTime,
    endTime,
    guestName: 'Racer',
  }

  const [res1, res2] = await Promise.all([
    request.post(`${API}/api/bookings`, { data: payload }),
    request.post(`${API}/api/bookings`, { data: payload }),
  ])

  const statuses = [res1.status(), res2.status()].sort()
  expect(statuses).toEqual([201, 409])

  const body1 = await res1.json()
  const body2 = await res2.json()
  if (res1.status() === 201) {
    expect(body1).toHaveProperty('id')
    expect(body2).toEqual({ error: 'This time slot is already booked' })
  } else {
    expect(body2).toHaveProperty('id')
    expect(body1).toEqual({ error: 'This time slot is already booked' })
  }
})
