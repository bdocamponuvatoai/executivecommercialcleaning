import Link from "next/link";
import { ContactBand } from "@/components/sections/contact-band";
import { Faq } from "@/components/sections/faq";
import { PageIntro } from "@/components/sections/page-intro";
import { TextLink } from "@/components/ui/button-link";
import { SiteImage } from "@/components/ui/site-image";
import { serviceHref, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

const description =
  "Explore ways to care for your commercial space, then build a scope that fits your property, priorities, and schedule.";

export const metadata = pageMetadata({
  title: "Cleaning Services",
  path: "/services/",
  description,
});

export default function ServicesPage() {
  return (
    <main id="main">
      <PageIntro title="Commercial cleaning services" lead={description} />
      <section className="container service-cards" aria-label="Services">
        {services.map((service) => (
          <article key={service.slug} className="service-card">
            <Link
              href={serviceHref(service.slug)}
              tabIndex={-1}
              aria-hidden="true"
              className="service-card-media"
            >
              <SiteImage
                image={service.image}
                sizes="(min-width: 48rem) 50vw, 100vw"
              />
            </Link>
            <p className="kicker">{service.category}</p>
            <h2>
              <Link href={serviceHref(service.slug)}>{service.name}</Link>
            </h2>
            <p>{service.description}</p>
            <TextLink href={serviceHref(service.slug)}>
              Explore this service
            </TextLink>
          </article>
        ))}
      </section>
      <Faq />
      <ContactBand />
    </main>
  );
}
