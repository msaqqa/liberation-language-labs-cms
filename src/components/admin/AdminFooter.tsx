/**
 * Global admin footer — rendered by AdminChrome (admin.components.providers)
 * so it appears on every admin page, including the login screen.
 * Matches the "Payload Admin Redesign" mockup's buildFooter: an ultra-minimal
 * copyright line + mono build tag. Styling lives in custom.scss (.ll-appfooter).
 */
export const AdminFooter = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="ll-appfooter">
      <span className="ll-appfooter__copy">© {year} Liberation Language Labs</span>
      <span className="ll-appfooter__build">Build 1.0 · Payload</span>
    </footer>
  )
}

export default AdminFooter
