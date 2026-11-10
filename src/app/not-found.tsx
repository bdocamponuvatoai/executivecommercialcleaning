import type { Metadata } from "next";
import { contactHref } from "@/config/site";
import { Stripes } from "@/components/ui/brand";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <Stripes />
      <p className="kicker">404</p>
      <h1>This page isn’t here.</h1>
      <p className="lead">
        The link may be out of date, or the page may have moved.
      </p>
      <div className="actions">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href={contactHref} variant="secondary">
          Request a walkthrough
        </ButtonLink>
      </div>
    </main>
  );
}
