# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/event-types.spec.ts >> DELETE /api/event-types/:id deletes event type
- Location: e2e/api/event-types.spec.ts:152:5

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 10
Received array:  [{"createdAt": "2026-06-04T21:55:20.537Z", "date": null, "description": null, "duration": 30, "id": 10, "startTime": null, "title": "Test", "updatedAt": "2026-06-04T21:55:20.537Z"}, {"createdAt": "2026-06-04T21:55:20.428Z", "date": null, "description": null, "duration": 60, "id": 9, "startTime": null, "title": "Updated", "updatedAt": "2026-06-04T21:55:20.441Z"}, {"createdAt": "2026-06-04T21:55:19.767Z", "date": null, "description": "A test", "duration": 30, "id": 8, "startTime": null, "title": "Test Meeting", "updatedAt": "2026-06-04T21:55:19.767Z"}, {"createdAt": "2026-06-04T21:55:19.625Z", "date": null, "description": null, "duration": 60, "id": 7, "startTime": null, "title": "Test", "updatedAt": "2026-06-04T21:55:19.625Z"}, {"createdAt": "2026-06-04T21:55:19.347Z", "date": null, "description": null, "duration": 30, "id": 6, "startTime": null, "title": "Test", "updatedAt": "2026-06-04T21:55:19.347Z"}, {"createdAt": "2026-06-04T21:55:16.976Z", "date": null, "description": null, "duration": 60, "id": 5, "startTime": null, "title": "Test", "updatedAt": "2026-06-04T21:55:16.976Z"}, {"createdAt": "2026-06-04T21:55:16.795Z", "date": null, "description": null, "duration": 30, "id": 4, "startTime": null, "title": "30 min Meeting", "updatedAt": "2026-06-04T21:55:16.795Z"}, {"createdAt": "2026-06-04T21:55:16.275Z", "date": null, "description": null, "duration": 60, "id": 3, "startTime": null, "title": "Test Meeting", "updatedAt": "2026-06-04T21:55:16.275Z"}, {"createdAt": "2026-06-04T19:41:56.565Z", "date": "2026-06-17", "description": "afddaf asfas", "duration": 100, "id": 2, "startTime": "10:00", "title": "bbbbb", "updatedAt": "2026-06-04T19:46:50.528Z"}, {"createdAt": "2026-06-02T20:59:13.709Z", "date": "2026-06-11", "description": "dsddd", "duration": 30, "id": 1, "startTime": "11:00", "title": "ADS", "updatedAt": "2026-06-02T20:59:13.709Z"}]
```

# Test source

```ts
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
  114 |   expect(update.ok()).toBeTruthy()
  115 |   const updated = await update.json()
  116 |   expect(updated.title).toBe('Updated')
  117 |   expect(updated.duration).toBe(60)
  118 | })
  119 | 
  120 | test('PUT /api/event-types/:id without auth returns 401', async ({ request }) => {
  121 |   const login = await request.post(`${API}/api/admin/login`, {
  122 |     data: { password: 'admin123' },
  123 |   })
  124 |   const { token } = await login.json()
  125 | 
  126 |   const create = await request.post(`${API}/api/event-types`, {
  127 |     data: { title: 'Test', duration: 30 },
  128 |     headers: { Authorization: `Bearer ${token}` },
  129 |   })
  130 |   const created = await create.json()
  131 | 
  132 |   const res = await request.put(`${API}/api/event-types/${created.id}`, {
  133 |     data: { title: 'Hack' },
  134 |   })
  135 |   expect(res.status()).toBe(401)
  136 | })
  137 | 
  138 | test('PUT /api/event-types/:id with non-existent id returns 404', async ({ request }) => {
  139 |   const login = await request.post(`${API}/api/admin/login`, {
  140 |     data: { password: 'admin123' },
  141 |   })
  142 |   const { token } = await login.json()
  143 | 
  144 |   const res = await request.put(`${API}/api/event-types/99999`, {
  145 |     data: { title: 'Nope' },
  146 |     headers: { Authorization: `Bearer ${token}` },
  147 |   })
  148 |   expect(res.status()).toBe(404)
  149 |   expect(await res.json()).toEqual({ error: 'Event type not found' })
  150 | })
  151 | 
  152 | test('DELETE /api/event-types/:id deletes event type', async ({ request }) => {
  153 |   const login = await request.post(`${API}/api/admin/login`, {
  154 |     data: { password: 'admin123' },
  155 |   })
  156 |   const { token } = await login.json()
  157 | 
  158 |   const create = await request.post(`${API}/api/event-types`, {
  159 |     data: { title: 'To Delete', duration: 30 },
  160 |     headers: { Authorization: `Bearer ${token}` },
  161 |   })
  162 |   const created = await create.json()
  163 | 
  164 |   const del = await request.delete(`${API}/api/event-types/${created.id}`, {
  165 |     headers: { Authorization: `Bearer ${token}` },
  166 |   })
  167 |   expect(del.ok()).toBeTruthy()
  168 |   expect(await del.json()).toEqual({ status: 'ok' })
  169 | 
  170 |   const list = await request.get(`${API}/api/event-types`)
  171 |   const types = await list.json()
> 172 |   expect(types).toHaveLength(0)
      |                 ^ Error: expect(received).toHaveLength(expected)
  173 | })
  174 | 
  175 | test('DELETE /api/event-types/:id without auth returns 401', async ({ request }) => {
  176 |   const login = await request.post(`${API}/api/admin/login`, {
  177 |     data: { password: 'admin123' },
  178 |   })
  179 |   const { token } = await login.json()
  180 | 
  181 |   const create = await request.post(`${API}/api/event-types`, {
  182 |     data: { title: 'Test', duration: 30 },
  183 |     headers: { Authorization: `Bearer ${token}` },
  184 |   })
  185 |   const created = await create.json()
  186 | 
  187 |   const res = await request.delete(`${API}/api/event-types/${created.id}`)
  188 |   expect(res.status()).toBe(401)
  189 | })
  190 | 
  191 | test('DELETE /api/event-types/:id with non-existent id returns 404', async ({ request }) => {
  192 |   const login = await request.post(`${API}/api/admin/login`, {
  193 |     data: { password: 'admin123' },
  194 |   })
  195 |   const { token } = await login.json()
  196 | 
  197 |   const res = await request.delete(`${API}/api/event-types/99999`, {
  198 |     headers: { Authorization: `Bearer ${token}` },
  199 |   })
  200 |   expect(res.status()).toBe(404)
  201 |   expect(await res.json()).toEqual({ error: 'Event type not found' })
  202 | })
  203 | 
  204 | test('GET /api/event-types returns created event types', async ({ request }) => {
  205 |   const login = await request.post(`${API}/api/admin/login`, {
  206 |     data: { password: 'admin123' },
  207 |   })
  208 |   const { token } = await login.json()
  209 | 
  210 |   await request.post(`${API}/api/event-types`, {
  211 |     data: { title: 'Meeting A', duration: 30 },
  212 |     headers: { Authorization: `Bearer ${token}` },
  213 |   })
  214 |   await request.post(`${API}/api/event-types`, {
  215 |     data: { title: 'Meeting B', duration: 60 },
  216 |     headers: { Authorization: `Bearer ${token}` },
  217 |   })
  218 | 
  219 |   const list = await request.get(`${API}/api/event-types`)
  220 |   const types = await list.json()
  221 |   expect(types).toHaveLength(2)
  222 |   expect(types.map((t: { title: string }) => t.title)).toContain('Meeting A')
  223 |   expect(types.map((t: { title: string }) => t.title)).toContain('Meeting B')
  224 | })
  225 | 
```