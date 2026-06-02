import { useState, useEffect, useCallback } from 'react'
import { getEventTypes, deleteEventType } from '../api/eventTypes'
import { getBookings } from '../api/bookings'
import type { EventType } from '../api/eventTypes'
import type { Booking } from '../api/bookings'
import AdminLayout from '../components/AdminLayout'
import EventTypeCard from '../components/EventTypeCard'

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

  if (loading) return <AdminLayout><p>Loading...</p></AdminLayout>
  if (error) return <AdminLayout><p style={{ color: 'red' }}>{error}</p></AdminLayout>

  return (
    <AdminLayout>
      <h2>Event Types</h2>
      {eventTypes.length === 0 && <p>No event types yet.</p>}
      {eventTypes.map((et) => (
        <EventTypeCard key={et.id} eventType={et} admin onDelete={handleDelete} />
      ))}

      <h2 style={{ marginTop: 40 }}>Upcoming Bookings</h2>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      {bookings.map((b) => (
        <div
          key={b.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <p>
            <strong>Type:</strong> {b.eventType?.title || `#${b.eventTypeId}`}
          </p>
          <p>
            <strong>Time:</strong>{' '}
            {new Date(b.startTime).toLocaleString()} -{' '}
            {new Date(b.endTime).toLocaleTimeString()}
          </p>
          {b.guestName && (
            <p>
              <strong>Guest:</strong> {b.guestName}
            </p>
          )}
          {b.guestEmail && (
            <p>
              <strong>Email:</strong> {b.guestEmail}
            </p>
          )}
        </div>
      ))}
    </AdminLayout>
  )
}
