import './globals.css'
import AdminShell from '@/components/AdminShell'

export const metadata = { title: 'Marketplace Admin' }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  )
}
