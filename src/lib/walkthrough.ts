/**
 * Framework-free helpers for the walkthrough request: read form values,
 * build the plain-text request and the mailto: link.
 * The message format matches the previous site exactly.
 */
import { spaceOptions } from "@/content/walkthrough";

export type RequestDetails = {
  space: string;
  location: string;
  size: string;
  frequency: string;
  window: string;
  priorities: string[];
  notes: string;
  name: string;
  business: string;
  email: string;
  phone: string;
};

export type Preset = { space?: string; notes?: string };

/** `?space=` must match a known option; `?service=` pre-fills the notes. */
export function presetFromParams(
  space: string | null,
  service: string | null,
): Preset {
  const preset: Preset = {};
  if (space && (spaceOptions as readonly string[]).includes(space))
    preset.space = space;
  if (service) preset.notes = `I’m interested in ${service}.`;
  return preset;
}

export function readRequest(form: HTMLFormElement): RequestDetails {
  const data = new FormData(form);
  const text = (key: string) => String(data.get(key) ?? "").trim();
  return {
    space: text("space"),
    location: text("location"),
    size: text("size"),
    frequency: text("frequency"),
    window: text("window"),
    priorities: data.getAll("priorities").map(String),
    notes: text("notes"),
    name: text("name"),
    business: text("business"),
    email: text("email"),
    phone: text("phone"),
  };
}

function prioritiesText(data: RequestDetails) {
  return data.priorities.join(", ") || "To discuss";
}

export function buildMessage(data: RequestDetails) {
  return `Hello Executive Commercial Cleaning,

I’d like to discuss a cleaning walkthrough.

Name: ${data.name}
Business: ${data.business}
Email: ${data.email}
Phone: ${data.phone || "Not supplied"}

Space: ${data.space}
Location: ${data.location}
Approximate size: ${data.size}
Preferred frequency: ${data.frequency}
Cleaning window: ${data.window}
Priorities: ${prioritiesText(data)}

Notes:
${data.notes || "We can discuss the details during a walkthrough."}

Please contact me to discuss availability and next steps.

Thank you,
${data.name}`;
}

function buildSubject(data: RequestDetails) {
  return `Walkthrough request — ${data.business || data.space}`;
}

export function buildMailto(data: RequestDetails, to: string) {
  return `mailto:${to}?subject=${encodeURIComponent(buildSubject(data))}&body=${encodeURIComponent(buildMessage(data))}`;
}

export function summaryRows(data: RequestDetails): [string, string][] {
  return [
    ["Contact", `${data.name} · ${data.business}`],
    ["Email", data.email],
    ["Phone", data.phone || "Not supplied"],
    ["Space", `${data.space} · ${data.size}`],
    ["Location", data.location],
    ["Schedule", `${data.frequency} · ${data.window}`],
    ["Priorities", prioritiesText(data)],
    ["Notes", data.notes || "To discuss"],
  ];
}
