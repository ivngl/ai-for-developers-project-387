import { API_BASE_URL } from './config'

export default async function globalSetup() {
  const login = await fetch(`${API_BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'admin123' }),
  })
  const { token } = await login.json()

  await fetch(`${API_BASE_URL}/api/admin/reset`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
}
