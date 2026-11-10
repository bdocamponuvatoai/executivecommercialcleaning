import { absoluteUrl, siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import { images } from "@/content/images";
import mark from "@/assets/images/executive-mark.webp";

/** Escape "<" so the JSON can never close the script element early. */
function serialize(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function BusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: site.legalName,
    description: site.description,
    url: `${siteUrl}/`,
    telephone: site.phone.schema,
    email: site.salesEmail,
    foundingDate: String(site.foundingYear),
    logo: absoluteUrl(mark.src),
    image: absoluteUrl(images.salon.src.src),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: { "@type": "Place", name: "Kansas City metropolitan area" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}
