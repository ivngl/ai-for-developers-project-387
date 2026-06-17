import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Container, Group, Anchor, Title, ActionIcon, useMantineColorScheme } from '@mantine/core'
import IconSun from '../assets/IconSun'
import IconMoon from '../assets/IconMoon'

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
            {colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
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
