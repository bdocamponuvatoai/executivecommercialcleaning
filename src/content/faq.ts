import { site } from "@/config/site";

type FaqEntry = { question: string; answer: string };

export const faqs: FaqEntry[] = [
  {
    question: "What types of spaces do you clean?",
    answer:
      "Offices, warehouses, salons, churches, schools, event spaces, and healthcare facilities are among the spaces the company highlights. Share your property type so the team can confirm an appropriate scope.",
  },
  {
    question: "Can cleaning fit around our business hours?",
    answer:
      "Include your preferred cleaning window in the walkthrough request. Access, occupancy, frequency, and availability can then be discussed directly with the team.",
  },
  {
    question: "How do I get a quote?",
    answer: `Tell us about your space, location, and priorities, or call ${site.phone.display}. A walkthrough helps the team understand the work before confirming a quote.`,
  },
  {
    question: "Is this an instant booking or price estimate?",
    answer:
      "No. The walkthrough planner prepares a request for you to review and email. Pricing, service availability, and appointments are confirmed directly by Executive Commercial Cleaning.",
  },
  {
    question: "Can I request a specific cleaning task?",
    answer:
      "Yes. Add your priorities to the request. Specialized surfaces, equipment, sensitive areas, and any industry-specific requirements should be discussed before the work is agreed.",
  },
];
