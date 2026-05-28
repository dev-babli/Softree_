// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const sentryEnabled = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: "https://b20e8b19b6dc57b1f2afa851450a5605@o4511435691065344.ingest.us.sentry.io/4511435692310528",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  enabled: sentryEnabled,
  tracesSampleRate: sentryEnabled ? 0.1 : 0,

  includeLocalVariables: sentryEnabled,

  // Enable logs to be sent to Sentry
  enableLogs: sentryEnabled,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: sentryEnabled,
});
