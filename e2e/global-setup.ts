const PORT = process.env.PORT || '3001'
const API = `http://localhost:${PORT}`

export default async function globalSetup() {
  const login = await fetch(`${API}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'admin123' }),
  })
  const { token } = await login.json()

  await fetch(`${API}/api/admin/reset`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
}
