interface TimePickerProps {
  value: string | null
  onChange: (time: string | null) => void
  workStart?: number
  workEnd?: number
  step?: number
}

function generateTimes(workStart: number, workEnd: number, step: number): string[] {
  const times: string[] = []
  for (let h = workStart; h < workEnd; h++) {
    for (let m = 0; m < 60; m += step) {
      times.push(
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      )
    }
  }
  return times
}

export default function TimePicker({
  value,
  onChange,
  workStart = 9,
  workEnd = 18,
  step = 15,
}: TimePickerProps) {
  const times = generateTimes(workStart, workEnd, step)

  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value || null)}
      style={{
        padding: '8px 12px',
        borderRadius: 4,
        border: '1px solid #ccc',
        fontSize: 14,
        minWidth: 120,
      }}
    >
      <option value="">-- No time --</option>
      {times.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  )
}
