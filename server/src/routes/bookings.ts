import { Router, Request, Response } from 'express'
import prisma from '../lib/prisma.js'
import { adminAuth } from '../middleware/adminAuth.js'

class ConflictError extends Error {
  statusCode = 409
}

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  const { eventTypeId, startTime, endTime, guestName, guestEmail } = req.body

  if (!eventTypeId || typeof eventTypeId !== 'number') {
    return res.status(400).json({ error: 'eventTypeId is required' })
  }
  if (!startTime || !endTime) {
    return res.status(400).json({ error: 'startTime and endTime are required' })
  }

  const start = new Date(startTime)
  const end = new Date(endTime)

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ error: 'Invalid date format' })
  }
  if (start >= end) {
    return res.status(400).json({ error: 'startTime must be before endTime' })
  }
  if (start <= new Date()) {
    return res.status(400).json({ error: 'Cannot book a time in the past' })
  }

  const eventType = await prisma.eventType.findUnique({ where: { id: eventTypeId } })
  if (!eventType) {
    return res.status(404).json({ error: 'Event type not found' })
  }

  const expectedDuration = eventType.duration * 60000
  const actualDuration = end.getTime() - start.getTime()
  if (actualDuration !== expectedDuration) {
    return res.status(400).json({
      error: `Booking duration must be exactly ${eventType.duration} minutes`,
    })
  }

  try {
    const booking = await prisma.$transaction(async (tx) => {
      const conflicting = await tx.booking.findFirst({
        where: {
          eventTypeId,
          startTime: { lt: end },
          endTime: { gt: start },
        },
      })
      if (conflicting) {
        throw new ConflictError('This time slot is already booked')
      }

      return tx.booking.create({
        data: {
          eventTypeId,
          startTime: start,
          endTime: end,
          guestName: guestName?.trim() || null,
          guestEmail: guestEmail?.trim() || null,
        },
      })
    })
    return res.status(201).json(booking)
  } catch (err) {
    if (err instanceof ConflictError) {
      return res.status(409).json({ error: err.message })
    }
    throw err
  }
})

router.get('/', adminAuth, async (_req: Request, res: Response) => {
  const bookings = await prisma.booking.findMany({
    include: { eventType: true },
    orderBy: { startTime: 'asc' },
  })
  return res.json(bookings)
})

export default router
