import type { Metadata } from 'next'
import { Open_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import { buildMetadata, getSiteUrl } from '@/lib/seo'
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
  ...buildMetadata({
    title: 'Liberation Language Labs',
    description: 'Speech therapy that affirms, engages, and empowers',
    path: '/',
  }),
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: '/assets/images/site_logo/favourite_icon.svg',
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
      <body className="page_wrapper" suppressHydrationWarning={true}>
        <BackToTop />
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
      </body>
    </html>
  )
}
