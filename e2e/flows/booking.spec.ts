import { test, expect } from '@playwright/test'
import { cleanDb, prisma, localDateStr } from '../helpers'

const API = 'http://localhost:3001'

test.beforeEach(async ({ request }) => {
  await cleanDb()

  const login = await request.post(`${API}/api/admin/login`, {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()

  await request.post(`${API}/api/event-types`, {
    data: {
      title: 'Quick Chat',
      description: 'A short 30-min chat',
      duration: 30,
    },
    headers: { Authorization: `Bearer ${token}` },
  })
})

async function selectDayInFuture(page: import('@playwright/test').Page, daysAhead: number) {
  const future = new Date()
  future.setDate(future.getDate() + daysAhead)
  const dayLabel = future.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  await page.getByRole('button', { name: dayLabel, exact: true }).click()
}

test('user can book a meeting end-to-end', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Quick Chat')).toBeVisible()

  await page.getByRole('link', { name: 'Book' }).first().click()
  await expect(page).toHaveURL(/\/book\/\d+/)
  await expect(page.getByText('Duration: 30 min')).toBeVisible()

  const slotsPromise = page.waitForResponse(
    (resp) => resp.url().includes('/api/slots') && resp.status() === 200,
  )
  await selectDayInFuture(page, 2)
  await slotsPromise

  await page.locator('button:has-text(":")').first().click()

  await page.getByPlaceholder('Your name (optional)').fill('Test User')
  await page.getByPlaceholder('Your email (optional)').fill('test@example.com')

  await page.getByRole('button', { name: 'Confirm Booking' }).click()

  await expect(page.getByText('Booking Confirmed!')).toBeVisible()
  await expect(page.getByText(/has been booked/)).toBeVisible()

  const booking = await prisma.booking.findFirst({
    where: { guestEmail: 'test@example.com' },
    include: { eventType: true },
  })
  expect(booking).not.toBeNull()
  expect(booking!.guestName).toBe('Test User')
  expect(booking!.eventType.title).toBe('Quick Chat')
})

test('user can book without providing name or email', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Quick Chat')).toBeVisible()

  await page.getByRole('link', { name: 'Book' }).first().click()
  await expect(page).toHaveURL(/\/book\/\d+/)

  const slotsPromise = page.waitForResponse(
    (resp) => resp.url().includes('/api/slots') && resp.status() === 200,
  )
  await selectDayInFuture(page, 3)
  await slotsPromise

  await page.locator('button:has-text(":")').first().click()

  await page.getByRole('button', { name: 'Confirm Booking' }).click()

  await expect(page.getByText('Booking Confirmed!')).toBeVisible()

  const booking = await prisma.booking.findFirst({
    orderBy: { createdAt: 'desc' },
  })
  expect(booking).not.toBeNull()
  expect(booking!.guestName).toBeNull()
  expect(booking!.guestEmail).toBeNull()
})

test('user can go back to home after booking', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Book' }).first().click()
  await expect(page).toHaveURL(/\/book\/\d+/)

  const slotsPromise2 = page.waitForResponse(
    (resp) => resp.url().includes('/api/slots') && resp.status() === 200,
  )
  await selectDayInFuture(page, 2)
  await slotsPromise2

  await page.locator('button:has-text(":")').first().click()

  await page.getByPlaceholder('Your name (optional)').fill('Alice')
  await page.getByRole('button', { name: 'Confirm Booking' }).click()

  await page.getByRole('button', { name: 'Back to Home' }).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByText('Available Meeting Types')).toBeVisible()
})
