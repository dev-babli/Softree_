// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const sentryEnabled = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: "https://b20e8b19b6dc57b1f2afa851450a5605@o4511435691065344.ingest.us.sentry.io/4511435692310528",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  enabled: sentryEnabled,
  tracesSampleRate: sentryEnabled ? 0.1 : 0,

  // Enable logs to be sent to Sentry
  enableLogs: sentryEnabled,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: sentryEnabled,
});
