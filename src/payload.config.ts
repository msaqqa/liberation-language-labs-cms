import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
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

const defaultFromAddress = process.env.EMAIL_FROM_ADDRESS || 'no-reply@liberationlabs.local'
const defaultFromName = process.env.EMAIL_FROM_NAME || 'Liberation Language Labs'

const emailAdapter =
  process.env.SMTP_HOST && process.env.SMTP_PORT
    ? nodemailerAdapter({
        defaultFromAddress,
        defaultFromName,
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: process.env.SMTP_SECURE === 'true',
          auth:
            process.env.SMTP_USER && process.env.SMTP_PASS
              ? {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASS,
                }
              : undefined,
        },
      })
    : nodemailerAdapter({
        defaultFromAddress,
        defaultFromName,
      })

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  admin: {
    user: Users.slug,
    // Theme left unset → native light/dark toggle stays intact. The HUD reskin
    // (custom.scss) adapts to both modes.
    meta: {
      titleSuffix: '· Liberation Labs',
      description: 'Liberation Language Labs — content control panel',
      icons: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          url: '/assets/images/site_logo/favourite_icon.svg',
        },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/components/Graphics#Logo',
        Icon: '/components/Graphics#Icon',
      },
      views: {
        // Bespoke HUD dashboard replacing Payload's default view
        dashboard: {
          Component: '/components/admin/Dashboard#Dashboard',
        },
      },
    },
  },
  csrf: csrfOrigins,
  collections: [Users, Media, Blogs],
  globals: [Header, Footer, Home, Principles],
  editor: lexicalEditor(),
  email: emailAdapter,
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
