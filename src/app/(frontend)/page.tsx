import { getPayload } from "payload";
import configPromise from "@payload-config";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SpeechTherapy from "@/components/SpeechTherapy";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise });
  const homeData = await payload.findGlobal({
    slug: "home-page",
  });

  // Helper to get media URL
  const getUrl = (media: any) => (typeof media === "object" ? media?.url : "");

  return (
    <main>
      <Hero
        title={homeData.hero.title}
        backgroundImageUrl={getUrl(homeData.hero.backgroundImage)}
      />

      <About
        title={homeData.about.title}
        subtitle={homeData.about.subtitle}
        description={homeData.about.description} // Note: need a rich text renderer
        imageUrl={getUrl(homeData.about.image)}
      />

      <SpeechTherapy
        title={homeData.speechTherapy.title}
        description={homeData.speechTherapy.description}
        items={(homeData.speechTherapy.items as any) || []}
      />

      <Services
        title={homeData.services.title}
        description={homeData.services.description}
        servicesLists={(homeData.services.servicesLists as any) || []}
      />

      <Pricing
        title={homeData.pricing.title}
        description={homeData.pricing.description}
        paymentInfo={homeData.pricing.paymentInfo}
      />

      <Contact
        title={homeData.contactInfo.title}
        description={homeData.contactInfo.description}
        phone={homeData.contactInfo.phone}
        fax={homeData.contactInfo.fax}
        email={homeData.contactInfo.email}
        address={homeData.contactInfo.address}
      />
    </main>
  );
}
