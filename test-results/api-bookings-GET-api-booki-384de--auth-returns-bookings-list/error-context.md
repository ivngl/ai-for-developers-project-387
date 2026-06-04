# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/bookings.spec.ts >> GET /api/bookings with auth returns bookings list
- Location: e2e/api/bookings.spec.ts:146:5

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 4
Received array:  [{"createdAt": "2026-06-04T21:55:16.305Z", "endTime": "2026-06-04T11:00:00.000Z", "eventType": {"createdAt": "2026-06-04T21:55:16.275Z", "date": null, "description": null, "duration": 60, "id": 3, "startTime": null, "title": "Test Meeting", "updatedAt": "2026-06-04T21:55:16.275Z"}, "eventTypeId": 3, "guestEmail": "alice@example.com", "guestName": "Alice", "id": 3, "startTime": "2026-06-04T10:00:00.000Z", "updatedAt": "2026-06-04T21:55:16.305Z"}, {"createdAt": "2026-06-04T21:55:19.646Z", "endTime": "2026-06-04T15:00:00.000Z", "eventType": {"createdAt": "2026-06-04T21:55:19.625Z", "date": null, "description": null, "duration": 60, "id": 7, "startTime": null, "title": "Test", "updatedAt": "2026-06-04T21:55:19.625Z"}, "eventTypeId": 7, "guestEmail": "bob@example.com", "guestName": "Bob", "id": 4, "startTime": "2026-06-04T14:00:00.000Z", "updatedAt": "2026-06-04T21:55:19.646Z"}, {"createdAt": "2026-06-04T19:42:37.070Z", "endTime": "2026-06-11T10:30:00.000Z", "eventType": {"createdAt": "2026-06-04T19:41:56.565Z", "date": "2026-06-17", "description": "afddaf asfas", "duration": 100, "id": 2, "startTime": "10:00", "title": "bbbbb", "updatedAt": "2026-06-04T19:46:50.528Z"}, "eventTypeId": 2, "guestEmail": null, "guestName": "sadf", "id": 2, "startTime": "2026-06-11T10:00:00.000Z", "updatedAt": "2026-06-04T19:42:37.070Z"}, {"createdAt": "2026-06-02T21:00:38.112Z", "endTime": "2026-06-11T11:30:00.000Z", "eventType": {"createdAt": "2026-06-02T20:59:13.709Z", "date": "2026-06-11", "description": "dsddd", "duration": 30, "id": 1, "startTime": "11:00", "title": "ADS", "updatedAt": "2026-06-02T20:59:13.709Z"}, "eventTypeId": 1, "guestEmail": null, "guestName": "sadsa", "id": 1, "startTime": "2026-06-11T11:00:00.000Z", "updatedAt": "2026-06-02T21:00:38.112Z"}]
```

# Test source

```ts
  76  |   const eventType = await et.json()
  77  | 
  78  |   const startTime = new Date(`${dateStr}T10:00:00.000Z`).toISOString()
  79  |   const endTime = new Date(`${dateStr}T11:00:00.000Z`).toISOString()
  80  | 
  81  |   const res = await request.post(`${API}/api/bookings`, {
  82  |     data: { eventTypeId: eventType.id, startTime, endTime },
  83  |   })
  84  |   expect(res.status()).toBe(400)
  85  |   expect(await res.json()).toEqual({
  86  |     error: 'Booking duration must be exactly 30 minutes',
  87  |   })
  88  | })
  89  | 
  90  | test('POST /api/bookings with conflicting time returns 409', async ({ request }) => {
  91  |   const login = await request.post(`${API}/api/admin/login`, {
  92  |     data: { password: 'admin123' },
  93  |   })
  94  |   const { token } = await login.json()
  95  | 
  96  |   const et = await request.post(`${API}/api/event-types`, {
  97  |     data: { title: 'Test', duration: 60 },
  98  |     headers: { Authorization: `Bearer ${token}` },
  99  |   })
  100 |   const eventType = await et.json()
  101 | 
  102 |   const startTime = new Date(`${dateStr}T10:00:00.000Z`).toISOString()
  103 |   const endTime = new Date(`${dateStr}T11:00:00.000Z`).toISOString()
  104 | 
  105 |   // First booking
  106 |   const b1 = await request.post(`${API}/api/bookings`, {
  107 |     data: { eventTypeId: eventType.id, startTime, endTime },
  108 |   })
  109 |   expect(b1.status()).toBe(201)
  110 | 
  111 |   // Conflicting booking (same time)
  112 |   const b2 = await request.post(`${API}/api/bookings`, {
  113 |     data: { eventTypeId: eventType.id, startTime, endTime },
  114 |   })
  115 |   expect(b2.status()).toBe(409)
  116 |   expect(await b2.json()).toEqual({ error: 'This time slot is already booked' })
  117 | })
  118 | 
  119 | test('POST /api/bookings with startTime >= endTime returns 400', async ({ request }) => {
  120 |   const login = await request.post(`${API}/api/admin/login`, {
  121 |     data: { password: 'admin123' },
  122 |   })
  123 |   const { token } = await login.json()
  124 | 
  125 |   const et = await request.post(`${API}/api/event-types`, {
  126 |     data: { title: 'Test', duration: 30 },
  127 |     headers: { Authorization: `Bearer ${token}` },
  128 |   })
  129 |   const eventType = await et.json()
  130 | 
  131 |   const startTime = new Date(`${dateStr}T11:00:00.000Z`).toISOString()
  132 |   const endTime = new Date(`${dateStr}T10:00:00.000Z`).toISOString()
  133 | 
  134 |   const res = await request.post(`${API}/api/bookings`, {
  135 |     data: { eventTypeId: eventType.id, startTime, endTime },
  136 |   })
  137 |   expect(res.status()).toBe(400)
  138 |   expect(await res.json()).toEqual({ error: 'startTime must be before endTime' })
  139 | })
  140 | 
  141 | test('GET /api/bookings without auth returns 401', async ({ request }) => {
  142 |   const res = await request.get(`${API}/api/bookings`)
  143 |   expect(res.status()).toBe(401)
  144 | })
  145 | 
  146 | test('GET /api/bookings with auth returns bookings list', async ({ request }) => {
  147 |   const login = await request.post(`${API}/api/admin/login`, {
  148 |     data: { password: 'admin123' },
  149 |   })
  150 |   const { token } = await login.json()
  151 | 
  152 |   const et = await request.post(`${API}/api/event-types`, {
  153 |     data: { title: 'Test', duration: 60 },
  154 |     headers: { Authorization: `Bearer ${token}` },
  155 |   })
  156 |   const eventType = await et.json()
  157 | 
  158 |   const startTime = new Date(`${dateStr}T14:00:00.000Z`).toISOString()
  159 |   const endTime = new Date(`${dateStr}T15:00:00.000Z`).toISOString()
  160 | 
  161 |   await request.post(`${API}/api/bookings`, {
  162 |     data: {
  163 |       eventTypeId: eventType.id,
  164 |       startTime,
  165 |       endTime,
  166 |       guestName: 'Bob',
  167 |       guestEmail: 'bob@example.com',
  168 |     },
  169 |   })
  170 | 
  171 |   const res = await request.get(`${API}/api/bookings`, {
  172 |     headers: { Authorization: `Bearer ${token}` },
  173 |   })
  174 |   expect(res.ok()).toBeTruthy()
  175 |   const body = await res.json()
> 176 |   expect(body).toHaveLength(1)
      |                ^ Error: expect(received).toHaveLength(expected)
  177 |   expect(body[0].guestName).toBe('Bob')
  178 |   expect(body[0].eventType).toBeDefined()
  179 |   expect(body[0].eventType.title).toBe('Test')
  180 | })
  181 | 
```