import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Blogs } from './collections/Blogs'
// Globals
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { Home } from './globals/Home'
import { Principles } from './globals/Principles'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const csrfOrigins = process.env.SERVER_URL ? [process.env.SERVER_URL] : []

if (process.env.NODE_ENV !== 'production') {
  csrfOrigins.push('http://localhost:3000')
}

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/components/Graphics#Logo',
        Icon: '/components/Graphics#Icon',
      },
    },
  },
  csrf: csrfOrigins,
  collections: [Users, Media, Blogs],
  globals: [Header, Footer, Home, Principles],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          generateFileURL: ({ filename }) => `${process.env.S3_PUBLIC_URL}/${filename}`,
          disablePayloadAccessControl: true,
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        endpoint: process.env.S3_ENDPOINT!,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY!,
          secretAccessKey: process.env.S3_SECRET_KEY!,
        },
        region: 'auto',
        forcePathStyle: false,
      },
    }),
  ],
})
