import { cityLine, contactHref, site } from "@/config/site";
import { Stripes } from "@/components/ui/brand";
import { ButtonLink } from "@/components/ui/button-link";

export function ContactBand() {
  return (
    <section className="contact-band" aria-labelledby="contact-band-title">
      <div className="container contact-band-grid">
        <div>
          <Stripes />
          <h2 id="contact-band-title">Tell us about your space.</h2>
          <p>
            Share a few details and we’ll help you prepare a clear walkthrough
            request. Scope, schedule and pricing are confirmed directly with the
            team.
          </p>
          <div className="actions">
            <ButtonLink href={contactHref} variant="light">
              Request a walkthrough
            </ButtonLink>
            <ButtonLink
              href={site.phone.href}
              variant="outline-light"
              leadingIcon="phone"
              icon={null}
            >
              {site.phone.display}
            </ButtonLink>
          </div>
        </div>
        <dl className="contact-band-details">
          <div>
            <dt>Service enquiries</dt>
            <dd>
              <a href={`mailto:${site.salesEmail}`}>{site.salesEmail}</a>
            </dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>
              {site.address.street}
              <br />
              {cityLine}
            </dd>
          </div>
          <div>
            <dt>Serving</dt>
            <dd>{`The ${site.areaServed}`}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
