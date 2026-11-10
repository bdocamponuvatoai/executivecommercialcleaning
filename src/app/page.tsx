import { Hero } from "@/components/home/hero";
import { ContactBand } from "@/components/sections/contact-band";
import { Faq } from "@/components/sections/faq";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ServiceIndex } from "@/components/sections/service-index";
import { SpaceExplorer } from "@/components/sections/space-explorer";
import { TextLink } from "@/components/ui/button-link";
import { SiteImage } from "@/components/ui/site-image";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <main id="main">
      <Hero />

      <section
        className="section container split"
        aria-labelledby="services-title"
      >
        <div className="split-intro">
          <h2 id="services-title">What we can help with</h2>
          <p>
            It’s the first impression at reception. The meeting room before a
            big conversation. The shared spaces your people use every day.
          </p>
          <TextLink href="/services/">All services</TextLink>
        </div>
        <ServiceIndex />
      </section>

      <section className="section band-surface" aria-labelledby="spaces-title">
        <div className="container">
          <div className="section-head">
            <h2 id="spaces-title">Every space has its own rhythm.</h2>
            <p>
              Start with your environment. We’ll start with understanding it.
            </p>
          </div>
          <SpaceExplorer />
        </div>
      </section>

      <ProcessSteps />

      <section
        className="section container about-teaser"
        aria-labelledby="about-title"
      >
        <figure>
          <SiteImage
            image="dylan"
            className="portrait"
            sizes="(min-width: 64rem) 40vw, 100vw"
          />
          <figcaption>
            <strong>Dylan</strong> Operations Lead
          </figcaption>
        </figure>
        <div>
          <h2 id="about-title">Locally owned since 2020.</h2>
          <p className="lead">
            Executive Commercial Cleaning is a locally owned business serving
            the Kansas City metro from its base in Lee’s Summit.
          </p>
          <p>
            The focus is on commercial spaces, the people who use them, and the
            details that make them feel cared for.
          </p>
          <div className="actions">
            <TextLink href="/about/">About Executive</TextLink>
            <TextLink href="/our-work/">See our work</TextLink>
          </div>
        </div>
      </section>

      <Faq />
      <ContactBand />
    </main>
  );
}
