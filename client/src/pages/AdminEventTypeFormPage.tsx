import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getEventTypes, createEventType, updateEventType } from '../api/eventTypes'
import AdminLayout from '../components/AdminLayout'
import CalendarDatePicker from '../components/CalendarDatePicker'
import TimePicker from '../components/TimePicker'

export default function AdminEventTypeFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('30')
  const [date, setDate] = useState<string | null>(null)
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
        setDate(found.date)
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
      if (date && startTime) {
        body.date = date
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
      <h2>{isEdit ? 'Edit Event Type' : 'New Event Type'}</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <div style={{ marginBottom: 12 }}>
          <label>Title *</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 4,
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 4,
              border: '1px solid #ccc',
              minHeight: 80,
            }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Duration (minutes) *</label>
          <input
            type="number"
            required
            min={1}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 4,
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Schedule a specific day and time (optional)</label>
          <p style={{ fontSize: 13, color: '#888', margin: '4px 0 8px' }}>
            If set, this event type will only have one slot on that date at the chosen time.
            Leave empty to make it a recurring template available on any day.
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <CalendarDatePicker value={date} onChange={setDate} />
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>
                Start time
              </label>
              <TimePicker value={startTime} onChange={setStartTime} />
            </div>
          </div>
          {(date || startTime) && (
            <button
              type="button"
              onClick={clearSchedule}
              style={{
                marginTop: 8,
                background: 'none',
                border: 'none',
                color: '#cc0000',
                cursor: 'pointer',
                fontSize: 13,
                padding: 0,
              }}
            >
              ✕ Clear date/time (make template)
            </button>
          )}
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0066cc',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </AdminLayout>
  )
}
