import { cityLine, site } from "@/config/site";
import { Walkthrough } from "@/components/contact/walkthrough";
import { Icon } from "@/components/ui/icon";
import { pageMetadata } from "@/lib/metadata";

const lead =
  "Share a little about your business. We’ll help you prepare a clear request for a cleaning walkthrough.";

export const metadata = pageMetadata({
  title: "Request a Walkthrough",
  path: "/contact/",
  description: lead,
});

export default function ContactPage() {
  return (
    <main id="main" className="container contact">
      <aside className="contact-aside">
        <h1>Request a walkthrough</h1>
        <p className="lead">{lead}</p>
        <ul className="contact-methods">
          <li>
            <a href={site.phone.href}>
              <Icon name="phone" />
              <span>
                <small>Call</small>
                {site.phone.display}
              </span>
            </a>
          </li>
          <li>
            <a href={`mailto:${site.salesEmail}`}>
              <Icon name="mail" />
              <span>
                <small>Service enquiries</small>
                {site.salesEmail}
              </span>
            </a>
          </li>
          <li>
            <a href={site.mapsUrl} target="_blank" rel="noreferrer">
              <Icon name="pin" />
              <span>
                <small>Based in Lee’s Summit</small>
                {`${site.address.street}, ${cityLine}`}
              </span>
            </a>
          </li>
        </ul>
        <p className="fine-print">
          {`General email: `}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p className="fine-print">
          Your request opens in your email app for you to send. Appointments,
          service scope, and pricing are confirmed directly with the team.
        </p>
      </aside>
      <Walkthrough />
    </main>
  );
}
