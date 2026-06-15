import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'
import { adminAuth } from '../middleware/adminAuth.js'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

router.post('/login', (req: Request, res: Response) => {
  const { password } = req.body

  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' })
  }

  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' })
  return res.json({ token })
})

router.delete('/reset', adminAuth, async (_req: Request, res: Response) => {
  await prisma.booking.deleteMany()
  await prisma.eventType.deleteMany()
  return res.json({ status: 'ok' })
})

export default router
