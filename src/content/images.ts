import type { StaticImageData } from "next/image";
import careDetail from "@/assets/images/care-detail.webp";
import dylan from "@/assets/images/dylan.webp";
import heroCleaning from "@/assets/images/hero-cleaning.webp";
import workOffice from "@/assets/images/work-office.webp";
import workSalon from "@/assets/images/work-salon.webp";
import workWarehouse from "@/assets/images/work-warehouse.webp";

type ImageEntry = {
  src: StaticImageData;
  alt: string;
  /** AI-generated scene. Must be labelled on screen as illustrative. */
  illustrative: boolean;
};

export const images = {
  salon: {
    src: workSalon,
    alt: "Cleaners wiping mirrors, dusting light fixtures and mopping the floor of a salon",
    illustrative: false,
  },
  corridor: {
    src: workOffice,
    alt: "A school corridor with a speckled resilient floor and teal walls",
    illustrative: false,
  },
  warehouse: {
    src: workWarehouse,
    alt: "A warehouse with a polished concrete floor",
    illustrative: false,
  },
  reception: {
    src: heroCleaning,
    alt: "Illustrative image of a cleaner wiping an office reception counter",
    illustrative: true,
  },
  glass: {
    src: careDetail,
    alt: "Illustrative image of a gloved hand cleaning office glass",
    illustrative: true,
  },
  dylan: {
    src: dylan,
    alt: "Dylan, Operations Lead at Executive Commercial Cleaning",
    illustrative: false,
  },
} satisfies Record<string, ImageEntry>;

export type ImageKey = keyof typeof images;
