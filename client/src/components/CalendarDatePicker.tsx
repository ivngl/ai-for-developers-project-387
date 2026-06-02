import { useState } from 'react'

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function getMonthDays(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1)
  const startOffset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  return cells
}

export default function CalendarDatePicker({
  value,
  onChange,
}: {
  value: string | null
  onChange: (date: string | null) => void
}) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  const cells = getMonthDays(year, month)

  const prevMonth = () => {
    if (month === 0) {
      setYear(year - 1)
      setMonth(11)
    } else {
      setMonth(month - 1)
    }
  }

  const nextMonth = () => {
    if (month === 11) {
      setYear(year + 1)
      setMonth(0)
    } else {
      setMonth(month + 1)
    }
  }

  const formatVal = (d: number) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

  const isSelected = (d: number) => value === formatVal(d)

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: 16,
        display: 'inline-block',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <button
          type="button"
          onClick={prevMonth}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
        >
          ←
        </button>
        <strong>
          {MONTHS[month]} {year}
        </strong>
        <button
          type="button"
          onClick={nextMonth}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
        >
          →
        </button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 36px)',
          textAlign: 'center',
          gap: 2,
        }}
      >
        {DAYS.map((d) => (
          <div key={d} style={{ fontSize: 12, color: '#888', padding: '4px 0' }}>
            {d}
          </div>
        ))}
        {cells.map((d, i) =>
          d === null ? (
            <div key={`e${i}`} />
          ) : (
            <button
              key={d}
              type="button"
              onClick={() => onChange(isSelected(d) ? null : formatVal(d))}
              style={{
                padding: '4px 0',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                backgroundColor: isSelected(d) ? '#0066cc' : 'transparent',
                color: isSelected(d) ? '#fff' : '#333',
                fontSize: 14,
              }}
            >
              {d}
            </button>
          )
        )}
      </div>
    </div>
  )
}
