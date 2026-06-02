import { apiRequest } from './client'

export interface EventType {
  id: number
  title: string
  description: string | null
  duration: number
  date: string | null
  startTime: string | null
  createdAt: string
  updatedAt: string
}

export function getEventTypes(): Promise<EventType[]> {
  return apiRequest('/event-types')
}

export function createEventType(data: {
  title: string
  description?: string
  duration: number
  date?: string
  startTime?: string
}): Promise<EventType> {
  return apiRequest('/event-types', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateEventType(
  id: number,
  data: {
    title?: string
    description?: string | null
    duration?: number
    date?: string | null
    startTime?: string | null
  }
): Promise<EventType> {
  return apiRequest(`/event-types/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteEventType(id: number): Promise<{ status: string }> {
  return apiRequest(`/event-types/${id}`, {
    method: 'DELETE',
  })
}
