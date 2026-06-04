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
  const dayNum = String(future.getDate())
  await page.evaluate((day) => {
    const buttons = document.querySelectorAll<HTMLButtonElement>(
      'table[role="grid"] button',
    )
    for (const btn of buttons) {
      if (btn.textContent?.trim() === day) {
        btn.click()
        return
      }
    }
  }, dayNum)
}

test('user can book a meeting end-to-end', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Quick Chat')).toBeVisible()

  await page.getByRole('link', { name: 'Book' }).first().click()
  await expect(page).toHaveURL(/\/book\/\d+/)
  await expect(page.getByText('Duration: 30 min')).toBeVisible()

  // Select a date 2 days in the future to avoid timezone edge cases
  await selectDayInFuture(page, 2)

  await page.waitForResponse(async (resp) => {
    if (resp.url().includes('/api/slots') && resp.status() === 200) {
      const body = await resp.json()
      return body.length > 0 && body.some((s: { available: boolean }) => s.available)
    }
    return false
  })

  await page.getByRole('button', { name: /^\d{2}:\d{2}$/ }).first().click()

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

test('user can go back to home after booking', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Book' }).first().click()
  await expect(page).toHaveURL(/\/book\/\d+/)

  await selectDayInFuture(page, 2)

  await page.waitForResponse(async (resp) => {
    if (resp.url().includes('/api/slots') && resp.status() === 200) {
      const body = await resp.json()
      return body.length > 0 && body.some((s: { available: boolean }) => s.available)
    }
    return false
  })

  await page.getByRole('button', { name: /^\d{2}:\d{2}$/ }).first().click()

  await page.getByPlaceholder('Your name (optional)').fill('Alice')
  await page.getByRole('button', { name: 'Confirm Booking' }).click()

  await page.getByRole('button', { name: 'Back to Home' }).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByText('Available Meeting Types')).toBeVisible()
})
