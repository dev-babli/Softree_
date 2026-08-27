export type ContactMeetingType = {
  icon: string;
  label: string;
  duration: string;
  url: string;
  description?: string;
};

export const CONTACT_MEETING_TYPES: readonly ContactMeetingType[] = [
  {
    icon: "🔍",
    label: "Discovery",
    duration: "30 min",
    url: "https://calendly.com/shradhabhagat/new-meeting",
    description: "Align on goals, timeline, and whether we are the right fit.",
  },
  {
    icon: "⚙️",
    label: "Technical",
    duration: "60 min",
    url: "https://calendly.com/shradhabhagat/new-meeting",
    description: "Deep-dive on architecture, integrations, and delivery approach.",
  },
  {
    icon: "🎯",
    label: "Demo",
    duration: "45 min",
    url: "https://calendly.com/shradhabhagat/new-meeting",
    description: "See relevant work samples and solution patterns for your stack.",
  },
  {
    icon: "🤝",
    label: "Partnership",
    duration: "30 min",
    url: "https://calendly.com/shradhabhagat/new-meeting",
    description: "Explore reseller, referral, or long-term delivery partnerships.",
  },
] as const;

export const CONTACT_TRUST_ITEMS = [
  { label: "Reply within 1 business day" },
  { label: "NDA available on request" },
  { label: "Free discovery call" },
  { label: "Senior engineers on every call" },
] as const;

export const CONTACT_CHANNELS = [
  {
    city: "Global sales",
    email: "sales@softreetechnology.com",
    phone: "+91 70086 99927",
    contact: "Srikanta Barik",
    hours: "Mon–Fri · 9:00–18:00 IST",
  },
  {
    city: "Bengaluru",
    email: "shradhab@softreetechnology.com",
    phone: "+91 90404 92078",
    contact: "Shradha Bhagat",
    hours: "IST business hours",
  },
  {
    city: "San Francisco",
    email: "sales@softreetechnology.com",
    phone: "",
    contact: "Sophie Lynn",
    hours: "PST business hours",
  },
] as const;

export const CONTACT_FAQS = [
  {
    question: "How quickly will Softree respond to my inquiry?",
    answer:
      "We reply to every message within one business day. Urgent enterprise requests are routed to a delivery lead the same day when possible.",
  },
  {
    question: "Is the discovery call really free?",
    answer:
      "Yes. The 30-minute discovery call is complimentary — no sales pressure, no commitment. We use it to understand scope, timeline, and fit.",
  },
  {
    question: "Which time zones do you cover?",
    answer:
      "Our teams operate across IST, PST, and GMT-friendly windows with offices in Bengaluru, Cuttack, and San Francisco — so follow-the-sun collaboration is built in.",
  },
  {
    question: "Can we sign an NDA before sharing project details?",
    answer:
      "Absolutely. Mention it in your message or on the booking form and we will send a mutual NDA before any technical deep-dive.",
  },
  {
    question: "What types of engagements do you offer?",
    answer:
      "Dedicated teams, fixed-scope delivery, staff augmentation, and advisory — across AI, Microsoft, cloud, data, and custom product engineering.",
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer:
      "Yes, we provide flexible support SLAs, continuous monitoring, security updates, and performance tuning to keep your systems running smoothly.",
  },
] as const;

export const CONTACT_OFFICE_CLOCKS = [
  { city: "Bengaluru", tz: "Asia/Kolkata", label: "IST" },
  { city: "Cuttack", tz: "Asia/Kolkata", label: "IST" },
  { city: "San Francisco", tz: "America/Los_Angeles", label: "PST" },
] as const;
