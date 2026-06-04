import { Group, Button, Text } from '@mantine/core'
import type { Slot } from '../api/bookings'

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
    return <Text>No slots available for this date.</Text>
  }

  return (
    <Group gap="xs" mt="md">
      {slots.map((slot) => {
        const start = new Date(slot.startTime)
        const label = start.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
        const isSelected = selectedSlot?.startTime === slot.startTime
        return (
          <Button
            key={slot.startTime}
            disabled={!slot.available}
            variant={isSelected ? 'filled' : slot.available ? 'outline' : 'light'}
            color={isSelected ? 'blue' : 'gray'}
            onClick={() => slot.available && onSelect(slot)}
          >
            {label}
            {!slot.available && ' (booked)'}
          </Button>
        )
      })}
    </Group>
  )
}
