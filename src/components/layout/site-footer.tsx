import { cityLine, contactHref, site } from "@/config/site";
import { Brand } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";
import { SmartLink } from "@/components/ui/smart-link";

const explore = [
  { label: "Cleaning services", href: "/services/" },
  { label: "Spaces we clean", href: "/spaces/" },
  { label: "Our work", href: "/our-work/" },
  { label: "About Executive", href: "/about/" },
  { label: "Request a walkthrough", href: contactHref },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Brand />
          <p>
            Commercial cleaning from Lee’s Summit, serving the Kansas City
            metro.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2>Explore</h2>
          <ul>
            {explore.map((item) => (
              <li key={item.href}>
                <SmartLink href={item.href}>{item.label}</SmartLink>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2>Contact</h2>
          <ul>
            <li>
              <a href={site.phone.href}>{site.phone.display}</a>
            </li>
            <li>
              <a href={`mailto:${site.salesEmail}`}>{site.salesEmail}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Visit</h2>
          <address>
            {site.address.street}
            <br />
            {cityLine}
          </address>
          <a
            className="footer-directions"
            href={site.mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Get directions
            <Icon name="arrow-up-right" />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>{`© ${year} ${site.legalName}`}</p>
        <SmartLink href="/privacy/">Privacy</SmartLink>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
