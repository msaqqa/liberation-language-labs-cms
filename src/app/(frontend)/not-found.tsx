import Link from 'next/link'

export default function FrontendNotFoundPage() {
  return (
    <main className="page_content">
      <section className="section_space">
        <div className="container text-center">
          <span className="d-inline-block mb-3">404</span>
          <h1 className="mb-3">Page not found</h1>
          <p className="mb-4">The page you requested does not exist or may have been moved.</p>
          <Link className="btn btn-primary" href="/">
            Back to home
          </Link>
        </div>
      </section>
    </main>
  )
}
