import type { Metadata } from "next";
import { site } from "@/config/site";
import { images } from "@/content/images";

const ogImage = images.salon;

/** Title shown when a page has none of its own (the home page). */
export const homeTitle = `${site.name} | Lee’s Summit & Kansas City`;

type PageMetadataInput = {
  /** Page name; rendered as "<title> | Executive Commercial Cleaning". Omit for the home page. */
  title?: string;
  /** Route path with trailing slash, e.g. "/services/". */
  path: string;
  description?: string;
};

export function pageMetadata({
  title,
  path,
  description,
}: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : homeTitle;
  const pageDescription = description ?? site.description;
  return {
    title: { absolute: fullTitle },
    description: pageDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      title: fullTitle,
      description: pageDescription,
      url: path,
      images: [
        {
          url: ogImage.src.src,
          width: ogImage.src.width,
          height: ogImage.src.height,
          alt: ogImage.alt,
        },
      ],
    },
  };
}
