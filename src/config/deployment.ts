/**
 * Deployment settings, read from the environment at build time.
 * Server only: these variables are not exposed to the browser bundle.
 *
 * SITE_URL        Public origin, e.g. https://www.example.com
 * SITE_INDEXABLE  "true" to allow search engines (only after owner approval)
 */
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

const rawSiteUrl =
  process.env.SITE_URL ||
  (vercelProductionUrl
    ? `https://${vercelProductionUrl}`
    : "http://localhost:3000");

export const siteUrl = rawSiteUrl.replace(/\/+$/, "");

export const isIndexable = process.env.SITE_INDEXABLE === "true";

if (
  isIndexable &&
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(siteUrl)
) {
  throw new Error(
    "SITE_INDEXABLE is true but SITE_URL still points at localhost. Set SITE_URL to the public domain.",
  );
}

export function absoluteUrl(path: string) {
  return new URL(path, `${siteUrl}/`).toString();
}
