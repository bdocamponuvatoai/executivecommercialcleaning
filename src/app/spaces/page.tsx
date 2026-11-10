import { ContactBand } from "@/components/sections/contact-band";
import { PageIntro } from "@/components/sections/page-intro";
import { SpaceExplorer } from "@/components/sections/space-explorer";
import { Stripes } from "@/components/ui/brand";
import { TextLink } from "@/components/ui/button-link";
import { pageMetadata } from "@/lib/metadata";

const description =
  "Your space has its own people, pace, and priorities. Use the guide below to start a conversation around the way it works.";

export const metadata = pageMetadata({
  title: "Spaces We Clean",
  path: "/spaces/",
  description,
});

export default function SpacesPage() {
  return (
    <main id="main">
      <PageIntro title="Spaces we clean" lead={description} />
      <section className="container section-tight" aria-label="Explore spaces">
        <SpaceExplorer />
      </section>
      <section
        className="section container"
        aria-labelledby="other-space-title"
      >
        <div className="callout">
          <Stripes />
          <div>
            <h2 id="other-space-title">A space that doesn’t fit a box?</h2>
            <p>
              Salons, event spaces, healthcare offices, and other commercial
              environments have their own requirements. Share the details so the
              team can confirm the right scope. Specialized or regulated work
              needs a separate discussion.
            </p>
          </div>
          <TextLink
            href={`/contact/?space=${encodeURIComponent("Other commercial space")}`}
          >
            Describe your space
          </TextLink>
        </div>
      </section>
      <ContactBand />
    </main>
  );
}
