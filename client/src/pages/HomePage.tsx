import { useState, useEffect } from 'react'
import { getEventTypes } from '../api/eventTypes'
import type { EventType } from '../api/eventTypes'
import Layout from '../components/Layout'
import EventTypeCard from '../components/EventTypeCard'

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
      <h2>Available Meeting Types</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading &&
        !error &&
        eventTypes.map((et) => <EventTypeCard key={et.id} eventType={et} />)}
    </Layout>
  )
}
