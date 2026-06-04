import { test, expect } from '@playwright/test'
import { cleanDb, prisma } from '../helpers'

const API = 'http://localhost:3001'

test.beforeEach(async ({ request }) => {
  await cleanDb()

  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  await request.post(`${API}/api/event-types`, {
    data: {
      title: 'Existing Meeting',
      description: 'Pre-seeded event',
      duration: 60,
    },
    headers: { Authorization: `Bearer ${token}` },
  })
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

test('admin can edit an existing event type', async ({ page }) => {
  await page.goto('/admin/login')
  await page.getByPlaceholder('Enter admin password').fill('admin123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL('/admin')

  await page.getByRole('button', { name: 'Edit' }).first().click()
  await expect(page).toHaveURL(/\/admin\/event-types\/\d+\/edit/)

  const titleInput = page.getByLabel('Title *')
  await titleInput.clear()
  await titleInput.fill('Edited Meeting')
  await page.getByRole('button', { name: 'Save' }).click()

  await expect(page).toHaveURL('/admin')
  await expect(page.getByText('Edited Meeting').first()).toBeVisible()

  const updated = await prisma.eventType.findFirst({
    where: { title: 'Edited Meeting' },
  })
  expect(updated).not.toBeNull()
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
