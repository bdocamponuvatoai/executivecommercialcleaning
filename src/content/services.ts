import type { ImageKey } from "./images";

type Service = {
  slug: string;
  name: string;
  short: string;
  category: string;
  description: string;
  image: ImageKey;
  items: string[];
  note: string;
};

/** Service outlines are discussion starting points, not contractual inclusions. */
export const services: Service[] = [
  {
    slug: "office-cleaning",
    name: "Office cleaning",
    short: "A fresh start for every workday.",
    category: "Workspaces",
    description:
      "A considered cleaning plan for the desks, meeting rooms, and everyday spaces that keep your business moving.",
    image: "reception",
    items: [
      "Reception and meeting spaces",
      "Accessible desks and surfaces",
      "Breakrooms and restrooms",
      "Floor care and waste removal",
    ],
    note: "Discuss the surfaces, access arrangements, and areas that matter most to your team.",
  },
  {
    slug: "shared-space-cleaning",
    name: "Shared spaces",
    short: "Make every welcome a good one.",
    category: "Places people share",
    description:
      "From corridors to gathering areas, give the spaces people move through the same attention as the spaces they work in.",
    image: "corridor",
    items: [
      "Entrances and common areas",
      "Hallways and shared floors",
      "Restrooms and touchpoints",
      "Gathering rooms and event areas",
    ],
    note: "Tell us how the space is used, when it is busiest, and when cleaning can take place.",
  },
  {
    slug: "commercial-facilities",
    name: "Commercial facilities",
    short: "Care that fits the way you operate.",
    category: "Larger environments",
    description:
      "Start with a walkthrough of your facility so cleaning priorities can be discussed around your operation.",
    image: "warehouse",
    items: [
      "Administrative and staff areas",
      "Shared circulation spaces",
      "Breakrooms and amenities",
      "Site-specific floor care needs",
    ],
    note: "Specialized equipment, safety requirements, and restricted areas need to be reviewed before a scope is agreed.",
  },
  {
    slug: "detail-cleaning",
    name: "Detail cleaning",
    short: "Give the overlooked a little attention.",
    category: "The finer details",
    description:
      "Planning a deeper refresh? Identify the areas that need extra care and build a clear brief for the team.",
    image: "glass",
    items: [
      "Interior glass and visible marks",
      "Edges and accessible surfaces",
      "High-use shared areas",
      "Priority areas for a focused refresh",
    ],
    note: "Materials, methods, and final inclusions are confirmed with the team.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function serviceHref(slug: string) {
  return `/services/${slug}/`;
}
