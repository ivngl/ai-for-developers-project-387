import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <header style={{ marginBottom: 24 }}>
        <h1>
          <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
            Simple Cal
          </Link>
        </h1>
        <nav style={{ display: 'flex', gap: 16 }}>
          <Link to="/">Home</Link>
          <Link to="/admin/login">Admin</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
