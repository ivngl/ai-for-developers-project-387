import { useState, useEffect } from 'react'
import { getEventTypes } from '../api/eventTypes'
import type { EventType } from '../api/eventTypes'
import Layout from '../components/Layout'
import EventTypeCard from '../components/EventTypeCard'
import { Title, SimpleGrid, Loader, Alert, Text } from '@mantine/core'

export default function HomePage() {
  const [eventTypes, setEventTypes] = useState<EventType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getEventTypes()
      .then(setEventTypes)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <Title order={2} mb="md">Available Meeting Types</Title>
      {loading && <Loader />}
      {error && <Alert color="red">{error}</Alert>}
      {!loading && !error && eventTypes.length === 0 && (
        <Text>No event types available.</Text>
      )}
      {!loading && !error && eventTypes.length > 0 && (
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          {eventTypes.map((et) => <EventTypeCard key={et.id} eventType={et} />)}
        </SimpleGrid>
      )}
    </Layout>
  )
}
