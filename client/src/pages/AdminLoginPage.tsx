import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { loginAdmin } from '../api/admin'
import { Container, Paper, Title, PasswordInput, Button, Alert } from '@mantine/core'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('admin_token')
  if (token) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { token } = await loginAdmin(password)
      localStorage.setItem('admin_token', token)
      navigate('/admin')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container size="xs" py="xl">
      <Paper withBorder shadow="md" p="lg">
        <Title order={2} mb="md">Admin Login</Title>
        <form onSubmit={handleSubmit}>
          <PasswordInput
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            mb="md"
          />
          {error && <Alert color="red" mb="md">{error}</Alert>}
          <Button type="submit" loading={loading} fullWidth>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
