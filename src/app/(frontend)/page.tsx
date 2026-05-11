import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Hero from '@/components/Hero'
import About from '@/components/About'
import SpeechTherapy from '@/components/SpeechTherapy'
import Services from '@/components/Services'
import Pricing from '@/components/Pricing'
import Contact from '@/components/Contact'
import { BlogSection } from '@/components/BlogSection'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const homeData = (await payload.findGlobal({
    slug: 'home-page',
  })) as any

  const getUrl = (media: any) => (typeof media === 'object' ? media?.url : '')

  return (
    <main>
      <Hero title={homeData.hero.title} backgroundImage={homeData.hero.backgroundImage} />

      <About
        title={homeData.about.title}
        subtitle={homeData.about.subtitle}
        description={homeData.about.description}
        imageUrl={getUrl(homeData.about.image)}
      />

      <SpeechTherapy
        title={homeData.speechTherapy.title}
        description={homeData.speechTherapy.description}
        items={homeData.speechTherapy.items || []}
      />

      <Services
        title={homeData.services.title}
        description={homeData.services.description}
        servicesLists={homeData.services.servicesLists || []}
      />

      <Pricing
        title={homeData.pricing.title}
        description={homeData.pricing.description}
        paymentInfo={homeData.pricing.paymentInfo}
      />

      <BlogSection />

      <Contact
        title={homeData.contactInfo.title}
        description={homeData.contactInfo.description}
        phone={homeData.contactInfo.phone}
        fax={homeData.contactInfo.fax}
        email={homeData.contactInfo.email}
        address={homeData.contactInfo.address}
      />
    </main>
  )
}
