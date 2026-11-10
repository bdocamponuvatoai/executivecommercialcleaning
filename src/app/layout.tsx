import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { isIndexable, siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BusinessJsonLd } from "@/components/seo/json-ld";
import { homeTitle } from "@/lib/metadata";
import { monaSans } from "./fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: homeTitle, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={monaSans.variable}>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <BusinessJsonLd />
      </body>
    </html>
  );
}
