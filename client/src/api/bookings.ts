import { apiRequest } from './client'

export interface Booking {
  id: number
  eventTypeId: number
  guestName: string | null
  guestEmail: string | null
  startTime: string
  endTime: string
  createdAt: string
  updatedAt: string
  eventType?: { title: string; duration: number }
}

export interface Slot {
  startTime: string
  endTime: string
  available: boolean
}

export function getSlots(
  eventTypeId: number,
  date: string
): Promise<Slot[]> {
  return apiRequest(`/slots?eventTypeId=${eventTypeId}&date=${date}`)
}

export function createBooking(data: {
  eventTypeId: number
  startTime: string
  endTime: string
  guestName?: string
  guestEmail?: string
}): Promise<Booking> {
  return apiRequest('/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function getBookings(): Promise<Booking[]> {
  return apiRequest('/bookings')
}
