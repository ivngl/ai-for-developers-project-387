import { Link } from 'react-router-dom'
import { Card, Group, Text, Badge, Button, Title } from '@mantine/core'
import type { EventType } from '../api/eventTypes'

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString(undefined, {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  })
}

export default function EventTypeCard({
  eventType,
  admin,
  onDelete,
}: {
  eventType: EventType
  admin?: boolean
  onDelete?: (id: number) => void
}) {
  const isScheduled = eventType.date && eventType.startTime

  return (
    <Card shadow="sm" padding="lg" mb="md" withBorder>
      <Group gap="xs" mb="xs">
        <Title order={3}>{eventType.title}</Title>
        {isScheduled && (
          <Badge color="blue" variant="light">
            {formatDateLabel(eventType.date!)} at {eventType.startTime}
          </Badge>
        )}
      </Group>
      {eventType.description && (
        <Text c="dimmed" mb="xs">{eventType.description}</Text>
      )}
      <Text mb="md">
        <strong>Duration:</strong> {eventType.duration} min
        {isScheduled && ' (single slot)'}
      </Text>
      {admin ? (
        <Group gap="xs">
          <Button component={Link} to={`/admin/event-types/${eventType.id}/edit`} variant="light" size="xs">Edit</Button>
          <Button onClick={() => onDelete?.(eventType.id)} color="red" variant="light" size="xs">Delete</Button>
        </Group>
      ) : (
        <Button component={Link} to={`/book/${eventType.id}`} size="sm">Book</Button>
      )}
    </Card>
  )
}
