import type { Slot } from '../api/bookings'

const btnBase: React.CSSProperties = {
  padding: '10px 16px',
  border: '1px solid #ccc',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 14,
}

export default function TimeSlotPicker({
  slots,
  selectedSlot,
  onSelect,
}: {
  slots: Slot[]
  selectedSlot: Slot | null
  onSelect: (slot: Slot) => void
}) {
  if (slots.length === 0) {
    return <p>No slots available for this date.</p>
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
      {slots.map((slot) => {
        const start = new Date(slot.startTime)
        const label = start.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
        const isSelected =
          selectedSlot?.startTime === slot.startTime
        return (
          <button
            key={slot.startTime}
            disabled={!slot.available}
            style={{
              ...btnBase,
              backgroundColor: isSelected
                ? '#0066cc'
                : slot.available
                  ? '#fff'
                  : '#f5f5f5',
              color: isSelected
                ? '#fff'
                : slot.available
                  ? '#333'
                  : '#aaa',
              cursor: slot.available ? 'pointer' : 'not-allowed',
            }}
            onClick={() => slot.available && onSelect(slot)}
          >
            {label}
            {!slot.available && ' (booked)'}
          </button>
        )
      })}
    </div>
  )
}
