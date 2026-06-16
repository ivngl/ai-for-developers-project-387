import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Container, Group, Anchor, Title, Button } from '@mantine/core'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem('admin_token')

  if (!token) {
    return <Navigate to="/admin/login" replace />
  }

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
          <Anchor component={Link} to="/admin" fw={location.pathname === '/admin' ? 700 : 400}>Dashboard</Anchor>
          <Anchor component={Link} to="/admin/event-types/new" fw={location.pathname === '/admin/event-types/new' ? 700 : 400}>New Event Type</Anchor>
          <Anchor component={Link} to="/" fw={location.pathname === '/' ? 700 : 400}>View Public Page</Anchor>
          <Button onClick={handleLogout} variant="outline" size="xs">Logout</Button>
        </Group>
      </Group>
      <main>{children}</main>
    </Container>
  )
}
