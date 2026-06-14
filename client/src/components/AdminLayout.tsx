import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Container, Group, Anchor, Title, Button } from '@mantine/core'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const token = localStorage.getItem('admin_token')

  useEffect(() => {
    if (!token) {
      navigate('/admin/login', { replace: true })
    }
  }, [token, navigate])

  if (!token) return null

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  return (
    <Container size="lg" py="md">
      <Group justify="space-between" mb="xl">
        <Anchor component={Link} to="/admin" underline="never" c="dark">
          <Title order={1}>Admin Panel</Title>
        </Anchor>
        <Group gap="md">
          <Anchor component={Link} to="/admin">Dashboard</Anchor>
          <Anchor component={Link} to="/admin/event-types/new">New Event Type</Anchor>
          <Anchor component={Link} to="/">View Public Page</Anchor>
          <Button onClick={handleLogout} variant="outline" size="xs">Logout</Button>
        </Group>
      </Group>
      <main>{children}</main>
    </Container>
  )
}
