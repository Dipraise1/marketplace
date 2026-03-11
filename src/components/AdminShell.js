'use client'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AdminShell({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      {open && <div className="overlay open" onClick={() => setOpen(false)} />}
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="main">
        <Topbar onMenu={() => setOpen(true)} />
        <div className="content">{children}</div>
      </div>
    </>
  )
}
