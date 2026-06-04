# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/event-types.spec.ts >> GET /api/event-types returns empty array initially
- Location: e2e/api/event-types.spec.ts:10:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 42

- Array []
+ Array [
+   Object {
+     "createdAt": "2026-06-04T21:55:16.795Z",
+     "date": null,
+     "description": null,
+     "duration": 30,
+     "id": 4,
+     "startTime": null,
+     "title": "30 min Meeting",
+     "updatedAt": "2026-06-04T21:55:16.795Z",
+   },
+   Object {
+     "createdAt": "2026-06-04T21:55:16.275Z",
+     "date": null,
+     "description": null,
+     "duration": 60,
+     "id": 3,
+     "startTime": null,
+     "title": "Test Meeting",
+     "updatedAt": "2026-06-04T21:55:16.275Z",
+   },
+   Object {
+     "createdAt": "2026-06-04T19:41:56.565Z",
+     "date": "2026-06-17",
+     "description": "afddaf asfas",
+     "duration": 100,
+     "id": 2,
+     "startTime": "10:00",
+     "title": "bbbbb",
+     "updatedAt": "2026-06-04T19:46:50.528Z",
+   },
+   Object {
+     "createdAt": "2026-06-02T20:59:13.709Z",
+     "date": "2026-06-11",
+     "description": "dsddd",
+     "duration": 30,
+     "id": 1,
+     "startTime": "11:00",
+     "title": "ADS",
+     "updatedAt": "2026-06-02T20:59:13.709Z",
+   },
+ ]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | import { cleanDb } from '../helpers'
  3   | 
  4   | const API = 'http://localhost:3001'
  5   | 
  6   | test.beforeEach(async () => {
  7   |   await cleanDb()
  8   | })
  9   | 
  10  | test('GET /api/event-types returns empty array initially', async ({ request }) => {
  11  |   const res = await request.get(`${API}/api/event-types`)
  12  |   expect(res.ok()).toBeTruthy()
> 13  |   expect(await res.json()).toEqual([])
      |                            ^ Error: expect(received).toEqual(expected) // deep equality
  14  | })
  15  | 
  16  | test('POST /api/event-types without auth returns 401', async ({ request }) => {
  17  |   const res = await request.post(`${API}/api/event-types`, {
  18  |     data: { title: 'Test', duration: 30 },
  19  |   })
  20  |   expect(res.status()).toBe(401)
  21  | })
  22  | 
  23  | test('POST /api/event-types with auth creates event type', async ({ request }) => {
  24  |   const login = await request.post(`${API}/api/admin/login`, {
  25  |     data: { password: 'admin123' },
  26  |   })
  27  |   const { token } = await login.json()
  28  | 
  29  |   const res = await request.post(`${API}/api/event-types`, {
  30  |     data: { title: 'Test Meeting', description: 'A test', duration: 30 },
  31  |     headers: { Authorization: `Bearer ${token}` },
  32  |   })
  33  |   expect(res.status()).toBe(201)
  34  |   const body = await res.json()
  35  |   expect(body.title).toBe('Test Meeting')
  36  |   expect(body.description).toBe('A test')
  37  |   expect(body.duration).toBe(30)
  38  |   expect(body).toHaveProperty('id')
  39  | })
  40  | 
  41  | test('POST /api/event-types with missing title returns 400', async ({ request }) => {
  42  |   const login = await request.post(`${API}/api/admin/login`, {
  43  |     data: { password: 'admin123' },
  44  |   })
  45  |   const { token } = await login.json()
  46  | 
  47  |   const res = await request.post(`${API}/api/event-types`, {
  48  |     data: { duration: 30 },
  49  |     headers: { Authorization: `Bearer ${token}` },
  50  |   })
  51  |   expect(res.status()).toBe(400)
  52  |   expect(await res.json()).toEqual({ error: 'Title is required' })
  53  | })
  54  | 
  55  | test('POST /api/event-types with invalid duration returns 400', async ({ request }) => {
  56  |   const login = await request.post(`${API}/api/admin/login`, {
  57  |     data: { password: 'admin123' },
  58  |   })
  59  |   const { token } = await login.json()
  60  | 
  61  |   const res = await request.post(`${API}/api/event-types`, {
  62  |     data: { title: 'Test', duration: 0 },
  63  |     headers: { Authorization: `Bearer ${token}` },
  64  |   })
  65  |   expect(res.status()).toBe(400)
  66  |   expect(await res.json()).toEqual({ error: 'Duration must be a positive number' })
  67  | })
  68  | 
  69  | test('POST /api/event-types with date but no startTime returns 400', async ({ request }) => {
  70  |   const login = await request.post(`${API}/api/admin/login`, {
  71  |     data: { password: 'admin123' },
  72  |   })
  73  |   const { token } = await login.json()
  74  | 
  75  |   const res = await request.post(`${API}/api/event-types`, {
  76  |     data: { title: 'Test', duration: 30, date: '2026-06-10' },
  77  |     headers: { Authorization: `Bearer ${token}` },
  78  |   })
  79  |   expect(res.status()).toBe(400)
  80  |   expect(await res.json()).toEqual({
  81  |     error: 'Both date and startTime must be provided together',
  82  |   })
  83  | })
  84  | 
  85  | test('POST /api/event-types with invalid date format returns 400', async ({ request }) => {
  86  |   const login = await request.post(`${API}/api/admin/login`, {
  87  |     data: { password: 'admin123' },
  88  |   })
  89  |   const { token } = await login.json()
  90  | 
  91  |   const res = await request.post(`${API}/api/event-types`, {
  92  |     data: { title: 'Test', duration: 30, date: '06-10-2026', startTime: '10:00' },
  93  |     headers: { Authorization: `Bearer ${token}` },
  94  |   })
  95  |   expect(res.status()).toBe(400)
  96  | })
  97  | 
  98  | test('PUT /api/event-types/:id updates event type', async ({ request }) => {
  99  |   const login = await request.post(`${API}/api/admin/login`, {
  100 |     data: { password: 'admin123' },
  101 |   })
  102 |   const { token } = await login.json()
  103 | 
  104 |   const create = await request.post(`${API}/api/event-types`, {
  105 |     data: { title: 'Original', duration: 30 },
  106 |     headers: { Authorization: `Bearer ${token}` },
  107 |   })
  108 |   const created = await create.json()
  109 | 
  110 |   const update = await request.put(`${API}/api/event-types/${created.id}`, {
  111 |     data: { title: 'Updated', duration: 60 },
  112 |     headers: { Authorization: `Bearer ${token}` },
  113 |   })
```