# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/slots.spec.ts >> GET /api/slots marks booked slots as unavailable
- Location: e2e/api/slots.spec.ts:136:5

# Error details

```
TypeError: Cannot read properties of undefined (reading 'startTime')
```

# Test source

```ts
  50  |   expect(await res.json()).toEqual({ error: 'Date cannot be in the past' })
  51  | })
  52  | 
  53  | test('GET /api/slots with date beyond 14 days returns 400', async ({ request }) => {
  54  |   const eventType = await createEventType(request)
  55  |   const farDate = new Date()
  56  |   farDate.setDate(farDate.getDate() + 20)
  57  |   const farStr = farDate.toISOString().slice(0, 10)
  58  | 
  59  |   const res = await request.get(
  60  |     `${API}/api/slots?eventTypeId=${eventType.id}&date=${farStr}`,
  61  |   )
  62  |   expect(res.status()).toBe(400)
  63  |   expect(await res.json()).toEqual({ error: 'Date must be within the next 14 days' })
  64  | })
  65  | 
  66  | test('GET /api/slots returns slots across work hours for template event type', async ({
  67  |   request,
  68  | }) => {
  69  |   const eventType = await createEventType(request, { duration: 60 })
  70  | 
  71  |   const res = await request.get(
  72  |     `${API}/api/slots?eventTypeId=${eventType.id}&date=${dateStr}`,
  73  |   )
  74  |   expect(res.ok()).toBeTruthy()
  75  |   const body = await res.json()
  76  | 
  77  |   // 9:00 to 18:00 with 60min slots = 9 slots
  78  |   expect(body).toHaveLength(9)
  79  | 
  80  |   // First slot starts at 9:00
  81  |   const firstStart = new Date(body[0].startTime)
  82  |   expect(firstStart.getUTCHours()).toBe(9)
  83  |   expect(firstStart.getUTCMinutes()).toBe(0)
  84  | 
  85  |   // Last slot ends at 18:00
  86  |   const lastEnd = new Date(body[8].endTime)
  87  |   expect(lastEnd.getUTCHours()).toBe(18)
  88  |   expect(lastEnd.getUTCMinutes()).toBe(0)
  89  | 
  90  |   // All slots available
  91  |   for (const slot of body) {
  92  |     expect(slot.available).toBe(true)
  93  |   }
  94  | })
  95  | 
  96  | test('GET /api/slots returns correct slot for single-slot event type', async ({
  97  |   request,
  98  | }) => {
  99  |   const eventType = await createEventType(request, {
  100 |     duration: 45,
  101 |     date: dateStr,
  102 |     startTime: '14:30',
  103 |   })
  104 | 
  105 |   const res = await request.get(
  106 |     `${API}/api/slots?eventTypeId=${eventType.id}&date=${dateStr}`,
  107 |   )
  108 |   expect(res.ok()).toBeTruthy()
  109 |   const body = await res.json()
  110 |   expect(body).toHaveLength(1)
  111 | 
  112 |   const slotStart = new Date(body[0].startTime)
  113 |   expect(slotStart.getUTCHours()).toBe(14)
  114 |   expect(slotStart.getUTCMinutes()).toBe(30)
  115 | 
  116 |   const slotEnd = new Date(body[0].endTime)
  117 |   expect(slotEnd.getUTCMinutes()).toBe(15) // 14:30 + 45 min = 15:15 UTC
  118 | })
  119 | 
  120 | test('GET /api/slots returns empty for single-slot event type on non-matching date', async ({
  121 |   request,
  122 | }) => {
  123 |   const eventType = await createEventType(request, {
  124 |     duration: 30,
  125 |     date: '2026-12-25',
  126 |     startTime: '10:00',
  127 |   })
  128 | 
  129 |   const res = await request.get(
  130 |     `${API}/api/slots?eventTypeId=${eventType.id}&date=${dateStr}`,
  131 |   )
  132 |   expect(res.ok()).toBeTruthy()
  133 |   expect(await res.json()).toEqual([])
  134 | })
  135 | 
  136 | test('GET /api/slots marks booked slots as unavailable', async ({ request }) => {
  137 |   const eventType = await createEventType(request, { duration: 60 })
  138 | 
  139 |   // Get slots first
  140 |   const slotsRes = await request.get(
  141 |     `${API}/api/slots?eventTypeId=${eventType.id}&date=${dateStr}`,
  142 |   )
  143 |   const slots = await slotsRes.json()
  144 |   const firstSlot = slots[0]
  145 | 
  146 |   // Book the first slot
  147 |   const bookRes = await request.post(`${API}/api/bookings`, {
  148 |     data: {
  149 |       eventTypeId: eventType.id,
> 150 |       startTime: firstSlot.startTime,
      |                            ^ TypeError: Cannot read properties of undefined (reading 'startTime')
  151 |       endTime: firstSlot.endTime,
  152 |       guestName: 'Test User',
  153 |       guestEmail: 'test@example.com',
  154 |     },
  155 |   })
  156 |   expect(bookRes.status()).toBe(201)
  157 | 
  158 |   // Get slots again - first should be unavailable
  159 |   const slotsRes2 = await request.get(
  160 |     `${API}/api/slots?eventTypeId=${eventType.id}&date=${dateStr}`,
  161 |   )
  162 |   const slots2 = await slotsRes2.json()
  163 | 
  164 |   expect(slots2[0].available).toBe(false)
  165 |   for (let i = 1; i < slots2.length; i++) {
  166 |     expect(slots2[i].available).toBe(true)
  167 |   }
  168 | })
  169 | 
```