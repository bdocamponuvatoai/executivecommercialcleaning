import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { ContactBand } from "@/components/sections/contact-band";
import { ServiceIndex } from "@/components/sections/service-index";
import { ButtonLink } from "@/components/ui/button-link";
import { Checklist } from "@/components/ui/checklist";
import { Icon } from "@/components/ui/icon";
import { SiteImage } from "@/components/ui/site-image";
import { getService, serviceHref, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name,
    path: serviceHref(service.slug),
    description: `${service.short} ${service.description}`,
  });
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <main id="main">
      <section className="container service-hero">
        <div>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/services/">
              <Icon name="arrow-left" />
              All services
            </Link>
          </nav>
          <p className="kicker">{service.category}</p>
          <h1>{service.name}</h1>
          <p className="lead">{service.short}</p>
          <p>{service.description}</p>
          <div className="actions">
            <ButtonLink
              href={`/contact/?service=${encodeURIComponent(service.name)}`}
            >
              Discuss your space
            </ButtonLink>
            <ButtonLink
              href={site.phone.href}
              variant="secondary"
              leadingIcon="phone"
              icon={null}
            >
              {site.phone.display}
            </ButtonLink>
          </div>
        </div>
        <SiteImage
          image={service.image}
          className="service-hero-media"
          sizes="(min-width: 64rem) 50vw, 100vw"
          eager
        />
      </section>

      <section
        className="section container scope"
        aria-labelledby="scope-title"
      >
        <div>
          <h2 id="scope-title">Where a walkthrough usually starts</h2>
          <p>{service.note}</p>
        </div>
        <div>
          <Checklist items={service.items} columns={2} />
          <p className="fine-print">
            Example priorities for discussion. Final services, frequency, and
            pricing are confirmed directly with the team.
          </p>
        </div>
      </section>

      <section
        className="section container split"
        aria-labelledby="other-title"
      >
        <div className="split-intro">
          <h2 id="other-title">Other services</h2>
        </div>
        <ServiceIndex exclude={service.slug} />
      </section>

      <ContactBand />
    </main>
  );
}
