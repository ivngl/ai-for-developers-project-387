# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/event-types.spec.ts >> GET /api/event-types returns created event types
- Location: e2e/api/event-types.spec.ts:204:5

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 2
Received length: 16
Received array:  [{"createdAt": "2026-06-04T21:55:24.195Z", "date": null, "description": null, "duration": 60, "id": 17, "startTime": null, "title": "Meeting B", "updatedAt": "2026-06-04T21:55:24.195Z"}, {"createdAt": "2026-06-04T21:55:24.169Z", "date": null, "description": null, "duration": 30, "id": 16, "startTime": null, "title": "Meeting A", "updatedAt": "2026-06-04T21:55:24.169Z"}, {"createdAt": "2026-06-04T21:55:23.859Z", "date": null, "description": null, "duration": 30, "id": 15, "startTime": null, "title": "Test", "updatedAt": "2026-06-04T21:55:23.859Z"}, {"createdAt": "2026-06-04T21:55:23.220Z", "date": null, "description": null, "duration": 60, "id": 14, "startTime": null, "title": "Test Meeting", "updatedAt": "2026-06-04T21:55:23.220Z"}, {"createdAt": "2026-06-04T21:55:23.008Z", "date": null, "description": null, "duration": 30, "id": 13, "startTime": null, "title": "Test Meeting", "updatedAt": "2026-06-04T21:55:23.008Z"}, {"createdAt": "2026-06-04T21:55:22.846Z", "date": null, "description": null, "duration": 30, "id": 12, "startTime": null, "title": "Test Meeting", "updatedAt": "2026-06-04T21:55:22.846Z"}, {"createdAt": "2026-06-04T21:55:20.537Z", "date": null, "description": null, "duration": 30, "id": 10, "startTime": null, "title": "Test", "updatedAt": "2026-06-04T21:55:20.537Z"}, {"createdAt": "2026-06-04T21:55:20.428Z", "date": null, "description": null, "duration": 60, "id": 9, "startTime": null, "title": "Updated", "updatedAt": "2026-06-04T21:55:20.441Z"}, {"createdAt": "2026-06-04T21:55:19.767Z", "date": null, "description": "A test", "duration": 30, "id": 8, "startTime": null, "title": "Test Meeting", "updatedAt": "2026-06-04T21:55:19.767Z"}, {"createdAt": "2026-06-04T21:55:19.625Z", "date": null, "description": null, "duration": 60, "id": 7, "startTime": null, "title": "Test", "updatedAt": "2026-06-04T21:55:19.625Z"}, …]
```

# Test source

```ts
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
  172 |   expect(types).toHaveLength(0)
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
> 221 |   expect(types).toHaveLength(2)
      |                 ^ Error: expect(received).toHaveLength(expected)
  222 |   expect(types.map((t: { title: string }) => t.title)).toContain('Meeting A')
  223 |   expect(types.map((t: { title: string }) => t.title)).toContain('Meeting B')
  224 | })
  225 | 
```