import { test, expect } from '@playwright/test'
import { cleanDb } from '../helpers'

const API = 'http://localhost:3001'

let seededEventTypeId: number

test.beforeEach(async ({ request }) => {
  await cleanDb(request)

  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const res = await request.post(`${API}/api/event-types`, {
    data: {
      title: 'Existing Meeting',
      description: 'Pre-seeded event',
      duration: 60,
    },
    headers: { Authorization: `Bearer ${token}` },
  })
  const eventType = await res.json()
  seededEventTypeId = eventType.id
})

test('admin can log in and see the dashboard', async ({ page }) => {
  await page.goto('/admin/login')
  await expect(page.getByText('Admin Login')).toBeVisible()

  await page.getByPlaceholder('Enter admin password').fill('admin123')
  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page).toHaveURL('/admin')
  await expect(page.getByText('Existing Meeting').first()).toBeVisible()
  await expect(page.getByText('Event Types')).toBeVisible()
  await expect(page.getByText('Upcoming Bookings')).toBeVisible()
})

test('admin can create a new event type', async ({ page }) => {
  await page.goto('/admin/login')
  await page.getByPlaceholder('Enter admin password').fill('admin123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL('/admin')

  await page.getByRole('link', { name: 'New Event Type' }).click()
  await expect(page).toHaveURL('/admin/event-types/new')

  await page.getByLabel('Title *').fill('New Test Event')
  await page.getByLabel('Description').fill('Created during test')
  await page.getByLabel('Duration (minutes) *').fill('45')
  await page.getByRole('button', { name: 'Save' }).click()

  await expect(page).toHaveURL('/admin')
  await expect(page.getByText('New Test Event').first()).toBeVisible()
  await expect(page.getByText('Created during test')).toBeVisible()
})

test('admin can edit an existing event type', async ({ page, request }) => {
  await page.goto('/admin/login')
  await page.getByPlaceholder('Enter admin password').fill('admin123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL('/admin')

  await page.getByRole('link', { name: 'Edit' }).first().click()
  await expect(page).toHaveURL(/\/admin\/event-types\/\d+\/edit/)

  const titleInput = page.getByLabel('Title *')
  await titleInput.clear()
  await titleInput.fill('Edited Meeting')
  await page.getByRole('button', { name: 'Save' }).click()

  await expect(page).toHaveURL('/admin')
  await expect(page.getByText('Edited Meeting').first()).toBeVisible()

  const list = await request.get(`${API}/api/event-types`)
  const types = await list.json()
  expect(types.some((t: { title: string }) => t.title === 'Edited Meeting')).toBe(true)
})

test('admin can delete an event type', async ({ page }) => {
  await page.goto('/admin/login')
  await page.getByPlaceholder('Enter admin password').fill('admin123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL('/admin')

  await expect(page.getByText('Existing Meeting').first()).toBeVisible()

  page.on('dialog', (dialog) => dialog.accept())
  await page.getByRole('button', { name: 'Delete' }).first().click()

  await expect(page.getByText('Existing Meeting').first()).not.toBeVisible()
})

test('admin with wrong password sees error', async ({ page }) => {
  await page.goto('/admin/login')

  await page.getByPlaceholder('Enter admin password').fill('wrong-password')
  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page.getByText('Invalid password')).toBeVisible()
  await expect(page).toHaveURL('/admin/login')
})

test('admin can create a single-slot event type', async ({ page }) => {
  await page.goto('/admin/login')
  await page.getByPlaceholder('Enter admin password').fill('admin123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL('/admin')

  await page.getByRole('link', { name: 'New Event Type' }).click()
  await expect(page).toHaveURL('/admin/event-types/new')

  await page.getByLabel('Title *').fill('Single Slot Meeting')
  await page.getByLabel('Description').fill('One-time event')
  await page.getByLabel('Duration (minutes) *').fill('30')

  const future = new Date()
  future.setDate(future.getDate() + 5)
  const dayLabel = future.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  await page.getByRole('button', { name: dayLabel, exact: true }).click()

  await page.getByPlaceholder('-- No time --').click()
  await page.getByRole('option', { name: '10:00' }).click()

  await page.getByRole('button', { name: 'Save' }).click()

  await expect(page).toHaveURL('/admin')
  await expect(page.getByText('Single Slot Meeting').first()).toBeVisible()
  await expect(page.getByText('(single slot)')).toBeVisible()
})

test('admin can see empty bookings state', async ({ page }) => {
  await page.goto('/admin/login')
  await page.getByPlaceholder('Enter admin password').fill('admin123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL('/admin')

  await expect(page.getByText('No bookings yet.')).toBeVisible()
})

test('admin can see bookings with data', async ({ page, request }) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const future = new Date()
  future.setDate(future.getDate() + 2)
  const dateStr = `${future.getFullYear()}-${String(future.getMonth() + 1).padStart(2, '0')}-${String(future.getDate()).padStart(2, '0')}`

  const startTime = new Date(`${dateStr}T10:00:00.000Z`).toISOString()
  const endTime = new Date(`${dateStr}T11:00:00.000Z`).toISOString()

  await request.post(`${API}/api/bookings`, {
    data: {
      eventTypeId: seededEventTypeId,
      startTime,
      endTime,
      guestName: 'Charlie',
      guestEmail: 'charlie@example.com',
    },
  })

  await page.goto('/admin/login')
  await page.getByPlaceholder('Enter admin password').fill('admin123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL('/admin')

  await expect(page.getByText('charlie@example.com')).toBeVisible()
  await expect(page.getByText('Charlie').first()).toBeVisible()
  await expect(page.getByText('Existing Meeting').first()).toBeVisible()
})

test('admin can log out', async ({ page }) => {
  await page.goto('/admin/login')
  await page.getByPlaceholder('Enter admin password').fill('admin123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL('/admin')

  await page.getByRole('button', { name: 'Logout' }).click()
  await expect(page).toHaveURL('/admin/login')

  await page.goto('/admin')
  await expect(page.getByText('Admin Login')).toBeVisible()
})

test('admin sees error when deleting event type with bookings', async ({
  page,
  request,
}) => {
  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  const future = new Date()
  future.setDate(future.getDate() + 2)
  const dateStr = `${future.getFullYear()}-${String(future.getMonth() + 1).padStart(2, '0')}-${String(future.getDate()).padStart(2, '0')}`

  const startTime = new Date(`${dateStr}T10:00:00.000Z`).toISOString()
  const endTime = new Date(`${dateStr}T11:00:00.000Z`).toISOString()

  await request.post(`${API}/api/bookings`, {
    data: {
      eventTypeId: seededEventTypeId,
      startTime,
      endTime,
      guestName: 'Dave',
    },
  })

  await page.goto('/admin/login')
  await page.getByPlaceholder('Enter admin password').fill('admin123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL('/admin')

  page.on('dialog', (dialog) => dialog.accept())
  await page.getByRole('button', { name: 'Delete' }).first().click()

  await expect(page.getByText('Cannot delete event type with existing bookings')).toBeVisible()
})
