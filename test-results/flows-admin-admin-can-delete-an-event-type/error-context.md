# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flows/admin.spec.ts >> admin can delete an event type
- Location: e2e/flows/admin.spec.ts:95:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Existing Meeting')
Expected: visible
Error: strict mode violation: getByText('Existing Meeting') resolved to 4 elements:
    1) <h3 data-order="3" class="m_8a5d1357 mantine-Title-root">Existing Meeting</h3> aka getByRole('heading', { name: 'Existing Meeting' }).first()
    2) <h3 data-order="3" class="m_8a5d1357 mantine-Title-root">Existing Meeting</h3> aka getByRole('heading', { name: 'Existing Meeting' }).nth(1)
    3) <h3 data-order="3" class="m_8a5d1357 mantine-Title-root">Existing Meeting</h3> aka getByRole('heading', { name: 'Existing Meeting' }).nth(2)
    4) <h3 data-order="3" class="m_8a5d1357 mantine-Title-root">Existing Meeting</h3> aka getByRole('heading', { name: 'Existing Meeting' }).nth(3)

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Existing Meeting')

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
            - /url: /admin/event-types/26/edit
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
            - /url: /admin/event-types/25/edit
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
            - /url: /admin/event-types/24/edit
            - generic [ref=e52]: Edit
          - button "Delete" [ref=e53] [cursor=pointer]:
            - generic [ref=e55]: Delete
      - generic [ref=e56]:
        - heading "Quick Chat" [level=3] [ref=e58]
        - paragraph [ref=e59]: A short 30-min chat
        - paragraph [ref=e60]:
          - strong [ref=e61]: "Duration:"
          - text: 30 min
        - generic [ref=e62]:
          - link "Edit" [ref=e63] [cursor=pointer]:
            - /url: /admin/event-types/23/edit
            - generic [ref=e65]: Edit
          - button "Delete" [ref=e66] [cursor=pointer]:
            - generic [ref=e68]: Delete
      - generic [ref=e69]:
        - heading "Existing Meeting" [level=3] [ref=e71]
        - paragraph [ref=e72]: Pre-seeded event
        - paragraph [ref=e73]:
          - strong [ref=e74]: "Duration:"
          - text: 60 min
        - generic [ref=e75]:
          - link "Edit" [ref=e76] [cursor=pointer]:
            - /url: /admin/event-types/22/edit
            - generic [ref=e78]: Edit
          - button "Delete" [ref=e79] [cursor=pointer]:
            - generic [ref=e81]: Delete
      - generic [ref=e82]:
        - heading "Test Meeting" [level=3] [ref=e84]
        - paragraph [ref=e85]:
          - strong [ref=e86]: "Duration:"
          - text: 60 min
        - generic [ref=e87]:
          - link "Edit" [ref=e88] [cursor=pointer]:
            - /url: /admin/event-types/21/edit
            - generic [ref=e90]: Edit
          - button "Delete" [ref=e91] [cursor=pointer]:
            - generic [ref=e93]: Delete
      - generic [ref=e94]:
        - generic [ref=e95]:
          - heading "Test Meeting" [level=3] [ref=e96]
          - generic [ref=e98]: Fri, Dec 25, 2026 at 10:00
        - paragraph [ref=e99]:
          - strong [ref=e100]: "Duration:"
          - text: 30 min (single slot)
        - generic [ref=e101]:
          - link "Edit" [ref=e102] [cursor=pointer]:
            - /url: /admin/event-types/20/edit
            - generic [ref=e104]: Edit
          - button "Delete" [ref=e105] [cursor=pointer]:
            - generic [ref=e107]: Delete
      - generic [ref=e108]:
        - heading "Existing Meeting" [level=3] [ref=e110]
        - paragraph [ref=e111]: Pre-seeded event
        - paragraph [ref=e112]:
          - strong [ref=e113]: "Duration:"
          - text: 60 min
        - generic [ref=e114]:
          - link "Edit" [ref=e115] [cursor=pointer]:
            - /url: /admin/event-types/19/edit
            - generic [ref=e117]: Edit
          - button "Delete" [ref=e118] [cursor=pointer]:
            - generic [ref=e120]: Delete
      - generic [ref=e121]:
        - generic [ref=e122]:
          - heading "Test Meeting" [level=3] [ref=e123]
          - generic [ref=e125]: Thu, Jun 4, 2026 at 14:30
        - paragraph [ref=e126]:
          - strong [ref=e127]: "Duration:"
          - text: 45 min (single slot)
        - generic [ref=e128]:
          - link "Edit" [ref=e129] [cursor=pointer]:
            - /url: /admin/event-types/18/edit
            - generic [ref=e131]: Edit
          - button "Delete" [ref=e132] [cursor=pointer]:
            - generic [ref=e134]: Delete
      - generic [ref=e135]:
        - heading "Meeting B" [level=3] [ref=e137]
        - paragraph [ref=e138]:
          - strong [ref=e139]: "Duration:"
          - text: 60 min
        - generic [ref=e140]:
          - link "Edit" [ref=e141] [cursor=pointer]:
            - /url: /admin/event-types/17/edit
            - generic [ref=e143]: Edit
          - button "Delete" [ref=e144] [cursor=pointer]:
            - generic [ref=e146]: Delete
      - generic [ref=e147]:
        - heading "Meeting A" [level=3] [ref=e149]
        - paragraph [ref=e150]:
          - strong [ref=e151]: "Duration:"
          - text: 30 min
        - generic [ref=e152]:
          - link "Edit" [ref=e153] [cursor=pointer]:
            - /url: /admin/event-types/16/edit
            - generic [ref=e155]: Edit
          - button "Delete" [ref=e156] [cursor=pointer]:
            - generic [ref=e158]: Delete
      - generic [ref=e159]:
        - heading "Test" [level=3] [ref=e161]
        - paragraph [ref=e162]:
          - strong [ref=e163]: "Duration:"
          - text: 30 min
        - generic [ref=e164]:
          - link "Edit" [ref=e165] [cursor=pointer]:
            - /url: /admin/event-types/15/edit
            - generic [ref=e167]: Edit
          - button "Delete" [ref=e168] [cursor=pointer]:
            - generic [ref=e170]: Delete
      - generic [ref=e171]:
        - heading "Test Meeting" [level=3] [ref=e173]
        - paragraph [ref=e174]:
          - strong [ref=e175]: "Duration:"
          - text: 60 min
        - generic [ref=e176]:
          - link "Edit" [ref=e177] [cursor=pointer]:
            - /url: /admin/event-types/14/edit
            - generic [ref=e179]: Edit
          - button "Delete" [ref=e180] [cursor=pointer]:
            - generic [ref=e182]: Delete
      - generic [ref=e183]:
        - heading "Test Meeting" [level=3] [ref=e185]
        - paragraph [ref=e186]:
          - strong [ref=e187]: "Duration:"
          - text: 30 min
        - generic [ref=e188]:
          - link "Edit" [ref=e189] [cursor=pointer]:
            - /url: /admin/event-types/13/edit
            - generic [ref=e191]: Edit
          - button "Delete" [ref=e192] [cursor=pointer]:
            - generic [ref=e194]: Delete
      - generic [ref=e195]:
        - heading "Test Meeting" [level=3] [ref=e197]
        - paragraph [ref=e198]:
          - strong [ref=e199]: "Duration:"
          - text: 30 min
        - generic [ref=e200]:
          - link "Edit" [ref=e201] [cursor=pointer]:
            - /url: /admin/event-types/12/edit
            - generic [ref=e203]: Edit
          - button "Delete" [ref=e204] [cursor=pointer]:
            - generic [ref=e206]: Delete
      - generic [ref=e207]:
        - heading "Test" [level=3] [ref=e209]
        - paragraph [ref=e210]:
          - strong [ref=e211]: "Duration:"
          - text: 30 min
        - generic [ref=e212]:
          - link "Edit" [ref=e213] [cursor=pointer]:
            - /url: /admin/event-types/10/edit
            - generic [ref=e215]: Edit
          - button "Delete" [ref=e216] [cursor=pointer]:
            - generic [ref=e218]: Delete
      - generic [ref=e219]:
        - heading "Updated" [level=3] [ref=e221]
        - paragraph [ref=e222]:
          - strong [ref=e223]: "Duration:"
          - text: 60 min
        - generic [ref=e224]:
          - link "Edit" [ref=e225] [cursor=pointer]:
            - /url: /admin/event-types/9/edit
            - generic [ref=e227]: Edit
          - button "Delete" [ref=e228] [cursor=pointer]:
            - generic [ref=e230]: Delete
      - generic [ref=e231]:
        - heading "Test Meeting" [level=3] [ref=e233]
        - paragraph [ref=e234]: A test
        - paragraph [ref=e235]:
          - strong [ref=e236]: "Duration:"
          - text: 30 min
        - generic [ref=e237]:
          - link "Edit" [ref=e238] [cursor=pointer]:
            - /url: /admin/event-types/8/edit
            - generic [ref=e240]: Edit
          - button "Delete" [ref=e241] [cursor=pointer]:
            - generic [ref=e243]: Delete
      - generic [ref=e244]:
        - heading "Test" [level=3] [ref=e246]
        - paragraph [ref=e247]:
          - strong [ref=e248]: "Duration:"
          - text: 60 min
        - generic [ref=e249]:
          - link "Edit" [ref=e250] [cursor=pointer]:
            - /url: /admin/event-types/7/edit
            - generic [ref=e252]: Edit
          - button "Delete" [ref=e253] [cursor=pointer]:
            - generic [ref=e255]: Delete
      - generic [ref=e256]:
        - heading "Test" [level=3] [ref=e258]
        - paragraph [ref=e259]:
          - strong [ref=e260]: "Duration:"
          - text: 30 min
        - generic [ref=e261]:
          - link "Edit" [ref=e262] [cursor=pointer]:
            - /url: /admin/event-types/6/edit
            - generic [ref=e264]: Edit
          - button "Delete" [ref=e265] [cursor=pointer]:
            - generic [ref=e267]: Delete
      - generic [ref=e268]:
        - heading "Test" [level=3] [ref=e270]
        - paragraph [ref=e271]:
          - strong [ref=e272]: "Duration:"
          - text: 60 min
        - generic [ref=e273]:
          - link "Edit" [ref=e274] [cursor=pointer]:
            - /url: /admin/event-types/5/edit
            - generic [ref=e276]: Edit
          - button "Delete" [ref=e277] [cursor=pointer]:
            - generic [ref=e279]: Delete
      - generic [ref=e280]:
        - heading "30 min Meeting" [level=3] [ref=e282]
        - paragraph [ref=e283]:
          - strong [ref=e284]: "Duration:"
          - text: 30 min
        - generic [ref=e285]:
          - link "Edit" [ref=e286] [cursor=pointer]:
            - /url: /admin/event-types/4/edit
            - generic [ref=e288]: Edit
          - button "Delete" [ref=e289] [cursor=pointer]:
            - generic [ref=e291]: Delete
      - generic [ref=e292]:
        - heading "Test Meeting" [level=3] [ref=e294]
        - paragraph [ref=e295]:
          - strong [ref=e296]: "Duration:"
          - text: 60 min
        - generic [ref=e297]:
          - link "Edit" [ref=e298] [cursor=pointer]:
            - /url: /admin/event-types/3/edit
            - generic [ref=e300]: Edit
          - button "Delete" [ref=e301] [cursor=pointer]:
            - generic [ref=e303]: Delete
      - generic [ref=e304]:
        - generic [ref=e305]:
          - heading "bbbbb" [level=3] [ref=e306]
          - generic [ref=e308]: Wed, Jun 17, 2026 at 10:00
        - paragraph [ref=e309]: afddaf asfas
        - paragraph [ref=e310]:
          - strong [ref=e311]: "Duration:"
          - text: 100 min (single slot)
        - generic [ref=e312]:
          - link "Edit" [ref=e313] [cursor=pointer]:
            - /url: /admin/event-types/2/edit
            - generic [ref=e315]: Edit
          - button "Delete" [ref=e316] [cursor=pointer]:
            - generic [ref=e318]: Delete
      - generic [ref=e319]:
        - generic [ref=e320]:
          - heading "ADS" [level=3] [ref=e321]
          - generic [ref=e323]: Thu, Jun 11, 2026 at 11:00
        - paragraph [ref=e324]: dsddd
        - paragraph [ref=e325]:
          - strong [ref=e326]: "Duration:"
          - text: 30 min (single slot)
        - generic [ref=e327]:
          - link "Edit" [ref=e328] [cursor=pointer]:
            - /url: /admin/event-types/1/edit
            - generic [ref=e330]: Edit
          - button "Delete" [ref=e331] [cursor=pointer]:
            - generic [ref=e333]: Delete
    - heading "Upcoming Bookings" [level=2] [ref=e334]
    - table [ref=e335]:
      - rowgroup [ref=e336]:
        - row "Type Start End Name Email" [ref=e337]:
          - columnheader "Type" [ref=e338]
          - columnheader "Start" [ref=e339]
          - columnheader "End" [ref=e340]
          - columnheader "Name" [ref=e341]
          - columnheader "Email" [ref=e342]
      - rowgroup [ref=e343]:
        - row "Test Meeting 6/4/2026, 1:00:00 PM 2:00:00 PM Alice alice@example.com" [ref=e344]:
          - cell "Test Meeting" [ref=e345]
          - cell "6/4/2026, 1:00:00 PM" [ref=e346]
          - cell "2:00:00 PM" [ref=e347]
          - cell "Alice" [ref=e348]
          - cell "alice@example.com" [ref=e349]
        - row "Test 6/4/2026, 5:00:00 PM 6:00:00 PM Bob bob@example.com" [ref=e350]:
          - cell "Test" [ref=e351]
          - cell "6/4/2026, 5:00:00 PM" [ref=e352]
          - cell "6:00:00 PM" [ref=e353]
          - cell "Bob" [ref=e354]
          - cell "bob@example.com" [ref=e355]
        - row "bbbbb 6/11/2026, 1:00:00 PM 1:30:00 PM sadf -" [ref=e356]:
          - cell "bbbbb" [ref=e357]
          - cell "6/11/2026, 1:00:00 PM" [ref=e358]
          - cell "1:30:00 PM" [ref=e359]
          - cell "sadf" [ref=e360]
          - cell "-" [ref=e361]
        - row "ADS 6/11/2026, 2:00:00 PM 2:30:00 PM sadsa -" [ref=e362]:
          - cell "ADS" [ref=e363]
          - cell "6/11/2026, 2:00:00 PM" [ref=e364]
          - cell "2:30:00 PM" [ref=e365]
          - cell "sadsa" [ref=e366]
          - cell "-" [ref=e367]
```

# Test source

```ts
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
> 103 |   await expect(page.getByText('Existing Meeting')).toBeVisible()
      |                                                    ^ Error: expect(locator).toBeVisible() failed
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