import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET() {
  const payload = await getPayload({ config: configPromise })

  await payload.find({
    collection: 'blogs',
    limit: 1,
    pagination: false,
    depth: 0,
  })

  return Response.json({ ok: true })
}
