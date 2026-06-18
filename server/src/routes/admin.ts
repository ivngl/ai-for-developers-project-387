import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'
import { adminAuth } from '../middleware/adminAuth.js'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'
router.post('/login', (_req: Request, res: Response) => {
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' })
  return res.json({ token })
})

router.delete('/reset', adminAuth, async (_req: Request, res: Response) => {
  try {
    await prisma.booking.deleteMany()
    await prisma.eventType.deleteMany()
    return res.json({ status: 'ok' })
  } catch {
    return res.status(500).json({ error: 'Reset failed' })
  }
})

export default router
