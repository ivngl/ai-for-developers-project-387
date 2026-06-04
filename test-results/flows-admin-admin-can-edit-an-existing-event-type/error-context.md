# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flows/admin.spec.ts >> admin can edit an existing event type
- Location: e2e/flows/admin.spec.ts:65:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Edit' }).first()

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
    - heading "Event Types" [level=2] [ref=e15]
    - generic [ref=e16]:
      - generic [ref=e17]:
        - heading "Existing Meeting" [level=3] [ref=e19]
        - paragraph [ref=e20]: Pre-seeded event
        - paragraph [ref=e21]:
          - strong [ref=e22]: "Duration:"
          - text: 60 min
        - generic [ref=e23]:
          - link "Edit" [ref=e24] [cursor=pointer]:
            - /url: /admin/event-types/24/edit
            - generic [ref=e26]: Edit
          - button "Delete" [ref=e27] [cursor=pointer]:
            - generic [ref=e29]: Delete
      - generic [ref=e30]:
        - heading "Quick Chat" [level=3] [ref=e32]
        - paragraph [ref=e33]: A short 30-min chat
        - paragraph [ref=e34]:
          - strong [ref=e35]: "Duration:"
          - text: 30 min
        - generic [ref=e36]:
          - link "Edit" [ref=e37] [cursor=pointer]:
            - /url: /admin/event-types/23/edit
            - generic [ref=e39]: Edit
          - button "Delete" [ref=e40] [cursor=pointer]:
            - generic [ref=e42]: Delete
      - generic [ref=e43]:
        - heading "Existing Meeting" [level=3] [ref=e45]
        - paragraph [ref=e46]: Pre-seeded event
        - paragraph [ref=e47]:
          - strong [ref=e48]: "Duration:"
          - text: 60 min
        - generic [ref=e49]:
          - link "Edit" [ref=e50] [cursor=pointer]:
            - /url: /admin/event-types/22/edit
            - generic [ref=e52]: Edit
          - button "Delete" [ref=e53] [cursor=pointer]:
            - generic [ref=e55]: Delete
      - generic [ref=e56]:
        - heading "Test Meeting" [level=3] [ref=e58]
        - paragraph [ref=e59]:
          - strong [ref=e60]: "Duration:"
          - text: 60 min
        - generic [ref=e61]:
          - link "Edit" [ref=e62] [cursor=pointer]:
            - /url: /admin/event-types/21/edit
            - generic [ref=e64]: Edit
          - button "Delete" [ref=e65] [cursor=pointer]:
            - generic [ref=e67]: Delete
      - generic [ref=e68]:
        - generic [ref=e69]:
          - heading "Test Meeting" [level=3] [ref=e70]
          - generic [ref=e72]: Fri, Dec 25, 2026 at 10:00
        - paragraph [ref=e73]:
          - strong [ref=e74]: "Duration:"
          - text: 30 min (single slot)
        - generic [ref=e75]:
          - link "Edit" [ref=e76] [cursor=pointer]:
            - /url: /admin/event-types/20/edit
            - generic [ref=e78]: Edit
          - button "Delete" [ref=e79] [cursor=pointer]:
            - generic [ref=e81]: Delete
      - generic [ref=e82]:
        - heading "Existing Meeting" [level=3] [ref=e84]
        - paragraph [ref=e85]: Pre-seeded event
        - paragraph [ref=e86]:
          - strong [ref=e87]: "Duration:"
          - text: 60 min
        - generic [ref=e88]:
          - link "Edit" [ref=e89] [cursor=pointer]:
            - /url: /admin/event-types/19/edit
            - generic [ref=e91]: Edit
          - button "Delete" [ref=e92] [cursor=pointer]:
            - generic [ref=e94]: Delete
      - generic [ref=e95]:
        - generic [ref=e96]:
          - heading "Test Meeting" [level=3] [ref=e97]
          - generic [ref=e99]: Thu, Jun 4, 2026 at 14:30
        - paragraph [ref=e100]:
          - strong [ref=e101]: "Duration:"
          - text: 45 min (single slot)
        - generic [ref=e102]:
          - link "Edit" [ref=e103] [cursor=pointer]:
            - /url: /admin/event-types/18/edit
            - generic [ref=e105]: Edit
          - button "Delete" [ref=e106] [cursor=pointer]:
            - generic [ref=e108]: Delete
      - generic [ref=e109]:
        - heading "Meeting B" [level=3] [ref=e111]
        - paragraph [ref=e112]:
          - strong [ref=e113]: "Duration:"
          - text: 60 min
        - generic [ref=e114]:
          - link "Edit" [ref=e115] [cursor=pointer]:
            - /url: /admin/event-types/17/edit
            - generic [ref=e117]: Edit
          - button "Delete" [ref=e118] [cursor=pointer]:
            - generic [ref=e120]: Delete
      - generic [ref=e121]:
        - heading "Meeting A" [level=3] [ref=e123]
        - paragraph [ref=e124]:
          - strong [ref=e125]: "Duration:"
          - text: 30 min
        - generic [ref=e126]:
          - link "Edit" [ref=e127] [cursor=pointer]:
            - /url: /admin/event-types/16/edit
            - generic [ref=e129]: Edit
          - button "Delete" [ref=e130] [cursor=pointer]:
            - generic [ref=e132]: Delete
      - generic [ref=e133]:
        - heading "Test" [level=3] [ref=e135]
        - paragraph [ref=e136]:
          - strong [ref=e137]: "Duration:"
          - text: 30 min
        - generic [ref=e138]:
          - link "Edit" [ref=e139] [cursor=pointer]:
            - /url: /admin/event-types/15/edit
            - generic [ref=e141]: Edit
          - button "Delete" [ref=e142] [cursor=pointer]:
            - generic [ref=e144]: Delete
      - generic [ref=e145]:
        - heading "Test Meeting" [level=3] [ref=e147]
        - paragraph [ref=e148]:
          - strong [ref=e149]: "Duration:"
          - text: 60 min
        - generic [ref=e150]:
          - link "Edit" [ref=e151] [cursor=pointer]:
            - /url: /admin/event-types/14/edit
            - generic [ref=e153]: Edit
          - button "Delete" [ref=e154] [cursor=pointer]:
            - generic [ref=e156]: Delete
      - generic [ref=e157]:
        - heading "Test Meeting" [level=3] [ref=e159]
        - paragraph [ref=e160]:
          - strong [ref=e161]: "Duration:"
          - text: 30 min
        - generic [ref=e162]:
          - link "Edit" [ref=e163] [cursor=pointer]:
            - /url: /admin/event-types/13/edit
            - generic [ref=e165]: Edit
          - button "Delete" [ref=e166] [cursor=pointer]:
            - generic [ref=e168]: Delete
      - generic [ref=e169]:
        - heading "Test Meeting" [level=3] [ref=e171]
        - paragraph [ref=e172]:
          - strong [ref=e173]: "Duration:"
          - text: 30 min
        - generic [ref=e174]:
          - link "Edit" [ref=e175] [cursor=pointer]:
            - /url: /admin/event-types/12/edit
            - generic [ref=e177]: Edit
          - button "Delete" [ref=e178] [cursor=pointer]:
            - generic [ref=e180]: Delete
      - generic [ref=e181]:
        - heading "Test" [level=3] [ref=e183]
        - paragraph [ref=e184]:
          - strong [ref=e185]: "Duration:"
          - text: 30 min
        - generic [ref=e186]:
          - link "Edit" [ref=e187] [cursor=pointer]:
            - /url: /admin/event-types/10/edit
            - generic [ref=e189]: Edit
          - button "Delete" [ref=e190] [cursor=pointer]:
            - generic [ref=e192]: Delete
      - generic [ref=e193]:
        - heading "Updated" [level=3] [ref=e195]
        - paragraph [ref=e196]:
          - strong [ref=e197]: "Duration:"
          - text: 60 min
        - generic [ref=e198]:
          - link "Edit" [ref=e199] [cursor=pointer]:
            - /url: /admin/event-types/9/edit
            - generic [ref=e201]: Edit
          - button "Delete" [ref=e202] [cursor=pointer]:
            - generic [ref=e204]: Delete
      - generic [ref=e205]:
        - heading "Test Meeting" [level=3] [ref=e207]
        - paragraph [ref=e208]: A test
        - paragraph [ref=e209]:
          - strong [ref=e210]: "Duration:"
          - text: 30 min
        - generic [ref=e211]:
          - link "Edit" [ref=e212] [cursor=pointer]:
            - /url: /admin/event-types/8/edit
            - generic [ref=e214]: Edit
          - button "Delete" [ref=e215] [cursor=pointer]:
            - generic [ref=e217]: Delete
      - generic [ref=e218]:
        - heading "Test" [level=3] [ref=e220]
        - paragraph [ref=e221]:
          - strong [ref=e222]: "Duration:"
          - text: 60 min
        - generic [ref=e223]:
          - link "Edit" [ref=e224] [cursor=pointer]:
            - /url: /admin/event-types/7/edit
            - generic [ref=e226]: Edit
          - button "Delete" [ref=e227] [cursor=pointer]:
            - generic [ref=e229]: Delete
      - generic [ref=e230]:
        - heading "Test" [level=3] [ref=e232]
        - paragraph [ref=e233]:
          - strong [ref=e234]: "Duration:"
          - text: 30 min
        - generic [ref=e235]:
          - link "Edit" [ref=e236] [cursor=pointer]:
            - /url: /admin/event-types/6/edit
            - generic [ref=e238]: Edit
          - button "Delete" [ref=e239] [cursor=pointer]:
            - generic [ref=e241]: Delete
      - generic [ref=e242]:
        - heading "Test" [level=3] [ref=e244]
        - paragraph [ref=e245]:
          - strong [ref=e246]: "Duration:"
          - text: 60 min
        - generic [ref=e247]:
          - link "Edit" [ref=e248] [cursor=pointer]:
            - /url: /admin/event-types/5/edit
            - generic [ref=e250]: Edit
          - button "Delete" [ref=e251] [cursor=pointer]:
            - generic [ref=e253]: Delete
      - generic [ref=e254]:
        - heading "30 min Meeting" [level=3] [ref=e256]
        - paragraph [ref=e257]:
          - strong [ref=e258]: "Duration:"
          - text: 30 min
        - generic [ref=e259]:
          - link "Edit" [ref=e260] [cursor=pointer]:
            - /url: /admin/event-types/4/edit
            - generic [ref=e262]: Edit
          - button "Delete" [ref=e263] [cursor=pointer]:
            - generic [ref=e265]: Delete
      - generic [ref=e266]:
        - heading "Test Meeting" [level=3] [ref=e268]
        - paragraph [ref=e269]:
          - strong [ref=e270]: "Duration:"
          - text: 60 min
        - generic [ref=e271]:
          - link "Edit" [ref=e272] [cursor=pointer]:
            - /url: /admin/event-types/3/edit
            - generic [ref=e274]: Edit
          - button "Delete" [ref=e275] [cursor=pointer]:
            - generic [ref=e277]: Delete
      - generic [ref=e278]:
        - generic [ref=e279]:
          - heading "bbbbb" [level=3] [ref=e280]
          - generic [ref=e282]: Wed, Jun 17, 2026 at 10:00
        - paragraph [ref=e283]: afddaf asfas
        - paragraph [ref=e284]:
          - strong [ref=e285]: "Duration:"
          - text: 100 min (single slot)
        - generic [ref=e286]:
          - link "Edit" [ref=e287] [cursor=pointer]:
            - /url: /admin/event-types/2/edit
            - generic [ref=e289]: Edit
          - button "Delete" [ref=e290] [cursor=pointer]:
            - generic [ref=e292]: Delete
      - generic [ref=e293]:
        - generic [ref=e294]:
          - heading "ADS" [level=3] [ref=e295]
          - generic [ref=e297]: Thu, Jun 11, 2026 at 11:00
        - paragraph [ref=e298]: dsddd
        - paragraph [ref=e299]:
          - strong [ref=e300]: "Duration:"
          - text: 30 min (single slot)
        - generic [ref=e301]:
          - link "Edit" [ref=e302] [cursor=pointer]:
            - /url: /admin/event-types/1/edit
            - generic [ref=e304]: Edit
          - button "Delete" [ref=e305] [cursor=pointer]:
            - generic [ref=e307]: Delete
    - heading "Upcoming Bookings" [level=2] [ref=e308]
    - table [ref=e309]:
      - rowgroup [ref=e310]:
        - row "Type Start End Name Email" [ref=e311]:
          - columnheader "Type" [ref=e312]
          - columnheader "Start" [ref=e313]
          - columnheader "End" [ref=e314]
          - columnheader "Name" [ref=e315]
          - columnheader "Email" [ref=e316]
      - rowgroup [ref=e317]:
        - row "Test Meeting 6/4/2026, 1:00:00 PM 2:00:00 PM Alice alice@example.com" [ref=e318]:
          - cell "Test Meeting" [ref=e319]
          - cell "6/4/2026, 1:00:00 PM" [ref=e320]
          - cell "2:00:00 PM" [ref=e321]
          - cell "Alice" [ref=e322]
          - cell "alice@example.com" [ref=e323]
        - row "Test 6/4/2026, 5:00:00 PM 6:00:00 PM Bob bob@example.com" [ref=e324]:
          - cell "Test" [ref=e325]
          - cell "6/4/2026, 5:00:00 PM" [ref=e326]
          - cell "6:00:00 PM" [ref=e327]
          - cell "Bob" [ref=e328]
          - cell "bob@example.com" [ref=e329]
        - row "bbbbb 6/11/2026, 1:00:00 PM 1:30:00 PM sadf -" [ref=e330]:
          - cell "bbbbb" [ref=e331]
          - cell "6/11/2026, 1:00:00 PM" [ref=e332]
          - cell "1:30:00 PM" [ref=e333]
          - cell "sadf" [ref=e334]
          - cell "-" [ref=e335]
        - row "ADS 6/11/2026, 2:00:00 PM 2:30:00 PM sadsa -" [ref=e336]:
          - cell "ADS" [ref=e337]
          - cell "6/11/2026, 2:00:00 PM" [ref=e338]
          - cell "2:30:00 PM" [ref=e339]
          - cell "sadsa" [ref=e340]
          - cell "-" [ref=e341]
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
  49  |   await expect(page.getByText('New Event Type')).toBeVisible()
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
> 73  |   await page.getByRole('button', { name: 'Edit' }).first().click()
      |                                                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
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