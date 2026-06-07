import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: { db: { url: 'file:./dev.db' } },
})

export function localDateStr(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export async function cleanDb() {
  await prisma.booking.deleteMany()
  await prisma.eventType.deleteMany()
}

export async function disconnectDb() {
  await prisma.$disconnect()
}

export { prisma }
