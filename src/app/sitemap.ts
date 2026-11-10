import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/deployment";
import { serviceHref, services } from "@/content/services";

export const dynamic = "force-static";

const pages = [
  "/",
  "/services/",
  "/spaces/",
  "/our-work/",
  "/about/",
  "/contact/",
  "/privacy/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages,
    ...services.map((service) => serviceHref(service.slug)),
  ].map((path) => ({
    url: absoluteUrl(path),
  }));
}
