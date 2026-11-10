import { contactHref } from "@/config/site";
import { TextLink } from "@/components/ui/button-link";

const steps = [
  {
    title: "Tell us about your space.",
    text: "Share your location, type of property, and what you’d like help with.",
  },
  {
    title: "Let’s take a look.",
    text: "Discuss a walkthrough, your priorities, and the times that work for your business.",
  },
  {
    title: "Agree on the details.",
    text: "Confirm your scope, schedule, and quote directly with the team before work begins.",
  },
];

export function ProcessSteps() {
  return (
    <section
      className="section container process"
      aria-labelledby="process-title"
    >
      <div className="section-head">
        <h2 id="process-title">How it works</h2>
        <TextLink href={contactHref}>Start the conversation</TextLink>
      </div>
      <ol className="process-list tri">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span className="process-marker" aria-hidden="true">
              {`Step ${index + 1}`}
            </span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
