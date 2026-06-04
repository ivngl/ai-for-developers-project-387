# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flows/booking.spec.ts >> user can go back to home after booking
- Location: e2e/flows/booking.spec.ts:71:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('gridcell').filter({ hasText: '5' }).first()

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - link "Simple Cal" [ref=e5] [cursor=pointer]:
      - /url: /
      - heading "Simple Cal" [level=1] [ref=e6]
    - generic [ref=e7]:
      - link "Home" [ref=e8] [cursor=pointer]:
        - /url: /
      - link "Admin" [ref=e9] [cursor=pointer]:
        - /url: /admin/login
  - main [ref=e10]:
    - 'heading "Book: Quick Chat" [level=2] [ref=e11]'
    - paragraph [ref=e12]: A short 30-min chat
    - paragraph [ref=e13]:
      - strong [ref=e14]: "Duration:"
      - text: 30 min
    - heading "Select a date" [level=3] [ref=e15]
    - generic [ref=e18]:
      - generic [ref=e19]:
        - button [disabled] [ref=e20]:
          - img [ref=e21]
        - button "June 2026" [ref=e23] [cursor=pointer]
        - button [disabled] [ref=e24]:
          - img [ref=e25]
      - table [ref=e27]:
        - rowgroup [ref=e28]:
          - row "Mo Tu We Th Fr Sa Su" [ref=e29]:
            - columnheader "Mo" [ref=e30]
            - columnheader "Tu" [ref=e31]
            - columnheader "We" [ref=e32]
            - columnheader "Th" [ref=e33]
            - columnheader "Fr" [ref=e34]
            - columnheader "Sa" [ref=e35]
            - columnheader "Su" [ref=e36]
        - rowgroup [ref=e37]:
          - row "1 June 2026 2 June 2026 3 June 2026 4 June 2026 5 June 2026 6 June 2026 7 June 2026" [ref=e38]:
            - cell "1 June 2026" [ref=e39]:
              - button "1 June 2026" [disabled] [ref=e40]: "1"
            - cell "2 June 2026" [ref=e41]:
              - button "2 June 2026" [disabled] [ref=e42]: "2"
            - cell "3 June 2026" [ref=e43]:
              - button "3 June 2026" [disabled] [ref=e44]: "3"
            - cell "4 June 2026" [ref=e45]:
              - button "4 June 2026" [disabled] [ref=e46]: "4"
            - cell "5 June 2026" [ref=e47]:
              - button "5 June 2026" [ref=e48] [cursor=pointer]: "5"
            - cell "6 June 2026" [ref=e49]:
              - button "6 June 2026" [ref=e50] [cursor=pointer]: "6"
            - cell "7 June 2026" [ref=e51]:
              - button "7 June 2026" [ref=e52] [cursor=pointer]: "7"
          - row "8 June 2026 9 June 2026 10 June 2026 11 June 2026 12 June 2026 13 June 2026 14 June 2026" [ref=e53]:
            - cell "8 June 2026" [ref=e54]:
              - button "8 June 2026" [ref=e55] [cursor=pointer]: "8"
            - cell "9 June 2026" [ref=e56]:
              - button "9 June 2026" [ref=e57] [cursor=pointer]: "9"
            - cell "10 June 2026" [ref=e58]:
              - button "10 June 2026" [ref=e59] [cursor=pointer]: "10"
            - cell "11 June 2026" [ref=e60]:
              - button "11 June 2026" [ref=e61] [cursor=pointer]: "11"
            - cell "12 June 2026" [ref=e62]:
              - button "12 June 2026" [ref=e63] [cursor=pointer]: "12"
            - cell "13 June 2026" [ref=e64]:
              - button "13 June 2026" [ref=e65] [cursor=pointer]: "13"
            - cell "14 June 2026" [ref=e66]:
              - button "14 June 2026" [ref=e67] [cursor=pointer]: "14"
          - row "15 June 2026 16 June 2026 17 June 2026 18 June 2026 19 June 2026 20 June 2026 21 June 2026" [ref=e68]:
            - cell "15 June 2026" [ref=e69]:
              - button "15 June 2026" [ref=e70] [cursor=pointer]: "15"
            - cell "16 June 2026" [ref=e71]:
              - button "16 June 2026" [ref=e72] [cursor=pointer]: "16"
            - cell "17 June 2026" [ref=e73]:
              - button "17 June 2026" [ref=e74] [cursor=pointer]: "17"
            - cell "18 June 2026" [ref=e75]:
              - button "18 June 2026" [ref=e76] [cursor=pointer]: "18"
            - cell "19 June 2026" [ref=e77]:
              - button "19 June 2026" [disabled] [ref=e78]: "19"
            - cell "20 June 2026" [ref=e79]:
              - button "20 June 2026" [disabled] [ref=e80]: "20"
            - cell "21 June 2026" [ref=e81]:
              - button "21 June 2026" [disabled] [ref=e82]: "21"
          - row "22 June 2026 23 June 2026 24 June 2026 25 June 2026 26 June 2026 27 June 2026 28 June 2026" [ref=e83]:
            - cell "22 June 2026" [ref=e84]:
              - button "22 June 2026" [disabled] [ref=e85]: "22"
            - cell "23 June 2026" [ref=e86]:
              - button "23 June 2026" [disabled] [ref=e87]: "23"
            - cell "24 June 2026" [ref=e88]:
              - button "24 June 2026" [disabled] [ref=e89]: "24"
            - cell "25 June 2026" [ref=e90]:
              - button "25 June 2026" [disabled] [ref=e91]: "25"
            - cell "26 June 2026" [ref=e92]:
              - button "26 June 2026" [disabled] [ref=e93]: "26"
            - cell "27 June 2026" [ref=e94]:
              - button "27 June 2026" [disabled] [ref=e95]: "27"
            - cell "28 June 2026" [ref=e96]:
              - button "28 June 2026" [disabled] [ref=e97]: "28"
          - row "29 June 2026 30 June 2026 1 July 2026 2 July 2026 3 July 2026 4 July 2026 5 July 2026" [ref=e98]:
            - cell "29 June 2026" [ref=e99]:
              - button "29 June 2026" [disabled] [ref=e100]: "29"
            - cell "30 June 2026" [ref=e101]:
              - button "30 June 2026" [disabled] [ref=e102]: "30"
            - cell "1 July 2026" [ref=e103]:
              - button "1 July 2026" [disabled] [ref=e104]: "1"
            - cell "2 July 2026" [ref=e105]:
              - button "2 July 2026" [disabled] [ref=e106]: "2"
            - cell "3 July 2026" [ref=e107]:
              - button "3 July 2026" [disabled] [ref=e108]: "3"
            - cell "4 July 2026" [ref=e109]:
              - button "4 July 2026" [disabled] [ref=e110]: "4"
            - cell "5 July 2026" [ref=e111]:
              - button "5 July 2026" [disabled] [ref=e112]: "5"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import { cleanDb, prisma } from '../helpers'
  3  | 
  4  | const API = 'http://localhost:3001'
  5  | 
  6  | test.beforeEach(async ({ request }) => {
  7  |   await cleanDb()
  8  | 
  9  |   const login = await request.post(`${API}/api/admin/login`, {
  10 |     data: { password: 'admin123' },
  11 |   })
  12 |   const { token } = await login.json()
  13 | 
  14 |   await request.post(`${API}/api/event-types`, {
  15 |     data: {
  16 |       title: 'Quick Chat',
  17 |       description: 'A short 30-min chat',
  18 |       duration: 30,
  19 |     },
  20 |     headers: { Authorization: `Bearer ${token}` },
  21 |   })
  22 | })
  23 | 
  24 | test('user can book a meeting end-to-end', async ({ page, request }) => {
  25 |   // Step 1: Visit home page and see event types
  26 |   await page.goto('/')
  27 |   await expect(page.getByText('Quick Chat')).toBeVisible()
  28 | 
  29 |   // Step 2: Click "Book" on the event type card
  30 |   await page.getByRole('link', { name: 'Book' }).first().click()
  31 |   await expect(page).toHaveURL(/\/book\/\d+/)
  32 |   await expect(page.getByText('Duration: 30 min')).toBeVisible()
  33 | 
  34 |   // Step 3: Select today's date from the DatePicker
  35 |   const today = new Date()
  36 |   const dayNum = String(today.getDate())
  37 |   await page.getByRole('gridcell').filter({ hasText: dayNum }).first().click()
  38 | 
  39 |   // Step 4: Wait for slots to load and select the first available slot
  40 |   await page.waitForResponse(async (resp) => {
  41 |     if (resp.url().includes('/api/slots') && resp.status() === 200) {
  42 |       const body = await resp.json()
  43 |       return body.length > 0 && body.some((s: { available: boolean }) => s.available)
  44 |     }
  45 |     return false
  46 |   })
  47 |   const slotButtons = page.getByRole('button').filter({ hasText: /^\d{2}:\d{2}$/ })
  48 |   await slotButtons.first().click()
  49 | 
  50 |   // Step 5: Fill in guest details
  51 |   await page.getByPlaceholder('Your name (optional)').fill('Test User')
  52 |   await page.getByPlaceholder('Your email (optional)').fill('test@example.com')
  53 | 
  54 |   // Step 6: Click "Confirm Booking"
  55 |   await page.getByRole('button', { name: 'Confirm Booking' }).click()
  56 | 
  57 |   // Step 7: See confirmation screen
  58 |   await expect(page.getByText('Booking Confirmed!')).toBeVisible()
  59 |   await expect(page.getByText(/has been booked/)).toBeVisible()
  60 | 
  61 |   // Step 8: Verify booking exists in the database
  62 |   const booking = await prisma.booking.findFirst({
  63 |     where: { guestEmail: 'test@example.com' },
  64 |     include: { eventType: true },
  65 |   })
  66 |   expect(booking).not.toBeNull()
  67 |   expect(booking!.guestName).toBe('Test User')
  68 |   expect(booking!.eventType.title).toBe('Quick Chat')
  69 | })
  70 | 
  71 | test('user can go back to home after booking', async ({ page }) => {
  72 |   await page.goto('/')
  73 | 
  74 |   // Book first event type
  75 |   await page.getByRole('link', { name: 'Book' }).first().click()
  76 | 
  77 |   // Select today's date
  78 |   const today = new Date()
  79 |   const dayNum = String(today.getDate())
> 80 |   await page.getByRole('gridcell').filter({ hasText: dayNum }).first().click()
     |                                                                        ^ Error: locator.click: Test timeout of 30000ms exceeded.
  81 | 
  82 |   // Select first available slot
  83 |   await page.waitForTimeout(500)
  84 |   const slotButtons = page.getByRole('button').filter({ hasText: /^\d{2}:\d{2}$/ })
  85 |   await slotButtons.first().click()
  86 | 
  87 |   // Fill and confirm
  88 |   await page.getByPlaceholder('Your name (optional)').fill('Alice')
  89 |   await page.getByRole('button', { name: 'Confirm Booking' }).click()
  90 | 
  91 |   // Click "Back to Home"
  92 |   await page.getByRole('button', { name: 'Back to Home' }).click()
  93 |   await expect(page).toHaveURL('/')
  94 |   await expect(page.getByText('Available Meeting Types')).toBeVisible()
  95 | })
  96 | 
```