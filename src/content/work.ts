import type { ImageKey } from "./images";

type WorkPhoto = { image: ImageKey; title: string; description: string };

/** Photographs from the company's existing website. */
export const work: WorkPhoto[] = [
  {
    image: "salon",
    title: "Salon",
    description: "Mirrors, light fixtures and floors in a salon.",
  },
  {
    image: "corridor",
    title: "School corridor",
    description: "Floors and fixtures along a shared corridor.",
  },
  {
    image: "warehouse",
    title: "Warehouse",
    description: "A large facility with a polished concrete floor.",
  },
];
