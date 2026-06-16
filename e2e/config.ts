const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || '3001'
export const API_BASE_URL = process.env.API_BASE_URL || `http://${HOST}:${PORT}`
