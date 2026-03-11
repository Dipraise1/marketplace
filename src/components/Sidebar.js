'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { section: 'Main' },
  { label: 'Dashboard', href: '/', icon: '\u25E3' },
  { label: 'Listings', href: '/listings', icon: '\u25C6', badge: '24' },
  { label: 'Pending Orders', href: '/pending', icon: '\u25EF', badge: '7' },
  { label: 'Approved Items', href: '/approved', icon: '\u2713' },
  { section: 'Manage' },
  { label: 'Users', href: '/users', icon: '\u25CB' },
  { label: 'Payments', href: '/payments', icon: '$' },
  { label: 'Settings', href: '/settings', icon: '\u2699' },
]

export default function Sidebar({ open }) {
  const pathname = usePathname()

  return (
    <aside className={`sidebar${open ? ' open' : ''}`}>
      <div className="logo">
        <div className="logo-star" />
        <div className="logo-text">Market<span>place</span></div>
      </div>

      <nav>
        {navItems.map((item, i) => {
          if (item.section) {
            return (
              <div
                key={i}
                className="nav-section"
                style={item.section === 'Manage' ? { marginTop: '6px' } : undefined}
              >
                {item.section}
              </div>
            )
          }
          const isActive = item.href === '/' ? pathname === '/' : pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item${isActive ? ' active' : ''}`}
            >
              <i className="nav-ic">{item.icon}</i>
              {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="sidebar-foot">
        <div className="u-chip">
          <div className="u-av">A</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="u-info-name">admin</div>
            <div className="u-info-role">Super Admin</div>
          </div>
          <span style={{ color: 'var(--muted)' }}>&#8943;</span>
        </div>
      </div>
    </aside>
  )
}
