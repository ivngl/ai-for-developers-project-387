# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flows/admin.spec.ts >> admin can create a new event type
- Location: e2e/flows/admin.spec.ts:39:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('New Event Type')
Expected: visible
Error: strict mode violation: getByText('New Event Type') resolved to 2 elements:
    1) <a data-underline="hover" href="/admin/event-types/new" class="mantine-focus-auto m_849cf0da m_b6d8b162 mantine-Text-root mantine-Anchor-root">New Event Type</a> aka getByRole('link', { name: 'New Event Type' })
    2) <h2 data-order="2" class="m_8a5d1357 mantine-Title-root">New Event Type</h2> aka getByRole('heading', { name: 'New Event Type' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('New Event Type')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - link "Admin Panel" [ref=e5] [cursor=pointer]:
      - /url: /admin
      - heading "Admin Panel" [level=1] [ref=e6]
    - generic [ref=e7]:
      - link "Dashboard" [ref=e8] [cursor=pointer]:
        - /url: /admin
      - link "New Event Type" [ref=e9] [cursor=pointer]:
        - /url: /admin/event-types/new
      - link "View Public Page" [ref=e10] [cursor=pointer]:
        - /url: /
      - button "Logout" [ref=e11] [cursor=pointer]:
        - generic [ref=e13]: Logout
  - main [ref=e14]:
    - heading "New Event Type" [level=2] [ref=e15]
    - generic [ref=e16]:
      - generic [ref=e17]:
        - generic [ref=e18]: Title * *
        - textbox "Title *" [ref=e20]
      - generic [ref=e21]:
        - generic [ref=e22]: Description
        - textbox "Description" [ref=e24]
      - generic [ref=e25]:
        - generic [ref=e26]: Duration (minutes) * *
        - generic [ref=e27]:
          - textbox "Duration (minutes) *" [ref=e28]: "30"
          - generic [ref=e30]:
            - button [ref=e31] [cursor=pointer]:
              - img [ref=e32]
            - button [ref=e34] [cursor=pointer]:
              - img [ref=e35]
      - generic [ref=e37]:
        - paragraph [ref=e38]: Schedule a specific day and time (optional)
        - paragraph [ref=e39]: If set, this event type will only have one slot on that date at the chosen time. Leave empty to make it a recurring template available on any day.
        - generic [ref=e40]:
          - generic [ref=e43]:
            - generic [ref=e44]:
              - button [ref=e45] [cursor=pointer]:
                - img [ref=e46]
              - button "June 2026" [ref=e48] [cursor=pointer]
              - button [ref=e49] [cursor=pointer]:
                - img [ref=e50]
            - table [ref=e52]:
              - rowgroup [ref=e53]:
                - row "Mo Tu We Th Fr Sa Su" [ref=e54]:
                  - columnheader "Mo" [ref=e55]
                  - columnheader "Tu" [ref=e56]
                  - columnheader "We" [ref=e57]
                  - columnheader "Th" [ref=e58]
                  - columnheader "Fr" [ref=e59]
                  - columnheader "Sa" [ref=e60]
                  - columnheader "Su" [ref=e61]
              - rowgroup [ref=e62]:
                - row "1 June 2026 2 June 2026 3 June 2026 4 June 2026 5 June 2026 6 June 2026 7 June 2026" [ref=e63]:
                  - cell "1 June 2026" [ref=e64]:
                    - button "1 June 2026" [ref=e65] [cursor=pointer]: "1"
                  - cell "2 June 2026" [ref=e66]:
                    - button "2 June 2026" [ref=e67] [cursor=pointer]: "2"
                  - cell "3 June 2026" [ref=e68]:
                    - button "3 June 2026" [ref=e69] [cursor=pointer]: "3"
                  - cell "4 June 2026" [ref=e70]:
                    - button "4 June 2026" [ref=e71] [cursor=pointer]: "4"
                  - cell "5 June 2026" [ref=e72]:
                    - button "5 June 2026" [ref=e73] [cursor=pointer]: "5"
                  - cell "6 June 2026" [ref=e74]:
                    - button "6 June 2026" [ref=e75] [cursor=pointer]: "6"
                  - cell "7 June 2026" [ref=e76]:
                    - button "7 June 2026" [ref=e77] [cursor=pointer]: "7"
                - row "8 June 2026 9 June 2026 10 June 2026 11 June 2026 12 June 2026 13 June 2026 14 June 2026" [ref=e78]:
                  - cell "8 June 2026" [ref=e79]:
                    - button "8 June 2026" [ref=e80] [cursor=pointer]: "8"
                  - cell "9 June 2026" [ref=e81]:
                    - button "9 June 2026" [ref=e82] [cursor=pointer]: "9"
                  - cell "10 June 2026" [ref=e83]:
                    - button "10 June 2026" [ref=e84] [cursor=pointer]: "10"
                  - cell "11 June 2026" [ref=e85]:
                    - button "11 June 2026" [ref=e86] [cursor=pointer]: "11"
                  - cell "12 June 2026" [ref=e87]:
                    - button "12 June 2026" [ref=e88] [cursor=pointer]: "12"
                  - cell "13 June 2026" [ref=e89]:
                    - button "13 June 2026" [ref=e90] [cursor=pointer]: "13"
                  - cell "14 June 2026" [ref=e91]:
                    - button "14 June 2026" [ref=e92] [cursor=pointer]: "14"
                - row "15 June 2026 16 June 2026 17 June 2026 18 June 2026 19 June 2026 20 June 2026 21 June 2026" [ref=e93]:
                  - cell "15 June 2026" [ref=e94]:
                    - button "15 June 2026" [ref=e95] [cursor=pointer]: "15"
                  - cell "16 June 2026" [ref=e96]:
                    - button "16 June 2026" [ref=e97] [cursor=pointer]: "16"
                  - cell "17 June 2026" [ref=e98]:
                    - button "17 June 2026" [ref=e99] [cursor=pointer]: "17"
                  - cell "18 June 2026" [ref=e100]:
                    - button "18 June 2026" [ref=e101] [cursor=pointer]: "18"
                  - cell "19 June 2026" [ref=e102]:
                    - button "19 June 2026" [ref=e103] [cursor=pointer]: "19"
                  - cell "20 June 2026" [ref=e104]:
                    - button "20 June 2026" [ref=e105] [cursor=pointer]: "20"
                  - cell "21 June 2026" [ref=e106]:
                    - button "21 June 2026" [ref=e107] [cursor=pointer]: "21"
                - row "22 June 2026 23 June 2026 24 June 2026 25 June 2026 26 June 2026 27 June 2026 28 June 2026" [ref=e108]:
                  - cell "22 June 2026" [ref=e109]:
                    - button "22 June 2026" [ref=e110] [cursor=pointer]: "22"
                  - cell "23 June 2026" [ref=e111]:
                    - button "23 June 2026" [ref=e112] [cursor=pointer]: "23"
                  - cell "24 June 2026" [ref=e113]:
                    - button "24 June 2026" [ref=e114] [cursor=pointer]: "24"
                  - cell "25 June 2026" [ref=e115]:
                    - button "25 June 2026" [ref=e116] [cursor=pointer]: "25"
                  - cell "26 June 2026" [ref=e117]:
                    - button "26 June 2026" [ref=e118] [cursor=pointer]: "26"
                  - cell "27 June 2026" [ref=e119]:
                    - button "27 June 2026" [ref=e120] [cursor=pointer]: "27"
                  - cell "28 June 2026" [ref=e121]:
                    - button "28 June 2026" [ref=e122] [cursor=pointer]: "28"
                - row "29 June 2026 30 June 2026 1 July 2026 2 July 2026 3 July 2026 4 July 2026 5 July 2026" [ref=e123]:
                  - cell "29 June 2026" [ref=e124]:
                    - button "29 June 2026" [ref=e125] [cursor=pointer]: "29"
                  - cell "30 June 2026" [ref=e126]:
                    - button "30 June 2026" [ref=e127] [cursor=pointer]: "30"
                  - cell "1 July 2026" [ref=e128]:
                    - button "1 July 2026" [ref=e129] [cursor=pointer]: "1"
                  - cell "2 July 2026" [ref=e130]:
                    - button "2 July 2026" [ref=e131] [cursor=pointer]: "2"
                  - cell "3 July 2026" [ref=e132]:
                    - button "3 July 2026" [ref=e133] [cursor=pointer]: "3"
                  - cell "4 July 2026" [ref=e134]:
                    - button "4 July 2026" [ref=e135] [cursor=pointer]: "4"
                  - cell "5 July 2026" [ref=e136]:
                    - button "5 July 2026" [ref=e137] [cursor=pointer]: "5"
          - generic [ref=e138]:
            - paragraph [ref=e139]: Start time
            - generic [ref=e141]:
              - textbox "-- No time --" [ref=e142] [cursor=pointer]
              - generic:
                - img
      - button "Save" [ref=e143] [cursor=pointer]:
        - generic [ref=e145]: Save
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | import { cleanDb, prisma } from '../helpers'
  3   | 
  4   | const API = 'http://localhost:3001'
  5   | 
  6   | test.beforeEach(async ({ request }) => {
  7   |   await cleanDb()
  8   | 
  9   |   const login = await request.post(`${API}/api/admin/login`, {
  10  |     data: { password: 'admin123' },
  11  |   })
  12  |   const { token } = await login.json()
  13  | 
  14  |   // Seed an event type for dashboard view
  15  |   await request.post(`${API}/api/event-types`, {
  16  |     data: {
  17  |       title: 'Existing Meeting',
  18  |       description: 'Pre-seeded event',
  19  |       duration: 60,
  20  |     },
  21  |     headers: { Authorization: `Bearer ${token}` },
  22  |   })
  23  | })
  24  | 
  25  | test('admin can log in and see the dashboard', async ({ page }) => {
  26  |   await page.goto('/admin/login')
  27  |   await expect(page.getByText('Admin Login')).toBeVisible()
  28  | 
  29  |   await page.getByPlaceholder('Enter admin password').fill('admin123')
  30  |   await page.getByRole('button', { name: 'Login' }).click()
  31  | 
  32  |   // Should redirect to admin dashboard
  33  |   await expect(page).toHaveURL('/admin')
  34  |   await expect(page.getByText('Existing Meeting')).toBeVisible()
  35  |   await expect(page.getByText('Event Types')).toBeVisible()
  36  |   await expect(page.getByText('Upcoming Bookings')).toBeVisible()
  37  | })
  38  | 
  39  | test('admin can create a new event type', async ({ page }) => {
  40  |   // Login first
  41  |   await page.goto('/admin/login')
  42  |   await page.getByPlaceholder('Enter admin password').fill('admin123')
  43  |   await page.getByRole('button', { name: 'Login' }).click()
  44  |   await expect(page).toHaveURL('/admin')
  45  | 
  46  |   // Navigate to new event type form
  47  |   await page.getByRole('link', { name: 'New Event Type' }).click()
  48  |   await expect(page).toHaveURL('/admin/event-types/new')
> 49  |   await expect(page.getByText('New Event Type')).toBeVisible()
      |                                                  ^ Error: expect(locator).toBeVisible() failed
  50  | 
  51  |   // Fill the form
  52  |   await page.getByLabel('Title *').fill('New Test Event')
  53  |   await page.getByLabel('Description').fill('Created during test')
  54  |   await page.getByLabel('Duration (minutes) *').fill('45')
  55  | 
  56  |   // Submit
  57  |   await page.getByRole('button', { name: 'Save' }).click()
  58  | 
  59  |   // Should redirect back to dashboard
  60  |   await expect(page).toHaveURL('/admin')
  61  |   await expect(page.getByText('New Test Event')).toBeVisible()
  62  |   await expect(page.getByText('Created during test')).toBeVisible()
  63  | })
  64  | 
  65  | test('admin can edit an existing event type', async ({ page }) => {
  66  |   // Login
  67  |   await page.goto('/admin/login')
  68  |   await page.getByPlaceholder('Enter admin password').fill('admin123')
  69  |   await page.getByRole('button', { name: 'Login' }).click()
  70  |   await expect(page).toHaveURL('/admin')
  71  | 
  72  |   // Click Edit on the existing event type
  73  |   await page.getByRole('button', { name: 'Edit' }).first().click()
  74  |   await expect(page).toHaveURL(/\/admin\/event-types\/\d+\/edit/)
  75  | 
  76  |   // Modify the title
  77  |   const titleInput = page.getByLabel('Title *')
  78  |   await titleInput.clear()
  79  |   await titleInput.fill('Edited Meeting')
  80  | 
  81  |   // Save
  82  |   await page.getByRole('button', { name: 'Save' }).click()
  83  | 
  84  |   // Verify update
  85  |   await expect(page).toHaveURL('/admin')
  86  |   await expect(page.getByText('Edited Meeting')).toBeVisible()
  87  | 
  88  |   // Verify in database
  89  |   const updated = await prisma.eventType.findFirst({
  90  |     where: { title: 'Edited Meeting' },
  91  |   })
  92  |   expect(updated).not.toBeNull()
  93  | })
  94  | 
  95  | test('admin can delete an event type', async ({ page }) => {
  96  |   // Login
  97  |   await page.goto('/admin/login')
  98  |   await page.getByPlaceholder('Enter admin password').fill('admin123')
  99  |   await page.getByRole('button', { name: 'Login' }).click()
  100 |   await expect(page).toHaveURL('/admin')
  101 | 
  102 |   // Verify event type exists
  103 |   await expect(page.getByText('Existing Meeting')).toBeVisible()
  104 | 
  105 |   // Click Delete
  106 |   page.on('dialog', (dialog) => dialog.accept())
  107 |   await page.getByRole('button', { name: 'Delete' }).first().click()
  108 | 
  109 |   // Should be gone
  110 |   await expect(page.getByText('Existing Meeting')).not.toBeVisible()
  111 | })
  112 | 
  113 | test('admin with wrong password sees error', async ({ page }) => {
  114 |   await page.goto('/admin/login')
  115 | 
  116 |   await page.getByPlaceholder('Enter admin password').fill('wrong-password')
  117 |   await page.getByRole('button', { name: 'Login' }).click()
  118 | 
  119 |   await expect(page.getByText('Invalid password')).toBeVisible()
  120 |   // Should stay on login page
  121 |   await expect(page).toHaveURL('/admin/login')
  122 | })
  123 | 
```