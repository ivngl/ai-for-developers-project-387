import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Container, Group, Anchor, Title } from '@mantine/core'

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()

  return (
    <Container size="md" py="md">
      <header style={{ marginBottom: 24 }}>
        <Anchor component={Link} to="/" underline="never" c="dark">
          <Title order={1}>Simple Cal</Title>
        </Anchor>
        <Group gap="md" mt="xs">
          <Anchor component={Link} to="/" fw={location.pathname === '/' ? 700 : 400}>Home</Anchor>
          <Anchor component={Link} to="/admin/login" fw={location.pathname.startsWith('/admin') ? 700 : 400}>Admin</Anchor>
        </Group>
      </header>
      <main>{children}</main>
    </Container>
  )
}
