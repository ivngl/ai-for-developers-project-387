import { Router, Request, Response } from 'express'
import prisma from '../lib/prisma.js'

const router = Router()

function getWorkHours(): { start: number; end: number } {
  const start = parseInt(process.env.WORK_HOURS_START || '9', 10)
  const end = parseInt(process.env.WORK_HOURS_END || '18', 10)
  return { start, end }
}

router.get('/', async (req: Request, res: Response) => {
  const eventTypeId = parseInt(req.query.eventTypeId as string, 10)
  const dateStr = req.query.date as string

  if (isNaN(eventTypeId)) {
    return res.status(400).json({ error: 'eventTypeId is required' })
  }
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return res.status(400).json({ error: 'date is required in YYYY-MM-DD format' })
  }

  const eventType = await prisma.eventType.findUnique({ where: { id: eventTypeId } })
  if (!eventType) {
    return res.status(404).json({ error: 'Event type not found' })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const requested = new Date(dateStr + 'T00:00:00.000Z')
  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + 13)

  if (requested < today) {
    return res.status(400).json({ error: 'Date cannot be in the past' })
  }
  if (requested > maxDate) {
    return res.status(400).json({ error: 'Date must be within the next 14 days' })
  }

  const { start: workStart, end: workEnd } = getWorkHours()
  const slotDuration = eventType.duration

  const dayStart = new Date(requested)
  dayStart.setUTCHours(workStart, 0, 0, 0)
  const dayEnd = new Date(requested)
  dayEnd.setUTCHours(workEnd, 0, 0, 0)

  const existingBookings = await prisma.booking.findMany({
    where: {
      startTime: { gte: dayStart, lt: dayEnd },
    },
    orderBy: { startTime: 'asc' },
  })

  const slots: { startTime: string; endTime: string; available: boolean }[] = []

  if (eventType.date && eventType.startTime) {
    // single-slot event type — only return slot if date matches
    if (dateStr !== eventType.date) {
      return res.json([])
    }
    const [hours, minutes] = eventType.startTime.split(':').map(Number)
    const slotStart = new Date(requested)
    slotStart.setUTCHours(hours, minutes, 0, 0)
    const slotEnd = new Date(slotStart.getTime() + slotDuration * 60000)

    const isBooked = existingBookings.some(
      (b) => slotStart < b.endTime && slotEnd > b.startTime
    )
    slots.push({
      startTime: slotStart.toISOString(),
      endTime: slotEnd.toISOString(),
      available: !isBooked,
    })
  } else {
    // template event type — generate all slots across business hours
    let cursor = new Date(dayStart)
    while (cursor.getTime() + slotDuration * 60000 <= dayEnd.getTime()) {
      const slotStart = new Date(cursor)
      const slotEnd = new Date(cursor.getTime() + slotDuration * 60000)

      const isBooked = existingBookings.some(
        (b) => slotStart < b.endTime && slotEnd > b.startTime
      )

      slots.push({
        startTime: slotStart.toISOString(),
        endTime: slotEnd.toISOString(),
        available: !isBooked,
      })

      cursor = new Date(cursor.getTime() + slotDuration * 60000)
    }
  }

  return res.json(slots)
})

export default router
