# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/bookings.spec.ts >> POST /api/bookings with conflicting time returns 409
- Location: e2e/api/bookings.spec.ts:90:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 409
```

# Test source

```ts
  9   |   await cleanDb()
  10  | })
  11  | 
  12  | test('POST /api/bookings creates a booking', async ({ request }) => {
  13  |   const login = await request.post(`${API}/api/admin/login`, {
  14  |     data: { password: 'admin123' },
  15  |   })
  16  |   const { token } = await login.json()
  17  | 
  18  |   const et = await request.post(`${API}/api/event-types`, {
  19  |     data: { title: 'Test Meeting', duration: 60 },
  20  |     headers: { Authorization: `Bearer ${token}` },
  21  |   })
  22  |   const eventType = await et.json()
  23  | 
  24  |   const startTime = new Date(`${dateStr}T10:00:00.000Z`).toISOString()
  25  |   const endTime = new Date(`${dateStr}T11:00:00.000Z`).toISOString()
  26  | 
  27  |   const res = await request.post(`${API}/api/bookings`, {
  28  |     data: {
  29  |       eventTypeId: eventType.id,
  30  |       startTime,
  31  |       endTime,
  32  |       guestName: 'Alice',
  33  |       guestEmail: 'alice@example.com',
  34  |     },
  35  |   })
  36  |   expect(res.status()).toBe(201)
  37  |   const body = await res.json()
  38  |   expect(body.eventTypeId).toBe(eventType.id)
  39  |   expect(body.guestName).toBe('Alice')
  40  |   expect(body.guestEmail).toBe('alice@example.com')
  41  |   expect(body).toHaveProperty('id')
  42  | })
  43  | 
  44  | test('POST /api/bookings with missing eventTypeId returns 400', async ({ request }) => {
  45  |   const res = await request.post(`${API}/api/bookings`, {
  46  |     data: { startTime: '2026-06-10T10:00:00Z', endTime: '2026-06-10T11:00:00Z' },
  47  |   })
  48  |   expect(res.status()).toBe(400)
  49  |   expect(await res.json()).toEqual({ error: 'eventTypeId is required' })
  50  | })
  51  | 
  52  | test('POST /api/bookings with non-existent event type returns 404', async ({
  53  |   request,
  54  | }) => {
  55  |   const res = await request.post(`${API}/api/bookings`, {
  56  |     data: {
  57  |       eventTypeId: 99999,
  58  |       startTime: '2026-06-10T10:00:00Z',
  59  |       endTime: '2026-06-10T11:00:00Z',
  60  |     },
  61  |   })
  62  |   expect(res.status()).toBe(404)
  63  |   expect(await res.json()).toEqual({ error: 'Event type not found' })
  64  | })
  65  | 
  66  | test('POST /api/bookings with wrong duration returns 400', async ({ request }) => {
  67  |   const login = await request.post(`${API}/api/admin/login`, {
  68  |     data: { password: 'admin123' },
  69  |   })
  70  |   const { token } = await login.json()
  71  | 
  72  |   const et = await request.post(`${API}/api/event-types`, {
  73  |     data: { title: '30 min Meeting', duration: 30 },
  74  |     headers: { Authorization: `Bearer ${token}` },
  75  |   })
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
> 109 |   expect(b1.status()).toBe(201)
      |                       ^ Error: expect(received).toBe(expected) // Object.is equality
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
  176 |   expect(body).toHaveLength(1)
  177 |   expect(body[0].guestName).toBe('Bob')
  178 |   expect(body[0].eventType).toBeDefined()
  179 |   expect(body[0].eventType.title).toBe('Test')
  180 | })
  181 | 
```