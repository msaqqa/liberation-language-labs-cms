# Liberation Language Labs CMS

Production-ready Next.js + Payload CMS project for the Liberation Language Labs website.

This repository includes:

- A public marketing website (home, principles, blog list, blog details)
- A Payload admin panel for content management
- PostgreSQL-backed CMS data
- S3-compatible media storage
- Scheduled keep-alive endpoint support for hosted environments

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Payload CMS 3
- PostgreSQL (`@payloadcms/db-postgres`)
- S3-compatible object storage (`@payloadcms/storage-s3`)
- Nodemailer email adapter (`@payloadcms/email-nodemailer`)
- Bootstrap 5 (UI interactions)

## Key Features

- CMS-managed global content:
  - Header
  - Footer
  - Home Page sections
  - Principles Page content
- Blog collection with automatic slug generation + publish controls
- Authenticated admin users (`users` collection)
- Public REST and GraphQL APIs via Payload Next routes
- Rich text editing via Lexical
- External media hosting through S3-compatible storage
- Route-level revalidation hooks on blog create/update/delete
- Frontend keep-alive endpoint (`/api/keep-alive`)

## Project Structure (High Level)

```text
src/
  components/              # Frontend UI sections/components
  app/
    (frontend)/            # Public website routes
      api/keep-alive/      # Warm-up endpoint used by scheduler
      blog/[slug]/         # Blog detail route
    (payload)/             # Admin + Payload API routes
      admin/               # Payload admin entry routes
      api/graphql/         # GraphQL endpoint
      api/graphql-playground/
  collections/             # Payload collections (Users, Media, Blogs)
  globals/                 # Payload globals (Header, Footer, Home, Principles)
  lib/                     # Shared frontend/cms utilities
  payload.config.ts        # Payload CMS configuration
next.config.ts             # Next config (withPayload + image host patterns)
vercel.json                # Cron schedule for keep-alive route
public/
  assets/                  # Static theme assets (css, js, images, fonts)
```

## Prerequisites

- Node.js: `^18.20.2 || >=20.9.0`
- pnpm: `^9 || ^10`
- PostgreSQL database
- S3-compatible object storage (R2, MinIO, AWS S3, etc.)

## Environment Variables

Create a `.env` file in the project root with at least the following values:

```bash
NODE_ENV=development
SERVER_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
PAYLOAD_SECRET=replace-with-a-strong-random-secret

DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME

S3_BUCKET=your-bucket-name
S3_ENDPOINT=https://your-s3-endpoint
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key
S3_PUBLIC_URL=https://your-public-cdn-or-bucket-url

EMAIL_FROM_ADDRESS=no-reply@your-domain.com
EMAIL_FROM_NAME="Liberation Language Labs"
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
```

Notes:

- `SERVER_URL` is used for Payload server URL and CSRF origin handling.
- `NEXT_PUBLIC_SITE_URL` is used for metadata/open graph URLs in frontend layout.
- `Media` collection uses `disableLocalStorage: true`, so S3 settings are required for uploads.
- If SMTP variables are not set, Payload will use a Nodemailer test transport in development, and production password-reset email delivery will not be guaranteed.

## Local Development

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm dev
```

Open:

- Site: `http://localhost:3000`
- Admin panel: `http://localhost:3000/admin`

First-time admin access:

- On first run, create your initial admin user through the Payload setup flow.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm devsafe` - Remove `.next` then start dev server
- `pnpm build` - Production build
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm generate:types` - Generate Payload TypeScript types
- `pnpm generate:importmap` - Regenerate Payload admin import map
- `pnpm payload` - Run Payload CLI

## Public Routes

- `/` - Home page
- `/principles` - Principles page
- `/blog` - Blog listing
- `/blog/[slug]` - Blog detail page
- `/not-found` - Custom not found page UI

## CMS API Endpoints

- `/api/[...slug]` - Payload REST API
- `/api/graphql` - GraphQL endpoint
- `/api/graphql-playground` - GraphQL playground

## Operational Endpoint

- `/api/keep-alive` - Lightweight Payload query endpoint used by scheduled pings (configured in `vercel.json`)

## Content Model Summary

Collections:

- `users` - Admin authentication
- `media` - Media uploads (S3-backed)
- `blogs` - Blog posts with generated slug, rich-text details, publish controls, and featured image

Globals:

- `header` - Logo, hotline, nav links
- `footer` - Logo, nav links, copyright/designer fields
- `home-page` - Home sections (hero, about, speech therapy, services, pricing, contact)
- `principles-page` - Principles page banner and rich text sections

## Deployment Notes

- Ensure all environment variables above are configured in your hosting platform.
- Set `SERVER_URL` to the public application URL in production.
- Set `NEXT_PUBLIC_SITE_URL` to the public frontend URL in production.
- Confirm S3 bucket permissions and `S3_PUBLIC_URL` are correctly configured for media rendering.
- If S3 public host changes, update `images.remotePatterns` in `next.config.ts` to allow Next Image optimization.
- If deployed on Vercel, keep `vercel.json` cron entry enabled for periodic keep-alive pings.

## Maintenance Notes

- `src/app/(payload)/api/*` route files are generated by Payload; avoid manual edits.
- After schema changes, run:

```bash
pnpm generate:types
pnpm generate:importmap
```

## License

MIT
