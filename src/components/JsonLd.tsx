/**
 * Renders a JSON-LD structured-data block. Search engines read this to build
 * rich results (knowledge panels, article cards, breadcrumbs). It renders no
 * visible UI. Content is trusted (built server-side from our own data), so the
 * single JSON.stringify is safe here.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
