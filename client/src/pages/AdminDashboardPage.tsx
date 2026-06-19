import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getEventTypes, deleteEventType } from '../api/eventTypes'
import { getBookings } from '../api/bookings'
import type { EventType } from '../api/eventTypes'
import type { Booking } from '../api/bookings'
import AdminLayout from '../components/AdminLayout'
import EventTypeCard from '../components/EventTypeCard'
import { Title, SimpleGrid, Table, Loader, Alert, Text, Button, Group } from '@mantine/core'

export default function AdminDashboardPage() {
  const [eventTypes, setEventTypes] = useState<EventType[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = useCallback(async () => {
    try {
      const [types, bookingsData] = await Promise.all([
        getEventTypes(),
        getBookings(),
      ])
      setEventTypes(types)
      setBookings(bookingsData)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this event type?')) return
    try {
      await deleteEventType(id)
      setEventTypes((prev) => prev.filter((et) => et.id !== id))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    }
  }

  if (loading) return <AdminLayout><Loader /></AdminLayout>
  if (error) return <AdminLayout><Alert color="red">{error}</Alert></AdminLayout>

  return (
    <AdminLayout>
      <Group justify="space-between" mb="md">
        <Title order={2}>Event Types</Title>
        <Button component={Link} to="/admin/event-types/new">New Event Type</Button>
      </Group>
      {eventTypes.length === 0 && <Text>No event types yet.</Text>}
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {eventTypes.map((et) => (
          <EventTypeCard key={et.id} eventType={et} admin onDelete={handleDelete} />
        ))}
      </SimpleGrid>

      <Title order={2} mt="xl" mb="md">Upcoming Bookings</Title>
      {bookings.length === 0 ? (
        <Text>No bookings yet.</Text>
      ) : (
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Type</Table.Th>
              <Table.Th>Start</Table.Th>
              <Table.Th>End</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {bookings.map((b) => (
              <Table.Tr key={b.id}>
                <Table.Td>{b.eventType?.title || `#${b.eventTypeId}`}</Table.Td>
                <Table.Td>{new Date(b.startTime).toLocaleString()}</Table.Td>
                <Table.Td>{new Date(b.endTime).toLocaleTimeString()}</Table.Td>
                <Table.Td>{b.guestName || '-'}</Table.Td>
                <Table.Td>{b.guestEmail || '-'}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </AdminLayout>
  )
}
