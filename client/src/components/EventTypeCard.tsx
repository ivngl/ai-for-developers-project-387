import { Link } from 'react-router-dom'
import type { EventType } from '../api/eventTypes'

const cardStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  borderRadius: 8,
  padding: 20,
  marginBottom: 16,
}

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
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
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <h3 style={{ margin: 0 }}>{eventType.title}</h3>
        {isScheduled && (
          <span
            style={{
              fontSize: 12,
              backgroundColor: '#e8f4fd',
              color: '#0066cc',
              padding: '2px 8px',
              borderRadius: 4,
              border: '1px solid #b8dfff',
            }}
          >
            📅 {formatDateLabel(eventType.date!)} at {eventType.startTime}
          </span>
        )}
      </div>
      {eventType.description && (
        <p style={{ color: '#555' }}>{eventType.description}</p>
      )}
      <p>
        <strong>Duration:</strong> {eventType.duration} min
        {isScheduled && ' (single slot)'}
      </p>
      {admin ? (
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to={`/admin/event-types/${eventType.id}/edit`}>Edit</Link>
          <button onClick={() => onDelete?.(eventType.id)}>Delete</button>
        </div>
      ) : (
        <Link to={`/book/${eventType.id}`}>
          <button>Book</button>
        </Link>
      )}
    </div>
  )
}
