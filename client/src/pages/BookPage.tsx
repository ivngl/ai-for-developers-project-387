import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getEventTypes } from '../api/eventTypes'
import type { EventType } from '../api/eventTypes'
import { getSlots, createBooking } from '../api/bookings'
import type { Slot } from '../api/bookings'
import Layout from '../components/Layout'
import TimeSlotPicker from '../components/TimeSlotPicker'
import { Title, Text, Button, TextInput, Alert, Loader, Stack } from '@mantine/core'
import { DatePicker } from '@mantine/dates'

export default function BookPage() {
  const { eventTypeId } = useParams<{ eventTypeId: string }>()
  const navigate = useNavigate()
  const [eventType, setEventType] = useState<EventType | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [slots, setSlots] = useState<Slot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

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
    const dateStr = selectedDate.toISOString().slice(0, 10)
    getSlots(parseInt(eventTypeId, 10), dateStr)
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
        <Loader />
      </Layout>
    )
  }

  if (error && !eventType) {
    return (
      <Layout>
        <Alert color="red">{error}</Alert>
      </Layout>
    )
  }

  if (success) {
    return (
      <Layout>
        <Title order={2}>Booking Confirmed!</Title>
        <Text>
          Your {eventType?.title} has been booked for{' '}
          {selectedSlot && new Date(selectedSlot.startTime).toLocaleString()}.
        </Text>
        <Button onClick={() => navigate('/')} mt="md">Back to Home</Button>
      </Layout>
    )
  }

  return (
    <Layout>
      <Title order={2}>Book: {eventType?.title}</Title>
      {eventType?.description && <Text>{eventType.description}</Text>}
      <Text mb="md"><strong>Duration:</strong> {eventType?.duration} min</Text>

      <Title order={3} mb="sm">Select a date</Title>
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        minDate={new Date()}
        maxDate={new Date(Date.now() + 13 * 24 * 60 * 60 * 1000)}
      />

      {slotsLoading && <Loader mt="md" />}

      {selectedDate && !slotsLoading && (
        <TimeSlotPicker
          slots={slots}
          selectedSlot={selectedSlot}
          onSelect={setSelectedSlot}
        />
      )}

      {selectedSlot && (
        <Stack mt="xl" style={{ maxWidth: 400 }}>
          <Text fw={500}>Complete Booking</Text>
          <Text>
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
          </Text>
          <TextInput
            placeholder="Your name (optional)"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
          <TextInput
            placeholder="Your email (optional)"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
          />
          <Button onClick={handleBook}>Confirm Booking</Button>
          {error && <Alert color="red">{error}</Alert>}
        </Stack>
      )}
    </Layout>
  )
}
