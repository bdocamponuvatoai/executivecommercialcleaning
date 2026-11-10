export const spaceOptions = [
  "Offices",
  "Shared spaces",
  "Commercial facilities",
  "Other commercial space",
] as const;

export const sizeOptions = [
  "Not sure yet",
  "Under 2,500 sq ft",
  "2,500–5,000 sq ft",
  "5,000–15,000 sq ft",
  "15,000–50,000 sq ft",
  "Over 50,000 sq ft",
];

export const frequencyOptions = [
  "Let’s discuss",
  "Multiple times a week",
  "Weekly",
  "Occasional refresh",
  "One-time project",
];

export const windowOptions = [
  "Let’s discuss",
  "Before business hours",
  "During business hours",
  "After business hours",
  "Weekends",
];

export const priorityOptions = [
  "Floors & carpets",
  "Restrooms",
  "Breakrooms",
  "Common areas",
  "Interior glass",
  "A deeper refresh",
];

export const steps = [
  {
    label: "Your space",
    title: "Tell us about your space.",
    intro: "A few details give the conversation a useful starting point.",
  },
  {
    label: "Your priorities",
    title: "What matters to your team?",
    intro: "Share your preferences. The team will confirm what’s available.",
  },
  {
    label: "Your details",
    title: "Let’s make an introduction.",
    intro:
      "We’ll prepare a request you can review and send from your email app.",
  },
] as const;
