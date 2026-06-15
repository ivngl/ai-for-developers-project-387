import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import adminRoutes from './routes/admin.js'
import eventTypeRoutes from './routes/event-types.js'
import slotsRoutes from './routes/slots.js'
import bookingsRoutes from './routes/bookings.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

const clientDist = path.resolve(__dirname, '../../client/dist')
app.use(express.static(clientDist))
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'))
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
