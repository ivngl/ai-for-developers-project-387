import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getEventTypes } from '../api/eventTypes'
import type { EventType } from '../api/eventTypes'
import { getSlots, createBooking } from '../api/bookings'
import type { Slot } from '../api/bookings'
import Layout from '../components/Layout'
import TimeSlotPicker from '../components/TimeSlotPicker'

function getDateRange(): string[] {
  const dates: string[] = []
  const today = new Date()
  for (let i = 0; i < 14; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    dates.push(d.toISOString().slice(0, 10))
  }
  return dates
}

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export default function BookPage() {
  const { eventTypeId } = useParams<{ eventTypeId: string }>()
  const navigate = useNavigate()
  const [eventType, setEventType] = useState<EventType | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [slots, setSlots] = useState<Slot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const dates = getDateRange()

  useEffect(() => {
    getEventTypes()
      .then((types) => {
        const found = types.find((t) => t.id === parseInt(eventTypeId!, 10))
        if (found) {
          setEventType(found)
        } else {
          setError('Event type not found')
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [eventTypeId])

  useEffect(() => {
    if (!selectedDate || !eventTypeId) return
    setSlotsLoading(true)
    setSelectedSlot(null)
    getSlots(parseInt(eventTypeId, 10), selectedDate)
      .then(setSlots)
      .catch((e) => setError(e.message))
      .finally(() => setSlotsLoading(false))
  }, [selectedDate, eventTypeId])

  const handleBook = async () => {
    if (!selectedSlot || !eventType) return
    try {
      await createBooking({
        eventTypeId: eventType.id,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        guestName: guestName || undefined,
        guestEmail: guestEmail || undefined,
      })
      setSuccess(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Booking failed')
    }
  }

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    )
  }

  if (error && !eventType) {
    return (
      <Layout>
        <p style={{ color: 'red' }}>{error}</p>
      </Layout>
    )
  }

  if (success) {
    return (
      <Layout>
        <h2>Booking Confirmed!</h2>
        <p>
          Your {eventType?.title} has been booked for{' '}
          {selectedSlot && new Date(selectedSlot.startTime).toLocaleString()}.
        </p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </Layout>
    )
  }

  return (
    <Layout>
      <h2>Book: {eventType?.title}</h2>
      {eventType?.description && <p>{eventType.description}</p>}
      <p>
        <strong>Duration:</strong> {eventType?.duration} min
      </p>

      <h3>Select a date</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: 6,
              cursor: 'pointer',
              backgroundColor: selectedDate === date ? '#0066cc' : '#fff',
              color: selectedDate === date ? '#fff' : '#333',
            }}
          >
            {formatDateLabel(date)}
          </button>
        ))}
      </div>

      {slotsLoading && <p>Loading slots...</p>}

      {selectedDate && !slotsLoading && (
        <TimeSlotPicker
          slots={slots}
          selectedSlot={selectedSlot}
          onSelect={setSelectedSlot}
        />
      )}

      {selectedSlot && (
        <div style={{ marginTop: 24, borderTop: '1px solid #ddd', paddingTop: 16 }}>
          <h3>Complete Booking</h3>
          <p>
            Time:{' '}
            {new Date(selectedSlot.startTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}{' '}
            -{' '}
            {new Date(selectedSlot.endTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300 }}>
            <input
              placeholder="Your name (optional)"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            />
            <input
              placeholder="Your email (optional)"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            />
            <button
              onClick={handleBook}
              style={{
                padding: 10,
                backgroundColor: '#0066cc',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              Confirm Booking
            </button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </Layout>
  )
}
