'use client'

import { useTheme } from '@payloadcms/ui'

/**
 * Light/dark theme toggle for the admin top bar.
 * Mirrors the "Payload Admin Redesign" mockup's sun/moon pill, but drives
 * Payload's native theme (useTheme) so every stock screen flips polarity and
 * the choice persists. Reduced-motion is honored via custom.scss.
 */
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 14.2A8 8 0 1 1 9.8 4 6.4 6.4 0 0 0 20 14.2z" />
  </svg>
)

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()

  return (
    <div className="ll-topbar__theme" role="group" aria-label="Theme">
      <button
        type="button"
        className={theme === 'light' ? 'on' : ''}
        aria-label="Light theme"
        aria-pressed={theme === 'light'}
        onClick={() => setTheme('light')}
      >
        <SunIcon />
      </button>
      <button
        type="button"
        className={theme === 'dark' ? 'on' : ''}
        aria-label="Dark theme"
        aria-pressed={theme === 'dark'}
        onClick={() => setTheme('dark')}
      >
        <MoonIcon />
      </button>
    </div>
  )
}

export default ThemeToggle
