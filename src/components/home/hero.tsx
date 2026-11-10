import { contactHref, site } from "@/config/site";
import { ButtonLink } from "@/components/ui/button-link";
import { SiteImage } from "@/components/ui/site-image";

const facts = [
  { label: "Based in", value: "Lee’s Summit, MO" },
  { label: "Founded", value: String(site.foundingYear) },
  { label: "Serving", value: "Kansas City metro" },
  { label: "Cleaning", value: "Offices, shared spaces, facilities" },
];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <h1 id="hero-title" className="display">
          {site.tagline}
        </h1>
        <div className="hero-side">
          <p className="lead">
            Executive Commercial Cleaning is a locally owned team based in Lee’s
            Summit. Start with a walkthrough request, then agree scope, schedule
            and quote directly with the team before work begins.
          </p>
          <div className="actions">
            <ButtonLink href={contactHref}>Request a walkthrough</ButtonLink>
            <ButtonLink
              href={site.phone.href}
              variant="secondary"
              leadingIcon="phone"
              icon={null}
            >
              {site.phone.display}
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="container">
        <SiteImage
          image="salon"
          className="hero-media"
          sizes="(min-width: 80rem) 1280px, 100vw"
          eager
        />
        <dl className="facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
