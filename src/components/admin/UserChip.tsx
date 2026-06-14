'use client'

import Link from 'next/link'
import { useAuth } from '@payloadcms/ui'

/**
 * Header user chip — reads the live auth state via useAuth() so it stays in sync
 * with login/logout (the server-rendered prop would go stale on client nav and
 * could cause a hydration mismatch). Renders nothing when signed out.
 */
const initialsFrom = (email: string): string => {
  const local = email.split('@')[0] || email
  const letters = local.replace(/[^a-zA-Z]/g, '').slice(0, 2)
  return (letters || 'LL').toUpperCase()
}

const nameFrom = (email: string): string => {
  const local = email.split('@')[0]
  if (!local) return 'Account'
  return (
    local
      .split(/[._-]+/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') || 'Account'
  )
}

export const UserChip = () => {
  const { user } = useAuth()
  if (!user) return null

  const email = (user.email as string | undefined) ?? ''
  const initials = initialsFrom(email)
  const name = nameFrom(email)

  return (
    <Link
      className="ll-topbar__userchip"
      href="/admin/account"
      aria-label={`Account — ${email || name}`}
      title={email || name}
    >
      <span className="ll-topbar__avatar">{initials}</span>
      <span className="ll-topbar__uname">{name}</span>
    </Link>
  )
}

export default UserChip
