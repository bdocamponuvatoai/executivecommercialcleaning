import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy",
  path: "/privacy/",
  description:
    "How the walkthrough request works, and where the photographs on this site come from.",
});

export default function PrivacyPage() {
  return (
    <main id="main" className="container prose">
      <h1>Privacy</h1>
      <p className="lead">
        How the walkthrough request works, and where the photographs on this
        site come from.
      </p>

      <h2>Your walkthrough request</h2>
      <p>
        Form entries remain in this page’s memory. This site does not store them
        in a database or automatically send them to the business. Refreshing or
        leaving the page clears your entries. Opening an email draft passes the
        request to your chosen email application; you decide whether to send it.
        Downloading a copy saves a text file on your device.
      </p>

      <h2>Services and availability</h2>
      <p>
        Service outlines and planning options are conversation guides. They are
        not a final service agreement, quote, booking, or promise of
        availability. Specialized work, cleaning methods, schedules, pricing,
        and inclusions are confirmed with the company.
      </p>

      <h2>Photography</h2>
      <p>
        The company logo, Dylan’s portrait, and the work photographs are from
        Executive Commercial Cleaning’s existing website. Images marked
        “Illustrative image” were generated for this website; they do not depict
        actual staff, clients, or completed jobs.
      </p>

      <h2>Contact</h2>
      <p>
        {"Contact the business at "}
        <a href={`mailto:${site.email}`}>{site.email}</a>
        {" or "}
        <a href={site.phone.href}>{site.phone.display}</a>.
      </p>
    </main>
  );
}
