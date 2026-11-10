"use client";

import { useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { site } from "@/config/site";
import {
  frequencyOptions,
  priorityOptions,
  sizeOptions,
  spaceOptions,
  steps,
  windowOptions,
} from "@/content/walkthrough";
import {
  buildMailto,
  buildMessage,
  readRequest,
  summaryRows,
  type Preset,
  type RequestDetails,
} from "@/lib/walkthrough";
import { Icon } from "@/components/ui/icon";

const LAST_STEP = steps.length - 1;

/**
 * Three-step walkthrough request. Every step stays mounted (hidden) so values
 * survive Back and Edit. Nothing is sent: the visitor opens a mailto: draft
 * or downloads a text copy.
 */
export function WalkthroughForm({ preset }: { preset: Preset }) {
  const formRef = useRef<HTMLFormElement>(null);
  const headings = useRef<(HTMLHeadingElement | null)[]>([]);
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<RequestDetails | null>(null);
  const [review, setReview] = useState<RequestDetails | null>(null);
  const [downloaded, setDownloaded] = useState(false);

  function goTo(next: number) {
    const form = formRef.current;
    if (!form) return;
    flushSync(() => {
      setDraft(readRequest(form));
      setReview(null);
      setStep(next);
    });
    headings.current[next]?.focus();
  }

  function stepIsValid(index: number) {
    const fields = formRef.current?.querySelectorAll<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >(`[data-step="${index}"] :is(input, select, textarea)`);
    for (const field of fields ?? []) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }
    return true;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stepIsValid(step)) return;
    if (step < LAST_STEP) return goTo(step + 1);
    const data = readRequest(event.currentTarget);
    flushSync(() => {
      setReview(data);
      setDownloaded(false);
    });
    reviewHeading.current?.focus();
  }

  function download(data: RequestDetails) {
    const url = URL.createObjectURL(
      new Blob([buildMessage(data)], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "executive-cleaning-walkthrough-request.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  }

  return (
    <div className="planner">
      <form
        ref={formRef}
        noValidate
        onSubmit={onSubmit}
        hidden={review !== null}
        aria-label="Walkthrough request"
      >
        <ol className="planner-progress tri" aria-label="Request progress">
          {steps.map((item, index) => (
            <li
              key={item.label}
              aria-current={step === index ? "step" : undefined}
              data-state={
                index < step ? "done" : index === step ? "current" : "todo"
              }
            >
              <span className="planner-progress-bar" />
              <span className="planner-progress-label">
                {index < step ? <Icon name="check" /> : null}
                {item.label}
              </span>
            </li>
          ))}
        </ol>

        {steps.map((item, index) => (
          <div
            key={item.label}
            className="planner-step"
            data-step={index}
            hidden={step !== index}
          >
            <p className="planner-count">{`Step ${index + 1} of ${steps.length}`}</p>
            <h2
              tabIndex={-1}
              ref={(element) => {
                headings.current[index] = element;
              }}
            >
              {item.title}
            </h2>
            <p className="planner-intro">{item.intro}</p>

            {index === 0 ? (
              <div className="planner-fields">
                <fieldset>
                  <legend>What type of space?</legend>
                  <div className="choice-grid">
                    {spaceOptions.map((option) => (
                      <label key={option} className="choice">
                        <input
                          type="radio"
                          name="space"
                          value={option}
                          defaultChecked={
                            (preset.space ?? spaceOptions[0]) === option
                          }
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="field">
                  <span className="field-label">
                    Property location <small>Required</small>
                  </span>
                  <input
                    required
                    name="location"
                    autoComplete="street-address"
                    placeholder="City, neighborhood, or property address"
                    maxLength={200}
                  />
                </label>
                <label className="field">
                  <span className="field-label">Approximate size</span>
                  <select name="size" defaultValue={sizeOptions[0]}>
                    {sizeOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>
            ) : null}

            {index === 1 ? (
              <div className="planner-fields">
                <div className="field-row">
                  <label className="field">
                    <span className="field-label">Preferred frequency</span>
                    <select name="frequency" defaultValue={frequencyOptions[0]}>
                      {frequencyOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                  <label className="field">
                    <span className="field-label">Cleaning window</span>
                    <select name="window" defaultValue={windowOptions[0]}>
                      {windowOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <fieldset>
                  <legend>
                    Areas to focus on <small>Choose any</small>
                  </legend>
                  <div className="choice-grid choice-grid-3">
                    {priorityOptions.map((option) => (
                      <label key={option} className="choice">
                        <input
                          type="checkbox"
                          name="priorities"
                          value={option}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="field">
                  <span className="field-label">
                    Anything else we should know? <small>Optional</small>
                  </span>
                  <textarea
                    name="notes"
                    rows={4}
                    maxLength={1400}
                    placeholder="Access, special surfaces, timing, or your biggest cleaning priorities."
                    defaultValue={preset.notes}
                  />
                </label>
              </div>
            ) : null}

            {index === 2 ? (
              <div className="planner-fields">
                {draft ? (
                  <div className="planner-peek">
                    <div>
                      <p className="planner-peek-title">{draft.space}</p>
                      <p>{`${draft.location} · ${draft.size}`}</p>
                      <p>{`${draft.frequency} · ${draft.window}`}</p>
                    </div>
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => goTo(0)}
                    >
                      Change space details
                    </button>
                  </div>
                ) : null}
                <div className="field-row">
                  <label className="field">
                    <span className="field-label">
                      Your name <small>Required</small>
                    </span>
                    <input
                      required
                      name="name"
                      autoComplete="name"
                      maxLength={100}
                    />
                  </label>
                  <label className="field">
                    <span className="field-label">
                      Business name <small>Required</small>
                    </span>
                    <input
                      required
                      name="business"
                      autoComplete="organization"
                      maxLength={150}
                    />
                  </label>
                  <label className="field">
                    <span className="field-label">
                      Email address <small>Required</small>
                    </span>
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      maxLength={180}
                    />
                  </label>
                  <label className="field">
                    <span className="field-label">
                      Phone number <small>Optional</small>
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      maxLength={40}
                    />
                  </label>
                </div>
              </div>
            ) : null}
          </div>
        ))}

        <div className="planner-nav">
          {step > 0 ? (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => goTo(step - 1)}
            >
              <Icon name="arrow-left" />
              <span>Back</span>
            </button>
          ) : null}
          <button type="submit" className="btn btn-primary">
            <span>{step === LAST_STEP ? "Review my request" : "Continue"}</span>
            <Icon name="arrow-right" className="btn-arrow" />
          </button>
        </div>
        <p className="planner-note">
          {
            "Your details stay on this page until you open an email draft or download a copy. "
          }
          <Link href="/privacy/">Privacy</Link>
        </p>
      </form>

      {review ? (
        <section className="planner-review" aria-labelledby="review-title">
          <span className="planner-review-check">
            <Icon name="check" />
          </span>
          <h2 id="review-title" ref={reviewHeading} tabIndex={-1}>
            Your request is ready.
          </h2>
          <p className="planner-intro">
            Review your details, then open the draft in your email app to send
            it. Nothing has been sent yet.
          </p>
          <dl className="summary">
            {summaryRows(review).map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <a
            className="btn btn-primary"
            href={buildMailto(review, site.salesEmail)}
          >
            <span>Open email draft</span>
            <Icon name="arrow-up-right" className="btn-arrow" />
          </a>
          <p className="planner-note">
            {`Addressed to ${site.salesEmail}. Send it from your email app to make your enquiry. This does not reserve an appointment.`}
          </p>
          <div className="planner-review-actions">
            <button
              type="button"
              className="link-button"
              onClick={() => goTo(LAST_STEP)}
            >
              Edit request
            </button>
            <button
              type="button"
              className="link-button"
              onClick={() => download(review)}
            >
              Download a copy
            </button>
          </div>
          <p role="status" className="planner-status">
            {downloaded ? "Your request has been prepared for download." : ""}
          </p>
        </section>
      ) : null}
    </div>
  );
}
