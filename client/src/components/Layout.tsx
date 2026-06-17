import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Container, Group, Anchor, Title, ActionIcon, useMantineColorScheme } from '@mantine/core'

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Container size="md" py="md">
      <header style={{ marginBottom: 24 }}>
        <Group justify="space-between">
          <Anchor component={Link} to="/" underline="never">
            <Title order={1}>Simple Cal</Title>
          </Anchor>
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
        </Group>
        <Group gap="md" mt="xs">
          <Anchor component={Link} to="/" fw={location.pathname === '/' ? 700 : 400}>Home</Anchor>
          <Anchor component={Link} to="/admin/login" fw={location.pathname.startsWith('/admin') ? 700 : 400}>Admin</Anchor>
        </Group>
      </header>
      <main>{children}</main>
    </Container>
  )
}
