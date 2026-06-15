import type { APIRequestContext } from '@playwright/test'

export function localDateStr(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function futureDateStr(daysFromNow: number = 2): string {
  const d = new Date()
  d.setDate(d.getDate() + daysFromNow)
  return localDateStr(d)
}

export async function cleanDb(request: APIRequestContext) {
  const login = await request.post('http://localhost:3001/api/admin/login', {
    data: { password: 'admin123' },
  })
  const { token } = await login.json()
  await request.delete('http://localhost:3001/api/admin/reset', {
    headers: { Authorization: `Bearer ${token}` },
  })
}
