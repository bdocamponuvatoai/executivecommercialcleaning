import { contactHref } from "@/config/site";
import { faqs } from "@/content/faq";
import { TextLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";

export function Faq() {
  return (
    <section className="section container faq" aria-labelledby="faq-title">
      <div className="faq-intro">
        <h2 id="faq-title">Common questions</h2>
        <p>Something else on your mind?</p>
        <TextLink href={contactHref}>Talk to us</TextLink>
      </div>
      <div className="faq-list">
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>
              <span>{faq.question}</span>
              <Icon name="plus" />
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
