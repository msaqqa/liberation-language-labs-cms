import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BootstrapJS from '@/components/BootstrapJS'
import 'bootstrap/dist/css/bootstrap.min.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
})

export const metadata: Metadata = {
  title: 'Liberation Language Labs',
  description: 'Speech therapy that affirms, engages, and empowers',
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
      className={`${openSans.variable} scroll-smooth`}
      suppressHydrationWarning={true}
    >
      <head>
        {/* <!-- Bootstrap css --> */}
        {/* <link rel="stylesheet" href="/assets/css/bootstrap.min.css" media="screen" /> */}
        {/* <!-- Font Awesome icon css--> */}
        <link rel="stylesheet" href="/assets/css/fontawesome.min.css" media="screen" />
        {/* <!-- Main style css --> */}
        <link rel="stylesheet" href="/assets/css/style.min.css" media="screen" />
      </head>
      <body className="page_wrapper" suppressHydrationWarning={true}>
        <BootstrapJS />
        <div className="backtotop">
          <a href="#!" className="scroll">
            <i className="fa-solid fa-arrow-up"></i>
          </a>
        </div>
        <Header
          logoUrl={headerData.logo}
          hotline={headerData.hotline as any}
          navLinks={(headerData.navLinks as any) || []}
        />
        <main className="page_content">{children}</main>
        <Footer
          logoUrl={getUrl(footerData.logo)}
          navLinks={(footerData.navLinks as any) || []}
          copyright={footerData.copyright}
          designerText={footerData.designerText}
          designerLink={footerData.designerLink}
        />
        {/* <Script src="/assets/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.min.js" strategy="afterInteractive" /> */}
      </body>
    </html>
  )
}
