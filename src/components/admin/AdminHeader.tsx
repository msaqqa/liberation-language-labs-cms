import Link from 'next/link'

import { ThemeToggle } from './ThemeToggle'
import { UserChip } from './UserChip'

/**
 * Global admin top bar — wired via AdminChrome (admin.components.providers).
 * "Dashboard" wordmark on the left; theme toggle + user chip (initials avatar +
 * admin name) on the right. The chip reads live auth state (see UserChip) so it
 * appears/disappears correctly across login and logout.
 */
export const AdminHeader = () => (
  <header className="ll-topbar">
    <Link className="ll-topbar__brand" href="/admin" aria-label="Dashboard">
      <span className="ll-topbar__wordmark">Dashboard</span>
    </Link>

    <div className="ll-topbar__right">
      <ThemeToggle />
      <UserChip />
    </div>
  </header>
)

export default AdminHeader
