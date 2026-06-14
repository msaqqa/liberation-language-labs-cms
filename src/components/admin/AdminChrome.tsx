import type { ReactNode } from 'react'

import { AdminFooter } from './AdminFooter'
import { AdminHeader } from './AdminHeader'

/**
 * Global admin chrome — wired via admin.components.providers, so it wraps every
 * admin page (the authenticated views AND the login screen).
 *
 * Renders the top bar above the routed content and the footer below it. The
 * header's user chip reads live auth state itself (see UserChip), so it stays
 * correct across login/logout without threading the server `user` prop here.
 */
export const AdminChrome = ({ children }: { children?: ReactNode }) => (
  <>
    <AdminHeader />
    {children}
    <AdminFooter />
  </>
)

export default AdminChrome
