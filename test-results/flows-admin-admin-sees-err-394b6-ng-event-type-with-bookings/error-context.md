# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flows/admin.spec.ts >> admin sees error when deleting event type with bookings
- Location: e2e/flows/admin.spec.ts:193:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Existing Meeting').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Existing Meeting').first()

```

```yaml
- link "Admin Panel":
  - /url: /admin
  - heading "Admin Panel" [level=1]
- link "Dashboard":
  - /url: /admin
- link "New Event Type":
  - /url: /admin/event-types/new
- link "View Public Page":
  - /url: /
- button "Logout"
- main:
  - alert: Cannot delete event type with existing bookings
```

# Test source

```ts
  125 |     year: 'numeric',
  126 |   })
  127 |   await page.getByRole('button', { name: dayLabel, exact: true }).click()
  128 | 
  129 |   await page.getByPlaceholder('-- No time --').click()
  130 |   await page.getByRole('option', { name: '10:00' }).click()
  131 | 
  132 |   await page.getByRole('button', { name: 'Save' }).click()
  133 | 
  134 |   await expect(page).toHaveURL('/admin')
  135 |   await expect(page.getByText('Single Slot Meeting').first()).toBeVisible()
  136 |   await expect(page.getByText('(single slot)')).toBeVisible()
  137 | })
  138 | 
  139 | test('admin can see empty bookings state', async ({ page }) => {
  140 |   await page.goto('/admin/login')
  141 |   await page.getByPlaceholder('Enter admin password').fill('admin123')
  142 |   await page.getByRole('button', { name: 'Login' }).click()
  143 |   await expect(page).toHaveURL('/admin')
  144 | 
  145 |   await expect(page.getByText('No bookings yet.')).toBeVisible()
  146 | })
  147 | 
  148 | test('admin can see bookings with data', async ({ page, request }) => {
  149 |   const login = await request.post(`${API}/api/admin/login`, {
  150 |     data: { password: 'admin123' },
  151 |   })
  152 |   const { token } = await login.json()
  153 | 
  154 |   const today = new Date()
  155 |   const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  156 | 
  157 |   const startTime = new Date(`${dateStr}T10:00:00.000Z`).toISOString()
  158 |   const endTime = new Date(`${dateStr}T11:00:00.000Z`).toISOString()
  159 | 
  160 |   await request.post(`${API}/api/bookings`, {
  161 |     data: {
  162 |       eventTypeId: seededEventTypeId,
  163 |       startTime,
  164 |       endTime,
  165 |       guestName: 'Charlie',
  166 |       guestEmail: 'charlie@example.com',
  167 |     },
  168 |   })
  169 | 
  170 |   await page.goto('/admin/login')
  171 |   await page.getByPlaceholder('Enter admin password').fill('admin123')
  172 |   await page.getByRole('button', { name: 'Login' }).click()
  173 |   await expect(page).toHaveURL('/admin')
  174 | 
  175 |   await expect(page.getByText('charlie@example.com')).toBeVisible()
  176 |   await expect(page.getByText('Charlie').first()).toBeVisible()
  177 |   await expect(page.getByText('Existing Meeting').first()).toBeVisible()
  178 | })
  179 | 
  180 | test('admin can log out', async ({ page }) => {
  181 |   await page.goto('/admin/login')
  182 |   await page.getByPlaceholder('Enter admin password').fill('admin123')
  183 |   await page.getByRole('button', { name: 'Login' }).click()
  184 |   await expect(page).toHaveURL('/admin')
  185 | 
  186 |   await page.getByRole('button', { name: 'Logout' }).click()
  187 |   await expect(page).toHaveURL('/admin/login')
  188 | 
  189 |   await page.goto('/admin')
  190 |   await expect(page.getByText('Admin Login')).toBeVisible()
  191 | })
  192 | 
  193 | test('admin sees error when deleting event type with bookings', async ({
  194 |   page,
  195 |   request,
  196 | }) => {
  197 |   const login = await request.post(`${API}/api/admin/login`, {
  198 |     data: { password: 'admin123' },
  199 |   })
  200 |   const { token } = await login.json()
  201 | 
  202 |   const today = new Date()
  203 |   const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  204 | 
  205 |   const startTime = new Date(`${dateStr}T10:00:00.000Z`).toISOString()
  206 |   const endTime = new Date(`${dateStr}T11:00:00.000Z`).toISOString()
  207 | 
  208 |   await request.post(`${API}/api/bookings`, {
  209 |     data: {
  210 |       eventTypeId: seededEventTypeId,
  211 |       startTime,
  212 |       endTime,
  213 |       guestName: 'Dave',
  214 |     },
  215 |   })
  216 | 
  217 |   await page.goto('/admin/login')
  218 |   await page.getByPlaceholder('Enter admin password').fill('admin123')
  219 |   await page.getByRole('button', { name: 'Login' }).click()
  220 |   await expect(page).toHaveURL('/admin')
  221 | 
  222 |   page.on('dialog', (dialog) => dialog.accept())
  223 |   await page.getByRole('button', { name: 'Delete' }).first().click()
  224 | 
> 225 |   await expect(page.getByText('Existing Meeting').first()).toBeVisible()
      |                                                            ^ Error: expect(locator).toBeVisible() failed
  226 | })
  227 | 
```