import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BookPage from './pages/BookPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminEventTypeFormPage from './pages/AdminEventTypeFormPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:eventTypeId" element={<BookPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/event-types/new" element={<AdminEventTypeFormPage />} />
        <Route path="/admin/event-types/:id/edit" element={<AdminEventTypeFormPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
