import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Container, Group, Anchor, Title, Button, ActionIcon, useMantineColorScheme } from '@mantine/core'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem('admin_token')
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

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
        <Anchor component={Link} to="/admin" underline="never">
          <Title order={1}>Admin Panel</Title>
        </Anchor>
        <Group gap="md">
          <Anchor component={Link} to="/admin" fw={location.pathname === '/admin' ? 700 : 400}>Dashboard</Anchor>
          <Anchor component={Link} to="/admin/event-types/new" fw={location.pathname === '/admin/event-types/new' ? 700 : 400}>New Event Type</Anchor>
          <Anchor component={Link} to="/" fw={location.pathname === '/' ? 700 : 400}>View Public Page</Anchor>
          <ActionIcon onClick={toggleColorScheme} variant="default" size="lg" aria-label="Toggle color scheme">
            {colorScheme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </ActionIcon>
          <Button onClick={handleLogout} variant="outline" size="xs">Logout</Button>
        </Group>
      </Group>
      <main>{children}</main>
    </Container>
  )
}
