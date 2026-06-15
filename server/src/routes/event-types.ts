import { Router, Request, Response } from 'express'
import prisma from '../lib/prisma.js'
import { adminAuth } from '../middleware/adminAuth.js'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const types = await prisma.eventType.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return res.json(types)
})

router.post('/', adminAuth, async (req: Request, res: Response) => {
  const { title, description, duration, date, startTime } = req.body

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' })
  }
  if (!duration || typeof duration !== 'number' || duration < 1) {
    return res.status(400).json({ error: 'Duration must be a positive number' })
  }

  if ((date && !startTime) || (!date && startTime)) {
    return res.status(400).json({ error: 'Both date and startTime must be provided together' })
  }

  if (date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: 'date must be in YYYY-MM-DD format' })
    }
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (new Date(date + 'T00:00:00.000Z') < today) {
      return res.status(400).json({ error: 'Date cannot be in the past' })
    }
    if (startTime) {
      if (!/^\d{2}:\d{2}$/.test(startTime)) {
        return res.status(400).json({ error: 'startTime must be in HH:mm format' })
      }
      const [h, m] = startTime.split(':').map(Number)
      if (new Date(`${date}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00.000Z`) < new Date()) {
        return res.status(400).json({ error: 'Event time cannot be in the past' })
      }
    }
  } else if (startTime) {
    if (!/^\d{2}:\d{2}$/.test(startTime)) {
      return res.status(400).json({ error: 'startTime must be in HH:mm format' })
    }
  }

  if (date && startTime) {
    const conflicting = await prisma.eventType.findFirst({
      where: { date, startTime },
    })
    if (conflicting) {
      return res.status(409).json({ error: 'An event type already exists at this date and time' })
    }
  }

  const eventType = await prisma.eventType.create({
    data: {
      title: title.trim(),
      description: description?.trim() || null,
      duration,
      date: date || null,
      startTime: startTime || null,
    },
  })
  return res.status(201).json(eventType)
})

router.put('/:id', adminAuth, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id' })
  }

  const existing = await prisma.eventType.findUnique({ where: { id } })
  if (!existing) {
    return res.status(404).json({ error: 'Event type not found' })
  }

  const { title, description, duration, date, startTime } = req.body
  const data: Record<string, unknown> = {}
  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title must be a non-empty string' })
    }
    data.title = title.trim()
  }
  if (description !== undefined) {
    data.description = description?.trim() || null
  }
  if (duration !== undefined) {
    if (typeof duration !== 'number' || duration < 1) {
      return res.status(400).json({ error: 'Duration must be a positive number' })
    }
    data.duration = duration
  }
  if (date !== undefined || startTime !== undefined) {
    if ((date && !startTime) || (startTime && !date)) {
      return res.status(400).json({ error: 'Both date and startTime must be provided together' })
    }
    if (date !== undefined) {
      if (date !== null && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ error: 'date must be in YYYY-MM-DD format or null' })
      }
      if (date !== null) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (new Date(date + 'T00:00:00.000Z') < today) {
          return res.status(400).json({ error: 'Date cannot be in the past' })
        }
      }
      data.date = date
    }
    if (startTime !== undefined) {
      if (startTime !== null && !/^\d{2}:\d{2}$/.test(startTime)) {
        return res.status(400).json({ error: 'startTime must be in HH:mm format or null' })
      }
      if (startTime !== null && date) {
        const [h, m] = startTime.split(':').map(Number)
        if (new Date(`${date}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00.000Z`) < new Date()) {
          return res.status(400).json({ error: 'Event time cannot be in the past' })
        }
      }
      data.startTime = startTime
    }
  }

  if (data.date && data.startTime) {
    const conflicting = await prisma.eventType.findFirst({
      where: { date: data.date as string, startTime: data.startTime as string, NOT: { id } },
    })
    if (conflicting) {
      return res.status(409).json({ error: 'An event type already exists at this date and time' })
    }
  }

  const updated = await prisma.eventType.update({ where: { id }, data })
  return res.json(updated)
})

router.delete('/:id', adminAuth, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id' })
  }

  const existing = await prisma.eventType.findUnique({ where: { id } })
  if (!existing) {
    return res.status(404).json({ error: 'Event type not found' })
  }

  try {
    await prisma.eventType.delete({ where: { id } })
  } catch {
    return res.status(409).json({ error: 'Cannot delete event type with existing bookings' })
  }
  return res.json({ status: 'ok' })
})

export default router
