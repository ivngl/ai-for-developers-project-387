import { Link, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <header
        style={{
          marginBottom: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>
          <Link to="/admin" style={{ textDecoration: 'none', color: '#333' }}>
            Admin Panel
          </Link>
        </h1>
        <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/event-types/new">New Event Type</Link>
          <Link to="/">View Public Page</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
