import { cityLine, contactHref, site } from "@/config/site";
import { ContactBand } from "@/components/sections/contact-band";
import { PageIntro } from "@/components/sections/page-intro";
import { TextLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";
import { SiteImage } from "@/components/ui/site-image";
import { pageMetadata } from "@/lib/metadata";

const description =
  "Executive Commercial Cleaning brings a personal approach to commercial spaces across the Kansas City metro.";

export const metadata = pageMetadata({
  title: "About Executive",
  path: "/about/",
  description,
});

const principles = [
  {
    title: "Start by listening.",
    text: "A useful cleaning plan begins with the people who know the space best.",
  },
  {
    title: "Look at the details.",
    text: "Talk through the busy areas, surfaces, and small things that need attention.",
  },
  {
    title: "Keep the plan clear.",
    text: "Agree on the scope, schedule, and next steps before the work starts.",
  },
];

export default function AboutPage() {
  return (
    <main id="main">
      <PageIntro title="About Executive" lead={description} />

      <section
        className="container section-tight about-intro"
        aria-labelledby="story-title"
      >
        <div>
          <h2 id="story-title">Rooted in Lee’s Summit.</h2>
          <p>
            Founded in 2020, Executive Commercial Cleaning is a locally owned
            business focused on the places people work and gather. The company’s
            story is one of hands-on care and attention to the details.
          </p>
          <p>
            From its base in Lee’s Summit, the team starts with a simple
            conversation: what does your space need, and what would make the
            workday a little better?
          </p>
          <TextLink href={contactHref}>Start a conversation</TextLink>
        </div>
        <figure>
          <SiteImage
            image="dylan"
            className="portrait"
            sizes="(min-width: 64rem) 40vw, 100vw"
            eager
          />
          <figcaption>
            <strong>Dylan</strong> Operations Lead
          </figcaption>
        </figure>
      </section>

      <section className="section container" aria-labelledby="principles-title">
        <h2 id="principles-title" className="section-title">
          How we work
        </h2>
        <ul className="principles tri">
          {principles.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="section container location"
        aria-labelledby="location-title"
      >
        <div>
          <h2 id="location-title">Find us</h2>
          <p>
            For a property in the Kansas City metro, get in touch to discuss
            coverage and scheduling.
          </p>
        </div>
        <div className="location-card">
          <Icon name="pin" />
          <address>
            {site.address.street}
            <br />
            {cityLine}
          </address>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            <span>Get directions</span>
            <Icon name="arrow-up-right" />
          </a>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
