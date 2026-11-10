/**
 * Business details and navigation. Safe to import from client components:
 * nothing here depends on the environment.
 *
 * Every fact below comes from the project brief or the company's existing
 * website (see docs/content-provenance.md). Do not add hours, prices,
 * ratings, certifications or other claims without a source.
 */
export const site = {
  name: "Executive Commercial Cleaning",
  legalName: "Executive Commercial Cleaning LLC",
  tagline: "Commercial cleaning for the Kansas City metro.",
  description:
    "Commercial cleaning with a personal touch. Explore services for offices, shared spaces, and commercial facilities in Lee’s Summit and the Kansas City metro.",
  phone: {
    display: "816-591-1607",
    href: "tel:+18165911607",
    schema: "+1-816-591-1607",
  },
  email: "executivecckc@gmail.com",
  salesEmail: "sales@executivecckc.com",
  address: {
    street: "226 SE Douglas St Ste 205",
    locality: "Lee’s Summit",
    region: "MO",
    postalCode: "64063",
    country: "US",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=226+SE+Douglas+St+Ste+205+Lees+Summit+MO+64063",
  foundingYear: 2020,
  areaServed: "Kansas City metro",
  themeColor: "#1a3c69",
} as const;

export const cityLine = `${site.address.locality}, ${site.address.region} ${site.address.postalCode}`;

type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Services", href: "/services/" },
  { label: "Spaces we clean", href: "/spaces/" },
  { label: "Our work", href: "/our-work/" },
  { label: "About", href: "/about/" },
];

export const contactHref = "/contact/";
