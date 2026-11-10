import { ContactBand } from "@/components/sections/contact-band";
import { PageIntro } from "@/components/sections/page-intro";
import { WorkGallery } from "@/components/work/work-gallery";
import { pageMetadata } from "@/lib/metadata";

const description =
  "A look at some of the everyday environments behind the work.";

export const metadata = pageMetadata({
  title: "Our Work",
  path: "/our-work/",
  description,
});

export default function OurWorkPage() {
  return (
    <main id="main">
      <PageIntro title="Our work" lead={description} />
      <section className="container section-tight" aria-label="Photographs">
        <WorkGallery />
      </section>
      <ContactBand />
    </main>
  );
}
