import type { ImageKey } from "./images";

type Space = {
  id: string;
  name: string;
  title: string;
  text: string;
  image: ImageKey;
  items: string[];
};

export const spaces: Space[] = [
  {
    id: "offices",
    name: "Offices",
    title: "A workplace ready for what’s next.",
    text: "Meeting rooms, reception areas, and everyday workspaces. Build a cleaning brief around the way your team uses its day.",
    image: "reception",
    items: [
      "Professional first impressions",
      "Shared-space priorities",
      "A schedule to discuss with your team",
    ],
  },
  {
    id: "shared",
    name: "Shared spaces",
    title: "A little more care for common ground.",
    text: "Churches, schools, apartment common areas, and event spaces all have different rhythms. Start with what your space needs.",
    image: "corridor",
    items: [
      "Entrances and busy corridors",
      "Gathering areas and amenities",
      "Cleaning around occupancy",
    ],
  },
  {
    id: "facilities",
    name: "Commercial facilities",
    title: "A clear plan for a bigger space.",
    text: "Warehouses and commercial properties need a scope grounded in the site itself. Tell us about your layout, access, and priorities.",
    image: "warehouse",
    items: [
      "Staff and administrative areas",
      "Site access and floor requirements",
      "A walkthrough before final scope",
    ],
  },
];
