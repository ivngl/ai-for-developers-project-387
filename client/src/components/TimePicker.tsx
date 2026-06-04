import { Select } from '@mantine/core'

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
  const data = times.map((t) => ({ value: t, label: t }))

  return (
    <Select
      placeholder="-- No time --"
      data={data}
      value={value}
      onChange={onChange}
      clearable
      style={{ minWidth: 120 }}
    />
  )
}
