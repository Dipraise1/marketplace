'use client'
import { usePathname } from 'next/navigation'

const pageTitles = {
  '/': 'Dashboard',
  '/listings': 'Listings',
  '/pending': 'Pending Orders',
  '/approved': 'Approved Items',
  '/users': 'Users',
  '/payments': 'Payments',
  '/settings': 'Settings',
}

export default function Topbar({ onMenu }) {
  const pathname = usePathname()
  const title = pageTitles[pathname] || 'Dashboard'

  return (
    <header className="topbar">
      <button className="hamburger" onClick={onMenu}>&#9776;</button>
      <div className="topbar-title">{title}</div>
      <div className="topbar-right">
        <input className="search-box" type="text" placeholder="Search..." />
        <button className="tb-btn">
          &#9679;
          <span className="notif-dot" />
        </button>
      </div>
    </header>
  )
}
