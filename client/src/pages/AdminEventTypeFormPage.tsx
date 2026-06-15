import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getEventTypes, createEventType, updateEventType } from '../api/eventTypes'
import AdminLayout from '../components/AdminLayout'
import TimePicker from '../components/TimePicker'
import { Title, TextInput, NumberInput, Button, Alert, Text, Stack, Group } from '@mantine/core'
import { DatePicker } from '@mantine/dates'

function dateToString(date: Date | null): string | null {
  if (!date) return null
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function stringToDate(str: string | null): Date | null {
  if (!str) return null
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export default function AdminEventTypeFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('30')
  const [date, setDate] = useState<Date | null>(null)
  const [startTime, setStartTime] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return
    getEventTypes().then((types) => {
      const found = types.find((t) => t.id === parseInt(id!, 10))
      if (found) {
        setTitle(found.title)
        setDescription(found.description || '')
        setDuration(String(found.duration))
        setDate(stringToDate(found.date))
        setStartTime(found.startTime)
      }
    })
  }, [id, isEdit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const dur = parseInt(duration, 10)
      const body: Parameters<typeof createEventType>[0] = {
        title: title.trim(),
        description: description.trim() || undefined,
        duration: dur,
      }
      const dateStr = dateToString(date)
      if (dateStr && startTime) {
        body.date = dateStr
        body.startTime = startTime
      }
      if (isEdit) {
        await updateEventType(parseInt(id!, 10), body)
      } else {
        await createEventType(body)
      }
      navigate('/admin')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  const clearSchedule = () => {
    setDate(null)
    setStartTime(null)
  }

  return (
    <AdminLayout>
      <Title order={2} mb="md">{isEdit ? 'Edit Event Type' : 'New Event Type'}</Title>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <TextInput
          label="Title *"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb="sm"
        />
        <TextInput
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          mb="sm"
        />
        <NumberInput
          label="Duration (minutes) *"
          required
          min={1}
          value={duration}
          onChange={(v) => setDuration(String(v))}
          mb="sm"
        />

        <Stack gap={4} mb="sm">
          <Text fw={500} size="sm">Schedule a specific day and time (optional)</Text>
          <Text size="xs" c="dimmed">
            If set, this event type will only have one slot on that date at the chosen time.
            Leave empty to make it a recurring template available on any day.
          </Text>
          <Group gap="lg" mt="sm" align="flex-start">
            <DatePicker value={date} onChange={setDate} minDate={new Date()} />
            <div>
              <Text size="sm" mb={4}>Start time</Text>
              <TimePicker value={startTime} onChange={setStartTime} />
            </div>
          </Group>
          {(date || startTime) && (
            <Button
              type="button"
              variant="subtle"
              color="red"
              size="xs"
              onClick={clearSchedule}
              mt="xs"
              style={{ alignSelf: 'flex-start' }}
            >
              Clear date/time (make template)
            </Button>
          )}
        </Stack>

        {error && <Alert color="red" mb="sm">{error}</Alert>}
        <Button type="submit" loading={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </AdminLayout>
  )
}
