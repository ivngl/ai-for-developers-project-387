import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import adminRoutes from './routes/admin.js'
import eventTypeRoutes from './routes/event-types.js'
import slotsRoutes from './routes/slots.js'
import bookingsRoutes from './routes/bookings.js'

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/admin', adminRoutes)
app.use('/api/event-types', eventTypeRoutes)
app.use('/api/slots', slotsRoutes)
app.use('/api/bookings', bookingsRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
