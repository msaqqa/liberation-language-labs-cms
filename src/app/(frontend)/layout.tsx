import type { Metadata } from 'next'
import { Open_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientScripts from '@/components/ClientScripts'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
})

// New design system type families (CLAUDE.md §3)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Liberation Language Labs',
  description: 'Speech therapy that affirms, engages, and empowers',
  icons: {
    icon: '/assets/images/site_logo/favourite_icon.svg',
  },
  openGraph: {
    title: 'Liberation Language Labs',
    description: 'Speech therapy that affirms, engages, and empowers',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Liberation Language Labs',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/site_logo/og_preview_logo.png`,
        width: 1200,
        height: 630,
        alt: 'Liberation Language Labs Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liberation Language Labs',
    description: 'Speech therapy that affirms, engages, and empowers',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/site_logo/og_preview_logo.png`],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const payload = await getPayload({ config: configPromise })

  const [headerData, footerData] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
  ])

  // Helper to get media URL
  const getUrl = (media: any) => (typeof media === 'object' ? media?.url : '')

  return (
    <html
      lang="en"
      className={`${openSans.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning={true}
    >
      <head>
        {/* <!-- Font Awesome icon css--> */}
        <link rel="stylesheet" href="/assets/css/fontawesome.min.css" media="screen" />
        {/* <!-- Main style css --> */}
        <link rel="stylesheet" href="/assets/css/style.min.css" media="screen" />
      </head>
      <body className="page_wrapper" suppressHydrationWarning={true}>
        <div className="backtotop">
          <a href="#!" className="scroll">
            <i className="fa-solid fa-arrow-up"></i>
          </a>
        </div>
        <Header
          logo={headerData.logo}
          hotline={headerData.hotline as any}
          navLinks={(headerData.navLinks as any) || []}
        />
        <main className="page_content">{children}</main>
        <Footer
          logo={footerData.logo as any}
          navLinks={(footerData.navLinks as any) || []}
          copyright={footerData.copyright}
          designerText={footerData.designerText as any}
          designerLink={footerData.designerLink as any}
        />
        <ClientScripts />
      </body>
    </html>
  )
}
